import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { RouterLink, PrivateRoute } from "./PrivateRouter";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <RouterLink exact path="/register" component={Register} />
          <RouterLink exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
