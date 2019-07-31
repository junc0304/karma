'use strict';
import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, Modal } from 'react-bootstrap';
import { isEmpty, dateTime } from '../../helpers';
import CommentComponent from './Comment';
import PostComponent from './Post';


const BoardForm = memo(({ data, type, show, onClose, access = false }) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => setEdit(isEmpty(data)), [data]);
  const handleChangeEdit = () => setEdit(!edit);

  return (
    <Modal
      show={show}
      onHide={onClose} >
      <Jumbotron style={{ padding: "15px 15px", margin: "0" }}>
        <PostComponent
          data={data}
          type={type}
          edit={edit}
          onChangeEdit={handleChangeEdit}
          onClose={onClose}
        />
        {!edit && (
          <CommentComponent />
        )}
      </Jumbotron>
    </Modal>
  )
});

export default BoardForm;