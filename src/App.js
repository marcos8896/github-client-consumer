import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import './App.scss';

import Repositories from './components/Repositories/Repositories';
import SearchBar from './components/SearchBar/SearchBar';

import debounce from 'lodash.debounce';
import axios from './axios';

class App extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      repositories: [],
      currentComments: [],
    }

    this.getRepositoriesByQuery = debounce( this.getRepositoriesByQuery.bind(this), 500)

  }

  async getRepositoriesByQuery( query ) {

    console.log("search query");
    
    //https://api.github.com/search/repositories?q=react&order=desc
    // const url = 'search/repositories';

    // const response = await axios.get( url, {
    //   params: {
    //     q: query
    //   }
    // }).catch( err => console.err(err));

    // console.log('response: ', response);
  
  }

  render() {
    return (
      <div className="App">
        <SearchBar onChangeQuery={this.getRepositoriesByQuery}/>
        <Divider/>
        <Repositories/>
      </div>
    );
  }
}

export default App;
