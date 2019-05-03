import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UserLogout } from "../../actions/user_actions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faUserCircle from "@fortawesome/fontawesome-free-solid/faUserCircle";
import FormField from "../utils/form_fields";
import { update, generateData, isFormValid } from "../utils/form_actions";

class Header extends Component {
  state = {
    mnuOpen: false
  };
  logoutHandler = () => {
    this.props.dispatch(UserLogout()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };
  handleToggle = () => {
    this.setState({ mnuOpen: !this.state.mnuOpen });
  };
  renderBars = () => (
    <FontAwesomeIcon
      icon={faBars}
      className="icon"
      onClick={this.handleToggle}
    />
  );
  render() {
    return (
      <div className="nav">
        <div className="container">
          <div className="navbar-brand">
            <Link to={"/"}>
              Mongo<span className="logo2">Blog</span>
            </Link>
          </div>

          <div className="navbar-right">
            <ul>
              <li className="mobile">
                {this.state.mnuOpen ? (
                  <Link to={"/"}>{this.renderBars()}</Link>
                ) : (
                  <Link to={"/posts/categories"}>{this.renderBars()}</Link>
                )}
              </li>
              {!this.props.user.userData ? (
                <div>Inavlid user</div>
              ) : !this.props.user.userData.isAuth ? (
                <span>
                  <li>
                    <Link to={"/login"}>Login</Link>
                  </li>
                </span>
              ) : (
                <span>
                  <li>
                    <Link to={"/user"}>
                      <span>
                        {this.props.user.userData.username ? (
                          <span>{this.props.user.userData.username}</span>
                        ) : (
                          <span>
                            {this.props.user.userData.name}{" "}
                            {this.props.user.userData.lastname}
                          </span>
                        )}
                      </span>{" "}
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="icon"
                        style={{ color: "blue" }}
                      />
                    </Link>

                    <button onClick={() => this.logoutHandler()}>Logout</button>
                  </li>

                  <li className="mobile">
                    <Link
                      to={"/posts/new"}
                      className="newPostbtn"
                      style={{ color: "#fff" }}
                    >
                      PostIt!
                    </Link>
                  </li>
                </span>
              )}
            </ul>
          </div>
          <div className="navbar-form navbar-right">
            <form>
              <input type="text" name="srchStr" placeholder="Search posts..." />
              <button>GO</button>
            </form>
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
export default connect(mapStateToProps)(withRouter(Header));
