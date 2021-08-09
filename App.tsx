import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import {Navigator} from './components';
import { Provider } from 'react-redux'
import {store} from './app/store'
import useAxios from './hooks/useAxios';
import {setProducts} from "./features/Products/products.slice";


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("")
  const navigationRef = useNavigationContainerRef();
  const {response,isLoading} = useAxios("GET","/products");

  useEffect(() => {
    if(!isLoading)
    store.dispatch(setProducts(response?.data?.response || []));
  }, [response,isLoading])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer 
        ref={navigationRef}
        onReady={() => {
          setCurrentScreen(navigationRef?.getCurrentRoute()?.name ?? "");
        }}
        onStateChange={ () => {
          setCurrentScreen(navigationRef?.getCurrentRoute()?.name ?? "");
        }}
        >
        <Navigator screen={currentScreen} />
      </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
