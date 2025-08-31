import { AlertItem } from "@/components/Alerts/AlertItem";
import { Loader } from "@/components/Loader";
import { Box } from "@/components/ui/box";
import { AuthContext } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { getAlerts } from "@/service/userService";
import { use } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";


export default function Alert() {
  const {user} = use(AuthContext)
  const {data,error,isLoading,refetch} = useFetch({
    fetcher:(signal,page)=>getAlerts(user?.id ?? 0,signal,page ?? 1),
    immediate:true,
  })

  if (isLoading) return <Loader />

  if (error) {
    return(<Text>No hay alertas</Text>) 
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