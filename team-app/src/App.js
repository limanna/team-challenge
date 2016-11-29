import React, { Component } from 'react';
import SignUpForm from './TeamSignUp.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Sign Up</h1>
          <h2>Our service is awesome and fun, but you must be 13 years old to join</h2>
        </div>
        <SignUpForm />
      </div>
    );
  }
}

export default App;
