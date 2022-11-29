import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Image, Animated, Keyboard } from "react-native";
// oq q a propriedade KeyBoardAvoidingView faz -> nos iremos centralizar os inputs e os botôes e quando abrir o teclado ele vai empurrar pra cima , com isso é facil de configurar e se torna bem tranquilo, pq a gnt cria o login e o teclado vai ficar todo sobre nosso formulario/input/botão. Automaticamente ao importar esta propriedade ele vai subir, evitando ese problema

//irei importar um Listener pra saber se ele ta aberto ou fechado, e se tiver aberto fazer alguma coisa, se tiver fechado fazer outra

//vamos importar o firebase para ter nossa função
import firebase from "../../config/firebaseconfig"; 

import styles from "./style"; //veja se é padrão 
//nos vamos usar um icon aqui, então quando o usuario tentar se logar e der erro, a gnt vai devolver um ícone de error e a gnt vai avisar a ele: senha ou email estão inválidos 
//a gnt vai importar o próprio Expo Vector Icons q permite a gnt utilizar icons nativos do Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
//agr poderemos usar o MaterialCommunityIcons para trazer icones pra gente

//vamos precisar do UseEffect para quando carregar o nosso componente de login a gnt verificar se o usuario está logado ou n, enfim , podemos colocar algumas funções dentro do nosso useEffect

export default function Login ({ navigation }) {
    //vamos precisar criar uns states dentro desse componente para podermos controlar os nossos inputs
    //vamos criar então os states do nosso email e senha
    //por padrão vai carreagr vazio, a gnt pode verificar se está vazio ou n
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //e se o usuario tentar logar com a Senha(password) em branco, a gnt pode adicionar um Error aqui tb:
    const [errorLogin, setErrorLogin] = useState("");
    //esses states irão ajudar a gnt a controlar o q a gnt vai precisar 

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({x: 350, y: 200}))

    //nossa função de login deixaremos ja pronta aqui:
    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in    ou   Se tiver sucesso
            let user = userCredential.user;
            // ...
            //se tiver sucesso então, vamos fazer um navigation.navigate e nos vamos encaminhar para Task e dps vamos passar uma propriedade como parametro q a gnt vai poder recuperar ({ idUser: user.uid }) uma propriedade q vem/retorna quando o usuario faz o login ele imprime isso pra gente, se eu n quisesse fazer o navigation eu posso fazer um console.log(user) por exemplo, e poderei ver oq ta sendo retornado aí 
            navigation.navigate("Tarefas", { idUser: user.uid }) //temos q pegar esse parametro { idUser: user.uid } e passar para dentro do nosso Task quando a gnt for adicionar uma nova task (no onPress do botão de add em Task)
            //console.log(user)
        })
        .catch((error) => {
            setErrorLogin(true) 
            let errorCode = error.code;
            let errorMessage = error.message;
        //uma vez implementada a verdadeira função de login, podemos ir criar a de NewUser, ja q ele nunca vai conseguir se logar se n tiver criado antes uma conta kkk Aula 2: 1h 9min
        });
    /*

        //deixaremos aqui, pra dps fazermos nossa função de login no futuro
        //passamos essa função do firebase.auth() com email e senha como parametros, e se der tudo certo ele retorna esse userCredential e armazena dentro dessa variavel user, e a gnt pode usar algumas propriedades como pegar o user e o id do usuário pra gnt poder trabalhar e fazer as chamadas
        //pq oq vai acontecer? lembra da modelagem do nosso banco q a gnt pensou la no começo: a gnt falou, cada usuário então vai ser uma collection e dentro de cada collection de usuário (desse usuario) ele vai ter todas as tasks dele, então nos vamos usar esse user.id do login pra criar essa collection e dps todas as tasks, nova task, editar uma task, salvar uma task, sempre vai recuperar, ou seja, sempre vai chamar essa collection, não mais de "Tasks" como a gnt havia feito antes mas agora pegar do user.id
        //se a gnt olhar no documento NewTask verá q a gnt ta pegando a collection de "ToDos". Então, a collection n vai ser mais "ToDos", vai ser "User.id"
        //exemplo: então felipe la tem uma collection com uma Id de login, id dele, 
        //e ai vamos recuperar, por exemplo, se vim em detalhes a gnt pode ver um update, uma edição, então dentro da collection do felipe eu quero pegar o id da task e dar update alterando o description, então vamos mudar um pouco essa lógica aqui na hr de criar uma task
        //Alteramos os var do codigo original para let
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in    ou   Se tiver sucesso
            let user = userCredential.user;
            // ...
            //se tiver sucesso então, vamos fazer um navigation.navigate e nos vamos encaminhar para Task e dps vamos passar uma propriedade como parametro q a gnt vai poder recuperar ({ idUser: user.uid }) uma propriedade q vem/retorna quando o usuario faz o login ele imprime isso pra gente, se eu n quisesse fazer o navigation eu posso fazer um console.log(user) por exemplo, e poderei ver oq ta sendo retornado aí 
            //navigation.navigate("Task", { idUser: user.uid })
            console.log(user) //ele retorna um objeto mas quase todo null (suas propriedades com null), n retornou nada pra gente
            //vamo configurar um usario primeiro la dentro do firebase, pois se n, n iria funcionar
            //Ir para Authentication kkkkk função de criar conta em vez de ser "Conectar um usuário com endereço de e-mail e senha"
            //iremos usar essa função em NewUser, mas graças a Deus é o msm código!

        }).catch((error) => {
            //se ele tentar fazer o login e der erro, nos vamos aqui, pra gente poder ativar la, da um setErrorLogin(true), quer dizer, teve um erro, n deu certo, a gnt vai exibir la, talvez possa ser o email ou senha q está inválido. É bem tranquilo ne, parece ser bem mais dificil mas é isso, a documentação do firebase é muito interessante
            //após isso é preciso chamar o onPress no botão do login
            setErrorLogin(true) 
            let errorCode = error.code;
            let errorMessage = error.message;
          // ..
        });
        * */
    } 
    //vamos deixar pronto nosso useEffect, por enquanto sem fazer nada.
    useEffect(() => {
    //vamo fazer aqui uma função que veriifca se o usuário está logado. Pode verificar na documentação do FireBAse em Gerenciar usuários -> https://firebase.google.com/docs/auth/web/manage-users?hl=pt&authuser=1 iremos usar a função de "Identificar o usuário conectado" imagem na pasta junto com outras
    firebase.auth().onAuthStateChanged((user) => {
        //se tiver um usario conectado a gnt pode fazer alguma coisa. Simples, parece ser mais dificil do q a gnt imagina as vezes
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          //se tiver algum usuario conectado, vamo fazer um navigation.nabvigate pra dentro de Task e vamo passar como parametro idUser
          //var uid = user.uid;
          navigation.navigate("Tarefas", { idUser: user.uid });
          // ...
        } 
        //Tinha um Else na função original, mas n vamos usa-lo else {
        //   // User is signed out
        //   // ...
        // }
      });
      //irei importar um Listener pra saber se ele ta aberto ou fechado, e se tiver aberto fazer alguma coisa, se tiver fechado fazer outra
      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow); //o nome da função q vou dar pra gente saber quando tiver aberto fazer alguma coisa é keyboardDidShow      Basicamente essa função será exuctada quando meu teclado estiver aberto
      keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide); // essa quando meu teclado estiver fechado
    

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
    }, []);//toda vez q o status do meu email mudar eu posso colocar ele dentro do meu useEffect [email]
    //uma propriedade q precisamos passar para dentro do KeyboardAvoidingView, q pede na documentação, é uma propriedade chamada behavior
    //e a gnt vai fazer pra cada plataforma um pouco diferente pra funcionar melhor
    //vamo passar um Plataform quando for igual ugal ios nos vamo setar a propridade padding, mas quando for android (se n for ios então) a gnt quer essa propriedade height. Pode consultar na documentação e testar na sua aplicação qual fica melhor, nos vamos usar essas propriedades dentro do keyboardavoidingview
    //se definir o type como number ele abre o teclado numerico
    //o nosso value será o nosso email q é o nosso state de email
    //Pra isso nos precisamos fazer o onChangeText pra toda vez q a gnt tiver o onChangeText a gnt vai passar o text retorne então o setEmail(e passamos para setar o email o text novamente). assim nos temos o nosso onchangetect implementado
    //temos q passar uma propriedade para o password, q é q toda vez q alguem for digitar ele n pode exibir o texto como no email, ele tem q mostrar o caractere oculto, caractere de segurança! SecurityTextEntry
    //cada um devolvendo o state referendo a ele mesmo. OK!

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

    return  <ImageBackground source={require("../../../assets/background.png")} style={{flex: 1, paddingBottom: 60,}}>
        <StatusBar/>
       <View style={styles.containerLogo}>
            <Animated.Image source={require("../../../assets/logo.png")} style={{width: logo.x, height: logo.y, backgroundColor:"transparent"}}/>
       </View>

        {/* <Text style={styles.title}>PomoTimer</Text> */}
        
        {/* Agora q botei o Animated na minha View, eu posso animar o estilo dessa view!
        dentro dos estilos eu passo [] e dentro deles o q eu to querendo animar */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
        <Animated.View style={[styles.containerInputs, {
            //como eu quero q ela venha de baixo pra cima, como se fosse um efeito dela subindo até onde ela está, então temos q usar o transform pra podermos mexer no eixo Y
            //dentro do translateY tenho q colocar o valor q eu quero q seja animado , n um valor fixo e sim um valor dinâmico 
            opacity: opacity,
            transform: [
                { translateY: offset.y }
            ]
        }]}>
            <Text style={{ width: "90%", paddingBottom: 5, paddingLeft: 10, color: "#838383", fontSize: 17}}>E-mail</Text>
            <TextInput 
                style={styles.input} 
                placeholder='digite seu endereço de e-mail'
                // o autoCorrect serve para o nosso corretor n funcionar, n corrigir nada, quando estiver digitando o email
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
        {/* o q vamos precisar ao clicar no nosso botão? se os inputs estiverem vazio e clicar no botão nos queremos invalidar, devolver um erro para o usuario. Se o usuario tentar enviar e tiver um erro então a gnt vai exibir email e senha invalido, e quando estiver vazio na vamos disponibilizar o botao!
        vamos primeiro quando ele enviar e retornar invalido, criar essa parte aqui, a gnt pode verificar se o erro */}
        {/* se o ErrorLogin for igual a true (logo em seguida) podemos fazer uma verificação-> se for true a gnt faz esse se n a gnt faz esse
        la no retorno da função de login, se ele tentar logar e der erro nos vamos retornar q algo de errado n está certo kkk de q o email e password está invalido 
        la no retorno da função de login, se ele tentar logar e der erro a gnt alter o errorlogin pra true e a gnt passa aqui uma msgm de erro pra ele
        se for true (dps dos dois pontos :), ou seja, logou, podemos retornar uma simples View vazia <View /> n imprime nada, deixa ali tranquilo */}
        
        {errorLogin === true
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
        {/* Outra validação q vamos fazer é quando quando os campos tiverem vazio setar o botão para disable e o usuario n conseguir clicar ali */}
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
        {/* com isso ja temos o nosso botão de login implementado com nossa funcionalidade de validação dos campos. Logo abaixo do botão teremos esse textozinho: */}
        <Text style={styles.registration}>
            {/* don't have a registration? */}
            <Text style={styles.linkSubscribe} onPress={() => navigation.navigate("NewUser")}>Cadastra-se</Text> 
            {/* essa linha acima será um Link para o NewUser */}
        </Text>
        </Animated.View>
            {/* É legal fazer uma view no final do componente, para quando o teclado subir e por causa do KeyboardAvoidingView, ficar ainda uma margem e n ficar rente aos campos */}
            {/* <View style={{height: 0}}/> */}
    </KeyboardAvoidingView>
        </ImageBackground>
}