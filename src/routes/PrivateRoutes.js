import { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  // let history = useHistory();
  const { user } = useContext(UserContext);
  // console.log("user", user);

  // useEffect(() => {
  //   console.log("Check context user: ", user);
  //   let session = sessionStorage.getItem("account");
  //   if (!session) {
  //     history.push("/login");
  //     window.location.reload();
  //   }
  // }, []);
  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
  // return (
  //   <>
  //     <Route path={props.path} component={props.component} />
  //   </>
  // );
};

export default PrivateRoutes;
