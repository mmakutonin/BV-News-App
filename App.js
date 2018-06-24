import React from 'react';

import XHR from './lib/XHR';
import Nav from './lib/router';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      data: null,
    };
  }

    async componentDidMount() {
    this.setState({ fontLoaded: false });
    await Expo.Font.loadAsync({
      BigJohn: require('./assets/fonts/BIGJOHN.otf'),
    });
    this.setState({ fontLoaded: true });
    XHR.get(
      'http://www.thebvnewspaper.com//wp-json/wp/v2/posts?after=' +
        new Date(new Date() - 2592000000).toISOString()
    )
      .then(r => {
        this.setState({ data: r, loading: true });
        return r;
      })
      .then(data => {
        const imageCalls = data.map((article, index) =>
          XHR.get(article._links['wp:attachment'][0].href).then(r => {
            let data = this.state.data; //FIXME: not immutableJS compliant at the moment.
            data[index].image = r[0].source_url;
            this.setState({ data });
          })
        );
        Promise.all(imageCalls).then(()=>this.setState({loading:false}));
      });
  }

  render() {
      if(this.state.fontLoaded==false)
          {return(<Expo.AppLoading />)}
        else
    {return (<Nav screenProps={this.state.data} />);}
  }
}
