import react, { useState } from "react";
import { Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";

import firebase from "../../config/firebaseconfig"
import styles from "./style";


export default function NewTask ({ navigation, route }) {
    //vamo iniciar como nulo pois, n tem nada lá dentro ainda
    const [description, setDescription] = useState(null);
    const database = firebase.firestore();

    function addTask() {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        database.collection(route.params.idUser).add({
            description: description,
            status: false,
            createdAt: timestamp,
        })
        navigation.navigate("Tarefas", { idUser:route.params.idUser })
    }

    //o onChangeText vai servir para que sempre que o usuário digitar, ele vai setar o state
    //no textInput nos temos q adicionar um valor (value) e para cada vez q a gnt digita o nosso value ele é nosso propio description.
    //então para cada vez que eu digito, o meu state ele é atualizado, e ele recebe o valor description. Ele seta o valor q ta dando no onChangeTask e manda para o value
    return (
        <ImageBackground source={require("../../../assets/background_add_edit.png")} resizeMode={Platform.OS == "android" ? "stretch" : "stretch" } style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input} placeholder="Ex: estudar javascript" maxLength={50} onChangeText={setDescription} value={description}/>
            {   description === null
                ?
                <TouchableOpacity style={styles.buttonNewTask} disabled={true}>
                    <Text style={styles.iconButton}>Salvar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonNewTask} onPress={() => { 
                    addTask()
                    }}>
                    <Text style={styles.iconButton}>Salvar</Text>
                </TouchableOpacity>
            }
        </ImageBackground>
    )
}