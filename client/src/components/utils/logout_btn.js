import React, { Component } from "react";
import { UserLogout } from "../../actions/user_actions";

class LogoutBtn extends Component {
  logoutHandler = () => {
    this.props.dispatch(UserLogout()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="button_wrapper">
        <button className="transp-btn-blk" onClick={() => this.logoutHandler()}>
          Log out
        </button>
      </div>
    );
  }
}

export default LogoutBtn;
