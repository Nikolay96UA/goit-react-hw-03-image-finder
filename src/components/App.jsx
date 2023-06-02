import React from 'react';
import Serchbar from './Searchbar/Searchbar';

export default class App extends React.Component {
  state = {
    serchQuery: '',
  };

  handelOnSubmit = serchQuery => {
    this.setState({  serchQuery });
    console.log(serchQuery)
  };

  render() {
    return <Serchbar onSubmit={this.handelOnSubmit} />;
  }
}
