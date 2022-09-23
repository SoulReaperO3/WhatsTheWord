import React, {useState} from 'react'
import { ImageBackground, View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { auth } from '../firebase'
import {addUser} from '../APIs/HandleAPIs'
import GameScreen from './GameScreen';
import { useNavigation } from '@react-navigation/native';

export default function Register({ navigation }) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [emailID, setemailID] = useState('')
    //const navigation = useNavigation();

    const registerCallBack = (data_EmailID, data_UserName) => {
      navigation.navigate("GameScreen", {email: data_EmailID, UserName: data_UserName});
    }

    const handleSignup = () => {
        auth.createUserWithEmailAndPassword(emailID, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            if (user){
              addUser(username, password, emailID, registerCallBack)
            }
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
          Username
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value = {username}
          onChangeText={(text) => setUserName(text)}
        />

        <Text style={styles.textStyle}>
          Email-ID
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter EmailID"
          value = {emailID}
          onChangeText={(text) => setemailID(text)}
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
        title="Register"
        color="#4ecdc4"
        onPress={handleSignup}
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
