import { IAlerts } from "@/data/interfaces/IAlert"
import { TYPE_ALERT } from "@/utils/typeAlters"
import { AlertCircle } from 'lucide-react-native'
import { Text } from "react-native"
import { Box } from "../ui/box"
interface IAlertItemProps {
  alert:IAlerts
}
export const AlertItem = ({alert}:IAlertItemProps)=>{
  const alertType = TYPE_ALERT.find(type => type.value === alert.alert_type_id)
  return(
    <Box className="flex flex-row rounded-lg gap-3 p-4 bg-neutral-800 mb-4">
      <Box>
        <AlertCircle color={alertType?.color} />
      </Box>
      <Box className="flex flex-col">
        <Text className="text-sm text-gray-400">Alerta creada el {new Date(alert.date).toLocaleDateString()}</Text>
        <Text className="text-sm text-white">Tipo de alerta: {alertType?.label}</Text>
        <Text className="text-sm text-gray-400">{`Latitud: ${alert.location_lat} - Longitud: ${alert.location_lng}`}</Text>
      </Box>
    </Box>
  )
}