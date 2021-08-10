import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Navigator from './components/Navigator';
import { Provider } from 'react-redux';
import { store } from './app/store';
import useAxios, { getAxiosClient } from './hooks/useAxios';
import { setProducts } from "./features/Products/products.slice";
import { useSecureStorage } from './hooks/useSecureStorage';
import { resetUser, setCart, setLogin, setWishlist } from './features/User/user.slice';
import { ToastProvider } from 'react-native-styled-toast';
import { ThemeProvider } from 'styled-components';
import theme from './theme';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("")
  const navigationRef = useNavigationContainerRef();
  const { response, isLoading } = useAxios("GET", "/products");

  useEffect(() => {
    (async () => {
      const token = await useSecureStorage.getStorage("accessToken");
      const userDetails = await useSecureStorage.getStorage("userDetails");
      try {
        if (token) {
          store.dispatch(setLogin({ token, userDetails: JSON.parse(userDetails) }));
          const cartResponse = await getAxiosClient(token).get("/user/cart");
          const wishListResponse = await getAxiosClient(token).get("/user/wishList");
          store.dispatch(setCart(cartResponse.data?.response?.cart?.cartItems ?? []));
          store.dispatch(setWishlist(wishListResponse.data?.response?.wishList?.wishListems ?? []));
        }
      } catch (error) {
          store.dispatch(resetUser());
      }
    })()
  },[])

  useEffect(() => {
    if (!isLoading)
      store.dispatch(setProducts(response?.data?.response || []));
  }, [response, isLoading])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastProvider maxToasts={2} offset={16} position="BOTTOM">
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                setCurrentScreen(navigationRef?.getCurrentRoute()?.name ?? "");
              }}
              onStateChange={() => {
                setCurrentScreen(navigationRef?.getCurrentRoute()?.name ?? "");
              }}
            >
              <Navigator screen={currentScreen} />
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
