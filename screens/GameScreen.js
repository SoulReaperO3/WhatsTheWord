import React, {useState}  from 'react'
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native'
import { useNavigation, useNavigationParam } from '@react-navigation/native';
import firebase from "@firebase/app-compat";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function GameScreen({ route }) {
    const emailID = route.params.email;
    const [username, setusername] = useState('')
    const navigation = useNavigation()
    firebase.firestore()
        .collection('Users')
        .where("emailID", "==", emailID)
        .get().then((snapShot) => {
            snapShot.forEach(snap => {
                let data = snap.data();
                setusername(data.userName);
            })
        })
    
    return (
        <ImageBackground 
        style={styles.background}
        resizeMode="cover"
        source={require("../assets/splash.png")}>
        <Text style={styles.welcomeMessage}>
            Welcome {username}
        </Text>
        <Button
        style={styles.button}
        title="Play"
        color="#fc5c65"
        onPress={() => {navigation.navigate("GameScreenMain", {username: username})}}
        />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeMessage:{
        fontSize:20,
    },
    button:{
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    }
})