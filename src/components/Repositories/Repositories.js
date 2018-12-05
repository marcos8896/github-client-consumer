import React from 'react';
import PropTypes from 'prop-types'; 

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './Repositories.scss';

const SimpleList = ({ repos, onClickRepo }) => {

  const listItems = repos.map( repo => {
    return (
      <li key={`${repo.name}-${repo.id}`}>
        <ListItem button onClick={onClickRepo(repo.id)}>
          <ListItemIcon>
            <ArrowRight />
          </ListItemIcon>
          <ListItemText inset primary={repo.full_name} />
          {repo.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={repo.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              {/* <ListItemIcon>
              </ListItemIcon> */}
              <ListItemText inset primary="Test" />
            </ListItem>
          </List>
        </Collapse>
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
  onClickRepo: PropTypes.func.isRequired,
};


export default SimpleList;