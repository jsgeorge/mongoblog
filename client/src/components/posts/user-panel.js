import React, { Component } from "react";
import { connect } from "react-redux";

class UserPanel extends Component {
  render() {
    return (
      <div className="user-panel">
        <div className="header">
          {!this.props.user.userData.isAuth ? (
            <span>
              <h3>Welcome!</h3>
            </span>
          ) : (
            <span>
              {this.props.user.userData.name}
              {this.props.user.userData.lastname}
            </span>
          )}
        </div>
        <div className="body">
          {!this.props.user.userData.isAuth ? (
            <span>
              <h4>Sign in or register to add your posts!</h4>
            </span>
          ) : (
            <span>
              {this.props.user.userData.email}
              <br />
              {this.props.user.userData.following.length} following
              <br />
              {this.props.user.userData.posts} posts
            </span>
          )}
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
export default connect(mapStateToProps)(UserPanel);
