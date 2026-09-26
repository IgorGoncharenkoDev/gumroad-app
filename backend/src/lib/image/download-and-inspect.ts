import { fileTypeFromBuffer } from 'file-type'
import sharp from 'sharp'

import { ExternalError } from '@/errors/external.error'
import { ValidationError } from '@/errors/validation.error'

export async function downloadAndInspectImage (url: string) {
  const controller = new AbortController()
  const timer = setTimeout(() => {
    controller.abort()
  }, 2000)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new ExternalError('Failed to download asset')
    }

    const createArrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(createArrayBuffer)

    const MAX_BYTES = 10 * 1024 * 1024

    if (buffer.length > MAX_BYTES) {
      throw new ValidationError('Asset is too large')
    }

    const fileType = await fileTypeFromBuffer(buffer)

    if (!fileType) {
      throw new ValidationError('Unable to determine asset file type')
    }

    if (!fileType.mime.startsWith('image/')) {
      throw new ValidationError('Not an image file')
    }

    const fileName = `img_${Date.now()}.${fileType.ext}`

    const meta = await sharp(buffer).metadata()
    const width = meta.width ?? 0
    const height = meta.height ?? 0

    return {
      buffer,
      contentType: fileType.mime,
      sizeBytes: buffer.length,
      width,
      height,
      fileName,
      fileNameWithoutExt: fileName.replace(/\.[^.]+$/, ''),
    }
  } catch (error) {
    console.log(error);
  } finally {
    clearTimeout(timer)
  }
}