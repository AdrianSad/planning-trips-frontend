import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HOME, LOGIN, REGISTER } from "./consts/routes";
import HomePage from "./pages/HomePage/HomePage";
import withLayout from "./hoc/withLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={REGISTER} exact component={withLayout(RegisterPage)} />
      <Route path={LOGIN} exact component={withLayout(LoginPage)} />
      <Route path={HOME} component={withLayout(HomePage)} />
    </Switch>
  </BrowserRouter>
);

export default App;
