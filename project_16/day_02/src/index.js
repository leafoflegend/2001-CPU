import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const app = document.querySelector('#app');

const NotFound = ({ location: { pathname } }) => {
  return <h2> Page: {pathname} Not Found </h2>;
}

const HelloWorld = (props) => {
  console.log('Props: ', props);

  return (
    <h1>Hello World v2!</h1>
  )
}

const Pokemon = (props) => {
  const pokemonName = props.match.params.name;

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    window.fetch(`/api/pokemon/${pokemonName}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
      });
  }, []);

  return (
    <div>
      {
        pokemon && (
          <div>
            <h2>{pokemon.name}</h2>
            <ul>
              <li>Level: {pokemon.level}</li>
              <li>Type: {pokemon.type}</li>
            </ul>
          </div>
        )
      }
    </div>
  )
};

const Application = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HelloWorld} />
        <Route path="/pokemon/:name" component={Pokemon} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Application />,
  app,
  () => {
    console.log('App has rendered!');
  },
);
