import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthonticated, signOut, userInfo } from "../utilities/auth";

const Menu = () => {
  //   const [role,setRole]=useState("")
  //  useEffect(()=>{
  //   const {role}=userInfo();
  //   setRole(role)

  //  },[role])
  const history = useHistory();
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        {!isAuthonticated() ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            {/* <li className="nav-item">
         <Link className="nav-link"  to="/product/:id">Login</Link>
     </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to={`/${userInfo().role}/dashboard`}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">
                Cart
              </Link>
            </li>
            <li className="nav-item cursor-pointer text-success">
              <span
                className="nav-link "
                onClick={() => {
                  signOut(() => {
                    {
                      history.push("/login");
                    }
                  });
                }}
              >
                Log Out{" "}
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
