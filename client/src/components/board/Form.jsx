import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, Modal } from 'react-bootstrap';
import { isEmpty } from '../../helpers';
import CommentComponent from './Comment';
import PostComponent from './Post';
import './Board.css';

const BoardForm = memo(({ type, data, show, onClose }) => {
  const [edit, setEdit] = useState(() => (isEmpty(data)));
  useEffect(() => setEdit(isEmpty(data)), [data]);
  const handleChangeEdit = () => setEdit(!edit);

  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <Jumbotron className='jumbotron-post-view' style={{ padding: '15px 15px' }}>
        <div className='jumbotron-inner-frame' >
          <PostComponent
            data={data}
            type={type}
            edit={edit}
            onChangeEdit={handleChangeEdit}
            onClose={onClose}
          />
          {!edit && data && (
            <CommentComponent />
          )}
        </div>
      </Jumbotron>
    </Modal>
  )
});

export default BoardForm;