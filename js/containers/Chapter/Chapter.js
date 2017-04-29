import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    navigator,
    BackAndroid,
    TouchableHighlight,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    InteractionManager,
      Dimensions,
} from 'react-native';
import NavigationBar from '../../widget/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import { connect } from 'react-redux';
import ParallaxView from 'react-native-parallax-view';
import { chapter } from './../../actions/chapterAction';
import { Tile } from 'react-native-elements';
import Detail from '../Detail/Detail';
import LoadingMoreFooter from '../../widget/LoadingMoreFooter';

let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
let PageIndex = 0;
let isFirstLoad = true;
class Chapter extends Component {

    constructor(props) {
        super(props);
        this.state = {
           time:true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
        console.log(this.props);
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {

        this.props.chapter(this.props.route.params.id ,PageIndex, isLoading, isLoadMore, isRefresh);
      });
      this.onRefresh();
    }

    render() {

        // _navigator = this.props.navigator;
        //
        // const {Chapter} = this.props;
        // let chapterList = Chapter.chapterList;
        // if (chapterList.length > 0) {
        //     isFirstLoad = false;
        // }

        if (this.props.ChapterList) {
            isFirstLoad = false;

                                    // <Tile
                                    //      imageSrc={{uri: }}
                                    //      title={this.props.route.params.src}
                                    //      featured
                                    //      caption={this.props.route.params.Author}
                                    //   />
        }

        return (
                <View style={styles.container}>
                    <NavigationBar
                      leftButton={ViewUtils.getLeftButtion(()=>this.onBack())}
                      title={this.props.route.params.name}
                    />


                        <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.props.ChapterList)}
                                style={styles.listview}
                                onEndReachedThreshold={10}
                                enableEmptySections={true}
                                showsVerticalScrollIndicator={false}
                                removeClippedSubviews={false}
                                renderHeader={this.renderHeader.bind(this)}
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
            // </ParallaxView>
        )
    }
    renderHeader() {
    return (
      <View style={styles.header}>
          <Image source={{ uri: this.props.route.params.cover }} style={styles.headerImg} />
          <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column',}}>
          <View style={{justifyContent: 'flex-end',flexDirection: 'row',}}>
                  <View style={styles.itemTitle} >
                  <Text style={{ fontSize: 18 ,color:'#3C3C3C',  fontWeight: '300',marginBottom:10}}>{ this.props.route.params.name}</Text>
                  <Text style={{ fontSize: 14 ,color:'#3C3C3C'}}>作者：{ this.props.route.params.Author}</Text>
                  <Text style={{ fontSize: 14 ,color:'#3C3C3C'}}>简介：{ this.props.route.params.src}</Text>
                  </View>
              </View>
          </View>
      </View>
        )
}

    onBack(){
      this.state.dataSource.cloneWithRows([]);
      this.props.navigator.pop();
    }
    renderRow(rowData, sectionId, rowId) {
      let Sort = rowData.ChapterType===0  ?
      <Text style={{ marginTop: 5,marginBottom: 5,fontSize: 12,color:'#3C3C3C'}}>{rowData.Sort}话：{rowData.Title} </Text> :
        <Text style={{ marginTop: 5,marginBottom: 5,fontSize: 12,color:'#3C3C3C'}}>{rowData.Sort}卷：{rowData.Title} </Text>
        return <TouchableOpacity  onPress={this.onPressRow.bind(this, rowData, rowId)}>
            <View style={styles.listitem}>
                <Image source={{ uri: rowData.FrontCover }} style={styles.itemImage} />
                <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column',}}>
                    <View style={{justifyContent: 'flex-end',flexDirection: 'row'}}>
                        <View style={styles.itemTitle} >
                            <Text style={{ fontSize: 18 ,color:'#3C3C3C',  fontWeight: '300',}}>{rowData.Title}</Text>
                            {Sort}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }

    onRefresh() {
        isRefresh = true;
        isLoading = false;
        isLoadMore = false;
        PageIndex = 0;
        this.props.chapter(this.props.route.params.id,PageIndex, isLoading, isLoadMore, isRefresh);
    }

    onEndReach() {

        if (!isFirstLoad) {
            isLoadMore = true;
            isRefresh = false;
            isLoading = false;
            PageIndex = +PageIndex + 1;
            this.props.chapter(this.props.route.params.id,PageIndex, isLoading, isLoadMore, isRefresh);
        }
    }

    renderFooter() {
    //
    //     if(this.props.isLoadMore
    //       && this.props.ChapterList.length>0
    //     ){
    //         return(
    //             <LoadingMoreFooter />
    //     )}
    }

    onPressRow(rowData, rowId) {
      this.props.navigator.push({
        component:Detail,
        params:{
          name:rowData.Title,
          id:rowData.Id
          }
      })
    }
    _back() {
        this.props.navigator.pop();
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
    headerImg:{
      margin: 10,
      width: 150,
      height: 100,
    },
    header:{
      alignItems: "center",
      flexDirection: 'row',
      borderBottomColor:'#CCCCCC',
      backgroundColor:'#FFFFFF',
      borderBottomWidth: 1,
      marginBottom:20,
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


export default Chapter = connect(
    (state) => {
      const { ChapterList,isLoading,isLoadMore,isRefresh } = state.chapterReducer;
        return {
          ChapterList,
          isLoading,
          isLoadMore,
          isRefresh
        }
   },{chapter})(Chapter);
