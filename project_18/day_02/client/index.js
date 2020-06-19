import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';

const app = document.querySelector('#app');

const CheeseApp = () => {
  const [cheeses, setCheeses] = useState([]);

  useEffect(() => {
    fetch('/cheeses')
      .then(res => res.json())
      .then(data => {
        setCheeses(data.cheeses);
      });
  }, []);

  return (
    <Fragment>
      <h2> My favorite cheeses </h2>
      <ul>
        {
          cheeses.map(({ name, stinky, meltable }) => {
            return (
              <li key={name}>{name} {stinky ? 'is a stinky' :
              'is not stinky'} and is {meltable ? 'a melty' : 'not a melty'} cheese.</li>
            )
          })
        }
      </ul>
    </Fragment>
  );
};

ReactDOM.render(
  <CheeseApp />,
  app,
  () => {
    console.log('Application rendered!');
  },
);
