import { ToastError } from "@/components/ToastError"
import { useToast } from "@/components/ui/toast"
import { useCallback, useState } from "react"

export const useErrorToast = ()=>{
  const {show,close,isActive} = useToast()
  const [toastId,setToastId] = useState<number>(0)

  const showErrorToast = useCallback((title:string,description:string)=>{
    if (!isActive(String(toastId))) {
      const newId = Math.random();
      setToastId(newId);
      show({
        id: String(newId),
        placement: 'bottom left',
        duration: 3000,
        render: ({ id }) => (
          <ToastError
            title={title}
            description={description}
            toastId={`toast-${id}`}
            handleClose={() => close(id)}
          />
        ),
      });
    }
  },[isActive, toastId, close, show])

  return {showErrorToast}
}
