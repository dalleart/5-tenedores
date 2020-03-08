import React,{useState,Alert} from 'react';
import {SocialIcon} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {facebookApi, FacebookApi} from '../../utils/Social';
import Loading from '../Loading';


export default function LoginFacebook(props)
{
    
    const [isLoading, setIsLoading]=useState(false);
    
    async function login()
    {
        setIsLoading(true);


        await Facebook.initializeAsync(FacebookApi.application_id);
        const {
        type,
        token,
        } = await Facebook.logInWithReadPermissionsAsync({
        permissions: FacebookApi.permissions
    });
    
    

    if (type=="success")
    {
        const  credentials= firebase.auth.FacebookAuthProvider.credential(token);
        await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(()=>{
            
            props.toastRef.current.show("Login correcto");
            props.navigation.navigate("MyAccount");
        })
        .catch(()=>{
            props.toastRef.current.show("Error accendiendo a facebook, intentelo mas tarde");
        })
    }
    else if (type=="cancel")
    {
        props.toastRef.current.show("Inicio de sesion cancelado");
    }
    else
    {
        props.toastRef.current.show("Error desconocido, intentelo mas tarde");
    }
    setIsLoading(false);
}
    return (
        <>
        <SocialIcon
        
            title='Iniciar sesion con Facebook'
            button
            type='facebook'
            onPress={login}
            />
        <Loading isVisible={isLoading} text={"Iniciando sesion"}/>
        </>
    )

}