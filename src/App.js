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

    this.getRepositoriesByQuery = debounce( this.getRepositoriesByQuery.bind(this), 800);
  }


  handleInputChange = ( event ) => {
    const value = event.target.value;
    this.getRepositoriesByQuery(value);
  }


  async getRepositoriesByQuery( query ) {
    
    const url = 'search/repositories';

    if(query !== '') {
      try {

        const response = await axios.get( url, { params: {
          q: query,
          order: 'desc'
        }});
      
        this.setState({ repositories:response.data.items });
          
      } catch ( err ) {
        console.error('err: ', err);
      }
    }

  }

  render() {
    return (
      <div className="App">
        <SearchBar query={this.state.query} onChange={this.handleInputChange}/>
        <Divider/>
        <Repositories repos={this.state.repositories}/>
      </div>
    );
  }
}

export default App;
