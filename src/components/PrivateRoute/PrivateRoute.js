import React, { useContext } from "react";
import { Redirect, useLocation, Route } from "react-router";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const [user, setUser] = useContext(UserContext);
  let location = useLocation();
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          user.isSignedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
}

export default PrivateRoute;
