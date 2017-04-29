import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    } from 'react-native';
import { Icon } from 'react-native-elements'

export default class SearchHeader extends React.Component {
    render() {
        return (


            <View style={styles.searchContainer} >
                <TouchableOpacity
                    style={styles.backIcon}
                    activeOpacity={0.75}
                    onPress={this.props.backAction}
                    onEndEditing={this.props._onPressSearch}
                    >
                    <Image
                        style={{ height: 15, width: 15,marginLeft:10}}
                        source={{uri:'back'}}
                        />
                </TouchableOpacity>
                <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0,borderRadius:5,height:30,marginRight:20,alignItems:'center',backgroundColor:'#fff',flex:1,flexDirection:'row'}}>

                  <Icon color={'#3C3C3C'} name='search' size={24}
                        style={styles.searchIcon}
                        />

                    <TextInput style={styles.textInput}
                               underlineColorAndroid='transparent'
                               keyboardType={'web-search'}
                               placeholder='输入查找关键词'
                               ref={component => this._textInput = component}
                               clearButtonMode={'never'}
                               returnKeyType='search'
                        {...this.props}
                        />

                </View>
            </View>





        )
    }

}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 64 : 44,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: '#FAFDFF',
        elevation:2,

    },
    inputText: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: Platform.OS === 'ios' ? 15 : 11,
        marginTop: Platform.OS === 'ios' ? 0 : 10,
        height: Platform.OS === 'ios' ? 28 : 28,    //通过大于TextInput的高度来弥补上面的问题
        justifyContent: 'flex-end'  //放置到底部
    },
    textInput: {
        flex:1,
        textAlignVertical:'center',
        marginLeft:10,
        padding:Platform.OS === 'ios' ? 0 : 0,

        fontSize: 15,

    },

    searchIcon: {
       marginLeft:10,
        width:15,
        height:15
    },
    backIcon: {
        marginTop:Platform.OS === 'ios' ? 20 : 0,
        width:35,
        height:44,
        justifyContent:'center'
    },
})
module.exports = SearchHeader;
