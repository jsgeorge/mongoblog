import React, { Component } from "react";
import { connect } from "react-redux";
import FormField from "../utils/form_fields";
import {
  update,
  generateData,
  populateOptionFields,
  isFormValid
} from "../utils/form_actions";
import { getCategories } from "../../actions/category_actions";
import { PostAdd } from "../../actions/post_actions";
import FileUpload from "../utils/fileupload";

class AddPost extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formErrMsg: "",
    categories: [],
    formdata: {
      title: {
        element: "input",
        value: "",
        label: false,
        labelText: "Title",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter title"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      text: {
        element: "textarea",
        value: "",
        label: false,
        labelText: "Post Text",
        config: {
          name: "text_input",
          type: "text",
          placeholder: "Enter your post",
          rows: 5
        },
        validation: {
          required: false
        },
        valid: true,
        validationMessage: ""
      },
      category: {
        element: "select",
        value: "",
        label: true,
        labelText: "Category",
        config: {
          name: "category_input",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      images: {
        value: [],
        validation: {
          required: true
        },
        valid: true,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    const formdata = this.state.formdata;
    this.props.dispatch(getCategories()).then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.categories.byName,
        "category"
      );
      this.setState({
        formdata: newFormData
      });
    });
  }
  updateForm(element) {
    const newFormData = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }
  imagesHandler = images => {
    const newFormData = {
      ...this.state.formdata
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData
    });
  };
  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "addpost");
    let formIsValid = isFormValid(this.state.formdata, "addpost");

    if (formIsValid) {
      this.props.dispatch(PostAdd(dataToSubmit)).then(response => {
        if (response.payload.addSuccess) {
          this.props.history.push("/");
        } else {
          this.setState({
            formError: true,
            formErrMsg: "Error Could  not post at this time"
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing  entries"
      });
    }
  }
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <div className="add-post-wrapper">
            <div className="post-detail">
              <div clasName="page-top">
                <h3>Add Post</h3>
              </div>
              <form onSubmit={event => this.submitForm(event)}>
                <FormField
                  id={"title"}
                  formdata={this.state.formdata.title}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"text"}
                  formdata={this.state.formdata.text}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"category"}
                  formdata={this.state.formdata.category}
                  change={element => this.updateForm(element)}
                />

                <FileUpload
                  imagesHandler={images => this.imagesHandler(images)}
                  reset={this.state.formSuccess}
                />

                {this.state.formError ? (
                  <div className="error_label">{this.state.formErrMsg}</div>
                ) : null}
                <div className="button-wrapper">
                  <button
                    onClick={event => this.submitForm(event)}
                    className="button-blue"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};
export default connect(mapStateToProps)(AddPost);
