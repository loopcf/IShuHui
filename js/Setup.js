import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { AsyncStorage } from 'react-native';
import App from './containers/app';



export default class Setup extends React.Component {

    render() {

        return (
             <Provider store = {store} >
                <App />
             </Provider>
        )
    }
}
