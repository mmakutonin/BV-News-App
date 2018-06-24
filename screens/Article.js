import React, { Component } from 'react';
import { Image, FlatList, StyleSheet, Text, View } from 'react-native';

export default class extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const params = this.props.navigation.state;
    const article = params ? params.params.article : null;

    return (
      <View>
        <FlatList
          data={article}
          renderItem={({ item }) => {
            if (item.type === 'title')
              return <Text style={styles.title}>{item.text}</Text>;
            if (item.type === 'img')
              return <Image source={{ uri: item.source }} style={styles.img} />;
            if (item.type === 'text')
              return <Text style={styles.item}>{item.text}</Text>;
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  title: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'black',
    fontFamily: 'BigJohn'
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  sectionHead: {
    padding: 10,
    fontSize: 22,
  },
  img: {
    width: 400,
    height: 300,
    resizeMode: Image.resizeMode.contain,
  },
});
