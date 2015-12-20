'use strict';

var React = require('react-native');

var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  WebView,
  PixelRatio,
  Animated,
  Dimensions
} = React;

const deviceWidth = Dimensions.get('window').width;
var DISABLED_WASH = 'rgba(255,255,255,0.25)';
var BGWASH = 'rgba(255,255,255,0.8)';
const REF_HEADER = 'header';
const PIXELRATIO = PixelRatio.get();
const HEADER_SIZE = 200;
const CSS_URL = "http://www.tuicool.com/assets/application-bc9f103ffac633f3e0506001890d1135.css";

const Article = React.createClass({
  getInitialState: function() {
    return {
      title: null,
      content: null,
      permalink: null,
      loaded: false
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(this.props.url)
      .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            title: responseData.title,
            content: responseData.content,
            permalink: responseData.permalink,
            loaded: true
          })
        })
        .done();
  },

  render: function(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      if (this.state.content) {
        var html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
          + CSS_URL
          + '" /></head><body><h1>' + this.state.title + "</h1>" + this.state.content
          + '</body></html>';
        return (
            <WebView
              style={styles.webview}
              startInLoadingState={true}
              html={html}
              >
            </WebView>
        );
      } else {
        return this.renderLoadFail();
      }
    }
  },

  renderLoadingView: function() {
    return (
      <View style={styles.centerEmpty}>
        <Text>
          正在加载文章...
        </Text>
      </View>
    )
  },

  renderLoadFail: function() {
    return (
      <View style={styles.centerEmpty}>
        <Text>
          文章加载失败！
        </Text>
      </View>
    )
  },
});


const styles = StyleSheet.create({
  webview: {
    height: 350,
    backgroundColor: BGWASH,
  },
  title: {
    flex: 1,
    fontSize: 30,
    flexWrap: 'wrap',
    width: deviceWidth,
  },
  centerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Article;
