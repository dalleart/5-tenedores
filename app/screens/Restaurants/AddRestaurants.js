import React, {useRef,useState} from "react";
import {View,Text} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddRestaurantsForm from "../../components/Restaurants/AddRestaurantsForm";


export default function AddRestaurants(props){
    const {navigation}=props;
    const toastRef=useRef();
    const [isLoading,setIsLoading]= useState(false);
    
    return (
        
        <View>
            <AddRestaurantsForm setIsLoading={setIsLoading} toastRef={toastRef} navigation={navigation}></AddRestaurantsForm>
            <Toast ref={toastRef} position="center" opacity={0.7}/>

            <Loading isVisible={isLoading} text="Creando Restaurante"/>
        </View>
        
    )
}