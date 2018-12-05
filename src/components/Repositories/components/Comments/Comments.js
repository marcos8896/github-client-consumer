import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types'; 

import './Comments.scss';

const Comments = ({ items }) => {

  let commentElements = null, message = null;

  if( items !== undefined )
    commentElements = items.map(comment => (
      <ListItem key={comment.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.user.login} src={comment.user.avatar_url} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <span className="commit-id">
                {`Commit: ${comment.commit_id}`}
              </span>
              <Typography component="span" className="inline-comments" color="textPrimary">
                {comment.body}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    ))

  if( items !== undefined && items.length === 0 )
    message = (
      <div className="no-comments-message">
        {"There aren't comments available for this repository :("}
      </div>
    )

  return (
    <List component="div" disablePadding>
      {commentElements}
      {message}
    </List>
  );
}

Comments.propTypes = {
  items: PropTypes.array,
};


export default Comments;