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
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux';
import {API_SHUHUI_COMIC_LIST} from '../../common/api';
import {shuhuiComic} from '../../actions/shuhuiComicAction'
import LoadingMoreFooter from '../../widget/LoadingMoreFooter';
import Chapter from '../Chapter/Chapter';
import ComicCell from '../../widget/ComicCell'

let PageIndex = 0;
let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
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
  renderRow(rowData, sectionId) {
      return <ComicCell
                  onSelect={()=>this.onPressRow(rowData)}
                  key={sectionId}
                  data={rowData}/>
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

  onPressRow(rowData) {
    this.props.navigator.push({
      component:Chapter,
      params:{
        name:rowData.Title,
        id:rowData.Id,
        cover:rowData.FrontCover,
        src:rowData.Explain,
        Author:rowData.Author,
        //  标签sign:
        }
    })
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },


    listview: {
        height: Dimensions.get('window').height
    },

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
