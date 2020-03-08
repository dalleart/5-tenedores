import firebase from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyDdmCwTC522OZIaU_O9yI-2-CJzROVFC0o",
  authDomain: "tenedores-7e609.firebaseapp.com",
  databaseURL: "https://tenedores-7e609.firebaseio.com",
  projectId: "tenedores-7e609",
  storageBucket: "tenedores-7e609.appspot.com",
  messagingSenderId: "1082943382899",
  appId: "1:1082943382899:web:e5f20fd4d4a091b232d106"
};

  export const firebaseApp = firebase.initializeApp(firebaseConfig);