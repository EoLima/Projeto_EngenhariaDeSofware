import React, { useEffect, useState } from "react"
import { Keyboard } from "react-native"

export default function IsKeyboardOpen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false)
      }
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return isKeyboardOpen ? "open" : "close"
}
