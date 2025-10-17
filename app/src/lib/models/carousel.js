import pool from "../db";
import { getUrl } from "../utils/getUrl";

export async function createCarousel(formData){
    try {
        const title = formData.get('title')
        const description = formData.get('description')
        const actionBtnText = formData.get('actionBtnText')
        const imageFile = formData.get('image')
        const productId = formData.get('targetProduct')

        // Image Upload

        const imageUrl = await getUrl(imageFile,'e-commerce/hero_carousel')

        const query = `
            Insert into hero_carousel(
                title,
                description,
                action_btn_text,
                image,
                target_product
            )VALUES (
                $1,
                $2,
                COALESCE($3, 'Learn More'),
                $4,
                $5
            )RETURNING *;
        `
        const values = [
            title,
            description,
            actionBtnText || null,
            imageUrl,
            productId
        ]

        const result = await pool.query(query,values)
        console.log(result)
        return result.rows[0]
    }catch(error){
        console.log(error)
        throw error
    }


}