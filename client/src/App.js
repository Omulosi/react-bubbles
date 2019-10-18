import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

import { AuthContextProvider } from './context';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <PrivateRoute exact path="/" component={BubblePage} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
