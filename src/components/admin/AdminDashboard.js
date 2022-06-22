import React from "react";
import { Link } from "react-router-dom";
import { userInfo } from "../../utilities/auth";
import Layout from "../Layout";

const AdminDashboard = () => {
  const { name, email, role } = userInfo();

  return (
    <Layout title="AdminDashboard Page" className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <Link className="nav-link" to="/create/category">
                  Create Category
                </Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link" to="/create/product">
                  Create Product
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">Name : {name}</li>
              <li className="list-group-item">Email : {email}</li>
              <li className="list-group-item">Role : {role}</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
