
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import firebase from "../../config/firebaseconfig";
import styles from "./style";


//além do navigation, pra poder funcionar, quando a gnt salvar, fazer a edição, navegar pro tasks de novo, vamo ter q passar o routes
//q é como conseguimos pegar os parâmetros

export default function Details ({navigation, route}) {
    //da onde estamos pegando esse desciption? lá de task
    //quando carregar a pagina de details, vai carregar com o nosso state graças ao (q veio do) route.params.description q é o q ta salvo no Banco!!!!
    //quando dermos o onChangeText vai alterar, pra dair então quando o usuario fizer a alteração e clicar no botão de salvar, ele chama a função Edit q vamos criar aqui
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description);
    const database = firebase.firestore();// 1h 33 min ele explica essa parte. Basicamente, ja estamos recuperando o route.params.id da Task, e está recuperando tb a descrição da nossa task q a gnt ta sentando dentro de descriptionEdit
    const idTask = route.params.id

    function editTask(description, id) {
        //como vou editar, é a msm coisa de excluir, eu quero primeiro recuperar o id dentro do meu doc
        //dentro do meu update eu posso passar um objeto com description q é oq eu quero dar update
        //quando o usuario clicar no save, ele vai recuperar da nossa collection Task, o Id, e depois vai dar o update no description, passando o descriptionEdit, q estamos setando la no onChangeText
        //database.collection("ToDos").doc(id).update({   
        database.collection(route.params.idUser).doc(id).update({
            description: descriptionEdit,
        })
        //dps de fazer a atualização no nosso DataBase, a gnt passa o 
        navigation.navigate("Task", { idUser:route.params.idUser });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}></Text>
            <TextInput style={styles.input} placeholder="Ex: estudar javascript" onChangeText={setDescriptionEdit} value={descriptionEdit}/>
            <TouchableOpacity style={styles.buttonNewTask} onPress={() => { 
                editTask(descriptionEdit, idTask);
                }}>
                <Text style={styles.iconButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}