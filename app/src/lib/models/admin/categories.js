import pool from "@/lib/db";
import { getUrl } from "@/lib/utils/getUrl";


export const createCategory = async (formData) => {
    try {
        const categoryName = formData.get('categoryName')
        const caption = formData.get('caption')
        const categoryImg = formData.get('categoryImg')
        const display = formData.get('display')


        const categories = await pool.query(`
                SELECT 
                    id, 
                    title 
                from category
                WHERE title = $1
            `, [categoryName])

        if(categories.rowCount !== 0){
            return false
        }
        

        // Upload image to cloudinary and get the url
        const categoryUrl = await getUrl(categoryImg, 'e-commerce/category')

        const query = `
            INSERT into category(
                title,
                caption,
                image,
                display
            )
            VALUES(
                $1, $2, $3, $4
            ) RETURNING *;
        `;

        const values = [
            categoryName,
            caption,
            categoryUrl,
            display || true
        ]

        console.log(values, '----VALUES')

        const result = await pool.query(query,values)
        return result.rows[0]
    } catch (error) {
        console.error(error)
        throw error;
    }
    
}

export const getAllCategories = async () => {
    try {
        const query = `
            SELECT * FROM category
        `;

        const result = await pool.query(query)
        console.log(result)
        return result.rows
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export const deleteCategory = async (id) => {
    try {

        const query = `
            DELETE FROM category
            WHERE id = $1 
            RETURNING*;
        `

        const result = await pool.query(query, [id])
        return result
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

export const updateCategory = async (id, formData) => {
    try {
        const categoryName = formData.get('categoryName')
        const caption = formData.get('caption')
        const categoryImg = formData.get('categoryImg')
        const display = formData.get('display')

        const categoryUrl = await getUrl(categoryImg, 'e-commerce/category')

        const query = `
            UPDATE category
            SET 
                title = $1,
                caption = $2,
                image = $3,
                display = $4    
            WHERE id = $5
            RETURNING *;
        `

        const values = [
            categoryName,
            caption,
            categoryUrl,
            display,
            id
        ]

        const result = await pool.query(query,values)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
    
}