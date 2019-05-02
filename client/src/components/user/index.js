import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { UserLogout } from "../../actions/user_actions";
const logoutHandler = () => {
  this.props.dispatch(UserLogout()).then(response => {
    if (response.payload.success) {
      this.props.history.push("/");
    }
  });
};
class UserInfo extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <h3>User Info</h3>
          <div className="user-panel">
            <div className="header">
              <span>
                {this.props.user.userData.name}
                {this.props.user.userData.lastname}
                <br />
                {this.props.user.userData.username
                  ? this.props.user.userData.username
                  : null}
              </span>
            </div>
            <div className="body">
              <span>
                {this.props.user.userData.email}
                <br />
                {this.props.user.userData.following.length} following
                <br />
                {this.props.user.userData.posts} posts
              </span>
              <div className="button-wrapper">
                <Link to="/edit-account" className="button-blue">
                  Edit
                </Link>
              </div>
              <button onClick={() => logoutHandler()}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(UserInfo);
