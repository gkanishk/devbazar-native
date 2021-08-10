import AsyncStorage from '@react-native-async-storage/async-storage';

async function setStorage(key:string, value:string) {
  await AsyncStorage.setItem(key, value);
}

async function getStorage(key:string) {
  let result = await AsyncStorage.getItem(key);
  return result??"";
}

async function deleteItemFromStorage(key:string) {
  await AsyncStorage.removeItem(key)
}

async function clearStorage() {
  await AsyncStorage.clear();
}

export const useSecureStorage ={
    setStorage,
    getStorage,
    deleteItemFromStorage,
    clearStorage
}