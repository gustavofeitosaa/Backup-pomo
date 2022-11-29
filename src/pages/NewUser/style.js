import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, //primeiro vamos centralizar por isso o flex 1
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        //uma coisa q iremos fazer tb é adicionar uma margem pra cada plataforma, então se for IOS n precisa fazer nenhuma margem, mas se for Android a gnt poderia dar um padding 60 pra ele poder ficar um pouco melhor
        paddingTop: Platform.OS === "ios" ? 50 : 150,
    },
    title: {
        fontSize: 22, //na tela de login o size é 48
        //lineHeight: 52, //Se liga q sou eu testando essa propriedade !!!!!!!!!!!!!
        color: "#FA5754",
        marginBottom: 20,
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
    buttonRegister: {
        width: "50%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FA5754",
        borderRadius: 10,
        marginTop: 30,
        //color: "#35AAFF"
    },
    textButtonRegister: {
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
    login: {
        position: "relative",
        bottom: 70,
        right: 0,
        left: 0,
        textAlign: "center",
        color: "#838383", //#838383   poderia ser tb #4d5156
     //   color: "#838383", //como é um link, é interessante usar cores mais próximas do Azul (como exemplo a #1877f2 ou #279AF1), então isso é uma técnica na produção de software, pois o nosso cérebro tem uma tendência a clicar em coisas azul. Aqui iremos usar um azul muito usado em diversas aplicações
        fontSize: 16,
        //fontWeight: "bold",
        // marginRight: "auto",
        // marginLeft: "auto"
        fontWeight: "500"
    },
    linkLogin: {
        color: "tomato", //como é um link, é interessante usar cores mais próximas do Azul, então isso é uma técnica na produção de software, pois o nosso cérebro tem uma tendência a clicar em coisas azul. Aqui iremos usar um azul muito usado em diversas aplicações
        fontSize: 16,
        fontWeight: "500"
    }
});

export default styles;