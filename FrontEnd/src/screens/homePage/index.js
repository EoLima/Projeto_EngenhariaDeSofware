import { Text, View, Image } from "react-native"
import { styles } from "./styles"

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/homeScreen.png")}
      />
    </View>
  )
}
