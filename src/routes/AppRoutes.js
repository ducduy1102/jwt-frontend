import Users from "../components/ManageUsers/Users";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import Home from "../components/Home/Home";
import Project from "../components/Project/Project";
import About from "../components/About/About";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Project} />
        <PrivateRoutes path="/about" component={About} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <div className="container">404 Not Found</div>
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
