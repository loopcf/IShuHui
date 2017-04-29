import { AsyncStorage } from 'react-native';

let localStorage = {
    setObject: (key, value) => {
        const jsonValue = JSON.stringify(value);
        return AsyncStorage.setItem(key, jsonValue, (error) => {

        });
    },

    cachedObject: (key) => {
        return AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data) return JSON.parse(data);
                return null;
            })
    },

    clearCachedObject: (key) => {
        return AsyncStorage.removeItem(key);
    },
}

export default localStorage;
