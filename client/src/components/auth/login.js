import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormField from "../utils/form_fields";
import { validate } from "../utils/misc";
import { UserLogin } from "../../actions/user_actions";
class Login extends Component {
  state = {
    formError: false,
    formErrMsg: "",
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
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
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter passowrd"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if (formIsValid) {
      this.setState({ formSuccess: dataToSubmit.password });
      this.props
        .dispatch(UserLogin(dataToSubmit.email, dataToSubmit.password))
        .then(response => {
          if (response.payload.loginSuccess) {
            console.log("User logged in");
            this.setState({ formSuccess: "User Successfully logged in" });
            //this.props.history.push("/admin/dashboard");
          } else {
            this.setState({
              formError: true,
              formErrMsg: response.payload.message
            });
          }
        });
    } else {
      this.setState({
        formError: true,
        formSuccess: "",
        formErrMsg: "Error. Invalid/Missing Login entries"
      });
    }
  }
  updateForm(element) {
    const newFormData = { ...this.state.formdata };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;

    let valiData = validate(newElement);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }
  render() {
    return (
      // <div className="page_wrapper">
      //   <div className="container">
      //     <div className="register_login_container">
      //       <div className="left">
      //         <h2>New User</h2>
      //         <Link to={"/register"}>Register</Link>
      //       </div>
      //       <div className="right">
      <div className="page_wrapper">
        <div className="container">
          <div className="signin_wrapper">
            <h2>Sign In</h2>
            <form onSubmit={event => this.submitForm(event)}>
              <div className="enroll_title">Email</div>
              <div className="enroll_input">
                <FormField
                  id={"email"}
                  formdata={this.state.formdata.email}
                  change={element => this.updateForm(element)}
                />
                <div className="enroll_title">Password</div>
                <FormField
                  id={"password"}
                  formdata={this.state.formdata.password}
                  change={element => this.updateForm(element)}
                />

                <div className="success_label">{this.state.formSuccess}</div>
                {this.state.formError ? (
                  <div className="error_label"> {this.state.formErrMsg}</div>
                ) : null}

                <button onClick={event => this.submitForm(event)}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(Login);
