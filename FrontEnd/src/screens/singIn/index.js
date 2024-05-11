import { StatusBar } from "expo-status-bar"
import {
  Keyboard,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import Checkbox from "expo-checkbox"
import React, { useState } from "react"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function App() {
  const [isChecked, setChecked] = useState(false)

  const navigation = useNavigation()

  const handlePress = () => {
    setTimeout(() => {
      // Navega para a tela com o nome 'SignUp' após 100 milissegundo
      navigation.navigate("SignUp")
    }, 100)
  }

  return (
    <KeyboardAwareScrollView
      behavior={"height"}
    >
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <View>
            <Text style={styles.formTitle}>Digite o seu E-mail</Text>
            <TextInput
              style={styles.formInput}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Text style={styles.formTitle}>Digite a sua Senha</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry
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
              <Text style={styles.text}>Lembrar minha senha</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.text}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subForm}>
            <TouchableOpacity style={styles.formButton1}>
              <Text style={styles.textButton1}>ACESSAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.formButton2}
              onPressOut={handlePress}
            >
              <Text style={styles.textButton2}>CRIAR CONTA</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subFormCompany}>
            <TouchableOpacity style={styles.formButtonCompany}>
              <Text style={styles.textCompany}>Quem somos ?</Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="statusBar" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}
