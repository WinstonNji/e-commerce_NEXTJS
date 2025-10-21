import pool from "../../db";
import { v2 as cloudinary } from "cloudinary";
import { connectCloudinary } from "../../cloudinary";
import { getUrl } from "../../utils/getUrl";

connectCloudinary()

// Admin
export async function createProduct(formData) {

    try {
        const title = formData.get('title') 
        const description = formData.get('description')
        const price = formData.get('price')
        const discountPercentage = formData.get('discountPercentage')
        const brand = formData.get('brand')
        const category = formData.get('category')
        const weight = formData.get('weight') 
        const sku = formData.get('sku')
        const width = formData.get('width')
        const height = formData.get('height')
        const depth = formData.get('depth')
        const warranty_info = formData.get('warrantyInformation')
        const returnPolicy = formData.get('returnPolicy')
        const thumbnailImg = formData.get('thumbnailImg')
        const display = formData.get('display')
        const is_featured = formData.get('is_featured')
        const inventory = formData.get('inventory')

        const images = Array.from(formData.getAll('image'))

        // Handle thumbnail Image
        const thumbnailUrl = await getUrl(thumbnailImg, `e-commerce/products/${category}`)

        console.log(thumbnailUrl, '****thumbnail url')
        // handle other product images
        const imagesUrl = []
        for(const img of images){
            const url = await getUrl(img,`e-commerce/products/${title}`)
            imagesUrl.push(url)
        }
        console.log(imagesUrl, '****allimages url')

        // Uploading Main Product Information
        const query = `
                INSERT INTO products(
                    title,
                    price,
                    discount_percentage,
                    description,
                    category,
                    brand,
                    sku,
                    weight,
                    width,
                    height,
                    depth,
                    warranty_info,
                    return_policy,
                    thumbnail_Img,
                    is_featured,
                    display,
                    inventory
                ) 
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    COALESCE($8,00.0),
                    COALESCE($9,00.0),
                    COALESCE($10,00.0),
                    COALESCE($11,00.0),
                    COALESCE($12, 'No Warranty Provided'),
                    COALESCE($13,'No return'),
                    $14,
                    $15,
                    $16,
                    $17
                ) 
                RETURNING*;`;
    
        const values = [
            title,
            price,
            discountPercentage,
            description,
            category,
            brand,
            sku,
            weight || null,
            width || null,
            height || null,
            depth || null,
            warranty_info || null,
            returnPolicy || null,
            thumbnailUrl,
            is_featured,
            display,
            inventory
        ];

        const result = await pool.query(query,values)

        // Uploading other product Images
        for (const imgUrl of imagesUrl){
            const query = `
                INSERT INTO product_images(
                    product_id,
                    image
                )VALUES(
                    $1,$2
                )
            `

            const values = [result.rows[0].id,imgUrl]
            await pool.query(query,values)
        }

        
        return result.rows[0]

        
        
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export async function getAllProducts() {
    try {
        const query = `
            SELECT 
                p.id,
                p.title,
                p.price,
                p.discount_percentage,
                p.description,
                p.sku,
                p.weight,
                p.width,
                p.height,
                p.depth,
                p.warranty_info,
                p.return_policy,
                p.thumbnail_img,
                p.is_deleted,
                p.is_featured,
                p.display,
                p.inventory,
                ARRAY_AGG(pi.image) AS images,
                c.title AS category,
                b.brand_name AS brand
            FROM products p 
            LEFT JOIN product_images pi
            ON p.id = pi.product_id
            JOIN category c
            ON p.category = c.id
            JOIN brand b
            ON p.brand = b.id
            WHERE is_deleted = false
            GROUP BY p.id,c.title,b.brand_name
        `

        const result = await pool.query(query)
        console.log(result, '***result')
        return result.rows
    } catch (error) {
        console.error(error)
        throw error
    }
    
    
}

export async function updateProduct(formData,productId) {
    try {
        // Extracting field
        const title = formData.get('title') 
        const description = formData.get('description')
        const price = formData.get('price')
        const discountPercentage = formData.get('discountPercentage')
        const brand = formData.get('brand')
        const category = formData.get('category')
        const weight = formData.get('weight') 
        const sku = formData.get('sku')
        const width = formData.get('width')
        const height = formData.get('height')
        const depth = formData.get('depth')
        const warranty_info = formData.get('warrantyInformation')
        const returnPolicy = formData.get('returnPolicy')
        const thumbnailImg = formData.get('thumbnailImg')
        const is_featured = formData.get('is_featured')
        const display = formData.get('display')
        const inventory =  formData.get('inventory')
        // Get all other images for product
        const images = Array.from(formData.getAll('image'));

        // Thumbnail Upload
        console.log(thumbnailImg, '***thumbnail image to be updated backend')
        const thumbnailUrl = await getUrl(thumbnailImg, `e-commerce/products/${title}`)
        console.log(thumbnailUrl, '***thumbnail url updated bckend')
        // Generate URL for Other Product Images
        const imagesUrl = [];
        for(const img of images){
            const url = await getUrl(img, `e-commerce/products/${title}`)
            imagesUrl.push(url)
        }
        console.log(imagesUrl, '***all images url updated bcknd')

        // Updating product
        const query = `
            UPDATE products 
            SET
                title=$1,
                price=$2,
                discount_percentage=COALESCE($3,0.00),
                description=$4,
                category=$5,
                brand=$6,
                sku=$7,
                weight=COALESCE($8,00.0),
                width=COALESCE($9,00.0),
                height=COALESCE($10,00.0),
                depth=COALESCE($11,00.0),
                warranty_info=COALESCE($12, 'No Warranty Provided'),
                return_policy=COALESCE($13,'No return'),
                thumbnail_Img=$14,
                is_featured = $15,
                display = $16,
                inventory = $17
            WHERE id = $18
            RETURNING*;
        `

        const values = [
            title,
            price,
            discountPercentage || 0,
            description,
            category,
            brand,
            sku,
            weight || null,
            width || null,
            height || null,
            depth || null,
            warranty_info || null,
            returnPolicy || null,
            thumbnailUrl,
            is_featured,
            display,
            inventory,
            productId
        ]


        await pool.query(`
            DELETE FROM product_images WHERE product_id = $1
            `, [productId] )
        for (const url of imagesUrl){
            await pool.query(`
                INSERT INTO product_images(
                    product_id,
                    image
                )
                VALUES(
                    $1,
                    $2
                )
                RETURNING*;
            `,[productId,url])
        }

        const result = await pool.query(query,values)
        console.log(result, '---updated product---')
        return result.rows[0]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteProduct(productId) {
    try {
        const result = await pool.query(`
            UPDATE products
            SET is_deleted = true
            WHERE id = $1
            RETURNING*;
        `,[productId])

        return result.rows[0]
    } catch (error) {
        console.error(error)
        throw error
    }
    
}


