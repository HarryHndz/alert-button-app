import { useCallback, useEffect, useRef, useState } from "react"

interface IPropsUseFetch<T>{
  fetcher: (sigal:AbortSignal,page?:number)=> Promise<T[]>
  onSuccess?:(data:T[])=>void
  immediate?:boolean
}

export const useFetch =<T>({fetcher,onSuccess,immediate=true}:IPropsUseFetch<T>)=> {
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState<string | null>(null)
  const [data,setData] = useState<T[] | null>(null)
  const [currentPage,setCurrentPage] = useState<number>(1)
  const abortRef = useRef<AbortController | null>(null)
  
  const handleExecute = useCallback(async()=>{
    try {
      if (abortRef.current) {
        abortRef.current.abort()
      }
      const controller = new AbortController()
      abortRef.current = controller
      setIsLoading(true)
      const response = await fetcher(controller.signal,currentPage)
      if (currentPage && currentPage > 1 && Array.isArray(data) && Array.isArray(response)) {
        setData(prev => [...(prev || []), ...response])
      } else {
        setData(response)
      }
      setCurrentPage(prev => prev + 1)
      if (onSuccess) onSuccess(response)
    } catch (error:any) {
      setError(error)
    }finally{
      setIsLoading(false)
    }
  },[fetcher,onSuccess,data,currentPage])

  useEffect(()=>{
    if (immediate) handleExecute()
    return()=>{
      abortRef.current?.abort()
    }
  },[handleExecute,immediate])

  return{
    isLoading,
    error,
    data,
    refetch: handleExecute
  }
}