# Questions/Concepts for Thursday Demo

- Form `submit` handlers
  - Why should we attach the handler to the `submit` event of the *form* not the `click` event of the *button*.
  - On a button, is `type="submit"` required for the button to trigger form submit event?
  - What happens if you have multiple buttons in the form?   How does the form know which button to use?
  - Will `required` only work if it is a `submit` event?  What other attributes won't work otherwise?
  - History of forms? Default behavior of forms? (like why is the submit attached to the form not the button, that seems silly…)
- `filter()`
  - What does it return? (array)
  - What does it take? (callback)
  - What does the callback take (an element of the array)
  - How to execute the logic (return a boolean from the callback)
- Response codes (not too deep, we'll be getting into this soon anyway!) 
  - Are 500s or 400s technically errors?  
  - If a 500 comes back, will it throw an error?  
  - Will a 500 be caught by a `try/catch` block?  What about 401?
  