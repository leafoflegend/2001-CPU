import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { divContainer } from './styles';

const app = document.querySelector('#app');

const RInput = ({ label, handleChange, value }) => {
  return (
    <label>
      { label }
      <input
        onChange={handleChange}
        value={value}
      />
    </label>
  );
};

const TrimmedText = ({ charAmount, text }) => {
  let trimmedText = text.slice(0, charAmount);

  if (trimmedText.length === 0) {
    trimmedText = 'No Characters Remaining';
  } else if (trimmedText.length !== text.length) {
    trimmedText += '...';
  }

  return (
    <span>{ trimmedText }</span>
  )
}

const TrimInput = () => {
  const [text, setText] = useState('');
  const [charAmount, setCharAmount] = useState(0);

  console.log('text: ', text);
  console.log('charAmount: ', charAmount);

  const setTextToTrim = (e) => {
    const { target: { value } } = e;

    setText(value);
  }

  const setCharAmountForTrim = (e) => {
    const { target: { value } } = e;

    const parsedVal = parseInt(value);

    if (typeof parsedVal === 'number' && !isNaN(parsedVal)) {
      setCharAmount(parsedVal);
    }
  }

  return (
    <div style={divContainer}>
      <RInput
        label={'Text to trim: '}
        handleChange={setTextToTrim}
        value={text}
      />
      <RInput
        label={'Number of characters: '}
        handleChange={setCharAmountForTrim}
        value={charAmount}
      />
      <TrimmedText
        charAmount={charAmount}
        text={text}
      />
    </div>
  );
}

ReactDOM.render(
  <TrimInput />,
  app,
);
