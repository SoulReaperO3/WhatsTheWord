import React, {useEffect, useState} from 'react'
import { ImageBackground, View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';

export default function Login({ navigation }) {
    const [emailID, setEmailID] = useState('')
    const [password, setPassword] = useState('')
    //const navigation = useNavigation();
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate("GameScreen", {email: user.email})
        }
      })

      return unsubscribe
    }, [])


    const handleLogin = () => {
      auth.signInWithEmailAndPassword(emailID, password)
      .then(userCredentials => {
          const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
    }

    return (
        <ImageBackground 
        style={styles.background}
        resizeMode="cover"
        source={require("../assets/bg.png")}>
        <SafeAreaView
        style={styles.container}
        behavior = "padding">
        <Text style={styles.textStyle}>
          EmailID
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email ID"
          value = {emailID}
          onChangeText={(text) => setEmailID(text)}
        />
        <Text style={styles.textStyle}>
          Password
        </Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter Password"
          value = {password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
        style={styles.button}
        title="Login"
        color="#fc5c65"
        onPress={handleLogin}
        />
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        borderRadius: 10,
        borderWidth: 2
    },
    textStyle:{
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "left",
      padding: 10,
      marginLeft: 10
    },
    container: {
      justifyContent: "center",
      width: "100%",
      height: "100%",
      flex: 1,
    },
    button:{
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20
    }
})
