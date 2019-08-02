import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import BoardComponent from './board/Board';
import { BOARD_TYPE, BOARD_USERS } from '../config';

const Discussion = ({getPosts, user}) => {
    let type = BOARD_TYPE.DISCUSSION;
    let userAccess = BOARD_USERS[user.role]?true:false;

    useEffect(() => {
      const fetchPost = async () => await getPosts(type);
      fetchPost();
    }, [getPosts, type]);

    return (
      <BoardComponent
        type={type} 
        userAccess={userAccess}
      />
    )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Discussion);