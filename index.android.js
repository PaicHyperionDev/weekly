/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  ToolbarAndroid,
  Navigator
} = React;

const Archive = require('./Archive');
const Article = require('./Article');
const TITLE = "平安科技移动开发二队技术周报";

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', ()=> {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

const Weekly = React.createClass({
   renderScene: function(route, navigationOperations, onComponentRef) {
     _navigator = navigationOperations;
     if (route.name === 'archive') {
       return (
         <View style={styles.container}>
           <ToolbarAndroid
             title={TITLE}
             titleColor="white"
             style={styles.toolbar}
             />
           <Archive style={styles.content} navigator={navigationOperations}/>
        </View>
     );
   } else if (route.name === 'article') {
     return (
       <View style={styles.container}>
         <ToolbarAndroid
           title={route.title}
           titleColor="white"
           style={styles.toolbar}
           />
         <Article
           style={styles.content}
           navigator={navigationOperations}
           url={route.url}
          >
        </Article>
       </View>
     )
   }
 },
  render: function() {
    var initialRoute = {name: 'archive'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.renderScene}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  toolbar: {
    backgroundColor: '#339999',
    height: 56,
  },
  content: {
    flex: 1
  }
});

AppRegistry.registerComponent('weekly', () => Weekly);
