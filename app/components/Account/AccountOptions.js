import React,{useState} from "react";
import {StyleSheet,View,Text} from "react-native";
import {ListItem} from 'react-native-elements';
import Modal from "../Modal";
import ChangeDisplayName from './ChangeDisplayNameForm';
import ChangeEmail from "./ChangeEmailForm";
import ChangePassword from "./ChangePasswordForm"

export default function AccountOptions(props)
{
    const {userInfo,setReloadData,toastRef}=props;
    const [isVisibleModal,setIsVisibleModal]=useState(false);

    const [renderComponent,setRenderComponent]=useState(null);

    const menuOptions= [
        {
            title:"Cambiar Nombre y apellido",
            iconType: "material-community",
            iconNameLeft:"account-circle",
            iconColorLeft:"#999999",
            iconNameRight: "chevron-right",
            iconColorRight:"#999999",
            
            onPress:()=>{
                
                selectedComponent("displayName")
            }

        },
        {
            title:"Cambiar Email",
            iconType: "material-community",
            iconNameLeft:"at",
            iconColorLeft:"#999999",
            iconNameRight: "chevron-right",
            iconColorRight:"#999999",
            
            onPress:()=>{
                
                selectedComponent("email")
            }

        },
        {
            title:"Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft:"#999999",
            iconNameRight: "chevron-right",
            iconColorRight:"#999999",
            
            onPress:()=>{
                
                selectedComponent("password")
            }

        }
    ];
    const selectedComponent= (key)=>
    {
        switch (key){
            case "displayName":{
                setRenderComponent(<ChangeDisplayName 
                displayName={userInfo.displayName} 
                setIsVisibleModal={setIsVisibleModal}
                setReloadData={setReloadData}   
                toastRef={toastRef} 
                />);
                setIsVisibleModal(true);
                break;
                
            }
            
            case "email":
                {
                     setRenderComponent(<ChangeEmail
                         email={userInfo.email} 
                        setIsVisibleModal={setIsVisibleModal}
                        setReloadData={setReloadData}   
                        toastRef={toastRef} 
                     />);
                     setIsVisibleModal(true);
                    break;
            }
           
            case "password":{
                setRenderComponent(<ChangePassword
                    setIsVisibleModal={setIsVisibleModal}
                    toastRef={toastRef}  
                />);
                setIsVisibleModal(true);
                break;
            }
            default: break;
        }
    }
    
    return (
        <View style={styles.ViewContainer}>
            {menuOptions.map((menu,index)=>(
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type:menu.iconType,
                        name: menu.iconNameLeft,
                        color:menu.iconColorLeft,

                    }}
                    rightIcon={{
                        type:menu.iconType,
                        name: menu.iconNameRight,
                        color:menu.iconColorRight,
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItem}    
                    />
                    ))}
            {renderComponent && (
                <Modal
                isVisibleModal={isVisibleModal}
             
                setIsVisibleModal={setIsVisibleModal}>
                {renderComponent}    
                
             </Modal> 
            )}
             
                   
        </View>
    )

    

}

const styles=StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#f9f9f9"
        
    },
    
})