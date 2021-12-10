import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Routes/Home/Home';
import Quiz from './Routes/Quiz/Quiz';
import Results from './Routes/Results/Results';

function App() {
  return (
    <div className="app">
      <Router>    
        <Header/>
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
    </div>
  );
}

export default App;
