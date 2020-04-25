# Questions for Saturday

- ✅ how to store the token and username in state?
  - We get the token by using our username, so the username has to be made available first.
  - Once we have that, we probably do a ternary in terms of "how" to get the token.
    - Check localstorage, if its there, attempt to use that.
    - If its not there, go fetch a new one, and attempt to use that.
  - If the token you attempted to use works, store it in state (and localStorage if its new).
  - If it didn't work, its likely expired, so you'll have to re-login to get the token, then store in state/localStorage.
- regex?
- Getting things to render
- Best practice with state and the flow of the data
- Conditionally rendering certain things based on what's in state (i.e. if the user is logged in, render this, otherwise, render that.)
- CSS Implementation (not examples of styling, more where to write stuff to hook it up)
  - Nuts & Bolts of CSS Frameworks
    - CSS @import vs `<link rel="somefile.css">`
    - Downloading the css file vs using a CDN
    - How to "use" the classes (example of going to documentation, finding the html classes to add...)
