import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    width: 100,
    height:100,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
    whiteSpace: 'pre-line',
    overflow: "hidden",
    maxWidth: 600
  }
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    const profileImageStyle = {
      height: 100,
      width: 100,
      borderRadius: '50%',
      objectFit: 'cover',
      marginTop: '30%',
      marginLeft: '15%'
    };

    return (
      <Card className={classes.card}>
        <CardMedia
          // image={userImage}
          title="Profile image"
          className={classes.image}>
             <img src={userImage} alt="" style={profileImageStyle}/>
        </CardMedia>
        <CardContent className={classes.content}>
          {/* User name */}
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
            {/* Delete btn */}
          </Typography>
          {deleteButton}
          {/* Date of message */}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          {/* Message */}
          <Typography 
          variant="body1"
          >{body}
          </Typography>
          {/* Like btn */}
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          {/* Comments btn */}
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          {/* Expand to view post with comments */}
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
