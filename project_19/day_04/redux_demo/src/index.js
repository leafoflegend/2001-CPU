// Redux is just a state management library. It is agnostic of its environment.

import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';

// He combined a pattern known as an "event emitter" with a functional paradigm for managing state.

// Event Emitter
// A pattern in which many objects in a programming language or system can communicate to one another by expressing "events"

// State
// Representation of data that makes an app work, or look a certain way. State is changing.

// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//
//   emit(event, data) {
//     this.events[event].forEach(cb => cb(data));
//   }
//
//   subscribe(event, callback) {
//     if (!this.events[event]) {
//       this.events[event] = [];
//     }
//
//     this.events[event].push(callback);
//   }
// }
//
// const ticketMaster = new EventEmitter();
//
// ticketMaster.subscribe('Rolling Stones Tickets', (tickets) => {
//   console.log('Rolling stones tickets are out!', tickets);
// });
//
// // ... some stuff happens
//
// ticketMaster.emit('Rolling Stones Tickets', [{ id: 1, row: 'F', col: 23 }]);

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  // an action is reduxs word for 'event' more specifically, its an event that is REQUESTING a CHANGE to STATE.
  console.log('Action: ', action);

  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const Counter = () => {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    store.subscribe(() => {
      setCount(store.getState().count);
    });
  }, []);

  return <h3> {count} </h3>
};

const Increment = () => {
  return <button onClick={() => store.dispatch({ type: 'INCREMENT' })}> Increment </button>
};

const Decrement = () => {
  return <button onClick={() => store.dispatch({ type: 'DECREMENT' })}> Decrement </button>
};

const App = () => <div>
  <Counter />
  <Increment />
  <Decrement />
</div>;

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);
