import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [syrups, setSyrups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/syrups')
      .then(res => {
        setSyrups(res.data.syrups);
        console.log('Set Syrups!!!');
      })
      .catch((e) => {
        console.error('Failed to fetch syrups.');
        throw e;
      });
  }, []);

  return (
    <h1> Hello World!!!!! </h1>
  );
}

const app = document.querySelector('#app');

ReactDOM.render(<App />, app);
