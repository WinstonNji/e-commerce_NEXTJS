import Flutterwave from "flutterwave-node-v3"
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export async function POST (req){
    try {
        // Verifying user
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value
        const decoded = jwt.verify(token, process.env.SECRET_JWT_TOKEN)
        const {userId} = decoded
        if(!userId){
            return NextResponse.redirect(new URL('/login'), req.url)
        }

        // Fetching Data
        const data = await req.json()

        if(!data){
            return NextResponse.json({
                success: false,
                message: "Couldn't get order data"
            })
        }
        const {item} = data

        // Fetching User Credentials
        const userResponse = await pool.query(`
                SELECT u.email,u.name FROM users u
                WHERE id = $1
            `, [userId])

        const user = userResponse.rows[0]

        if(!user){
            return NextResponse.json({
                success: false,
                message: "Account not found. Please sign-in"
            })
        }

        // Fetching Products
        const productIds = Object.entries(item)
        const fetchProducts = async () => {
            const productArr = [];
            for (const [productId,quantity] of productIds) {
                const productResponse = await pool.query(
                    `SELECT p.id,p.title, p.price, p.discount_percentage FROM products p WHERE p.id = $1`,
                    [productId]
                );
                productArr.push({...productResponse.rows[0],quantity:quantity});
            }

            return productArr;
        };

        const products = await fetchProducts()

        // Calculating sum price of all products
        let sumOfPrices = 0
        const itemPrice = (product) => {
            const discount = product.discount_percentage/100 || 0
            let price = product.price
            let productQuantity = product.quantity
            if(productQuantity <= 0){
                productQuantity = 1
            }
            if(discount > 0){
              price = (product.price - (product.price * discount)).toFixed(2)
              return price * productQuantity
            }
            return price * productQuantity
        }
        for(const product of products){
            sumOfPrices += itemPrice(product)
        }
        const amount = (sumOfPrices + (sumOfPrices * (5/100))).toFixed(2)


        // Creating order

        const orderResponse = await pool.query(`
                INSERT INTO orders(
                    user_id,
                    total_amount
                )VALUES($1,$2)
                RETURNING *
            `, [userId,amount])

        const orderId  = orderResponse.rows[0].id

        // Generating redirection link
        const params = new URLSearchParams();

        products.forEach(product => {
            params.append('productId', product.id);
            params.append('productQuantity', product.quantity);
        });
        params.append('userId', userId)
        params.append('orderId', orderId)

        const redirectionUrl = `https://e-commerce-nextjs-sage.vercel.app/?${params.toString()}`;

        // Initiating Payment getway
        const response = await axios.post("https://api.flutterwave.com/v3/payments", {
            tx_ref: Date.now(),
            amount,
            currency: 'USD',
            redirect_url : redirectionUrl,
            payment_options: 'card,ussd',
            customer: {
                email : user.email,
                name: user.name,
            },
            customizations: {
                title: 'my Payment Title',
                description: 'Payment is for placing order on cart items',
                logo: null,
            }
        } , {headers : {
                Authorization : `Bearer ${process.env.FLW_SECRET_KEY}`}
            }
        )

        if(!response){
            return NextResponse.json({success:false, message:'Failed to initiate payment'})
        }

        

        // Create order items

        if(!orderId){
            throw new Error("Couldn't create orderId")
        }

        for (const product of products){

            const discount = product.discount_percentage || 0
            const productPrice = discount > 0 ? (product.price - (product.price * (discount/100))).toFixed(2) : product.price
            const subtotal = itemPrice(product).toFixed(2)

            const response = await pool.query(`
                INSERT INTO order_items (
                    order_id,
                    product_id,
                    quantity,
                    price,
                    subtotal
                )VALUES($1,$2,$3,$4,$5)
                RETURNING *
            `, [orderId, product.id,product.quantity, productPrice,subtotal])

            if(response.rowCount === 0){
                throw new Error("Couldn't complete order item registry")
            }

        }

        return NextResponse.json({
            success: true,
            message: 'Payment successfully initiated',
            flutterResponse : response.data
        })

    
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "An error occured. Couldn't initiate payment",
            error: error
        })
    }
    
}