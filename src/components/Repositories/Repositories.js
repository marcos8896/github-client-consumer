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

import Comments from './components/Comments/Comments';

import './Repositories.scss';

const Repositories = ({ repos, onClickRepo }) => {

  const listItems = repos.map(repo => (
    <div key={`${repo.name}-${repo.id}`}>
      <ListItem 
        button 
        onClick={onClickRepo(repo.full_name, repo.id)}
        data-testid={`selectable-repo-${repo.name}-${repo.id}`}
      >
        <ListItemIcon>
          <ArrowRight />
        </ListItemIcon>
        <ListItemText inset primary={repo.full_name} />
        {repo.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={repo.open} timeout="auto" unmountOnExit>
        <Comments items={repo.comments} />
      </Collapse>
      <Divider />
    </div>
  ));

  return (
    <div className="repositories-root">
      <List component="ul">
        {listItems}
      </List>
    </div>
  );
}

Repositories.propTypes = {
  repos: PropTypes.array.isRequired,
  onClickRepo: PropTypes.func.isRequired,
};


export default Repositories;