/**
 * Created by Jonson on 16/6/5.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    ListView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {
    fetchRecommendedList,
    resetState,
    setupSearchText,
} from '../actions/searchAction';
import { connect } from 'react-redux';
import SearchHeader from '../widget/SearchHeader';//头文件
import Chapter from './Chapter/Chapter';
var height = 40;
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.renderResultRow = this.renderResultRow.bind(this);
        console.log(this.props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
      this.props.resetState()
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor:  '#EEF0F3', }}>
              <SearchHeader

                  value={this.props.searchText}
                  onChangeText={(text) => {

                      this.props.setupSearchText(text)
                      this.props.fetchRecommendedList(text)

                  } }
                  onEndEditing={this.pushToResultPage.bind(this, this.props.searchText)}
                  />

                    <View style={{ backgroundColor: 'white' }}>

                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.props.recomdData)}
                            renderRow={this.renderResultRow}
                            enableEmptySections={true}
                            />
                    </View>


            </View>
        )
    }

    pushToResultPage(keyword) {
        if (!keyword || !keyword.trim().length) {
            if (!keyword) {
                return;
            }
            alert('名称不能为空!');
            return;
        }
        // console.log(this.props);
      this.props.fetchRecommendedList(keyword);
    }
    pushSearchListRow( rowData, rowId){
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'Chapter',
                component: Chapter,
                params:{
                  name:rowData.Title,
                  id:rowData.Id,
                  cover:rowData.FrontCover,
                  src:rowData.Explain,
                  Author:rowData.Author,
                  }
            })
        })
    }
    renderResultRow(rowData, sectionId, rowId) {
        return <TouchableOpacity  onPress={this.pushSearchListRow.bind(this, rowData, rowId)}>
            <View style={styles.listitem}>
                <Image source={{ uri: rowData.FrontCover }} style={styles.itemImage} />
                <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column',}}>
                    <View style={{justifyContent: 'flex-end',flexDirection: 'row'}}>
                        <View style={styles.itemTitle} >
                            <Text style={{ fontSize: 18 ,color:'#3C3C3C',  fontWeight: '300',}}>{rowData.Title}</Text>
                            <Text style={{ marginTop: 5,marginBottom: 5,fontSize: 12,color:'#3C3C3C'}}>最新{rowData.LastChapter.ChapterNo}话：{rowData.LastChapter.Title} </Text>
                        </View>
                        {rowData.SerializedState==='已完结' ? <Image source={require('./../../res/images/ic_over.png')}
                            style={styles.hintImg} resizeMode={'stretch'} /> : <View />}
                    </View>
                    <Text style={styles.desc} numberOfLines={1}>{rowData.Explain}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({

    fonts: {
        fontSize: 18,

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
      },
      desc: {
          fontSize: 12,
          color:'#3C3C3C'

      },
})

export default Search = connect(
    (state) => {
      const {  searchText,recomdData, } = state.searchReducer;
        return {
          searchText,
          recomdData,
        }
      },{
        fetchRecommendedList,
        resetState,
        setupSearchText,
        })(Search);
