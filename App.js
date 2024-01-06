// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login/Login';
import NavigationStrings from './src/constants/NavigationStrings';
import Store from './src/screens/Store/Store';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationStrings.LOGIN}>
        <Stack.Screen name={NavigationStrings.LOGIN} component={Login} 
        options={{headerShown: false}}
        
        />
          <Stack.Screen name={NavigationStrings.STORE} component={Store} 
        options={{headerShown: false}}
        
        />
        {/* <Stack.Screen name="StoreList" component={StoreListScreen} /> */}
        {/* <Stack.Screen name="CaptureImage" component={CaptureImageScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
