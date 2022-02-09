import { Redirect, Route } from "react-router-dom";
import { isAuthonticated } from '../../utilities/auth';

export const PrivateRoute=({ children, ...rest })=> {
  
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthonticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }