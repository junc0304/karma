import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Page from './Page.Components/Page';
import * as actions from '../../actions';

let sampleData = {
  title: "Membership",
  heading: "membership heading",
  content: "membership content"
};

const Membership = ({ page, postText }) => {
  const [data, setData] = useState(sampleData);

  useEffect(() => {
    const postData = async () => {
      try {
        //await postText(data);
      }
      catch (error) {
        console.log("Membership post", data, error);
      }
    }
    postData();
  }, [setData]);

  //debug
  useEffect(()=> {
    console.log({data, page, postText});
  })
  
  return (
    <Page
      data={data}
      setData={setData} />
  );
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.user,
    page: state.page
  };
}

export default connect(mapStateToProps, actions)(Membership);