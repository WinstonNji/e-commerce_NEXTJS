import pool from "../db";
import { v2 as cloudinary } from "cloudinary";
import { connectCloudinary } from "../cloudinary";

connectCloudinary()

export const createCategory = async (formData) => {

    const categoryName = formData.get('categoryName')
    const caption = formData.get('caption')
    const categoryImg = formData.get('categoryImg')

    try {
        const buffer = Buffer.from(await categoryImg.arrayBuffer())

        const upload = await new Promise((resolve,reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {   
                    folder : 'e-commerce/category',
                    resource_type : "image"
                },
                (error,result) => {
                    if(error) reject(error)
                    else resolve(result)
                }
            );
            stream.end(buffer)
        })

        const categoryUrl = upload.secure_url


        const query = `
            INSERT into category(
                title,
                caption,
                image
            )
            VALUES(
                $1, $2, $3
            ) RETURNING *;
        `;

        const values = [
            categoryName,
            caption,
            categoryUrl
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
        console.log(result)
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

        const buffer = Buffer.from(await categoryImg.arrayBuffer())

        const upload = await new Promise((resolve,reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder : 'e-commerce/category'
                },
                (error,result) => {
                    if(error) reject(error)
                    else resolve(result)
                }
            );
            stream.end(buffer)
        });

        const categoryUrl = upload.secure_url

        const query = `
            UPDATE category
            SET 
                title = $1,
                caption = $2,
                image = $3
            WHERE id = $4
            RETURNING *;
        `

        const values = [
            categoryName,
            caption,
            categoryUrl,
            id
        ]

        const result = await pool.query(query,values)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
    
}