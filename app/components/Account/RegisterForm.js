import React,{useState} from 'react';
import {StyleSheet,View} from 'react-native';
import {Input,Icon,Button} from 'react-native-elements';
import {validateEmail} from '../../utils/Validation'
import * as firebase from 'firebase'
import Loading from '../Loading'
export default function RegisterForm(props){
  
  
    const {toastRef}= props;
    
    //intercambiar ojito cerrado/abierto
    const [hidePassword,setHidePassword]=useState(true);
    const [hideRepeatPassword,setRepeatHidePassword]=useState(true);
    //agarrar el evento y actualizar estados
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [repeatPassword,setRepeatPassword]=useState("");

    //estado de loading
    const [isVisibleLoading,setVisibleLoading]=useState(false);
    
    const register= async ()=> {
        
        setVisibleLoading(true);
        if (!email || !password || !repeatPassword)
        {           
            toastRef.current.show("Todos los campos son obligatorios!!")
        }
        else if (!validateEmail(email))
        {
            toastRef.current.show("Email no es correcto")
        }
        else if (password !=repeatPassword)
        {
            toastRef.current.show("Las contraseñas no coinciden")
        }
        else
        {
           await firebase
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then(()=> {
                props.navigation.navigate("MyAccount");
                toastRef.current.show("Usuario creado correctamente")
            })
            .catch(()=>{
                toastRef.current.show("Error al crear la cuenta, intentelo mas tarde")
            })
            
            
        }
        setVisibleLoading(false);
        
        
    }

    return(
        <View  style={styles.formContainer} >

            <Input 
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={e=> setEmail(e.nativeEvent.text)}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}/>

            }
            >

            </Input>
            <Input
                placeholder="Contraseña"
                password={"true"}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputForm}
                onChange={e=> setPassword(e.nativeEvent.text)}
                rightIcon={
                <Icon
                    type="material-community"
                    name={ hidePassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={()=> setHidePassword(!hidePassword)}
                    />

            }>
            </Input>
            <Input
                placeholder="Repetir Contraseña"
                password={"true"}
                secureTextEntry={hideRepeatPassword}
                containerStyle={styles.inputForm}
                onChange={e=> setRepeatPassword(e.nativeEvent.text)}
                rightIcon={
                <Icon
                    type="material-community"
                    name={ hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={()=> setRepeatHidePassword(!hideRepeatPassword)}
                    />
                    
            }>
            </Input>
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.buttonRegister}
                onPress={register}>

            </Button>
            <Loading  text={"Creando cuenta"} isVisible={isVisibleLoading}></Loading>
        </View>



    )



}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30
    },
    inputForm: {
        width: "100%",
        marginTop:20
    },
    iconRight:{
        color:"#c1c1c1"
    },
    btnContainerRegister:{
        marginTop:20,
        width:"95%",

    },
    buttonRegister:{
        backgroundColor:"#00a680"
    }


})