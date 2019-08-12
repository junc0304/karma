import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CustomInput from './shared/CustomInput';
import { validate } from '../helpers';
import { SettingsIcon } from './icons';
import { CITIES_IN_BC } from '../config';


const Profile = ({ data, userId, getUser, updateUser, resetUser }) => {
  let { name = '', phone = '', email = '', depotName = '', unit = '', address = '', city = '', province = '', postalCode = '', comment = '' } = data;
  let noError = true;
  let formData = {};
  useEffect(() => {
    const fetchUser = async () => await getUser({ userId });
    fetchUser();
    return async () => await resetUser();
    // eslint-disable-next-line 
  }, []);

  const [edit, setEdit] = useState(false);
  const borderColor = edit ? 'orange' : ' #ced4da';
  const handleChange = (name, value, validate) => [formData = { ...formData, [name]: value }, validate ? noError = true : noError = false];
  const handleEditChange = () => setEdit(!edit);
  const handleClickUpdate = async () => {
    if (!noError) return;
    await updateUser({ ...formData, userId });
    await getUser({ userId });
    setEdit(false);
  }
  return (
    <Jumbotron className='jumbotron-main' style={{ padding: '15px 15px', margin: '0' }}>
      <div className='jumbotron-inner-frame' >
        <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '15px', borderRadius: '5px' }}>
          {!edit && <h3>User Profile</h3>}
          {edit && <h3>Update Profile</h3>}
          <ButtonGroup style={{ display: 'flex', marginLeft: 'auto' }} >
            <Button
              variant='light'
              onClick={handleEditChange}
              style={{ backgroundColor: 'rgba(255,255,255,0)', border: '0px', padding: '0px' }}
            ><SettingsIcon style={{ textAlign: 'center', verticalAlign: 'middle' }} />
            </Button>
          </ButtonGroup>
        </Container>
        <hr className='my-2' />
        <Container style={{ padding: '15px' }}>
          <div ><strong>Email (ID):</strong></div>
          <CustomInput
            size='lg'
            name='email'
            type='text'
            placeholder='Role'
            defaultValue={email}
            edit={false}
            style={{ backgroundColor: 'white' }}
          />
        </Container>
        <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '0px' }}>
          <div style={{ flex: 1, maxWidth: '530px', minWidth: '235px', padding:'15px' }}>
            <div><strong>Name:</strong></div>
            <CustomInput
              size='lg'
              name='name'
              type='text'
              placeholder='Name'
              onChange={handleChange}
              defaultValue={name}
              edit={edit}
              validation={validate.empty}
              style={{ backgroundColor: 'white', borderColor: borderColor }}
            />
          </div>
          <PasswordFields onChange={handleChange} validate={validate} edit={edit} />
        </Container>
        <Container style={{ padding: '15px' }}>
          <div><strong>Phone:</strong> </div>
          <CustomInput
            size='lg'
            name='phone'
            type='text'
            placeholder='Phone Number'
            onChange={handleChange}
            defaultValue={phone}
            edit={edit}
            style={{ backgroundColor: 'white', borderColor: borderColor }}
          />
        </Container >
        <Container style={{ padding: '15px' }}>
          <div>
            <div><strong>Depot:</strong></div>
            <CustomInput
              size='lg'
              name='depotName'
              type='text'
              placeholder='Depot Name'
              onChange={handleChange}
              defaultValue={depotName}
              edit={edit}
              validation={validate.empty}
              style={{ backgroundColor: 'white', borderColor: borderColor }}
            />
          </div>
        </Container >
        <Container style={{ padding: '0px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' , padding:'0px' }}>
            <div style={{ flex: '2', padding:'15px' }}>
              <div><strong>Unit:</strong></div>
              <CustomInput
                size='lg'
                name='unit'
                type='text'
                placeholder='Depot Name'
                onChange={handleChange}
                defaultValue={unit}
                edit={edit}
                style={{ backgroundColor: 'white', borderColor: borderColor, padding:'0px', textAlign:'center'  }}
              />
            </div>
            <div style={{ flex: '5', padding:'15px' }} >
              <div><strong>Street:</strong></div>
              <CustomInput
                size='lg'
                name='address'
                type='text'
                placeholder='Street Address'
                onChange={handleChange}
                defaultValue={address}
                edit={edit}
                validation={validate.empty}
                style={{ backgroundColor: 'white', borderColor: borderColor }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding:'0px' }}>
            <div style={{ flex: '3', minWidth: '140px', padding:'15px' }}>
              <div><strong>City:</strong></div>
              <CustomInput
                required
                size='lg'
                as='select'
                name='city'
                type='text'
                onChange={handleChange}
                edit={edit}
                defaultValue={city}
                validation={validate.emptySelection}
                style={{ display:'flex',backgroundColor: 'white', borderColor: borderColor}}
              >
                <option value={''} />
                {CITIES_IN_BC.map((item, index) => <option key={index}> {item} </option>)}
              </CustomInput>
            </div>
            <div style={{ flex: '2', minWidth: '87px', padding:'15px' }}>
              <div><strong>Province:</strong></div>
              <CustomInput
                required
                size='lg'
                as='select'
                name='province'
                type='text'
                onChange={handleChange}
                edit={edit}
                defaultValue={province}
                validation={validate.emptySelection}
                style={{ backgroundColor: 'white', borderColor: borderColor }}
              >
                <option>BC</option>
              </CustomInput>
            </div>
            <div style={{ flex: '3', minWidth: '105px', padding:'15px' }}>
              <div><strong>Postal Code:</strong></div>
              <CustomInput
                size='lg'
                name='postalCode'
                type='text'
                placeholder='Postal Code'
                onChange={handleChange}
                defaultValue={postalCode}
                edit={edit}
                validation={validate.postalCode}
                style={{ backgroundColor: 'white', borderColor: borderColor, whiteSpace: 'nowrap' }}
              />
            </div>
          </div>
        </Container >
        <Container style={{ padding: '15px' }}>
          <div>
            <div><strong>Comment:</strong></div>
            <CustomInput
              size='lg'
              name='comment'
              as='textarea'
              type='text'
              placeholder='Comment'
              row={5}
              onChange={handleChange}
              defaultValue={comment}
              edit={edit}
              style={{ backgroundColor: 'white', borderColor: borderColor, whiteSpace: 'nowrap' }}
            />
          </div>
        </Container>
        <Container style={{ padding: '15px' }}>
          {edit && (
            <ButtonGroup style={{ display: 'flex' }}>
              <Button
                className='ml-auto btn-main'
                type='submit'
                variant='light'
                onClick={handleClickUpdate}
                style={{ marginLeft: 'auto' }}
              >
                Update
              </Button>
              <Button
                className='btn-main'
                type='submit'
                variant='light'
                onClick={handleEditChange}
                style={{ marginLeft: '5px' }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          )}
        </Container>
      </div>
    </Jumbotron>
  )
}

const PasswordFields = ({ onChange, confirmed, validate, edit }) => {
  const [password, setPassword] = useState('');
  const handleConfirmChange = (name, value, validate) => [onChange('password', password, password === value)]
  const handlePasswordChange = (name, value, validate) => [setPassword(value)];
  return (
    <div style={{ flex: 1, maxWidth: '530px', minWidth: '235px', padding:"15px" }}>
      <div><strong>Password:</strong></div>
      <CustomInput
        required
        size='lg'
        name='password'
        type='password'
        placeholder='********'
        onChange={handlePasswordChange}
        edit={edit}
        validation={validate.password}
      />
      <div><strong>Confirm Password:</strong></div>
      <CustomInput
        required
        size='lg'
        type='password'
        name='passwordConfirm'
        onChange={handleConfirmChange}
        edit={edit}
        password={password}
        validation={validate.confirmPassword}
        placeholder='********'
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user.data,
    userId: state.auth.user.userId,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(Profile);