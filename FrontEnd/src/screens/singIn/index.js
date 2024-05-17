import { StatusBar } from "expo-status-bar"
import {
  Keyboard,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native"
import Checkbox from "expo-checkbox"
import React, { useState } from "react"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import api from "../../services/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
  const [isChecked, setChecked] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation()

  const handlePress = () => {
    setTimeout(() => {
      // Navega para a tela com o nome 'SignUp' após 100 milissegundo
      navigation.navigate("SignUp")
    }, 100)
  }

  const setSingIn = async () => {
    if (password.length === 0 || email.length === 0) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.", [
        { text: "OK" },
      ])
      console.error("Não preencheu todos os campos")
    } else {
      try {
        const response = await api.post("/api/auth/login", {
          email: email,
          password: password,
        })

        console.log("Resposta da API:", response.status)

        await AsyncStorage.setItem("@Tradefy:token", response.data.token)

        Alert.alert("Sucesso", "Login realizado com sucesso!", [{ text: "OK" }])

        setTimeout(() => {
          // Navega para a tela com o nome 'SignUp' após 100 milissegundo
          navigation.navigate("HomePage")
        }, 100)
      } catch (error) {
        if (error.response) {
          if (error.response && error.response.status === 400) {
            Alert.alert(
              "Erro",
              `Não foi possível fazer login, pois ${error.response.data.msg}. Por favor, tente novamente.`,
              [{ text: "OK" }]
            )

            // Log do erro no console
            console.error(
              "Erro ao fazer a requisição 400:",
              error.response.data.msg
            )
          } else if (error.response && error.response.status === 401) {
            // Mostrar um alerta de erro
            Alert.alert(
              "Erro",
              `Não foi possível fazer login, pois ${error.response.data.msg}. Por favor, tente novamente.`,
              [{ text: "OK" }]
            )

            // Log do erro no console
            console.error(
              "Erro ao fazer a requisição 401:",
              error.response.data.msg
            )
          } else {
            // Mostrar um alerta de erro
            Alert.alert(
              "Erro",
              `Não foi possível fazer login. Por favor, tente novamente.`,
              [{ text: "OK" }]
            )

            // Log do erro no console
            console.error(
              "Erro ao fazer a requisição:",
              error.response.data.msg
            )
          }
        }
      }
    }
  }

  return (
    <KeyboardAwareScrollView behavior={"height"}>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.formTitle}>Digite a sua Senha</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
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
            <TouchableOpacity style={styles.formButton1} onPress={setSingIn}>
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
