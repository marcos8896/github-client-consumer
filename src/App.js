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
      query: '',
      repositories: [],
      currentComments: [],
    }

    this.getRepositoriesByQuery = debounce( this.getRepositoriesByQuery.bind(this), 500);
  }


  componentDidUpdate( prevProps ) {
    if(prevProps.query !== this.state.query) this.getRepositoriesByQuery();
  }


  handleChange = ( event ) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }


  async getRepositoriesByQuery() {
    //https://api.github.com/search/repositories?q=react&order=desc
    // const url = 'search/repositories';

    // const response = await axios.get( url, {
    //   params: {
    //     q: query,
    //     order: 'desc'
    //   }
    // }).catch( err => console.err(err));

    // console.log('response: ', response);
  
  }

  render() {
    return (
      <div className="App">
        <SearchBar query={this.state.query} onChange={this.handleChange}/>
        <Divider/>
        <Repositories/>
      </div>
    );
  }
}

export default App;
