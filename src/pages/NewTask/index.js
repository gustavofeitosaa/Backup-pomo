import react, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import firebase from "../../config/firebaseconfig"
import styles from "./style";


export default function NewTask ({ navigation, route }) {
    //vamo iniciar como nulo pois, n tem nada lá dentro ainda, dps podemos startar isso no futuro
    const [description, setDescription] = useState(null);
    const database = firebase.firestore();

    function addTask() {
        //database.collection("ToDos").add({
        database.collection(route.params.idUser).add({
            description: description,
            status: false
        })
        navigation.navigate("Tarefas", { idUser:route.params.idUser })
    }
    //é bom q  a gnt vai reaproveitar muito coisa dessa pagina para a próxima pagina de Edit, vai ser basicamente a msm página, só iremos trocar algumas coisas
    //o onChangeText vai servir para que sempre que o usuário digitar, ele vai setar o state
    //no textInput nos temos q adicionar um valor (value) e para cada vez q a gnt digita o nosso value ele é nosso propio description.
    //então para cada vez que eu digito, o meu state ele é atualizado, e ele recebe o valor description. Ele seta o valor q ta dando no onChangeTask e manda para o value
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input} placeholder="Ex: estudar javascript" onChangeText={setDescription} value={description}/>
            <TouchableOpacity style={styles.buttonNewTask} onPress={() => { 
                addTask()
                }}>
                <Text style={styles.iconButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}