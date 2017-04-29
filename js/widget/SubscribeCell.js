import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'
export default class SubscribeCell extends Component{
  constructor(props){
    super(props);
    this.state={
      isSubscribe:false,
      IconUri:require('./../../res/images/ic_Subscribe.png')
    }
  }
  setSubscribe(isSubscribe){
    this.setState({
      isSubscribe:isSubscribe,
      IconUri:isSubscribe?require('./../../res/images/ic_unSubscribe.png'):require('./../../res/images/ic_Subscribe.png')
    })
  }
  onPressSubscribe(){
    this.setSubscribe(!this.state.isSubscribe);
  }

  render(){
    // console.log(this.props);
    let SubscribeButton=<TouchableOpacity
      onPress={()=>{this.onPressSubscribe()}}
      >
      <Image

        style={{height:22,width:22}}
      source={this.state.IconUri}
      />

    </TouchableOpacity>

    return(
        <TouchableOpacity
          onPress={this.props.onSelect}
          style={styles.container}
          >

            {/* <TouchableOpacity  onPress={this.onPressRow.bind(this, this.props.data)}> */}
                <View style={styles.listitem}>
                    <Image source={{ uri: this.props.data.FrontCover }} style={styles.itemImage} >
                    {this.props.data.SerializedState==='已完结' ? <Image source={require('./../../res/images/ic_over.png')}
                        style={styles.hintImg} resizeMode={'stretch'} /> : <View />}
                         </Image>

                    <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column',marginRight:30}}>
                        <View style={{justifyContent: 'flex-end',flexDirection: 'row'}}>
                            <View style={styles.itemTitle} >
                                <Text style={{ fontSize: 18 ,color:'#3C3C3C',  fontWeight: '300',}}>{this.props.data.Title}</Text>
                                <Text style={{ marginTop: 5,marginBottom: 5,fontSize: 12,color:'#3C3C3C'}}>最新{this.props.data.LastChapter.ChapterNo}话：{this.props.data.LastChapter.Title} </Text>
                            </View>
                          {SubscribeButton}

                        </View>
                        <Text style={styles.desc} numberOfLines={1}>{this.props.data.Explain}</Text>
                    </View>
                </View>
            </TouchableOpacity>
          )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
    fonts: {
        fontSize: 18,

    },Icon:{
      flex:1,
      marginRight:30,
      marginTop:-3,
    },
     listitem: {
          flex:1,
          alignItems: "center",
          flexDirection: 'row',
          borderBottomColor: '#E6E6E6',
          borderBottomWidth: 0.5
      },

      itemImage: {
          margin: 10,
          width: 105,
          height: 70,
          borderRadius: 10
      },
      itemTitle: {
          flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column',
      },
      hintImg: {
          width: 50,
          height: 50,
          marginLeft:58,
          marginTop:-3,
      },
      desc: {
          fontSize: 12,
          color:'#3C3C3C'

      },
})
