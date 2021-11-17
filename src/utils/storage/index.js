import AsyncStorage from '@react-native-community/async-storage';

const Set = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const Get = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
    return false;
  } catch (error) {
    return false;
  }
};

const ClearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
};

const Clear = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const GetAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    return false;
  }
};

const GetMultiple = async p => {
  // p should be [first,second]
  try {
    const values = await AsyncStorage.multiGet(p);
    return values;
  } catch (e) {
    return false;
  }
};

const SetMultiple = async p => {
  // p should be [first,second]
  try {
    await AsyncStorage.multiSet(p);
    return true;
  } catch (e) {
    return false;
  }
};

const ClearMultiple = async p => {
  // p should be [first,second]
  try {
    await AsyncStorage.multiRemove(p);
    return true;
  } catch (e) {
    return false;
  }
};

const LocalStorage = {
  Set,
  Get,
  Clear,
  ClearAll,
  GetAllKeys,
  GetMultiple,
  SetMultiple,
  ClearMultiple
};

export default LocalStorage;
