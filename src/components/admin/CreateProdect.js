import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userInfo } from "../../utilities/auth";
import { showError, showLoading, showSuccess } from "../../utilities/massages";
import Layout from "../Layout";
import { createProduct, getCategory } from "./apiAdmin";

const CreateProdect = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    quantity: "",
    loading: false,
    error: false,
    success: false,
    disabled: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    quantity,
    loading,
    error,
    success,
    formData,
    disabled,
    categories,
  } = values;
  useEffect(() => {
    getCategory()
      .then((res) => {
        setValues({
          ...values,
          categories: res.data,
          formData: new FormData(),
        });
      })
      .catch((err) => {
        setValues({
          ...values,
          error: "Failed to load categories",
          formData: new FormData(),
        });
      });
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      disabled: true,
      success: false,
    });
    const { token } = userInfo();
    createProduct(token, formData)
      .then((response) => {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: "",

          quantity: "",
          loading: false,
          disabled: false,
          success: true,
          error: false,
        });
      })
      .catch((error) => {
        let errMsg = "Something went Wrong!!";
        if (error.response) return (errMsg = error.response?.data);
        setValues({
          ...values,
          error: errMsg,
          success: false,
          loading: false,
          disabled: false,
        });
      });
  };

  return (
    <Layout title="Create product page" className="container">
      <div className="row">
        <div className="col-md-8 ">
          {showError(error, error)}
          {showLoading(loading)}
          {showSuccess(success, "Product Added Successfully!")}
          <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Photo:</h4>
            <div className="form-group">
              <label className="btn btn-secondary">
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="text-muted">Name:</label>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                className="form-control"
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Description:</label>
              <textarea
                name="description"
                onChange={handleChange}
                className="form-control"
                value={description}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Price:</label>
              <input
                name="price"
                onChange={handleChange}
                className="form-control"
                type="number"
                value={price}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Quantity:</label>
              <input
                name="quantity"
                onChange={handleChange}
                className="form-control"
                type="number"
                value={quantity}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Category:</label>
              <select
                name="category"
                value={category}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">----Select Category----</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              className="btn btn-outline-primary"
              type="submit"
              disabled={disabled}
            >
              Create Product
            </button>
          </form>
          <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProdect;
