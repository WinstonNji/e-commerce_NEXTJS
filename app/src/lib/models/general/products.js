import pool from "../../db";

export async function getAllProducts_general(searchParams) {

    const category = searchParams.get("category")
    const brands = searchParams.get("brand")
    const min = searchParams.get("min")
    const max = searchParams.get("max")
    const brandList = brands ? brands.split(",") : []

        let query = `
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
            WHERE 
                p.is_deleted = false
                AND 
                p.display = true
        `

        const values = []
        let paramIndex = 1

        if(category){
            query += ` AND c.title = $${paramIndex++}`
            values.push(category)
        }

        if(brandList.length > 0){
            query += ` AND b.brand_name = ANY($${paramIndex++})`
            values.push(brandList)
        }

        if(min && max){
            query += ` AND p.price BETWEEN $${paramIndex++} AND $${paramIndex++}`;
            values.push(Number(min), Number(max));
        }

        query += `
            GROUP BY p.id, c.title, b.brand_name
        `
        try {
            const result = await pool.query(query, values)
            console.log(result.rows, '*****result of the return from filter')
            return result.rows
    } catch (error) {
        console.error(error)
        throw error
    }
    
    
}

export async function getAllProducts_featured() {
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
            WHERE is_deleted = false AND p.display = true AND p.is_featured = true
            GROUP BY p.id,c.title,b.brand_name
        `

        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        console.error(error)
        throw error
    }
    
    
}

export async function getSingleProduct(productId){
    try {
        const result = await pool.query(
            `
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
                    p.rating,
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
                WHERE 
                    p.id = $1 AND is_deleted = false AND p.display = true
                GROUP BY p.id, c.title, b.brand_name;
            `, 
        [productId])

        return result.rows[0]
        
    } catch (error) {
        console.log(error)
        throw error
    }
}