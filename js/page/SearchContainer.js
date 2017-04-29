/**
 * Created by Jonson
 */
import React from 'react';
import {connect} from 'react-redux';
// import Search from '../pages/Search';
// import  Search from '../Home/SearchHeader';
import  Search from '../containers/Search';




class SearchContainer extends React.Component {
    render() {
        return (
            <Search {...this.props} />
        )
    }
}

module.exports = connect((state) => {
    const {Search} = state;
    return {
        Search
    }
})(SearchContainer);
