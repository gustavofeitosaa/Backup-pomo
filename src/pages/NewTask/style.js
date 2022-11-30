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
        fontWeight: "500",
        color: "#838383"
        //backgroundColor: "blue"
    },
    input: {
        width: "90%",
        marginTop: 20,
        padding: 10,
        height: 45,
        borderColor: "#838383",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        //borderBottomWidth: 1,
        borderWidth: 1,
        //borderBottomColor: "#FA5754",
        //margin: "auto" n tem nenhum efeito para que possa ter esse efeito igual tem na web, faremos:
        marginLeft: "auto",
        marginRight: "auto",// pra deixar alinhadinho ao centro
        color: "#434343"
    },
    buttonNewTask: {
        //position: "absolute",
        width: "40%",
        height: 40,
        marginTop: 30,
        //bottom: 30,
        //left: 20,
        backgroundColor: "#FA5754",
        borderWidth: 1,
        borderColor: "#FA5754",
        borderRadius: 10, 
        justifyContent: "center", 
        alignItems: "center",
        marginRight: "auto",
        marginLeft: "auto"
    },
    iconButton: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default styles