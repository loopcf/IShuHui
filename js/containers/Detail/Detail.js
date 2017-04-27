'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import NavigationBar from '../../widget/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'
const uri='http://www.ishuhui.net/ReadComicBooksToIso/';
export default class Detail extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
    this.url=uri+this.props.route.params.id ;
    let title=this.props.route.params.name;
    this.state = {
      url:this.url,
      canGoBack:false,
      title:title
    }
  }
  onBack(){
    if(this.state.canGoBack){
      this.webView.goBack();
    }else{
      this.props.navigator.pop();
    }
  }
  onNavigationStateChange(e){
    this.setState({
      canGoBack:e.canGoBack,
      url:e.url,
    });
  }
  
  render(){
    return(
      <View style={styles.container} >
        <NavigationBar
          title={this.state.title}
          leftButton={ViewUtils.getLeftButtion(()=>this.onBack())}
        />
        <WebView
          ref={webView=>this.webView=webView}
          onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
          source={{uri:this.state.url}}
          //source={{uri:'www.baidu.com'}}
          startInLoadingState={true}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})
