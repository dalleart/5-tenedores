import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as firebase from 'firebase';
import * as permissions from 'expo-permissions';
import * as imagePicker from 'expo-image-picker';
import { YellowBox } from "react-native";
console.disableYellowBox=true;
export default function InfoUser(props)
{   
    
    const {
        userInfo : {uid, displayName, email, photoURL},
         setReloadData} = props;
    
    

    
    const changeAvatar= async () =>{
        const resultPermissions=await permissions.askAsync(permissions.CAMERA_ROLL);
        const resultPermissionsCamera=resultPermissions.permissions.cameraRoll.status;
        
        if (resultPermissionsCamera=="denied")
        {   console.log("Es necesario los permisos")}
        else{
            const result= await imagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect : [4,3]
            });
        
            if (result.canceled)
            {
                console.log("Has cerrado la galeria de imagenes");
            }
            else{
                
                uploadImage(result.uri,uid)
                updatePhotoUrl(uid);
            }
        }
    }
    const uploadImage= async (uri,uid)=>{
        
        const uidText="avatar/"+uid;
        
        const response= await fetch(uri);
        const blob = await response.blob();
        
        const ref = firebase.storage()
        .ref()
        .child(uidText);
        
        return ref.put(blob);
    }

    const updatePhotoUrl= (uid)=> 
    {
       console.log("avatar/"+uid)
        firebase
        .storage()
        .ref("avatar/"+uid)
        .getDownloadURL()
        .then(async result => {
            const update= {
                photoURL:result
            }
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
            
        })
        .catch( ()=>{

            setReloadData(true);
            console.log("mande reloaded")
        })

    }


    
    
    
    
    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{
                    uri: photoURL? photoURL: "https://api.adorable.io/avatars/285/abott@adorable.png"
                }}
                />
        <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : "Anonimo" }                 
                </Text>
                <Text>
                    {email ? email : "Logueado con facebook"}
                </Text>
        </View>
        
        </View>
    )


}


const styles = StyleSheet.create({

    viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    },
    userInfoAvatar:{
        marginRight:20,
    },
    displayName:{
        fontWeight:"bold",

    }

})