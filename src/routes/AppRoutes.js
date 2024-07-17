import Users from "../components/ManageUsers/Users";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Roles from "../components/Role/Roles";

const AppRoutes = (props) => {
  const Project = () => {
    return <span>Project</span>;
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Project} />
        <PrivateRoutes path="/roles" component={Roles} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          Home
        </Route>
        <Route path="*">404 Not Found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
