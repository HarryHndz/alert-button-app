import { AlertItem } from "@/components/Alerts/AlertItem";
import { Loader } from "@/components/Loader";
import { Box } from "@/components/ui/box";
import { AuthContext } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { getAlerts } from "@/service/userService";
import { Image } from "expo-image";
import { use } from "react";
import { FlatList, Text } from "react-native";


export default function Alert() {
  const {user} = use(AuthContext)
  const {data,error,isLoading,refetch} = useFetch({
    fetcher:(signal,page)=>getAlerts(user?.id ?? 0,signal,page ?? 1),
    immediate:true,
  })

  if (isLoading) return <Loader />

  if (error) {
    return(
      <Box className="flex-1 items-center justify-center gap-5">
        <Image 
          source={require('@/assets/images/error_image.svg')} 
          style={{ width:'50%', height:200 }}
          contentFit='contain'
        />
        <Text className="text-white text-xl font-semibold">No hay alertas</Text>
      </Box>
    ) 
  }
  
  return(
    <Box className="flex-1 flex-col gap-2">
      <Text className="text-lg font-semibold text-white">Alertas</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AlertItem alert={item} />
        )}
        onEndReached={ data?.length === 30  ? refetch : undefined}
        onEndReachedThreshold={0.5}
      />
    </Box>
  )
}