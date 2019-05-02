import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormField from "../utils/form_fields";
import { validate } from "../utils/misc";
import { UserEdit } from "../../actions/user_actions";

class EditAccount extends Component {
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
      },
      username: {
        element: "input",
        value: "",
        config: {
          name: "username_input",
          type: "text",
          placeholder: "Enter username"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    const newFormData = this.populateFields(
      this.state.formdata,
      this.props.user.userData
    );
    this.setState({
      formdata: newFormData
    });
  }
  populateFields(formData, fields) {
    for (let key in formData) {
      formData[key].value = fields[key];
      formData[key].valid = true;
      formData[key].validationMessage = "";
    }
    return formData;
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
        .dispatch(UserEdit(dataToSubmit))
        .then(response => {
          if (response.payload.editSuccess) {
            this.setState({
              formError: false,
              formErrMsg: ""
            });
            this.props.history.push("/user");
          } else {
            this.setState({
              formError: true,
              formErrMsg: "error in updating  user"
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
            formErrMsg: "error in updating user"
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
  render() {
    return (
      <div className="signin_wrapper">
        <h2>Edit Account</h2>
        <form onSubmit={event => this.submitForm(event)}>
          <div className="enroll_title">Email</div>
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
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
          <div className="enroll_title">Username</div>
          <FormField
            id={"username"}
            formdata={this.state.formdata.username}
            change={element => this.updateForm(element)}
          />
          {/* {this.state.formError ? (
            <div className="error_label"> {this.state.formErrMsg}</div>
          ) : null} */}

          <button onClick={event => this.submitForm(event)} className="button">
            Update
          </button>
          <Link to={"/"}>Cancel</Link>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(EditAccount);
