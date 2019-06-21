import React, { memo } from 'react';
import Page from './page/Page';
import { PAGE_TYPE, USER_TYPE } from '../config';

const Home = memo(({role = USER_TYPE.ADMIN }) => {
  return (
    <Page
      role={role}
      type={PAGE_TYPE.HOME} />
  );
});

export default Home;
