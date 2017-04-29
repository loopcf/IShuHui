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
import {passionComic} from '../../actions/passionComicAction'
import LoadingMoreFooter from '../../widget/LoadingMoreFooter';
import Chapter from '../Chapter/Chapter';
import ComicCell from '../../widget/ComicCell'

let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
let PageIndex = 0;
let isFirstLoad = true;


class PassionComic extends Component {

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
            this.props.passionComic(PageIndex, isLoading, isLoadMore, isRefresh);
        });
  }

  render() {
      if (this.props.PassionList) {
          isFirstLoad = false;
      }
      return (
          <View style={styles.container}>
             <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.PassionList)}
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
      const {passionComic} = this.props;
      PageIndex = 0;
      passionComic(PageIndex, isLoading, isLoadMore, isRefresh);
  }

  onEndReach() {

      if (!isFirstLoad) {
          isLoadMore = true;
          isRefresh = false;
          isLoading = false;
          const {passionComic} = this.props;
          PageIndex = +PageIndex + 1;
          passionComic(PageIndex, isLoading, isLoadMore, isRefresh);
      }
  }

  renderFooter() {

      if (this.props.isLoadMore && this.props.PassionList.length > 0) {
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

export default PassionComic = connect(
    (state) => {
      const { PassionList,isLoading,isLoadMore,isRefresh } = state.passionComicReducer;
        return {
          PassionList,
          isLoading,
          isLoadMore,
          isRefresh
        }
      },{passionComic})(PassionComic);
