import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
    },
    Tasks: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    deleteTasks: {
        justifyContent: "center",
        paddingLeft: 15,
    },
    descriptionTask: {
        width: "75%",
        alignContent: "flex-start", //quero q ele comece alinhado a esquerda
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        color: "#282b2db5",
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
        fontSize: 25,
        fontWeight: "bold",
    },
    buttonLogout: {
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 30,
        right: 20,  //como queremos colcar do outro lado, vamos só mudar o left para right!
        //backgroundColor: "#FA5754", //n vamos ter um backgroundcollor pq n queremos q tenha a cor, e sim só o ícone
        //borderRadius: 50, tb n vai precisar do borderRadius 
        justifyContent: "center",  //a gnt quer q ele seja alinhado ao centro
        alignItems: "center",
    },
    iconButtonLogout: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "bold",
        //vai carregar o nosso botão de logout. Quando o usuário clicar ele desloga, vai carregar o nosso useEffect e ele n fez absolutamente nada, pq ele entendeu q nosso usuario ja está deslogado  
        //e no useEffect dentro do nosso login ele ja está preparado para que se tiver um usuário logado caminhe para 'Task' o q n aconteceu pois estamos deslogados.

        //Em Fim, conseguimos implementar um App configurado com o FireBase desde o CRUD completo, toda parte de login, olhando a documentação, implementando parte a parte, estilizando o nosso app, tendo a página de cadastrar um novo usuário, fazendo logout,  fizemos uma aplicação completa 
    },
    buttonPomoTimer:{
        position: "absolute",
        width: 60,
        height: 90,
        bottom: 30,
        left: 165,
        //backgroundColor: "#FA5754",
        borderRadius: 50, 
        justifyContent: "center", 
        alignItems: "center",
    }
});

export default styles