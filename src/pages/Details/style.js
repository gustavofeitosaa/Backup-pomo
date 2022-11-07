import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, //a gnt quer que esse espaço tenha o tamanho todo da nossa tela
        backgroundColor: "#fff", //mesmo background q temos na outra tela, pra ficar no padrão        
    },
    label: {
        width: "90%",
        marginTop: 20,
        marginLeft: 20,
        // marginLeft: "auto", //qnd coloca margin tanto pra direita quanto para esquerda, usamos o margin de auto, no react native é diferente do da web, aquui é necessario setar "auto" para marginLeft e marginRight
        // marginRight: "auto",
        fontSize: 16,
        color: "#FA5754"
        //backgroundColor: "blue"
    },
    input: {
        width: "90%",
        marginTop: 10,
        padding: 10,
        height: 50, 
        borderBottomWidth: 1,
        borderBottomColor: "#FA5754",
        //margin: "auto" n tem nenhum efeito para que possa ter esse efeito igual tem na web, faremos:
        marginLeft: "auto",
        marginRight: "auto",// pra deixar alinhadinho ao centro
    },
    buttonNewTask: {
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 30,
        left: 20,
        backgroundColor: "#FA5754",
        borderRadius: 50, 
        justifyContent: "center", 
        alignItems: "center",
    },
    iconButton: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default styles