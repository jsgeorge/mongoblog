import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const LayoutAdmin = props => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="user_container">
          <div className="user_left_nav desktop tablet">
            <div className="links">
              <h3>My Account</h3>

              <Link to="/user">My account</Link>

              <Link to="/user">User Info</Link>

              <Link to="/user">My Cart</Link>
            </div>
            {props.user.userData.isAdmin ? (
              <div className="links">
                <h3>Admin</h3>
                <Link to="/user">Site info</Link>
                <Link to="/admin/categories/add">Add Categories</Link>
              </div>
            ) : null}{" "}
            }
          </div>

          {/* <div className="user_right">{props.children}</div> */}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(LayoutAdmin);
