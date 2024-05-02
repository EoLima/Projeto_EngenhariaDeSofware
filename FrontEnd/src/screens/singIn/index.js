import { StatusBar } from "expo-status-bar"
import { Pressable, Text, TextInput, View, Image } from "react-native"
import Checkbox from "expo-checkbox"
import React, { useState } from "react"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"

export default function App() {
  const [isChecked, setChecked] = useState(false)

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("SignUp") // Navega para a tela com o nome 'SignUp'
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
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
          <Pressable>
            <Text style={styles.text}>Lembrar minha senha</Text>
          </Pressable>
        </View>
        <Pressable>
          <Text style={styles.text}>Esqueci minha senha</Text>
        </Pressable>
      </View>

      <View style={styles.subForm}>
        <Pressable style={styles.formButton1}>
          <Text style={styles.textButton1}>ACESSAR</Text>
        </Pressable>
        <Pressable style={styles.formButton2} onPressOut={handlePress}>
          <Text style={styles.textButton2}>CRIAR CONTA</Text>
        </Pressable>
      </View>

      <View style={styles.subFormEmpresa}>
        <Pressable style={styles.formButtonEmpresa}>
          <Text style={styles.textEmpresa}>Quem somos ?</Text>
        </Pressable>
      </View>

      <StatusBar style="statusBar" />
    </View>
  )
}
