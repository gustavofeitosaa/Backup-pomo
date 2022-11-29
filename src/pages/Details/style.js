import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, //a gnt quer que esse espaço tenha o tamanho todo da nossa tela
        backgroundColor: "#fff", //mesmo background q temos na outra tela, pra ficar no padrão        
    },
    input: {
        width: "90%",
        marginTop: 35,
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
    buttonDetails: {
        width: "40%",
        height: 40,
        marginTop: 30,
        
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
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default styles