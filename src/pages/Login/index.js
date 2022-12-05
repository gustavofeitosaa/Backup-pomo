import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Animated, Keyboard } from "react-native";

import firebase from "../../config/firebaseconfig"; 

import styles from "./style";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function Login ({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({x: 350, y: 200}))

    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in    ou   Se tiver sucesso
            let user = userCredential.user;
            
            navigation.navigate("Tarefas", { idUser: user.uid }) 
        })
        .catch((error) => {
            setErrorLogin(true) 
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate("Tarefas", { idUser: user.uid });
            } 
        });

      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow); 
      keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

      Animated.parallel([
          Animated.spring(offset.y, {
            toValue: 0,
            speed: 4,  //4
            useNativeDriver: true,
            bounciness: 20,
          }),
          Animated.timing(opacity, {
            toValue: 1, 
            duration: 200, //200
            useNativeDriver: true,
          })
      ]).start();
    }, []);

    function keyboardDidShow(){
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 155,
                duration: 100, //milisegundos
                useNativeDriver: false,
            }),
            Animated.timing(logo.y, {
                toValue: 195,
                duration: 100, //milisegundos
                useNativeDriver: false,
            }),
        ]).start();
    }

    function keyboardDidHide(){
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 350,
                duration: 100, //milisegundos
                useNativeDriver: false,
            }),
            Animated.timing(logo.y, {
                toValue: 200,
                duration: 100, //milisegundos
                useNativeDriver: false,
            }),
        ]).start();
    }

    return  <ImageBackground source={require("../../../assets/background.png")} resizeMode={Platform.OS == "android" ? "stretch" : "stretch" } style={{flex: 1, paddingBottom: 60,}}>
        <StatusBar/>
        
       <View style={styles.containerLogo}>
            <Animated.Image source={require("../../../assets/logo.png")} style={{width: logo.x, height: logo.y, backgroundColor:"transparent"}}/>
       </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <Animated.View style={[styles.containerInputs, {
                opacity: opacity,
                transform: [
                    { translateY: offset.y }
                ]
            }]}>
                <Text style={{ width: "90%", paddingBottom: 5, paddingLeft: 10, color: "#838383", fontSize: 17}}>E-mail</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='digite seu endereço de e-mail'
                    autoCorrect={false} 
                    type='text'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    secureTextEntry={false}
                    />
                <Text style={{ width: "90%", paddingBottom: 5, paddingLeft: 10, color: "#838383", fontSize: 17}}>Senha</Text>
                <TextInput
                    style={styles.input} 
                    secureTextEntry={true}
                    autoCorrect={false}
                    placeholder='digite sua senha'
                    type='text'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />

                {   errorLogin === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                    name="alert-circle"
                    size={24}
                    color='#bdbdbd'
                    />
                <Text style={styles.warningAlert}>e-mail ou senha inválidos</Text>
                </View>
                :
                <View/>  
                }

                {   email === "" || password === "" 
                ?
                <TouchableOpacity disabled={true} style={styles.buttonLogin}>
                        <Text style={styles.textButtonLogin}>Entrar</Text>
                    </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonLogin} onPress={loginFirebase}>
                        <Text style={styles.textButtonLogin}>Entrar</Text>
                    </TouchableOpacity>
                } 
                
                <Text style={styles.registration}>
                    <Text style={styles.linkSubscribe} onPress={() => navigation.navigate("NewUser")}>Cadastra-se</Text> 
                    {/* essa linha acima será um Link para a tela de Novo Usuário */}
                </Text>
            </Animated.View>
        </KeyboardAvoidingView>
    </ImageBackground>
}