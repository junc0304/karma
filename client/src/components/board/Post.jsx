import React, { memo, Fragment } from 'react';
import { Modal, Form, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isEmpty, dateTime } from '../../helpers';
import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';
import { DeleteIcon, EditIcon, CancelIcon, PersonIcon, DateIcon } from '../icons';

const PostComponent = memo(({
  data, type, edit, isAdmin, onChangeEdit, onClose, //from parent
  user, //from store
  createPost, getPosts, updatePost, deletePost  //actions
}) => {
  let { postId, authorId, title, content, authorName, created, updated } = data;
  let { userId } = user;
  let postForm = {};

  const isOwner = authorId === userId;

  const dataExist = !isEmpty(data);
  const updating = edit && !isEmpty(data);
  const creating = edit && isEmpty(data);
  const viewing = !edit;
  const isEditable = isOwner || isAdmin;

  const handleChangePost = (name, value, validated) => postForm[name] = value;
  const handleCreatePost = async () => [await createPost({ ...postForm, type }), await getPosts(type)];
  const handleUpdatePost = async () => [await updatePost({ ...postForm, postId }), await getPosts(type)];
  const handlePostDelete = async () => [await deletePost({ ...postForm, postId }), await getPosts(type)];

  return (
    <Fragment>
      <Modal.Header style={{ borderRadius: '5px', padding: '5px 0px 16px 15px' }}>
        {viewing && <h3>View</h3>}
        {updating && <h3>Update</h3>}
        {creating && <h3>Create</h3>}
        <MenuButtons
          onEditChange={onChangeEdit}
          onUpdate={handleUpdatePost}
          onDelete={handlePostDelete}
          edit={edit}
          show={(updating || viewing) && !creating && isEditable}
          onClose={onClose}
        />
      </Modal.Header>
      <Form noValidate>
        <Modal.Body style={{ backgroundColor: 'white', borderRadius: '5px', padding: '0px' }}>
          <CustomInput
            size='lg'
            name='title'
            type='text'
            placeholder='Title'
            defaultValue={title}
            edit={edit}
            onChange={handleChangePost}
            style={{ verticalAlign: 'middle', backgroundColor: 'white', border: `2px solid ${edit && dataExist ? 'pink' : 'white'}` }}
          />
          {!edit && <hr className='my-1' />}
          {!edit && (

            <Modal.Body style={{ backgroundColor: 'white', borderRadius: '5px', paddingTop: '0px', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>

                <div style={{ flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <PersonIcon style={{ fontSize: '16px' }} />
                  <Form.Text style={{ flex: 1, textAlign: 'center', fontSize: '16px' }}>
                    {authorName}
                  </Form.Text>
                </div>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Form.Text style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <DateIcon style={{ fontSize: '15px' }} />
                      <div style={{ flex: 1 }}>
                        {dateTime.boardDate(created)}
                      </div>
                    </div>
                    {updated && (
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <EditIcon style={{ fontSize: '15px' }} />
                        <div style={{ flex: 1 }}>
                          {dateTime.boardDate(updated)}
                        </div>
                      </div>
                    )}
                  </Form.Text>
                </div>
              </div>
            </Modal.Body>
          )}
        </Modal.Body>
        <Modal.Body style={{ padding: '0px' }}>
          <CustomInput
            size='lg'
            name='content'
            as='textarea'
            type='text'
            rows={10}
            defaultValue={content}
            edit={edit}
            placeholder='Content'
            onChange={handleChangePost}
            style={{
              padding: '16px', marginTop: '10px', resize: 'none', whiteSpace: 'preWrap',
              backgroundColor: 'white', borderRadius: '5px', minHeight: '300px', border: `2px solid ${edit && dataExist ? 'pink' : 'white'}`
            }}
          />
        </Modal.Body>
      </Form>
      {(updating || creating) && (
        <FormButtons
          edit={edit}
          noData={isEmpty(data)}
          onClose = {onClose}
          onUpdate={handleUpdatePost}
          onCreate={handleCreatePost}
          onCancel={onChangeEdit}
        />
      )}
    </Fragment>
  );
});

const MenuButtons = memo(({ onClose, onDelete, onEditChange, edit, show }) => {
  return (
    <div className='d-flex'>
      <ButtonGroup className=' d-flex ml-auto'>
        {show && edit && (
          <Button
            as={Button}
            size='sm'
            variant='danger'
            onClick={onDelete}
            style={{ marginRight: '2px', /* backgroundColor: 'rgba(255,255,255,0)', border: '1.5px solid red'  */ }}
          >
            <DeleteIcon style={{ textAlign: 'center', verticalAlign: 'middle' }} />
          </Button>
        )}
        {show && (
          <Button
            size='sm'
            variant='light'
            active={edit}
            onClick={onEditChange}
            style={{ textAlign: 'center', verticalAlign: 'middle', /* backgroundColor: 'rgba(255,255,255,0)', border: '0px'  */ }}
          >
            <EditIcon style={{ textAlign: 'center', verticalAlign: 'middle' }} />
          </Button>
        )}
        <Button
          size='sm'
          variant='light'
          onClick={onClose}
          style={{ textAlign: 'center', verticalAlign: 'middle', /* backgroundColor: 'rgba(255,255,255,0)', border: '0px'  */ }}
        >
          <CancelIcon style={{ textAlign: 'center', verticalAlign: 'middle' }} />
        </Button>
      </ButtonGroup>
    </div>
  );
});

const FormButtons = memo(({ onUpdate, onCreate,onClose, onCancel, edit, noData }) => {
  let isNewForm = noData && edit;
  return (
    <Form.Group className='d-flex'>
      {edit && (
        <ButtonGroup className='ml-auto' style={{ marginTop: '15px' }}>
          {!isNewForm ? (
            <Button
              className='btn btn-main'
              variant='light'
              onClick={onUpdate}
              style={{ hight: '1rem', width: '5rem', marginRight: '5px' }} >
              Update
          </Button>
          ) : (
              <Button
                className='btn btn-main'
                variant='light'
                onClick={onCreate}
                style={{ hight: '1rem', width: '5rem', marginRight: '5px' }} >
                Create
            </Button>
            )}
          <Button
            className='btn btn-main'
            variant='light'
            style={{ width: '5rem' }}
            onClick={!isNewForm?onCancel:onClose}>
            Cancel</Button>
        </ButtonGroup>)}
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
    comment: state.comment
  };
}

export default connect(mapStateToProps, actions)(PostComponent);