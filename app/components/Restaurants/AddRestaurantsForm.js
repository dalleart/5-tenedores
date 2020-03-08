import React,{useState,useEffect} from "react";
import {StyleSheet,View,ScrollView,Alert,Dimensions} from "react-native";
import {Icon,Avatar,Image,Input,Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantsForm(props){
    

    const {toastRef,setIsLoading,navigation}=props;
    const [imageSelected,setImageSelected]=useState([]);
    
    

    return (
        <ScrollView>
            <UploadImage toastRef={toastRef} imageSelected={imageSelected} setImageSelected={setImageSelected}/>
        </ScrollView>
    )

    
}

function UploadImage(props){
    const{imageSelected,setImageSelected,toastRef}=props;
    

    const imageSelect=async()=>{
        
        const resultPermissions= await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissionsCamera= resultPermissions.permissions.cameraRoll.status;

        if (resultPermissionsCamera==="denied")
        {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria")
        }
        else{
            const result= await ImagePicker
                                .launchImageLibraryAsync({
                                    allowsEditing:true,
                                    aspect:[4,3]
                                })
            if (result.cancelled)
            {
                toastRef.current.show("Cerraste la galeria sin seleccionar ninguna imagen")
            }
            else{
                //Significa que añadira(...imageSelected) todo loq ue tenga image selected
                //y luego resultUri
                
                setImageSelected([...imageSelected,result.uri]);

                toastRef.current.show("Todo ok")
            }
            
            

        }
        
    };
    
    const removeImage=(image)=>{
    
    const arrayImages= imageSelected;
    Alert.alert
    ("Eliminar Imagen", 
    "Estas seguro que quieres eliminar la imagen?"
    ,
    [
        {
            text:"Cancel",
            style:"cancel"
        },
        {
            text:"Eliminar",
            onPress:()=>{setImageSelected(arrayImages.filter(imageUrl=>imageURL!==image))}
        },
        

    ], {cancelable:false})
    }

    return(
        <View style={styles.viewImage}> 
            
            {imageSelected.length<5 && <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
                />}
            
        {imageSelected.map((imageRestaurant) =>(
            
            <Avatar
            key={imageRestaurant}
            onPress={()=> removeImage(imageRestaurant)}
            style={styles.miniatureStyle}
            source={{uri : imageRestaurant}}
            />
        ))}
        

        
        </View>
    );}



const styles=StyleSheet.create({
    viewImage:{
        flexDirection:"row",
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },
    containerIcon:{
        alignContent:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle:{
        width:70,
        height:70,
        marginRight:10
    }

})