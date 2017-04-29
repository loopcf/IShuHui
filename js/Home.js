import React, { Component } from 'react';
import {
  Navigator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Hot from './containers/Hot';
import Subscribe from './containers/Subscribe';
import Setting from './containers/Setting';
import Search from './containers/Search';
import { Tabs, Tab, Icon } from 'react-native-elements'

export default class Home extends Component {

      constructor() {
      super()
      this.state = {
        selectedTab: 'hot',
      }
      }

      changeTab (selectedTab) {
      this.setState({selectedTab});
      }



  render() {

    const { selectedTab } = this.state
      return (


       <Tabs

         hidesTabTouch>
    <Tab
      titleStyle={{fontWeight: 'bold', fontSize: 10}}
      selectedTitleStyle={{marginTop: -1, marginBottom: 6,color:'#3C3C3C'}}
      selected={selectedTab === 'hot'}
      title={selectedTab === 'hot' ? 'home' : null}
      renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='home' size={33} />}
      renderSelectedIcon={() => <Icon color={'#3C3C3C'} name='home' size={30} />}
      onPress={() => this.changeTab('hot')}>
      <Hot {...this.props} />
    </Tab>
    <Tab
      titleStyle={{fontWeight: 'bold', fontSize: 10}}
      selectedTitleStyle={{marginTop: -1, marginBottom: 6 ,color:'#3C3C3C'}}
      selected={selectedTab === 'Subscribe'}
      title={selectedTab === 'Subscribe' ? 'Subscribe' : null}
      renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='bookmark' size={33} />}
      renderSelectedIcon={() => <Icon color={'#3C3C3C'} name='bookmark' size={30} />}
      onPress={() => this.changeTab('Subscribe')}>
      <Subscribe {...this.props} />
    </Tab>
    <Tab
      titleStyle={{fontWeight: 'bold', fontSize: 10}}
      selectedTitleStyle={{marginTop: -1, marginBottom: 6,color:'#3C3C3C'}}
      selected={selectedTab === 'Search'}
      title={selectedTab === 'Search' ? 'Search' : null}
      renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='search' size={33} />}
      renderSelectedIcon={() => <Icon color={'#3C3C3C'} name='search' size={30} />}
      onPress={() => this.changeTab('Search')}>
      <Search {...this.props} />
    </Tab>
    <Tab
      titleStyle={{fontWeight: 'bold', fontSize: 10}}
      selectedTitleStyle={{marginTop: -1, marginBottom: 6,color:'#3C3C3C'}}
      selected={selectedTab === 'Setting'}
      title={selectedTab === 'Setting' ? 'Setting' : null}
      renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='settings' size={33} />}
      renderSelectedIcon={() => <Icon color={'#3C3C3C'} name='settings' size={30} />}
      onPress={() => this.changeTab('Setting')}>
      <Setting {...this.props} />
    </Tab>

  </Tabs>
      )
  }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height:15,
    },
    TabBar:{
      height:50,
    },

    contentContainer: {
        flex: 1
    },




    hintImg: {
        width: 50,
        height: 50,
    },
    desc: {
        fontSize: 12
    }

});
