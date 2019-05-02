import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FormField from "../utils/form_fields";
import { update, generateData, isFormValid } from "../utils/form_actions";
import { UserLogin } from "../../actions/user_actions";
class Login2 extends Component {
  state = {
    formError: false,
    formErrMsg: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        label: true,
        labelText: "Email",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        label: true,
        labelText: "Password",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter passowrd"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm(element) {
    const newFormData = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }
  submitForm(event) {
    event.preventDefault();

    // let dataToSubmit = {};
    // let formIsValid = true;

    // for (let key in this.state.formdata) {
    //   dataToSubmit[key] = this.state.formdata[key].value;
    //   formIsValid = this.state.formdata[key].valid && formIsValid;
    // }
    let dataToSubmit = generateData(this.state.formdata, "login");
    let formIsValid = isFormValid(this.state.formdata, "login");

    if (formIsValid) {
      this.props.dispatch(UserLogin(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          console.log("User logged in");
          this.props.history.push("/");
        } else {
          this.setState({
            formError: true,
            formErrMsg: "error login"
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing Login entries"
      });
    }
  }

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="signin_wrapper">
            <h2>Sign In</h2>
            <form onSubmit={event => this.submitForm(event)}>
              <div className="enroll_input">
                <FormField
                  id={"email"}
                  formdata={this.state.formdata.email}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"password"}
                  formdata={this.state.formdata.password}
                  change={element => this.updateForm(element)}
                />

                {this.state.formError ? (
                  <div className="error_label"> {this.state.formErrMsg}</div>
                ) : null}
                <div className="button-wrapper">
                  <button
                    onClick={event => this.submitForm(event)}
                    className="button-blue"
                  >
                    Login
                  </button>
                </div>
              </div>
              <p>Not registered yer?</p>

              <div className="button-wrapper">
                <Link to={"/register"} className="button-green">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Login2));
