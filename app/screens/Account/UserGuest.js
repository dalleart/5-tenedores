import * as React from 'react';
import {StyleSheet,View,ScrollView,Text,Image} from 'react-native';
import {Button} from 'react-native-elements';

export default function UserGuest ({navigation}) {
     return ( 
    
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image source={require ("../../../assets/img/original.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                    />

            
            <Text style={styles.title}>
                Consulta tu perfil de Tenedores
            </Text>

            <Text style={styles.description}>
                Como describirias tu mejor restaurant? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado mas
            </Text>
            <View style={styles.viewButton}>
                <Button buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                title= "Ver tu perfil"
                onPress={() => navigation.navigate("Login")}/>                
            </View>

        </ScrollView>



     );
     
}



const styles= StyleSheet.create(
    {
        viewBody: {
            marginTop:30,
            marginLeft:30,
            marginRight:30
        },
        image: {
            height:300,
            width: "100%",
            marginBottom: 40
        },
        title: {
       
            fontSize:19,
            marginBottom:10,
            textAlign:"center",
            fontWeight:"bold"
        },
        description:{
            textAlign: "center",
            marginBottom:20
        },
        viewButton:{
        
            flex:1,
            alignItems:"center"
        },
        buttonStyle:{
             backgroundColor:"#00a680",

        },
        buttonContainer:{
           width:"70%",

        }
       
    }
)
