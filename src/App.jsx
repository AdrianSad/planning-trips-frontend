import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HOME_PAGE } from "./consts/routes";
import HomePage from "./pages/HomePage/HomePage";
import withLayout from "./hoc/withLayout";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={HOME_PAGE} component={withLayout(HomePage)} />
    </Switch>
  </BrowserRouter>
);

export default App;
