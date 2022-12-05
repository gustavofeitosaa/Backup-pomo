import React, { useState, useEffect }  from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ImageBackground, Platform } from "react-native";

import { LogBox } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"; //pq vamos usar ele? pq ele já é padrão do expo, e facilita bastante o nosso trabalho. E agora eu poderia utilizar os icones
import { MaterialIcons } from '@expo/vector-icons';

import firebase from "../../config/firebaseconfig";

import styles from "./style";


export default function Task ({ navigation, route }) {
    //esse useState vai ser um Array q vai guardar nossas tasks, e a gnt vai poder consumir dele no nosso flatlist
    const [task, setTask] = useState([]);
    const database = firebase.firestore();
    const [checkbox, setCheckBox] = useState(false);
    const user = firebase.auth().currentUser;


    function logout () {
        //podemos olhar na documentação do firebase como fazer a função de logout. Em Autenticaçõ com senha -> https://firebase.google.com/docs/auth/web/password-auth?hl=pt&authuser=1   -> "Para desconectar um usuário, chame signOut:" vamo copiar aquela função e colar no nosso App para nos podermos fazer o logout
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            //como q a gnt configura aqui então? quando um botão chamar essa função logout, a gnt vai fazer oq? ele vai deslogar o usuário (ele n vai estar mais logado), quando carregar o login ele tem um useEffect que verifica se o usuário está logado(n vai ta logado) 
            //dps de deslogar aqui vamo fazer um navigation navigate para login:
            navigation.navigate("Login")
          }).catch((error) => {
            // An error happened.
            //aqui se der algum erro podemos configurar alguma coisa aqui

        });
    }

    useEffect(() => {
        LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registerd.']);
        
        database.collection(route.params.idUser).orderBy('createdAt', 'desc').onSnapshot((query) => {   
            const list = [];  
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
            })
            // console.log(list);
            setTask(list);
        })    
    }, []);
    //nessa função do useEffect nos estamos pegando os dados do nosso banco, ta conectando la e pegando os dados, e dps setando dentro de task, nossa lista
    
    const createTwoButtonAlert = (id) =>
    Alert.alert('Atenção!', 'Uma vez deletada a tarefa não há como recuperar. Deseja excluir mesmo assim?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => database.collection(route.params.idUser).doc(id).delete().catch(error => {
        alert(error);
     }) },
    ]);

    //criando uma função para quando o item estiver marcado
    let checkToDoItem = (item, isChecked) => {

        database.collection(route.params.idUser).doc(item.id).update({
            status: isChecked,
        })
    };

    return (
        <ImageBackground source={require('../../../assets/background_home_screen.png')} resizeMode={Platform.OS == "android" ? "stretch" : "stretch" } style={styles.container}>
            <FlatList
                //isso é pra n mostrar o scroll e n atrapalhar nosso estilo
                // style={{alignSelf: "stretch", backgroundColor: "green"}}
                showsVerticalScrollIndicator={true}
                data={task}
                renderItem={( { item } ) => {
                    return (
                    //essa view vai ajudar a estilizar e deixar o icone do lado de cada tarefa -> icone do lado esquerdo + descrição lado direito
                    <View style={styles.Tasks}>
    
                        <View style={{flexDirection: "row", height: 40, width: "95%", backgroundColor: "#fff", borderRadius: 20, marginTop: 5 }}>
                            <TouchableOpacity style={styles.deleteTasks} onPress={()=> { 
                                createTwoButtonAlert(item.id)
                                
                                }} >
                                <FontAwesome name="trash" size={26} color="#838383">
                                </FontAwesome>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteTasks} onPress={ () => {
                                    //aqui ele vai navegar até details passando isso como parâmetro, e irei usar recuperar lá através do route, e dps fazer o route.params.id
                                    navigation.navigate("Detalhes", { //e aqui dentro oq devemos passar, la em details dps onde a gnt vai salvar , precisamos ainda recuperar do documento, então a gnt vai ver la tb, vamo testar aqui dnv
                                        id: item.id,
                                        description: item.description, //teoricamente precisamos passar aqui tb como parâmetro o nosso user.uid só q aqui, quando a gnt mandar la, a gnt só precisa recuperar o ID da Task, então a gnt resolve isso aqui tb
                                        idUser: route.params.idUser,
                                    })
                                } } >
                                <FontAwesome style={{textAlign: "center"}} name="pencil" size={26} color="#FA5754"></FontAwesome>
                            </TouchableOpacity>
                            <View style={{justifyContent: "center", flex: 1, marginHorizontal: 15}}>
                                <BouncyCheckbox
                                    isChecked={item.status}
                                    style={{flex: 1, paddingRight: 10}}
                                    size={25}
                                    fillColor="#0D9F6F"
                                    unfillColor="#fff"
                                    text={item.description}
                                    // iconStyle={{ borderColor: "red" }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    //textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    onPress={(isChecked) => { checkToDoItem(item, isChecked) }}
                                    useNativeDriver={true}
                                    />
                            </View>
                        </View>
                    </View>
                    );
                }}
                keyExtractor={item => item.id} 
                ListHeaderComponent={() => {
                return ( 
                <View>
                    <View style={{flexDirection: "row", paddingVertical: 5, alignItems: "center", width: "92%", marginLeft: "auto", marginRight: "auto", justifyContent: "space-between"}}>  
                        
                        <TouchableOpacity style={styles.buttonNewTask} onPress={()=> navigation.navigate("Nova Tarefa", { idUser: route.params.idUser })} >
                            {/* <Text style={styles.iconButton}>+</Text> */}
                            {/* <FontAwesome style={{textAlign: "center"}} name="plus" size={23} color="#FA5754"></FontAwesome> */}
                            <Entypo style={{textAlign: "center"}} name="add-to-list" size={23} color="#FA5754" />
                            {/*  https://icons.expo.fyi/        https://icons.expo.fyi/Entypo/add-to-list */}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonLogouts} onPress={() => logout() }>
                            {/* //quando clicar nesse botão ele vai chamar a função de logout, nos precisamos ter um ícone aqui. Pra isso, precisamos colocar ele dentro de um Text */}
                            <Text style={styles.iconButtonLogout}>
                                {/* <MaterialCommunityIcons></MaterialCommunityIcons>  <<< poderiamos chamar assim! mas vamos chamar da outra forma, junto com as propriedades que a gnt quer. name vamo chamar o location-exit q é um icone de sair mesmo */}
                                <MaterialCommunityIcons name="location-exit" size={32} color="#838383" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
            }}
            ListFooterComponent={() => {
                return <View style={{marginBottom: 25, marginRight: "auto", marginLeft: "auto", marginTop: 10}}>
                        <TouchableOpacity style={styles.buttonPomo} onPress={()=> navigation.navigate("Pomodoro", { idUser: route.params.idUser })} >
                
                            <MaterialIcons name="timer" size={50} color="#FA5754" />
                            
                        </TouchableOpacity>
                </View>
                }}
            />
        </ImageBackground>
    )
}