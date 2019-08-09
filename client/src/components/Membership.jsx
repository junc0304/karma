import React, { memo } from 'react';
import Page from './page/Page.jsx';
import { PAGE_TYPE } from '../config';

const Membership = memo(() => {
  const type = PAGE_TYPE.MEMBERSHIP;
  return (
    <Page type={type}/>
  );
});
export default Membership;
