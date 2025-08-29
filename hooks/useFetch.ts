import { useCallback, useEffect, useRef, useState } from "react"

interface IPropsUseFetch<T>{
  fetcher: (sigal:AbortSignal)=> Promise<T>
  onSuccess?:(data:T)=>void
  immediate?:boolean
}

export const useFetch =<T>({fetcher,onSuccess,immediate=true}:IPropsUseFetch<T>)=> {
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState<string | null>(null)
  const [data,setData] = useState<T | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  
  const handleExecute = useCallback(async()=>{
    try {
      if (abortRef.current) {
        abortRef.current.abort()
      }
      const controller = new AbortController()
      abortRef.current = controller
      setIsLoading(true)
      const response = await fetcher(controller.signal)
      setData(response)
      if (onSuccess) onSuccess(response)
    } catch (error:any) {
      setError(error)
    }finally{
      setIsLoading(false)
    }
  },[fetcher,onSuccess])

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