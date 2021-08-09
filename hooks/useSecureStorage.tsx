import * as SecureStore from 'expo-secure-store';

async function setStorage(key:string, value:string) {
  await SecureStore.setItemAsync(key, value);
}

async function getStorage(key:string) {
  let result = await SecureStore.getItemAsync(key);
  return result??"";
}

export const useSecureStorage ={
    setStorage,
    getStorage
}