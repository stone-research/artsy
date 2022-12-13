import { configureImageServices, ServiceConfigurations } from "@artsy/img"
import { getFeatureVariant } from "System/useFeatureFlag"
import { getENV } from "./getENV"

export const GEMINI_CLOUDFRONT_URL =
  getENV("GEMINI_CLOUDFRONT_URL") ?? "https://d7hftxdivxxvm.cloudfront.net"

const services = configureImageServices({
  gemini: {
    endpoint: GEMINI_CLOUDFRONT_URL,
  },
  lambda: {
    endpoint: "https://d1j88w5k23s1nr.cloudfront.net",
    sources: [
      {
        source: "https://d32dm0rphc51dk.cloudfront.net",
        bucket: "artsy-media-assets",
      },
      {
        source: "https://files.artsy.net",
        bucket: "artsy-vanity-files-production",
      },
    ],
  },
})

type ImageService = keyof ServiceConfigurations

const DEFAULT_IMAGE_SERVICE: ImageService = "gemini"

export const getImageService = (): ImageService => {
  const variant = getFeatureVariant("image-service")
  const requestedImageService = variant?.payload?.value as ImageService

  return requestedImageService || DEFAULT_IMAGE_SERVICE
}

export const crop = (
  src: string,
  options: {
    width: number
    height: number
    quality?: number
  }
) => {
  return services[getImageService()].exec("crop", src, {
    width: options.width,
    height: options.height,
    quality: options.quality,
  })
}

export const resize = (
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
  }
) => {
  return services[getImageService()].exec("resize", src, {
    width: options.width,
    height: options.height,
    quality: options.quality,
  })
}
