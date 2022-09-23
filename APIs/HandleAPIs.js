import firebase from "@firebase/app-compat";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc, updateDoc } from "firebase/firestore";
import React, {useState} from 'react'

var winStreak = 0
var loseStreak = 0

export function addUser(username, passWord, email, registerCallBack) {
    firebase.firestore()
    .collection('Users')
    .doc(username)
    .set({
        emailID: email,
        password: passWord,
        userName: username,
        score: 0
    }).then((data) => registerCallBack(email, username))
    .catch((error) => console.log(error));
}

export function updateScore(username, Score, registerCallBack) {
    if (Score == 25 && loseStreak == 0){
        winStreak = winStreak + 1
    }
    else if (Score == -25 && winStreak == 0){
        loseStreak = loseStreak + 1
    }
    else if (Score == -25 && winStreak != 0){
        winStreak = 0
        loseStreak = 1
    }
    else if (Score == 25 && loseStreak != 0){
        loseStreak = 0
        winStreak = 1
    }
    firebase.firestore()
    .collection('Users')
    .doc(username)
    .get().then((doc) => {
            console.log(doc.data().score)
            var s = doc.data().score
            setTimeout(() => {
                firebase.firestore()
                .collection('Users')
                .doc(username)
                .update(
                    {
                        score: Score + s
                    }
                ).then(() => registerCallBack(winStreak, loseStreak))
                }, 500)
               
    })  
}

const getScore = (username) => {
    console.log(username)
    firebase.firestore()
    .collection('Users')
    .doc(username)
    .get().then((doc) => {
            console.log(doc.data().score)
            return doc.data().score;   
    })
}