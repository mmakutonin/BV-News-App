import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { Icon } from 'react-native-elements'; // Version can be specified in package.json

//import XHR from './lib/XHR'
import ArticleLayout from '../screens/Article.js';
import NewsFeed from '../screens/NewsFeed';

import {Ionicons} from '@expo/vector-icons'; // Version can be specified in package.json

const categories = [
  {
    title: 'Feature',
    catNum: 5,
    icon: { name: 'md-star-outline' },
  },
  {
    title: 'News',
    catNum: 6,
    icon: { name: 'ios-paper-outline' },
  },
  {
    title: 'Opinion',
    catNum: 7,
    icon: {name: 'ios-bulb-outline' },
  },
  {
    title: 'Sports',
    catNum: 8,
    icon: {name: 'md-basketball' },
  },
];

//Note to Mike: Dictionary for icons: https://oblador.github.io/react-native-vector-icons/

const FeedTabNav = TabNavigator(
  categories.reduce(
    (a, i) => ({
      ...a,
      [i.title]: {
        screen: props => <NewsFeed category={i.catNum} {...props} />,
        navigationOptions: {
          tabBarIcon: ({ tintColor: c }) => (
            <Ionicons name={i.icon.name} color={c} size={32} />
            //<IonIcon name={i.icon.name} type={i.icon.type} color={c} />
          ),
        },
      },
    }),
    {}
  ),
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: { showIcon: true },
  }
);

export default StackNavigator({
  Home: {
    screen: FeedTabNav,
    navigationOptions: {
      title: 'BonaVenture',
      headerTitle: () => (
        <Image
          source={require('../components/BV-Logo.png')}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      ),
    },
  },
  ArticleLayout: {
    screen: ArticleLayout,
  },
});
