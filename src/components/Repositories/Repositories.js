import React from 'react';
import PropTypes from 'prop-types'; 

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowRight from '@material-ui/icons/ArrowRight';

import './Repositories.scss';

const SimpleList = ({ repos }) => {

  const listItems = repos.map( repo => {
    return (
      <li key={`${repo.name}-${repo.id}`}>
        <ListItem button>
          <ListItemIcon>
            <ArrowRight />
          </ListItemIcon>
          <ListItemText primary={repo.full_name} />
        </ListItem>
        <Divider/>
      </li>
      
    )
  });

  return (
    <div className="repositories-root">
      <List component="ul">

        {listItems}


      </List>
    </div>
  );
}

SimpleList.propTypes = {
  repos: PropTypes.array.isRequired,
};


export default SimpleList;