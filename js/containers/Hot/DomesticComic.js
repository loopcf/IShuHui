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


import { connect } from 'react-redux';
import {domesticComic} from '../../actions/domesticComicAction'
import LoadingMoreFooter from '../../widget/LoadingMoreFooter';
import Chapter from '../Chapter/Chapter';
import ComicCell from '../../widget/ComicCell'

let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
let PageIndex = 0;
let isFirstLoad = true;


class DomesticComic extends Component {

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
            this.props.domesticComic(PageIndex, isLoading, isLoadMore, isRefresh);
        });
  }

  render() {
      if (this.props.DomesticList) {
          isFirstLoad = false;
      }
      return (
          <View style={styles.container}>
             <ListView
                  dataSource={this.state.dataSource.cloneWithRows(this.props.DomesticList)}
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
      const {domesticComic} = this.props;
      PageIndex = 0;
      domesticComic(PageIndex, isLoading, isLoadMore, isRefresh);
  }

  onEndReach() {

      if (!isFirstLoad) {
          isLoadMore = true;
          isRefresh = false;
          isLoading = false;
          const {domesticComic} = this.props;
          PageIndex = +PageIndex + 1;
          domesticComic(PageIndex, isLoading, isLoadMore, isRefresh);
      }
  }

  renderFooter() {

      if (this.props.isLoadMore && this.props.DomesticList.length > 0) {
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
    },
    desc: {
        fontSize: 12,
        color:'#3C3C3C'

    }

});


export default DomesticComic = connect(
    (state) => {
      const { DomesticList,isLoading,isLoadMore,isRefresh } = state.domesticComicReducer;
        return {
          DomesticList,
          isLoading,
          isLoadMore,
          isRefresh
        }
      },{domesticComic})(DomesticComic);
