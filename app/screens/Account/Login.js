import React,{useRef} from 'react';
import {StyleSheet,Text, View,ScrollView,Image} from 'react-native';
import {Divider} from 'react-native-elements';
import LoginForm from '../../components/Account/LoginForm';
import Toast from 'react-native-easy-toast';
import LoginFacebook from '../../components/Account/LoginFacebook'
export default function Login({navigation}){
    const toastRef=useRef();

    return (
    <ScrollView>
        <Image source={require("../../../assets/img/Logo.png")}
                style={styles.logo}
                resizeMode="contain"/>
        <View style={styles.viewContainer}>
            <LoginForm navigation={navigation} toastRef={toastRef}></LoginForm>
            <CreateAccount navigation={navigation}
            texto={"Registrarse"}></CreateAccount>
            
        </View> 
        <Divider style={styles.Divider}></Divider>
        <View style={styles.viewContainer}>
            <LoginFacebook toastRef={toastRef} navigation={navigation}></LoginFacebook>
        </View>

        <Toast ref={toastRef} position="center" opacity={0.5}></Toast>

    </ScrollView>
    );

}
function CreateAccount(props){
    
    const {navigation,texto}= props;
    return (
        <Text style={styles.textRegister}>aun no tienes una cuenta?{""}
            <Text style={styles.btnRegister}
                    onPress={()=> navigation.navigate("Register")}>
                    {texto}
            </Text>
        </Text>
    )
}

const styles= StyleSheet.create({
    logo:{
        width:"100%",
        height:150,
        marginTop:20
    },
    viewContainer: {
        marginRight:40
    },
    textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10

    },
    btnRegister:{
        color:"#00a680",
        fontWeight:'bold',
    },
    Divider:{
        backgroundColor:"#00a680",
        marginBottom:40
    }

})