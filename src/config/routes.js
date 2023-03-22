import React, { useState, useEffect } from 'react';
import HomeScreen from '../screens/home';
import WishlistScreen from '../screens/wishlist';
import DetailScreen from "../screens/detail";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyCustomHeader from '../components/header';

const Stack = createStackNavigator();

const Routes = () => {
  const [searchQuery, setSearchQuery] = useState('');
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          header: () => (
            <MyCustomHeader
              navigation={navigation}
              route={route}
            />
          ),
        })}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={({ route }) => ({ route })}
          initialParams={{ searchQuery: searchQuery }}
        />
        <Stack.Screen
          name="wishlist"
          component={WishlistScreen}
        />
        <Stack.Screen 
          name="detail"
          component={DetailScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
