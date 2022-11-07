import firebase from "firebase";
import "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5cgeUQW7gv02LeyMbTaKKcUDq2D6heIU",
  authDomain: "todo-ec673.firebaseapp.com",
  projectId: "todo-ec673",
  storageBucket: "todo-ec673.appspot.com",
  messagingSenderId: "56966256619",
  appId: "1:56966256619:web:fc97a563512eb56af02bae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//como estavamos fazendo um Crud (aula 1), a gnt ia usar o firebase.firestore(), e fizemos o export default dentro de database, pq a gnt basicamente ia conectar no nosso banco e fazer o nosso Crud
//para q possamos deixar isso em aberto, e possamos usar de formas diferentes, a gnt vai importar direto, fazer o export default do firebase.
//Assim, quando a gnt quiser usar o firestore,onde for usar, iremos definir(aplicar) isso -> const database = firebase.firestore(); la dentrod de cada lugar onde ele vai 
//const database = firebase.firestore(); vamos fazer isso somente nos arquivos em q o database ta sendo utilizado!
//dps desse arquivo ja configurado podemos ir para o nosso projeto sem medo
export default firebase;