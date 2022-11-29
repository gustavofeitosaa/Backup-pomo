//configurações iniciais q precisamos fazer
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Task from "./src/pages/Task";
import NewTask from "./src/pages/NewTask";
import Details from "./src/pages/Details";
import Login from './src/pages/Login';
import NewUser from './src/pages/NewUser';
import PomoTimer from './src/pages/PomoTimer';

import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from "react";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages([
          require('./assets/background.png'),
          require('./assets/background_new_user.png'),
          require('./assets/background_add_edit.png'),
          require('./assets/background_pomodoro.png'),
        ]);


        await Promise.all([...imageAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

      loadResourcesAndDataAsync();
    }, []);

    if (!appIsReady) {
      return null;
    }



  return (
    //agr vamo criar todas a parte das paginas q vamos navegar, q é o que vai estar dentro de pages
    //primeiro a gnt tem q definir qual vai ser a página padrão, então, é uma página que carrega assim q carrega o nosso app
    //a gnt vai querer uma pagina que carregue todas as Tasks pra gente
    // Quando o App carregar, eu quero q minha primeira pagina a ser carregada no meu App seja a q estou passando para initialRouteName, ou seja, seja o Stack
    //Na verdade, o Stack.Screen, q é onde iremos passar as propriedades
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {/* em option eu posso botar headerTitleAlign: "left" nas 3 telas, para q o titulo fique a esquerda. */}
        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false,}}

        />
        <Stack.Screen
          name='NewUser'
          component={NewUser}
          options={{headerShown: false,}}

        />
        {/* ter uma seta para voltar para login n faz nenhum sentido, precisamos passar um parâmetro para dentro de option q vai permitir tirar aquela setinha, e ai gnt n tem mais essa informação ali, e fique anulada, essa seta perde a função! nome da propriedade-> HeaderLeft */}
        <Stack.Screen
          name='Tarefas'
          component={Task}
          options={{headerTintColor: "#FA5754", headerLeft: null }} //headerStyle: {backgroundColor : "papayawhip"}}}

        />
        <Stack.Screen
          name='Nova Tarefa'
          component={NewTask}
          options={{headerTintColor: "#FA5754"}}

        />
        <Stack.Screen
          name='Detalhes'
          component={Details}
          options={{headerTintColor: "#FA5754"}}

        />
        <Stack.Screen
          name='Pomodoro'
          component={PomoTimer}
          options={{headerTintColor: "#FA5754"}}
        />
        {/* <Stack.Screen
          name='PomoTimer'
          component={PomoTimer}
          options={{headerTintColor: "#FA5754"}}

        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//O Firebase é uma ferramenta do google, que fornece toda infraestrutura para o seu App, tudo q vc precisa fora do React Native para te ajudar a armazenar informações!!!
//Então, ele tem um banco NoSQL, já pré-configurado pra vc, e todo Back-End pronto, basta vc conectar no seu app e ja conseguir usar e fazer todo CRUD e várias ferramentas muito bacana 

//Por isso é interessante usar o Firebase, as vezes vc tem uma MVP, quer construir um Aplicativo, ou n tem 100% da stack do desenvolvimento do inicio ao fim, ou então quer testar uma ideia. Firebase é mt bom pra isso, e vc consegue fazer desde fazer uma MVP até colocar em produção

//Então o Firebase é perfeito para automatizar toda configuração do banco em vez de vc ta fazendo isso na mão. 
//Lembrando tb q esse banco de dados utilizado pelo firebase é NoSQL, onde a gnt trabalha com coleções, é um pouco diferente, por padrão ele é um documento, um banco relacional, mas sem problema nenhum, bem tranquilo de traballhar






//agr estamos com Firebase instalado, com todas as partes do stack navigation tb instalado, e a gnt instalou tb oq o react native pede pra quando a gnt ta trabalhando com expo como gerenciador do nosso projeto.














//nessa aula nos aprendemos como conseguir conectar o RN com o Firebase, utilizando ele como Back-End da nossa aplicação
//construimos um App de Tasks, onde podemos fazer todo o CRUD, usando todo o back-end e o banco la NoSQL do firebase 
//aprendemos sobre rotas, como recuperar parâmetros dessas rotas, e criamos esse App, muito interessante
//O RN junto com o FireBase é uma ferramenta muito poderosa para a gente poder criar Apps, testar ideias, fazer MVP's e ter um App rapidamente em construção
//consguimos agr -> 
// Apagar as Tasks
// Adicionar uma nova Task
// Podemos Editar tb essa Task