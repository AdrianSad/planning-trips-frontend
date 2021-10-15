import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HOME, LOGIN, PROFILE, REGISTER } from "./consts/routes";
import HomePage from "./pages/HomePage/HomePage";
import withLayout from "./hoc/withLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={REGISTER} exact component={withLayout(RegisterPage)} />
        <Route path={LOGIN} exact component={withLayout(LoginPage)} />
        <Route path={PROFILE} exact component={withLayout(ProfilePage)} />
        <Route path={HOME} component={withLayout(HomePage)} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
