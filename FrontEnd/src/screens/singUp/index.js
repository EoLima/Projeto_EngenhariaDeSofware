import React, { useState } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { styles } from "./styles"
import Checkbox from "expo-checkbox"
import { TextInputMask } from "react-native-masked-text"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function App() {
  const [image, setImage] = useState(null)
  const [isChecked, setChecked] = useState(false)
  const [cell, setCell] = useState("")
  const [birthdate, setBirthdate] = useState("")

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
    <KeyboardAwareScrollView behavior={"height"}>
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.photoProfile}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.standardProfile} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.containerForm}>
            <Text style={styles.formTitle}>Nome Completo</Text>
            <View style={styles.containerNameFull}>
              <TextInput
                style={styles.formInput1}
                placeholder="Fulano"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="given-name"
              />
              <TextInput
                style={styles.formInput1}
                placeholder="Silva"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="family-name"
              />
            </View>

            <Text style={styles.formTitle}>E-mail</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Exemplo@host.com.br"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Text style={styles.formTitle}>Senha</Text>
            <TextInput
              style={styles.formInput}
              placeholder="****************"
              autoCapitalize="none"
              secureTextEntry
            />

            <Text style={styles.formTitle}>Celular</Text>
            <TextInputMask
              style={styles.formInput2}
              placeholder="( XX ) XXXXX-XXXX"
              keyboardType="numeric"
              autoCapitalize="none"
              autoComplete="tel"
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              value={cell}
              onChangeText={(text) => setCell(text)}
            />

            <Text style={styles.formTitle}>Data de Nascimento</Text>
            <TextInputMask
              style={styles.formInput2}
              placeholder="DD / MM / AAAA"
              keyboardType="numeric"
              autoCapitalize="none"
              type="datetime"
              options={{
                format: "MM/DD/YYYY",
              }}
              value={birthdate}
              onChangeText={(text) => setBirthdate(text)}
            />
          </View>

          <View style={styles.formCheckBox}>
            <View style={styles.subCheckBox}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#FF8A00" : "#D9D9D9"}
              />
            </View>
            <Text style={styles.text}>
              Li e estou de acordo com Termo de Uso e Politica de Privacidade
            </Text>
          </View>

          <View style={styles.subForm}>
            <TouchableOpacity style={styles.subFormButton}>
              <Text style={styles.subTextButton}>CRIAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subFormOtherAcess}>
            <View style={styles.subFormChoiceAcess}>
              <Image
                source={require("../../assets/line.png")}
                style={styles.line}
              />
              <Text style={styles.textSubFormAcess}>OU</Text>
              <Image
                source={require("../../assets/line.png")}
                style={styles.line}
              />
            </View>

            <View style={styles.containerLogo}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/face.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/apple.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/google.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}
