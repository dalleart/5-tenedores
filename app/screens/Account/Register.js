import React,{useRef} from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterFormComponent from '../../components/Account/RegisterForm'
import Toast from 'react-native-easy-toast';

export default function Register(props){
    const toastRef=useRef();
    const {navigation}= props;

    return(
        <KeyboardAwareScrollView>
        
            <Image 
                source={require("../../../assets/img/Logo.png")}
                style={styles.logo}
                resizeMode="contain"/>

            <View style={styles.viewForm}>
                <RegisterFormComponent  navigation={navigation} toastRef={toastRef} ></RegisterFormComponent>
            </View>
           <Toast  ref ={toastRef} position="center" opacity={0.5}></Toast>
        </KeyboardAwareScrollView>
        
    )
}



const styles= StyleSheet.create({
    logo:{
        width:"100%",
        height:150,
        marginTop:20
    },
    viewForm:{
        marginLeft:40,
        marginRight:40
    }

})