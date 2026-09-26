import { v2 as cloudinary } from 'cloudinary'

import { env } from '@/config/env'

cloudinary.config({
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
})

type UploadToCloudinaryParams = {
  buffer: Buffer
  fileNameWithoutExt: string
  folder: string
}

type UploadToCloudinaryReturn = {
  publicId: string
  secureUrl: string
}

export function uploadToCloudinary({
  buffer,
  fileNameWithoutExt,
  folder,
}: UploadToCloudinaryParams) {
  return new Promise<UploadToCloudinaryReturn>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: fileNameWithoutExt,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) {
          return reject(error)
        }

        resolve({
          publicId: result.public_id,
          secureUrl: result.secure_url,
        })
      },
    )

    stream.end(buffer)
  })
}
