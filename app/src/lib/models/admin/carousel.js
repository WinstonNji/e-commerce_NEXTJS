import pool from "../../db";
import { getUrl } from "../../utils/getUrl";

export async function createCarousel(formData){
    try {
        const title = formData.get('title')
        const description = formData.get('description')
        const actionBtnText = formData.get('actionBtnText')
        const imageFile = formData.get('image')
        const productId = formData.get('targetProduct')
        const display = formData.get('display')
        // Image Upload

        const imageUrl = await getUrl(imageFile,'e-commerce/hero_carousel')

        const query = `
            Insert into hero_carousel(
                title,
                description,
                action_btn_text,
                image,
                target_product,
                display
            )VALUES (
                $1,
                $2,
                COALESCE($3, 'Learn More'),
                $4,
                $5,
                $6
            )RETURNING *;
        `
        const values = [
            title,
            description,
            actionBtnText || null,
            imageUrl,
            productId,
            display
        ]

        const result = await pool.query(query,values)
        console.log(result)
        return result.rows[0]
    }catch(error){
        console.log(error)
        throw error
    }


}

export async function getAllCarousel(){
    try{
        const result = await pool.query(`
                Select * from hero_carousel
            `)
            console.log(result, '****result from get all carousel')
        return result.rows
    }catch(error){
        console.error(error)
        throw error
    }
}

export async function updateCarousel(formData, carouselId) {
    try {
        const title = formData.get('title')
        const description = formData.get('description')
        const actionBtnText = formData.get('actionBtnText')
        const imageFile = formData.get('image')
        const targetProduct_id = formData.get('targetProduct')
        const display = formData.get('display')

        console.log(imageFile)
        // handle Image Upload
        const imageUrl = await getUrl(imageFile, `e-commerce/carousel`)

        const query = `
            UPDATE hero_carousel
            SET
                title = $1,
                description = $2,
                action_btn_text = COALESCE($3,'Learn More'),
                image = $4,
                target_product = $5
                ,display = $6
            WHERE id = $7
            RETURNING *;
        `

        const values = [
            title,
            description,
            actionBtnText || null,
            imageUrl,
            targetProduct_id,
            display,
            carouselId
        ]

        const result = await pool.query(query,values)
        return result.rows[0]

    } catch (error) {
        console.error(error)
        throw error
    }
    
}

export async function deleteCarousel(carouselId){
    try {
        const query = `
            DELETE FROM hero_carousel
            WHERE id = $1
            RETURNING *;
        `
        const values = [carouselId]

        const result = await pool.query(query,values)
        return result.rows[0]
    }catch (error) {
        console.error(error)
        throw error
    }
}