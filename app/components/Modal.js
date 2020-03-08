import React from "react";
import {StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';

export default function Modal(props){

    //CHILDREN es el componente recibido del padre
    const {isVisibleModal,setIsVisibleModal,children}=props;
    return (
        <Overlay 
            isVisible={isVisibleModal}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
            onBackdropPress={()=>{
                setIsVisibleModal(false);
            }}>
            {children}
        </Overlay>
    )
}


const styles =StyleSheet.create({
    overlay:{
        height:"auto",
        width:"90%",
        backgroundColor:"#fff"
    }

})