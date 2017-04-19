/**
 * Created by ljunb on 16/5/26.
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ListView,
    Navigator,
    RefreshControl,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    InteractionManager,
    navigator
} from 'react-native';
// Tile
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux';
import {API_SHUHUI_COMIC_LIST} from '../../common/api';
import {shuhuiComic} from '../../actions/shuhuiComicAction'

// import StaticContainer from 'react-static-container';
import LoadingMoreFooter from '../../widget/LoadingMoreFooter';
import Chapter from '../Chapter/Chapter';


let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
let PageIndex = 0;
let isFirstLoad = true;


class ShuHuiComic extends Component {

   constructor(props) {
       super(props);
       this.state = {
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
             })
           }
         }

  componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.shuhuiComic(PageIndex, isLoading, isLoadMore, isRefresh);
        });
  }

  render() {
      // console.log(this.props.ShuhuiList);
      if (this.props.ShuhuiList) {
          isFirstLoad = false;
      }
      return (
          <View style={styles.container}>
             <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.ShuhuiList)}
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
          </View>
      )
  }
  renderRow(rowData, sectionId, rowId) {
      return <TouchableOpacity  onPress={this.onPressRow.bind(this, rowData, rowId)}>
          <View style={styles.listitem}>
              <Image source={{ uri: rowData.FrontCover }} style={styles.itemImage} />
              <View style={styles.item}>
                  <View style={styles.itemContent}>
                      <View style={styles.itemTitle} >
                          <Text style={{ fontSize: 16 }}>{rowData.Title}</Text>
                          <Text style={styles.time}>最新{rowData.LastChapter.Sort}话：{rowData.LastChapter.Title} </Text>
                      </View>
                      {rowData.SerializedState==='已完结' ? <Image source={require('./../../../res/images/ic_over.png')}
                          style={styles.hintImg} resizeMode={'stretch'} /> : <View />}
                  </View>
                  <Text style={styles.desc} numberOfLines={1}>{rowData.Explain}</Text>
              </View>
          </View>
      </TouchableOpacity>
  }

  onRefresh() {
      isRefresh = true;
      isLoading = false;
      isLoadMore = false;
      const {shuhuiComic} = this.props;
      PageIndex = 0;
      shuhuiComic(PageIndex, isLoading, isLoadMore, isRefresh);
  }

  onEndReach() {

      if (!isFirstLoad) {
          isLoadMore = true;
          isRefresh = false;
          isLoading = false;
          const {shuhuiComic} = this.props;
          PageIndex = +PageIndex + 1;
          shuhuiComic(PageIndex, isLoading, isLoadMore, isRefresh);
      }
  }

  renderFooter() {

      if (this.props.isLoadMore && this.props.ShuhuiList.length > 0) {
          return
              <LoadingMoreFooter />
      }
  }

  onPressRow(rowData, rowId) {
      this.props.navigator.push({
          name: 'chapter',
          component: Chapter,
          sceneConfig: Navigator.SceneConfigs.PushFromRight,
          params: {
              name: rowData.name
          }
      })
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    contentContainer: {
        flex: 1
    },

    listview: {
        height: Dimensions.get('window').height
    },

    listitem: {
        alignItems: "center",
        flexDirection: 'row',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 0.5
    },

    itemImage: {
        margin: 10,
        width: 105,
        height: 70,
        borderRadius: 5
    },

    item: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',

    },

    itemContent: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

    itemTitle: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },

    time: {
        marginTop: 7,
        marginBottom: 7,
        fontSize: 12
    },

    hintImg: {
        width: 50,
        height: 50,
    },
    desc: {
        fontSize: 12
    }

});

export default ShuHuiComic = connect(
    (state) => {
      const { ShuhuiList,isLoading,isLoadMore,isRefresh } = state.shuhuiComicReducer;
        return {
          ShuhuiList,
          isLoading,
          isLoadMore,
          isRefresh
        }
      },{shuhuiComic})(ShuHuiComic);
