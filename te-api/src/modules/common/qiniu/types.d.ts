export interface UploadCallback {
  key: string
  hash: string
  imageInfo: ImageInfo
  fname: string
  fsize: number
  type: string
  url: string
}

export interface ImageInfo {
  colorModel: string
  format: string
  height: number
  width: number
  size: number
}
