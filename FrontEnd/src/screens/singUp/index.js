import React, { useState } from "react"
import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { styles } from "./styles"

export default function App() {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    console.log(result)
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.fotoPerfil}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePerfil} />
          ) : (
            <View style={styles.padraoPerfil} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
