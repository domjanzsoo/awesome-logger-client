import React from 'react';

const Home = () => {
  console.log(process.env.REACT_APP_API_URL);

  return (
    <h3> This is an awesome log system </h3>
  )
}


export default Home;
