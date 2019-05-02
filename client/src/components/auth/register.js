import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FormField from "../utils/form_fields";
import { validate } from "../utils/misc";
import { UserRegister } from "../../actions/user_actions";
class Register extends Component {
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
      },
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter name"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter lastname"
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
      this.props
        .dispatch(UserRegister(dataToSubmit))
        .then(response => {
          if (response.payload.regSuccess) {
            this.setState({
              formError: false,
              formErrMsg: ""
            });
            this.props.history.push("/");
          } else {
            this.setState({
              formError: true,
              formErrMsg: response.payload.regError.value
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
            formErrMsg: "error2 in registering user"
          });
        });
    } else {
      this.setState({
        formError: true,
        formSuccess: "",
        formErrMsg: "Error. Invalid/Missing Reg entries"
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
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <h2>Existing User</h2>
              <Link to="/login" className="button">
                Login
              </Link>
            </div>
            <div className="right">
              <div className="signin_wrapper">
                <h2>Register</h2>
                <form onSubmit={event => this.submitForm(event)}>
                  <div className="enroll_title">Email</div>
                  <FormField
                    id={"email"}
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                  <div className="enroll_input">Password</div>
                  <FormField
                    id={"password"}
                    formdata={this.state.formdata.password}
                    change={element => this.updateForm(element)}
                  />
                  <div className="enroll_title">First Name</div>
                  <FormField
                    id={"name"}
                    formdata={this.state.formdata.name}
                    change={element => this.updateForm(element)}
                  />
                  <div className="enroll_title">Last Name</div>
                  <FormField
                    id={"lastname"}
                    formdata={this.state.formdata.lastname}
                    change={element => this.updateForm(element)}
                  />
                  {this.state.formError ? (
                    <div className="error_label"> {this.state.formErrMsg}</div>
                  ) : null}

                  <button
                    onClick={event => this.submitForm(event)}
                    className="button"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Register));
