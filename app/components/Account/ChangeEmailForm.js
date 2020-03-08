import React, {useState} from "react";
import {View,Text,StyleSheet} from 'react-native';
import {Input,Button} from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/api"

export default function ChangeEmailForm(props){

    const {email,setIsVisibleModal,setReloadData,toastRef}=props;
    
    const [newEmail,setNewEmail]=useState(null);
    const [password,setPassword]=useState("");

    const [errorEmail,setEmailError]=useState(null);
    const [errorPassword,setPasswordError]=useState(null);

    const [isLoading,setIsLoading]=useState(false);
    const [hidePassword,setHidePassword]=useState(true);

    return (
        <View style={styles.view}>
            <Input
                placeholder="Email"
                containerStyle={styles.input}
                defaultValue= {email && email}
                onChange={e => setNewEmail(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                errorMessage={errorEmail}

            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hidePassword}
                onChange={e=>{
                    setPassword(e.nativeEvent.text);
                }}
                rightIcon={{
                    type:"material-community",
                    name:hidePassword ? "eye-outline" :"eye-off-outline",
                    color:"#c2c2c2",
                    onPress: ()=> setHidePassword(!hidePassword)
                }}
                errorMessage={errorPassword}
                
            />
            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={()=>{

                    setEmailError(null);
                    if (!newEmail || email===newEmail)
                    {
                        setEmailError("El Email no ha cambiado o esta vacio" )
                    }
                    else{
                        
                        setIsLoading(true);

                        reauthenticate(password).then(()=>{
                            firebase.auth()
                            .currentUser.updateEmail(newEmail).then(()=>{
                                setIsLoading(false);
                                setReloadData(true);
                                setIsVisibleModal(false);
                                toastRef.current.show("Email actualizado correctamente");
                            }).catch(()=>{
                                setIsLoading(false);
                                setEmailError("Error al actualizar email")
                            })

                            
                        })
                        .catch(()=>{
                            setPasswordError("La contraseña no es correcta");
                            setIsLoading(false)
                        })
                        
                    }
                    
                }}
                loading={isLoading}
                />
        </View>
    )
}

const styles= StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10,
        marginTop:10
    },
    btnContainer:{
        marginTop:20,
        width:"90%"
    },
    btn:{
        backgroundColor:"#00a680"
    }

})