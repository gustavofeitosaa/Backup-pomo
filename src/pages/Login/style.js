import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    containerLogo: {
        flex: 1,
        justifyContent: "center", // para alinhar verticalmente no centro
        alignItems: "center"
        // não precisa botar align items pois ja foi botado no container
    },
    containerInputs: {
        alignItems: "center", //alinha tudo no centro q tem dentro desse container
        justifyContent: "center",
        width: "90%",
        
    },
    title: {
        fontSize: 48,
        color: "#FA5754",
        marginBottom: 10,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#FFF",
        width: "90%",
        //marginTop: 10,
        marginBottom: 11,
        height: 43,  //50
        // borderBottomWidth: 1,
        // borderBottomColor: "#FA5754",
        borderWidth: 1,
        borderColor: "#838383",
        marginLeft: "auto",
        marginRight: "auto", //na web vemos mt usar o margin: auto. Porém aqui no RN n da, a gnt n tem margin auto automaticamente para os dois lados, a gnt precisa definir marginLeft e o marginRight para poder funcionar
        color: "#474747", //cor do nosso texto no input, ver dps se é isso msm. ======= #474747 -> Texto(mais escuro)         #838383 -> Texto 2 (mais claro)      // sujeito programador usa #222
        fontSize: 17, 
        borderRadius: 10,
        padding: 10,
    },
    buttonLogin: {
        width: "55%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FA5754",
        borderRadius: 10,
        marginTop: 30,
        //color: "#35AAFF"
    },
    textButtonLogin: {
        color: "#FFFFFF",
        fontSize: 16,
        // fontSize: 16,
        fontWeight: "bold"
    },
    contentAlert: {
        //esse é para ser definido quando tiver um erro
        marginTop: 20, //pra a gnt afastar ele um pouco do nosso input, lembrando q ele vai ficar entre o login e nossos inputs, mas ele só será exibido quando o erro acontecer!
        flexDirection: "row", //teremos um icone e nosso texto, e queremos q fique um ao lado do outro!
        justifyContent: "center",
        alignItems: "center",
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#838383", //poderia ser tb #bdbdbd
        fontSize: 16,
    },
    registration: {
        marginTop: 20,
        //color: "#838383", //#838383   poderia ser tb #4d5156   
    },
    linkSubscribe: {
        color: "#838383", //como é um link, é interessante usar cores mais próximas do Azul (como exemplo a #1877f2 ou #279AF1), então isso é uma técnica na produção de software, pois o nosso cérebro tem uma tendência a clicar em coisas azul. Aqui iremos usar um azul muito usado em diversas aplicações
        fontSize: 16,
        fontWeight: "500"
    }
});

export default styles;