import { type ClassValue, clsx } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { toast } from "@/components/ui/use-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({ error, setError, duration = 5000 }: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  }
  else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration
    })
  }
}
/**
 * Xóa đi ký tự '/' đầu tiên của path
 * @param {string} path
 * @returns {string} - Chuỗi theo định dạng 'path/segment/segment'
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}