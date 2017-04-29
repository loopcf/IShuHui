import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  navigator,
  ListView,
  RefreshControl,
  Dimensions,
  InteractionManager,
  DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../widget/NavigationBar'
import Login from './Login';
import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from '../actions/loginAction';//导入需要绑定的actions
import Chapter from './Chapter/Chapter';
import SubscribeCell from '../widget/SubscribeCell';
import LoadingMoreFooter from '../widget/LoadingMoreFooter';
import {subscribeComic} from '../actions/subscribeAction';

let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
let isFirstLoad = true;

class Subscribe extends Component {
  constructor(props) {
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2
            })
          }
            DeviceEventEmitter.emit('Function',null);
        }
  renderRow(rowData, sectionId) {
      return <SubscribeCell
                  onSelect={()=>this.onPressRow(rowData)}
                  key={sectionId}
                  data={rowData}
                  onPressImage={()=>this.onPressSubscribe()}
                />
  }
onPressSubscribe(){
  Alert.alert('onPressSubscribe');
}
  onRefresh() {
      isRefresh = true;
      isLoading = false;
      isLoadMore = false;
      this.props.subscribeComic(isLoading, isLoadMore, isRefresh);
  }

  onEndReach() {

      if (!isFirstLoad) {
          isLoadMore = true;
          isRefresh = false;
          isLoading = false;
        this.props.subscribeComic( isLoading, isLoadMore, isRefresh);
      }
  }

  renderFooter() {

      if (this.props.isLoadMore && this.props.SubscribeList.length > 0) {
          return
              <LoadingMoreFooter />
      }
  }

  onPressRow(rowData) {
    this.props.navigator.push({
      component:Chapter,
      params:{
        name:rowData.Title,
        id:rowData.Id,
        cover:rowData.FrontCover,
        src:rowData.Explain,
        Author:rowData.Author,
        }
    })
  }
  toLogin(){
    this.props.navigator.push({
      component:Login,
      name:Login,
    })
  }

  render() {


        let content = this.props.isLoggedIn?
              <View style={styles.container}>
             <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.SubscribeList)}
                  style={styles.listview}
                  onEndReachedThreshold={10}
                  enableEmptySections={true}
                  showsVerticalScrollIndicator={false}
                  renderRow={this.renderRow.bind(this)}
                  onEndReached={this.onEndReach.bind(this)}
                  renderFooter={this.renderFooter.bind(this)}
                  refreshControl={
                      <RefreshControl
                          refreshing={false}
                          onRefresh={this.onRefresh.bind(this)}
                          colors={["#F70938"]}/>}
                 />
          </View> :  <View sytle={styles.item}>
           <TouchableHighlight style={styles.button}
           underlayColor='#000000' onPress={this.toLogin.bind(this)}>
          <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
          </TouchableHighlight>
          </View>
    return (

      <View style={styles.container}>
        <NavigationBar
          title={'Subscribe'}

        />
        {content}
      </View>

    );
  }
}
const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F3',

    },
    button:{
      backgroundColor:'#1a191f',
      height:50,
      width:80,
      marginTop:200,
      marginLeft:150,
      justifyContent:'center',
      alignItems:'center'
    },
    listview: {
        height: Dimensions.get('window').height
    },

});

function mapStateToProps(state){
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    status: state.authReducer.status,
    SubscribeList:state.subscribeReducer.SubscribeList,
    isLoading:state.subscribeReducer.isLoading,
    isLoadMore:state.subscribeReducer.isLoadMore,
    isRefresh:state.subscribeReducer.isRefresh,
   };
}
// function mapDispatchToProps(dispatch){
//   return {
//       // actions: bindActionCreators(actionCreators, dispatch)
//       //some action
//   };
// }
export default connect(mapStateToProps,{subscribeComic})(Subscribe);
