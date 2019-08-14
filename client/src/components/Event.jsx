import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import BoardComponent from './board/Board';
import { BOARD_TYPE, BOARD_USERS } from '../config';

const Event = ({getPosts, role}) => {
  const type = BOARD_TYPE.DISCUSSION;
  const hasAccess = BOARD_USERS.NOTICE.includes(role);

    useEffect(() => {
      const fetchPost = async () => await getPosts(type);
      fetchPost();
    }, [getPosts, type]);

    return (
      <BoardComponent
        type={type} 
        userAccess={hasAccess}
      />
    )
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.user.role
  };
}

export default connect(mapStateToProps, actions)(Event);