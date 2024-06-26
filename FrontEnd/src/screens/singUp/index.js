import React, { useState } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { styles } from "./styles"
import Checkbox from "expo-checkbox"
import { TextInputMask } from "react-native-masked-text"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import api from "../../services/crud"
import { useNavigation } from "@react-navigation/native"
import itsOver from "../../components/ItsOverEighteen"

export default function App() {
  const [avatar, setAvatar] = useState(null)
  const [avatarBase64, setAvatarBase64] = useState(null)
  const [isChecked, setChecked] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")

  const navigation = useNavigation()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      try {
        const uri = result.assets[0].uri
        setAvatar(uri)

        // Converter a imagem para base64
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        })
        setAvatarBase64(base64)
      } catch (error) {
        console.log("error")
      }
    }
  }

  const setSingUp = async () => {
    var over = itsOver(birthdate)

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      password.length === 0 ||
      isChecked == false ||
      birthdate.length == 0
    ) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e concorde com os termos de uso.",
        [{ text: "OK" }]
      )

      console.error("Não preencheu todos os campos ou não marcou o checkbox")
    } else if (over == false) {
      Alert.alert(
        "Erro",
        "É necessário ser maior de 18 anos e que a data de nascimeno seja valida!",
        [{ text: "OK" }]
      )
      console.error("É necessário ser maior de 18 anos e que a data de nascimeno seja valida!")
    } else {
      try {
        let response
        if (avatarBase64 == null) {
          response = await api.post("/api", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneField.getRawValue(),
            password: password,
            birthDate: birthdate,
          })
        } else {
          response = await api.post("/api", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneField.getRawValue(),
            password: password,
            avatar: avatarBase64,
            birthDate: birthdate,
          })
        }

        console.log("Resposta da API:", response.status)

        // Opcional: mostrar um alerta de sucesso
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
          { text: "OK" },
        ])

        setTimeout(() => {
          // Navega para a tela com o nome 'SignUp' após 100 milissegundo
          navigation.navigate("SignIn")
        }, 100)
      } catch (error) {
        if (error.response) {
          if (error.response && error.response.status === 400) {
            Alert.alert(
              "Erro",
              `Não foi possível realizar o cadastro, pois ${error.response.data.message}.`,
              [{ text: "OK" }]
            )

            // Log do erro no console
            console.error(
              "Erro ao fazer a requisição:",
              error.response.data.message
            )
          } else {
            // Mostrar um alerta de erro
            Alert.alert(
              "Erro",
              "Não foi possível realizar o cadastro. Por favor, tente novamente.",
              [{ text: "OK" }]
            )

            // Log do erro no console
            console.error(
              "Erro ao fazer a requisição:",
              error.response.data.message
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
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.photoProfile}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.profileImage} />
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
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
              <TextInput
                style={styles.formInput1}
                placeholder="Silva"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="family-name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>

            <Text style={styles.formTitle}>E-mail</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Exemplo@host.com.br"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.formTitle}>Senha</Text>
            <TextInput
              style={styles.formInput}
              placeholder="****************"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
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
              value={phone}
              onChangeText={(text) => setPhone(text)}
              ref={(ref) => (this.phoneField = ref)}
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
              ref={(ref) => (this.birthdateField = ref)}
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
            <TouchableOpacity
              onPressOut={setSingUp}
              style={styles.subFormButton}
            >
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
