import React from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import{ HelmetProvider } from 'react-helmet-async';

//import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <main>
          <Route path = '/' exact component = {Login} />
          <Route path = '/main' component = {Main} />
        </main>
      </Router>
    </HelmetProvider>
  );
}

export default App;
