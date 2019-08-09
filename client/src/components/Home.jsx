import React, { memo } from 'react';
import Page from './page/Page.jsx';
import { PAGE_TYPE } from '../config';

const Home = memo(() => {
  const type = PAGE_TYPE.HOME;
  return (
    <Page type={type}/>
  );
});

export default Home;