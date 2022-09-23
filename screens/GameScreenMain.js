import React, {useState, useEffect} from 'react'
import { View, Text, Modal, SafeAreaView, Image, StyleSheet, Button, ImageBackground } from 'react-native'
import firebase from "@firebase/app-compat";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextInput } from 'react-native-gesture-handler';
import {updateScore} from '../APIs/HandleAPIs'

const listOfAnswers = ['innovation_creativity', 'cns_alzheimer', 'pink cheer', 'plus new sensors-ttl', 'essays_pc essays_left', 'coronavirus_chronic',
'artintel_workforce', 'price_image', 'histmed_influenza', 'pubhlth_zoonose', 'pubhlth_epitope', 'chronobiology immunotherapy_traffick', 'dod_space space_force',
'coronavirus_chronic', 'order hard copy htn essays-class', 'corrections only for nasem great job tx', 'epigenetic markers']
var items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
export default function GameScreenMain({ route }) {
    const username = route.params.username;
    const [imgURL, setimgURL] = useState('')
    const [answer, setAnswer] = useState('')
    const [imagename, setImageName] = useState('')
    const [modalVisible, setModalVisible] = useState('')
    const [modalText, setModalText] = useState('')
    const [profileScore, setProfileScore] = useState('')

    const storage = getStorage();
    const getImages = () => {
        var imageName = items[Math.floor(Math.random() * items.length)];
        setImageName(imageName)
        getDownloadURL(ref(storage, '/' + imageName.toString()+ '.jpg'))
        .then((url) => {
            //from url you can fetched the uploaded image easily
            setimgURL(url)
            if (items.length != 1)
            {
                items.splice(items.indexOf(imageName), 1)
            }
            else{
                items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
                alert("You finished all the questions, Congrats!\n Your Score: " + profileScore.toString() + "\n Keep playing!!")
            }
            console.log(items)
            return;
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
    }
    
    useEffect(() => {
        getImages()
      }, [])
    
    const handleAnswer = () => {
        const imgName = imagename
        setAnswer('')
        getImages();
        if(listOfAnswers[imgName-1] == answer.toLowerCase()){
            updateScore(username, 25, handleCallBack)
        }
        else{
            updateScore(username, -25, handleCallBack)
        } 
    }

    const handleCallBack = (winStreak, loseStreak) => {
        firebase.firestore()
        .collection('Users')
        .doc(username)
        .get().then((doc) => {
        setProfileScore(doc.data().score)
        if (doc.data().score > 25 && doc.data().score < 49 && winStreak > 0)
        {
            setModalText("Woohoo! Get Goingg!")
            showModal() 
        }
        else if (doc.data().score > 49 && doc.data().score < 74 && winStreak > 0)
        {
            setModalText("You are getting Good at this!")
            showModal()
        }
        else if (doc.data().score > 74 && doc.data().score < 99 && winStreak > 0)
        {
            setModalText("Hmm, You are good!, let's see if you will get next one right!")
            showModal()
        }
        else if (doc.data().score > 99 && doc.data().score < 124 && winStreak > 0)
        {
            setModalText("You scored a Century! Whatupppp")
            showModal()
        }
        else if (doc.data().score > 124 && doc.data().score < 149 && winStreak > 0)
        {
            setModalText("WoW!")
            showModal()
        }
        else if (doc.data().score > 149 && doc.data().score < 174 && winStreak > 0)
        {
            setModalText("Good Show!!!")
            showModal()
        }
        else if (doc.data().score > 174 && doc.data().score < 199 && winStreak > 0)
        {
            setModalText("Legend--Wait for it--")
            showModal()
        }
        else if (doc.data().score > 199 && doc.data().score < 224 && winStreak > 0)
        {
            setModalText("Dary! Legendary!!")
            showModal()
        }
        else if (doc.data().score > 224 && doc.data().score < 249 && winStreak > 0)
        {
            setModalText("Gimme a imaginery Hi5")
            showModal()
        }
        else if (doc.data().score > 249 && doc.data().score < 274 && winStreak > 0)
        {
            setModalText("I guess you should work for him!")
            showModal()
        }
        else if (doc.data().score > 274 && doc.data().score < 299 && winStreak > 0)
        {
            setModalText("Dr.Poste wants to know your location!!")
            showModal()
        }
        else if (doc.data().score > 299 && doc.data().score < 324 && winStreak > 0)
        {
            setModalText("GGWP")
            showModal()
        }
        else if (doc.data().score > 324 && doc.data().score < 349 && winStreak > 0)
        {
            setModalText("Okay! What's your secret??")
            showModal()
        }
        else if (doc.data().score > 349 && doc.data().score < 374 && winStreak > 0)
        {
            setModalText("Is this George???")
            showModal()
        }
        else if (doc.data().score > 374 && doc.data().score < 399 && winStreak > 0)
        {
            setModalText("You deserve a PhD in Poste Script!!")
            showModal()
        }
        else if (doc.data().score > 399 && doc.data().score < 424 && winStreak > 0)
        {
            setModalText("1 more and you will end with perfect streak OMG!!")
            showModal()
        }
        else if (doc.data().score > 424 && winStreak > 0)
        {
            setModalText("Okay, I give up! You win! You are the best!")
            showModal()
        }
        else if (doc.data().score < -24 && doc.data().score > -49 && loseStreak > 0)
        {
            setModalText("Well, try again!")
            showModal()
        }
        else if (doc.data().score < -49 && doc.data().score > -74 && loseStreak > 0)
        {
            setModalText("Nope!")
            showModal()
        }
        else if (doc.data().score < -74 && doc.data().score > -99 && loseStreak > 0)
        {
            setModalText("Ask for help!")
            showModal()
        }
        else if (doc.data().score < -99  && doc.data().score > -124 && loseStreak > 0)
        {
            setModalText("Can you read???")
            showModal()
        }
        else if (doc.data().score < -124  && doc.data().score > -149 && loseStreak > 0)
        {
            setModalText("You are Dumb!")
            showModal()
        }
        else if (doc.data().score < -149 && loseStreak > 0)
        {
            setModalText("10 IQ spotted!!")
            showModal()
        }
        else if (doc.data().score < 0 && winStreak > 0)
        {
            setModalText("Okay! Some improvement! Get going!")
            showModal()
        }
        else if (doc.data().score > 0 && loseStreak > 0)
        {
            setModalText("It's okay! Mistakes happen!")
            showModal()
        }
    })
    }

    const showModal = () => {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
    };


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
        style={styles.background}
        resizeMode="cover"
        source={require("../assets/gamebg.jpg")}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <View  style={styles.modal}>
                <Text style={styles.textStyle}>
                    {modalText}
                </Text>
                
                </View>
            
            </Modal>
            <Image resizeMode = "contain" source={{uri:imgURL}} style={styles.image}></Image>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Answer"
            value = {answer}
            onChangeText={(text) => setAnswer(text)}
            />
            <Button
            style={styles.button}
            title="Submit"
            color="#fc5c65"
            onPress={handleAnswer}
            />
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image:{
       width: "50%",
       height: "50%",
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
    button:{
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
      },
    modal:{
        marginTop: 300,
        backgroundColor: "yellow",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        alignItems: "center",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: "center",
        justifyContent: "center"
      },
      textStyle:{
          fontSize: 20,
          fontWeight: 'bold',
      },
      background:{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
})
