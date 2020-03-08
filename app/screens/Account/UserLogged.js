import React, {useEffect,useState,useRef} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from "../../components/Account/AccountOptions"
import Toast from 'react-native-easy-toast';

export default function UserLogged()
{
    const toastRef=useRef();
    const [userInfo, setUserInfo]= useState({});

    const [reloadedData,setReloadData]=useState(false);
    
    //recordatorio: useEffect se lanza despues de crearlo o cuando se
    //actualiza uno de los componentes dentro del array []
    useEffect (()=>{
        (async ()=> {
            const user =await firebase.auth().currentUser.providerData[0];
            setUserInfo(user);
            
        })();
        setReloadData(false);

    },[reloadedData]);
    
    return(
    <View style={styles.viewUserInfo}>
        <InfoUser setReloadData={setReloadData} userInfo={userInfo}></InfoUser>
         <AccountOptions userInfo={userInfo}
                        setReloadData={setReloadData}
                        toastRef={toastRef}></AccountOptions>
         
         <Button 
            title="Cerrar sesion"
            onPress={()=> firebase.auth().signOut()}
            buttonStyle={styles.buttonCloseSession}
            titleStyle={styles.buttonCloseSessionsTitle}
            ></Button>  
        <Toast  ref ={toastRef} position="top" opacity={0.7}></Toast>
    </View>)
}

const styles=StyleSheet.create({
    viewUserInfo:{
        minHeight:"100%",
        backgroundColor:"#f9f9f9"
    },
    buttonCloseSession:{
        marginTop:30,
        borderRadius:0,
        backgroundColor:"#eeeeee",
        borderTopWidth:1,
        borderTopColor:"#a3a3a3",
        borderBottomWidth:1,
        borderBottomColor:"#a3a3a3",
        paddingTop:10,
        paddingBottom:10
        
           
    },
    buttonCloseSessionsTitle:{
        color:"#00a680"
    }

})


