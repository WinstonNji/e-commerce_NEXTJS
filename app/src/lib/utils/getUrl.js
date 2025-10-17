import { v2 as cloudinary } from "cloudinary";
import { connectCloudinary } from "../cloudinary";

export async function getUrl(file, filePath = 'e-commerce/'){ 
    try {
         console.log(file, "***********file received")
        connectCloudinary()

        const buffer = Buffer.from(await file.arrayBuffer())

        const upload = await new Promise((resolve,reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    folder : `${filePath}`
                },
                (error,result) => {
                    if(error) reject(error)
                    else resolve(result)
                }
            )

            stream.end(buffer)
        })

        return await upload.secure_url
    } catch (error) {
        console.log(error)
        throw error
    }
    

}