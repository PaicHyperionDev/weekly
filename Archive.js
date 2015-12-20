'use strict';

const React = require('react-native');

const {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  ListView,
  ScrollView,
  ToastAndroid,
  PullToRefreshViewAndroid,
  AlertIOS
} = React;

const API_URL = 'http://paichyperiondev.github.io/api/list/list.json';
const ArchiveItem = require('./ArchiveItem');

var dataCache = {
  posts: [],
  next: null
};

const Archive = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return {
      isRefreshing: false,
      dataSource: ds,
    }
  },

  componentDidMount: function() {
    this._onFetch(true);
  },

  _onFetch: function(isReload) {
    this.setState({isRefreshing: true});
    var requestUrl;
    var next = dataCache.next;
    if (next) {
      requestUrl = next;
    } else {
      requestUrl = API_URL;
    }
    let dataBlob = dataCache.posts;
    fetch(requestUrl)
      .then((response) => response.json())
        .then((responseData) => {
          if (dataBlob.length === 0 || isReload) {
              dataBlob = responseData.posts;
          } else {
              dataBlob = dataBlob.concat(responseData.posts);
          }
          this.setState({
            isRefreshing: false,
            dataSource: this.state.dataSource.cloneWithRows(dataBlob),
          });
          dataCache.posts = dataBlob;
          dataCache.next = responseData.next;
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isRefreshing: false,
          })
        })
        .done();
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <View style={styles.centerEmpty}>
        <Text>{this.state.isRefreshing ? '正在加载...' : '加载失败'}</Text>
      </View> :
      <PullToRefreshViewAndroid
        style={styles.container}
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        >
      <ListView
        ref="ListView"
        initialListSize={20}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.listView}
        onEndReached={this._onEndReached}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />
    </PullToRefreshViewAndroid>
    ;
    return content;
  },

  _onRefresh() {
    this._onFetch(true);
  },

  _onEndReached() {
    if (dataCache.next) {
      this._onFetch(false);
    }
  },

  _renderRow: function(
    article: Object,
    sectionID: number | string,
    rowID: number | string,
    permalink: string,
  ) {
    return (
      <ArchiveItem
        key={article.permalink}
        onSelect={() => this._selectArticle(article)}
        article={article}
      />
    );
  },

  _selectArticle: function(article: Object) {
    var url = article.url;
    var title = article.title;
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: {title},
        component: Article,
        passProps: {url}
      });
    } else {
      this.props.navigator.push({
        title: title,
        name: 'article',
        url: url
      });
    }
  }
});


const styles = StyleSheet.create({
  centerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  listView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
});


module.exports = Archive;
