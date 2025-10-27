import pool from "../../db";

export async function getAllProducts_general() {
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
            WHERE is_deleted = false AND p.display = true
            GROUP BY p.id,c.title,b.brand_name
        `

        const result = await pool.query(query)
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