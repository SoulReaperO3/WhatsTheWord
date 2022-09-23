import React from 'react';
import { ImageBackground, StyleSheet, View, SafeAreaView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
 

function WelcomeScreen({ navigation }) {
    //const navigation = useNavigation();
    return (
        
        <ImageBackground 
        style={styles.background}
        resizeMode="cover"
        source={require("../assets/bg.png")}>
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}  
        > 
        <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")} 
        >
            <Text style={styles.buttonText}> Register </Text> 
        </TouchableOpacity>
        </SafeAreaView>
        </ImageBackground>
        

    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    loginButton:{
        width: 150,
        height: 40,
        backgroundColor: '#fc5c65',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 120
    },
    registerButton:{
        width: 200,
        height: 40,
        backgroundColor: '#4ecdc4',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 120
    },
    buttonText:{
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default WelcomeScreen;