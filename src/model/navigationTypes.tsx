import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"



type ScreenNavigationProp<T extends keyof ParamListBase> = NativeStackNavigationProp<ParamListBase, T>

interface ScreenProps<T extends keyof ParamListBase>{
    navigation:ScreenNavigationProp<T>
}


export default ScreenProps