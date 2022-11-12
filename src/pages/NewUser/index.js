//poderiamos apenas copiar e colar todo cod da tela de login pois a de NewUser será mt parecida, porém, poderia da mais trabalho dps, então, vamos recriar do zero!
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";

import firebase from "../../config/firebaseconfig";
import styles from "./style";
//nos tb vamos querer retornar um erro nessa tela
import { MaterialCommunityIcons } from "@expo/vector-icons";

//vc parou em 1h 29 min 35 segundos  -> agr ele cria o nosso usuário la no banco, em Authentication, e loga. Eu ja tenho meu UID do usuário e consigo criar as tasks agora dentro desse usuario
//porem temos 2 problemas: precismaos criar uma função de logOut pra gnt sair caso o usuario ja esteja logado, ou seja, precisamos remover/desabilitar tb o ícone da setinha na tela inicial de Tasks, pois é legal q seja nossa função de logout

export default function NewUser ({ navigation }) {
    //vamos precisar criar uns states dentro desse componente para podermos controlar os nossos inputs
    //vamos criar então os states do nosso email e senha
    //por padrão vai carreagr vazio, a gnt pode verificar se está vazio ou n
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //e se o usuario tentar logar com a Senha(password) em branco, a gnt pode adicionar um Error aqui tb:
    const [errorRegister, setErrorRegister] = useState("");
    //esses states irão ajudar a gnt a controlar o q a gnt vai precisar 

    const register = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            //se o usuario conseguir se registrar, a gnt precisa redirecionalo/navegar para dentro de Tasks
            navigation.navigate("Task", { idUser: user.uid }) //aqui estmos fazendo o redirecionamento para Tasks pq basicamente ele ja criou a conta e ja acessou o sistema 
            //aqui tb estamos passando como parâmetro para Task o idUser: user.uid, oq q a gnt pode fazer para quando a gnt logar dentro do nosso app, conseguir recuperar a informmaçõa q a gnt precisa desse userID, e n ter q passar mais "Task" la dentro do nosso Task, como uma collection, a gnt deve passar sim o ID do usuario
            //então aqui dentro("Task"), como dentro de New TaskD, e Details, vamos passar route pra podermor recuperar parâmetros passados dentro do Navigation !!!!! Va agr para o index de Task para ver essa implementação! antes era assim : export default function Login ({ navigation }) agr é assim export default function Login ({ navigation, route }) e dentro agr, onde tiver collection("ToDos") iremos passar collection(route.params.idUSer) e fazer o mesmo la em new task e details
            // ...
        })
        .catch((error) => {
            setErrorRegister(true)// se a gnt tentar cadastrar la e por algum motivo der erro, ele vai informar pra gente o nosso erro aqui, exibir o nosso erro q ta sendo setado aqui
            let errorCode = error.code;
            let errorMessage = error.message;
            // ..
        });
    }

    return <ImageBackground source={require("../../../assets/background.png")} style={{flex: 1, paddingBottom: 60,}}>

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
        <Text style={styles.title}>Create a PomoTimer account</Text>
        <TextInput 
            style={styles.input} 
            placeholder='enter your email'
            type='text'
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
        <TextInput
            style={styles.input} 
            secureTextEntry={true}
            placeholder='enter a password'
            type='text'
            onChangeText={(text) => setPassword(text)}
            value={password}
        />
        {/* teremos os campos/inputs para email e senha e tb, tudo vai setar os states pra gente (email e password) basicamente a msm coisa q a de login */}
        {/* outra coisa q vamos ter aqui, é se tiver um Erro Register , precisamos a gnt vai imprimir, se os inputs estiverem em branco, iremos aproveitar todo cod da tela de login */}
        {errorRegister === true
        ?
        <View style={styles.contentAlert}>
            <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color='#bdbdbd'
            />
            <Text style={styles.warningAlert}>invalid e-mail or password</Text>
        </View>
        :
        <View/>  
        }
        {   email === "" || password === "" 
        ?
            <TouchableOpacity disabled={true} style={styles.buttonRegister}>
                <Text style={styles.textButtonRegister}>Register</Text>
            </TouchableOpacity>
        :
        <TouchableOpacity style={styles.buttonRegister} onPress={register}>
                <Text style={styles.textButtonRegister}>Register</Text>
            </TouchableOpacity>
        }    
        {/* conseguimos aproveitar boa parte do código da tela de login, o q falta implementar agr, caso dps disso tudo acontecer fizer as verificações, caso o usuario ja tenha cadastro, de repente ele so clicar pra ver como é a página e tudo mais, a gnt pode fazer um botão q volta para a página de login então */}
        <Text style={styles.login}>
            already register ?
            <Text style={styles.linkLogin} onPress={() => navigation.navigate("Login")}> Login...</Text> 
            {/* essa linha acima será um Link para o NewUser */}
        </Text>
            {/* É legal fazer uma view no final do componente, para quando o teclado subir e por causa do KeyboardAvoidingView, ficar ainda uma margem e n ficar rente aos campos */}
            <View style={{height:10}}/>
    </KeyboardAvoidingView>
    </ImageBackground>
}