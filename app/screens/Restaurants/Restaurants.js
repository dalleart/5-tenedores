import React,{useState,useEffect} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";

export default function Restaurants(props){
    
    const [user,setUser] = useState(null)

    useEffect(() => 
    {
        firebase.auth().onAuthStateChanged(userInfo =>{
            setUser(userInfo);
        })
    }, [])

    return(
        <View style={styles.viewBody}>
            <Text>Estamos en restaurantes</Text>
            {user && <AddRestaurantsButton navigation={props.navigation}/>}
            
        </View>
    );
}

function AddRestaurantsButton(props){
    

    return (
        <ActionButton
            buttonColor="#00a680"
            onPress ={()=> props.navigation.navigate("AddRestaurants")}>

        </ActionButton>
        
    );
}

const styles= StyleSheet.create({
    viewBody:{
        flex:1

    }

})