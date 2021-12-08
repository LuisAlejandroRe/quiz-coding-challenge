import axios from 'axios';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './Routes/Home/Home';
import Quiz from './Routes/Quiz/Quiz';
import Results from './Routes/Results/Results';

function App() {

  useEffect(() => {
    
    axios.get('https://opentdb.com/api_category.php')
      .then( res => {
        console.log(res);
      })
      .catch(error => console.error(error.message))

  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        <Route exact path="/results">
          <Results />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
