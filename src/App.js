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
    }

    this.getRepositoriesByQuery = debounce( this.getRepositoriesByQuery.bind(this), 800);
    this.getCommentsFromRepo = this.getCommentsFromRepo.bind(this);
  }


  handleInputChange = ( event ) => {
    const value = event.target.value;
    this.getRepositoriesByQuery(value);
  }


  handleClickRepo = ( fullRepoName, repoId ) => () => {

    this.setState( prevState => ({
      repositories: prevState.repositories.map( repo => {
        if (repo.id === repoId) return { ...repo, open: !repo.open }
        else return repo;
      })
    }),
    () => this.getCommentsFromRepo(fullRepoName, repoId));
  }


  async getRepositoriesByQuery( query ) {
    
    const url = 'search/repositories';

    if(query !== '') {
      try {

        const response = await axios.get( url, { params: {
          q: query,
          order: 'desc'
        }});

        const repos = response.data.items;
        repos.forEach( repo => repo.commentsFetched = false);
      
        this.setState({ repositories: repos });
          
      } catch ( err ) {
        console.error('err: ', err);
      }
    }

  }

  async getCommentsFromRepo( fullRepoName, repoId ) {

    if(!this.alreadyFetchComments( repoId )) {
      const url = `/repos/${fullRepoName}/comments`;

      try {

        const response = await axios.get( url );
        const comments = response.data;
      
        this.setState( prevState => ({
          repositories: prevState.repositories.map( repo => {
            if (repo.id === repoId) return { 
              ...repo, comments: comments.reverse(), commentsFetched: true 
            }
            else return repo;
          })
        }));
          
      } catch ( err ) {
        console.error('err: ', err);
      }
    }

  }

  alreadyFetchComments = repoId => {
    const index = this.state.repositories.findIndex( repo => repo.id === repoId );
    
    if(index < 0) return false;
    return this.state.repositories[index].commentsFetched;
  }

  render() {
    return (
      <div className="App">
        <SearchBar query={this.state.query} onChange={this.handleInputChange}/>
        <Divider/>
        <Repositories 
          onClickRepo={this.handleClickRepo}
          repos={this.state.repositories}  
        />
      </div>
    );
  }
}

export default App;
