import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import BoardComponent from './board/Board';
import * as actions from '../actions';
import { BOARD_TYPE, BOARD_USERS } from '../config';

const Discussion = ({getPosts, role}) => {
    const type = BOARD_TYPE.DISCUSSION;
    const hasAccess = BOARD_USERS.DISCUSSION.includes(role);

    useEffect(() => {
      const fetchPost = async () => await getPosts(type);
      fetchPost();
    }, [type, getPosts]);

    return (
      <BoardComponent
        type={type} 
        hasAccess={hasAccess}
      />
    )
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.user.role
  };
}

export default connect(mapStateToProps, actions)(Discussion);