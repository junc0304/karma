import React, { memo } from 'react';
import Page from './page/Page.jsx';
import { PAGE_TYPE, USER_TYPE } from '../config';

const Membership = memo(({role = USER_TYPE.ADMIN }) => {
  return (
    <Page
      role={role}
      type={PAGE_TYPE.MEMBERSHIP} 
    />
  );
});

export default Membership;
