import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class ArticleCard extends Component {
  render() {
    const {
      articleTitle,
      imageSrc,
      articleSummary,
      article,
      navigation,
    } = this.props;
    return (
      <Card title={articleTitle} image={{ uri: imageSrc }} titleStyle={{fontFamily: 'BigJohn'}}>
        <Text style={{ marginBottom: 10 }}>
          {articleSummary}
        </Text>
        <Button
          color="#000000"
          fontFamily="BigJohn"
          buttonStyle={{
            borderRadius: 1,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
          }}
          title="VIEW NOW"
          onPress={() =>
            navigation.navigate('ArticleLayout', {
              article: article,
              imageUri: imageSrc,
              title: articleTitle,
            })}
        />
      </Card>
    );
  }
}
