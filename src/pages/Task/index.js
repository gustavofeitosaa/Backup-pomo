import React, { useState, useEffect }  from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, Alert, Button } from "react-native";
import PomoIcon from "../../../assets/icon_tela_pomo.png"
//import database from "../../config/firebaseconfig";
// import { database } from "../../config/firebaseconfig";
//import { firebase } from "../../config/firebaseconfig";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"; //pq vamos usar ele? pq ele já é padrão do expo, e facilita bastante o nosso trabalho. E agora eu poderia utilizar os icones
import { MaterialIcons } from '@expo/vector-icons';
//import database from "../../config/firebaseconfig";
import firebase from "../../config/firebaseconfig";

import styles from "./style";

//O useState, sempre que carregar nossa página de Task, ele vai carregar nossas Tasks vindas la do FireBase

//uma coisa q vamos usar nessa tela, é q qu ando eu clicar na descrição de uma das tasks, eu tenho q ser redirecionado para a tela de Details, então, para podermos navegar para essa tela, nos vamos precisar passar uma props (importaar aqui o navigation) para o nosso componente Task
//é bom deixar ja o navigation preparado, pra quando a gnt precisar chamar la as nossas configurações. Sem esse navigation na hora de clicar na descrição e for navegar, n vai funcionar
export default function Task ({ navigation, route }) {
    //esse useState vai ser um Array q vai guardar nossas tasks, e a gnt vai poder consumir dele no nosso flatlist
    const [task, setTask] = useState([]);
    const database = firebase.firestore();
    const [checkbox, setCheckBox] = useState(false);


    function logout () {
        //podemos olhar na documentação do firebase como fazer a função de logout. Em Autenticaçõ com senha -> https://firebase.google.com/docs/auth/web/password-auth?hl=pt&authuser=1   -> "Para desconectar um usuário, chame signOut:" vamo copiar aquela função e colar no nosso App para nos podermos fazer o logout
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            //como q a gnt configura aqui então? quando um botão chamar essa função logout, a gnt vai fazer oq? ele vai deslogar o usuário (ele n vai estar mais logado), vcs vão ver que quando carregar o login ele tem um useEffect que verifica se o usuário está logado(n vai ta logado) 
            //dps de deslogar aqui vamo fazer um navigation navigate para login:
            navigation.navigate("Login")
          }).catch((error) => {
            // An error happened.
            //aqui se der algum erro podemos configurar alguma coisa aqui
            //podemos salvar o arquivo, e agr criar nosso botão em Task q vai chamar nossa função de logout, ou seja, um botão pra gnt poder deslogar nosso usuário
            //iremos  usar um botão parecido com o + de add task. Para adicionar o icone de logout, precisaremos importar o MaterialCommunityIcons q vem do mesmo lugar q o FontAwesome
            //portanto iremos criar esse botão la embaixo, perto do botão de adicionar, pode ser até dps do botão de adicionar. Code la embaixo: 
        });
    }

    // function deleteTask(id) {
    //     //database.collection("ToDos").doc(id).delete() antes de criar um usuario
    //     database.collection(route.params.idUser).doc(id).delete().then(() => { 
    //         alert("Deleted Successfully")
    //      })
    //      .catch(error => {
    //         alert(error);
    //      })
    //     //DeleteTask ja estamos passando o route.params.idUser, quando clicamos, no caso, na estrela, nos recuperamos o ID devido por meio do .doc(id) e logo dps a gnt deleta .doc(id).delete() !!!!!!!!!! aqui em cima podemos criar nossa função de Logout
    // }

    //então, criamos o useState, pra poder receber no useEffect as nossas Tasks quando elas carregarem lá no nosso banco, quando carregar nosso componente
    //para q ele carregue toda vez quando a gnt monta nosso componente o segundo parâmetro é []
    //toda vez que carregar o componente Task, o useEffect será carregado, eai ele vai fazer essa chamada pra gente sempre
    
    //Pra pegar os dados q estão la na minha collection Task usará o database."eai a gnt quer pegar oq no nosso database?"collection("o nome da collection q a gnt quer pegar"). Então dentro da minhas Tasks eu quero saber todas as tasks q estão cadastradas la dentro, cada atividade
    //eai vc pode passar pra essa collection q eu quero q quando o dado seja adicionado la, ele seja carregado automaticamente
    //então, a gnt pode passa o onSnapshot q permite q atualize pra gnt sempre q um dado for inserido.
    //eai dentro dele, vai se passar uma função, q recebe o parâmetro query, pq será utilizado essa query pra fazer um forEach, ou seja, vai passar por todas as tasks dentro da minha Task, e vai retornar pra mim uma lista
    //todos os dados dessa collection Tasks ta vindo aqui dentro desse retorno "query", eai podemos fazer o forEach -> query.forEach((dentro do meu retorno, se desse console.log, veria q teria um campo chamado doc q é o documento né) => {e dentro de doc eu quero pegar list.push""eu quero pra cada documento q eu iver la dentro(pra cada task q eu tenha adicionado), eu quero q adiciona no meu const list q é um array, q no final, vamos setar para dentro do nosso Task com o setTask". Então a gnt vai fazer pra cada um, inserir no nosso array, então {...doc.data(), eai pega tb o id: doc.id e ele ja vai setar pra gente, vai inserir na nossa lista})
    //dps q inserir no nosso array, oq a gnt quer q ele faça? q ele adicione no nosso state Task
    useEffect(() => {
        //dps de collection eu coloquei .orderBy('createdAt','desc'). e não foi
        //database.collection("ToDos").onSnapshot((query) => {
        database.collection(route.params.idUser).onSnapshot((query) => {   //tem q ver como dar um orderBy para ordenar as tarefas direito
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
        onPress: () => {return console.log('Cancel Pressed')},
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => database.collection(route.params.idUser).doc(id).delete().catch(error => {
        alert(error);
     }) },
    ]);

    //criando uma função para quando o item estiver marcado
    let checkToDoItem = (item, isChecked) => {
        //console.log("chegou aqui");
        //const toDoRef = doc(db, '');
        database.collection(route.params.idUser).doc(item.id).update({
            status: isChecked,
        })
    };

    return (
        //vamos ter um estilo nessa view para podermos alinhar nosso ícone e nossa descrição
        <View style={styles.container}>
            <FlatList
                //isso é pra n mostrar o scroll e n atrapalhar nosso estilo
                // style={{alignSelf: "stretch", backgroundColor: "green"}}
                showsVerticalScrollIndicator={true}
                data={task}
                renderItem={( { item } ) => {
                    return (
                    //essa view vai ajudar a estilizar e deixar o icone do lado de cada tarefa -> icone do lado esquerdo + descrição lado direito
                    <View style={styles.Tasks}>
                        {/* <BouncyCheckbox
                            size={25}
                            fillColor="red"
                            unfillColor="#FFFFFF"
                            text="Custom Checkbox"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isClicked: boolean) => {}}
                        /> */}
                    <View style={{flexDirection: "row", height: 40, width: "95%", }}>
                        <TouchableOpacity style={styles.deleteTasks} onPress={()=> { 
                            createTwoButtonAlert(item.id)
                            
                            }} >
                            <FontAwesome name="trash" size={26} color="#838383">
                            </FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteTasks} onPress={ () => {
                                //aqui ele vai navegar até details passando isso como parâmetro, e irei usar recuperar lá através do route, e dps fazer o route.params.id
                                navigation.navigate("Details", { //e aqui dentro oq devemos passar, la em details dps onde a gnt vai salvar , precisamos ainda recuperar do documento, então a gnt vai ver la tb, vamo testar aqui dnv
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
                                style={{}}
                                size={25}
                                fillColor="#0D9F6F"
                                unfillColor="#FFFFFF"
                                text={item.description}
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                //textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                onPress={(isChecked) => { checkToDoItem(item, isChecked) }}
                                />
                        </View>
                        {/* <View style={styles.descriptionTask}>
                            <Text >
                                {item.description}
                            </Text>
                        </View> */}
                    </View>
                    </View>
                    );
                }}
            keyExtractor={item => item.id} 
            ListHeaderComponent={() => {
                return ( 
                <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 5,}}>
                    
                    <TouchableOpacity style={styles.buttonNewTask} onPress={()=> navigation.navigate("New Task", { idUser: route.params.idUser })} >
                        {/* <Text style={styles.iconButton}>+</Text> */}
                        {/* <FontAwesome style={{textAlign: "center"}} name="plus" size={23} color="#FA5754"></FontAwesome> */}
                        <Entypo style={{textAlign: "center"}} name="add-to-list" size={23} color="#FA5754" />
                        {/*  https://icons.expo.fyi/        https://icons.expo.fyi/Entypo/add-to-list */}
                    </TouchableOpacity>
            
                <View style={{marginRight: "auto", marginLeft: "auto", marginTop: 0,}}>
                </View>
                    <TouchableOpacity style={styles.buttonLogout} onPress={() => logout() }>
                        {/* //quando clicar nesse botão ele vai chamar a função de logout, nos precisamos ter um ícone aqui. Pra isso, precisamos colocar ele dentro de um Text */}
                        <Text style={styles.iconButtonLogout}>
                            {/* <MaterialCommunityIcons></MaterialCommunityIcons>  <<< poderiamos chamar assim! mas vamos chamar da outra forma, junto com as propriedades que a gnt quer. name vamo chamar o location-exit q é um icone de sair mesmo */}
                            <MaterialCommunityIcons name="location-exit" size={32} color="#838383" />
                        </Text>
                    </TouchableOpacity>
                
                </View>

                );
            }}
        ListFooterComponent={() => {
            return <View style={{marginBottom: 25, marginRight: "auto", marginLeft: "auto", marginTop: 10}}>
                    <TouchableOpacity style={styles.buttonPomo} onPress={()=> navigation.navigate("PomoTimer", { idUser: route.params.idUser })} >
                        {/* <Text style={styles.iconButton}>T</Text> */}
                        {/* <Image source={PomoIcon} style={{width: 180, height: 180}} /> */}
                        <MaterialIcons name="timer" size={42} color="#FA5754" />
                        {/* <FontAwesome name="plus" size={23} color="#FA5754"></FontAwesome> */}
                    </TouchableOpacity>
                    </View>
        }}
            />
            {/* embaixo da minha lista a gnt vai querer ter um botão, dentro de Task, q é um +, então iremos clicar nele e ele vai redirecionar para a tela de novas tasks "New Task" */}
            {/* com o navigation adicionado lá em cima, pois eu quero ser redirecionado para a pagina de criar uma nova tarefa ao clicar no + */}
            {/* erro em 1h 43:22 */}
            {/* <TouchableOpacity style={styles.buttonNewTask} onPress={()=> navigation.navigate("New Task", { idUser: route.params.idUser })} >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity> */}
            
            
            {/* <TouchableOpacity style={styles.buttonPomodoro} onPress={() => navigation.navigate("PomoTimer")} >
                <FontAwesome name="hourglass-end" size={63} color="#FA5754"></FontAwesome>           
            </TouchableOpacity> */}
        </View>
    )
}