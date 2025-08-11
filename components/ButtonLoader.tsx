import { Button, ButtonSpinner, ButtonText } from "./ui/button"

type TButtonLoaderProps={
  isSubmitting:boolean
  handleSubmit:()=>void
  text:string
}

export const ButtonLoader = ({isSubmitting,handleSubmit,text}:TButtonLoaderProps)=>{
  return(
    <Button className='mt-4' onPress={()=>handleSubmit()} disabled={isSubmitting} >
    {
      isSubmitting ? (
      <>
        <ButtonSpinner color='black' />
        <ButtonText>Enviando...</ButtonText>
      </>
      ) : (
        <ButtonText>{text}</ButtonText>
      )
    }
  </Button>
  )
}