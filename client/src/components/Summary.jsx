import React, { memo } from 'react';
import Page from './page/Page.jsx';
import { PAGE_TYPE } from '../config';

export default memo(() => {
  const type = PAGE_TYPE.SUMMARY;
  return (
    <Page type={type}/>
  );
});

