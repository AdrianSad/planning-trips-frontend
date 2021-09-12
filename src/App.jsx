import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {HOME_PAGE} from "./consts/routes";
import HomePage from "./pages/HomePage";

const App = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME_PAGE} component={HomePage}/>
      </Switch>
    </BrowserRouter>
);

export default App;
