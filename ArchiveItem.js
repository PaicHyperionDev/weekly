'use strict';

var React = require('react-native');

var {
  Text,
  TouchableHighlight,
  Platform,
  StyleSheet,
  View,
  PixelRatio
} = React;

var ArchiveItem = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}
          activeOpacity={1}
          animationVelocity={0}
          underlayColor="rgb(210, 230, 255)"
          >
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {this.props.article.title}
              </Text>
              <Text style={styles.date} numberOfLines={2}>
                {this.props.article.date.substring(0, 10)}
              </Text>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  date: {
    color: '#999999',
    fontSize: 12,
  },
  excerpt: {
    fontSize: 14
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = ArchiveItem;
