import React,{useState,useRef} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Icon,Button,Input} from 'react-native-elements';
import {validateEmail} from '../../utils/Validation';
import Loading from '../Loading';
import * as firebase from 'firebase';

export default function loginForm(props)
{
    const {toastRef}=props;

    //ojito abierto cerrado
    const [hidePassword,setHidePassword]=useState(true);

    //estados email password
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    //estado loading
    const [isVisibleLoading,setVisibleLoading]=useState(false);

    async function LoguearUsuario() 
    {   
        setVisibleLoading(true);
        if (!email || !password )
        {           
            toastRef.current.show("Todos los campos son obligatorios!!")
        }
        else if (!validateEmail(email))
        {
            toastRef.current.show("Email no es correcto")
        }
        else 
        {   
            await firebase 
                .auth()
                .signInWithEmailAndPassword(email,password)
                .then(()=> {
                    props.navigation.navigate("MyAccount")
                    toastRef.current.show("Bienvenido")
                })
                .catch(()=>{
                    console.log("Email o contraseña incorrecta")
                })
                

            
        }
        setVisibleLoading(false);
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electornico"
                containerStyle={styles.inputForm}
                onChange={e=> setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                        ></Icon>
                }>

            </Input>
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={"true"}
                secureTextEntry={hidePassword}
                onChange={e=> setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="eye-outline"
                        iconStyle={styles.iconRight}
                        onPress={()=> setHidePassword(!hidePassword)}
                        ></Icon>
                }>


            </Input>
            <Button title="Iniciar sesion"
                    containerStyle={styles.btnContainerLogin}
                    buttonStyle={styles.btnLogin}
                    onPress={()=> LoguearUsuario()}></Button>
             <Loading isVisible={isVisibleLoading} text={"Iniciando sesion"}></Loading>       
                    
        </View>
    )

}

const styles =StyleSheet.create({

    formContainer: {
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        marginTop:30
    },
    inputForm:{
        width:"100%",
        marginTop:20
    },
    iconRight:{
        color:"#c1c1c1",
    },
    btnContainerLogin:{
        marginTop:20,
        width:"95%"
    },
    btnLogin:{
        backgroundColor:"#00a680"
    }
    

})