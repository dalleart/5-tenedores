import  * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

//Stack my account
import MyAccountScreen from '../screens/Account/MyAccount';
import LoginScreen from '../screens/Account/Login';
import UserGuest from '../screens/Account/UserGuest';
import RegisterScreen from '../screens/Account/Register';

//Stack restaurants
import RestaurantScreen from '../screens/Restaurants/Restaurants';
import AddRestaurantScreen from  "../screens/Restaurants/AddRestaurants"
//
import SearchScreen from '../screens/Search';
import TopRestaurantScreen from '../screens/TopRestaurants';


const StackRestaurants= createStackNavigator();
function RestaurantsStack(){
    return(
        <StackRestaurants.Navigator>
            <StackRestaurants.Screen name = "Restaurants" component={RestaurantScreen}/>       
            <StackRestaurants.Screen name = "AddRestaurants" component={AddRestaurantScreen}/>
        </StackRestaurants.Navigator>
    )
};
const StackRanking= createStackNavigator();
function TopRestaurantsStack(){
    return(
        <StackRanking.Navigator>
            <StackRanking.Screen name = "TopRestaurants" component={TopRestaurantScreen}/>        
        </StackRanking.Navigator>
    )
};

const StackSearch= createStackNavigator();
function SearchStack(){
    return(
        <StackSearch.Navigator>
            <StackSearch.Screen name = "Search" component={SearchScreen}/>        
        </StackSearch.Navigator>
    )
};

const StackAccount= createStackNavigator();
function AccountStack(){
    return(
        <StackAccount.Navigator>
            <StackAccount.Screen name = "MyAccount" component={MyAccountScreen}/>   
            <StackAccount.Screen name = "UserGuest" component={UserGuest}/>
            <StackAccount.Screen name = "Login" component={LoginScreen}/>
            <StackAccount.Screen name = "Register" component={RegisterScreen}/>             
        </StackAccount.Navigator>
    )
};

const Tab=createBottomTabNavigator();
export default function Navigation()
{   
    return (
        <NavigationContainer>       
            <Tab.Navigator initialRouteName="Restaurants" tabBarOptions={{ activeTintColor: '#000'} }>
            <Tab.Screen name="Restaurants" component={RestaurantsStack}
                        options={{
                            tabBarIcon:({color,size}) =>(
                                <MaterialCommunityIcons
                                    name="food"
                                    color={"#00a680"}
                                    size={size}/>
                            )
                        }} />
            <Tab.Screen name="Ranking" component={TopRestaurantsStack}
                        options={{
                            tabBarIcon:({color,size}) =>(
                                <MaterialCommunityIcons
                                    name="account-star"
                                    color={"#00a680"}
                                    size={size}/>
                            )
                        }} />
            <Tab.Screen name="Search" component={SearchStack}
                        options={{
                            tabBarIcon:({color,size}) =>(
                                <MaterialCommunityIcons
                                    name="cloud-search"
                                    color={"#00a680"}
                                    size={size}/>
                            )
                        }} />
            <Tab.Screen name="Account" component={AccountStack}
                        options={{
                            tabBarIcon:({color,size}) =>(
                                <MaterialCommunityIcons
                                    name="account"
                                    color={"#00a680"}
                                    size={size}/>
                            )
                        }} />
            </Tab.Navigator>
           
        </NavigationContainer>

    )
}
