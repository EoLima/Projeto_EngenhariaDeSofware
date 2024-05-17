import { Text, View, Image } from "react-native"
// import { styles } from "./styles"

export default function App() {
  return (
    <View>
      <View>
        <Text>Bem Vindo!</Text>
        <Image source={require("../../assets/logo.png")} />
      </View>
    </View>
  )
}
