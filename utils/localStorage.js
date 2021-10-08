import  AsyncStorage from '@react-native-async-storage/async-storage';


export const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        JSON.stringify(key), JSON.stringify(value),
      );
    } catch (error) {
      console.log(error);
    }
  };

  export const _getStoreData = async (key) => {
      try {
        return await JSON.parse(await AsyncStorage.getItem(JSON.stringify(key)))
      } catch (error) {
      console.log(error);
      }
  }