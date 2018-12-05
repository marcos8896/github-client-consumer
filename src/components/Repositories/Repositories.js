import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowRight from '@material-ui/icons/ArrowRight';

import './Repositories.scss';

function SimpleList( props ) {
  return (
    <div className="repositories-root">
      <List component="ul">

        <ListItem button>
          <ListItemIcon>
            <ArrowRight />
          </ListItemIcon>
          <ListItemText primary="Item 1" />
        </ListItem>

        <Divider/>

        <ListItem button>
          <ListItemIcon>
            <ArrowRight />
          </ListItemIcon>
          <ListItemText primary="Item 2" />
        </ListItem>

      </List>
    </div>
  );
}

export default SimpleList;