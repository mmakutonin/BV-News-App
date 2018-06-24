import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import DOMParser from 'react-native-html-parser'; // Version can be specified in package.json
import striptags from 'striptags'; // Version can be specified in package.json

import ArticleCard from '../components/ArticleCard';

export default class extends Component {
  render() {
    const { navigation, category, screenProps } = this.props;
    let data = screenProps
      ? screenProps.filter(article => article.categories.includes(category))
      : null;

    const renderItem = ({ item }) => {
      const imageSrc = item.image;

      //Parsing the excerpt
      const html = item.excerpt.rendered;
      const parser = new DOMParser.DOMParser();
      const parsed = parser.parseFromString(html, 'text/html');
      const articleSummary = striptags(' ' + parsed + ' ');

      //Parsing the title
      const titleArticle = item.title.rendered;
      const parsedTitle = parser.parseFromString(titleArticle, 'text/html');
      const title = striptags(' ' + parsedTitle + ' ');

      //Parsing the article text
      //NEED TO MAKE PARAGRAPH COMPONENTS EVENTUALLY
      const htmlText = item.content.rendered;
      const parsedText = parser.parseFromString(htmlText, 'text/html');
      let article = [];
      article.push({ type: 'title', text: title });
      article.push({ type: 'img', source: imageSrc });
      article.push({ type: 'text', text: striptags(' ' + parsedText + ' ') });

      return (
        <ArticleCard
          articleTitle={title}
          imageSrc={imageSrc}
          articleSummary={articleSummary}
          navigation={navigation}
          article={article}
        />
      );
    };

    return (
      <View>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index} />
      </View>
    );
  }
}
