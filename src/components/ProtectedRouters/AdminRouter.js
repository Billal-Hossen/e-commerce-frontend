import { Redirect, Route } from "react-router-dom";
import { isAuthonticated, userInfo } from '../../utilities/auth';

export const AdminRouter=({ children, ...rest })=> {
  const {role}=userInfo();
    return (
      <Route
        {...rest}
        render={({ location }) =>
       ( isAuthonticated() && role==="admin") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }