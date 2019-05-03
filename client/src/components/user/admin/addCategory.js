import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormField from "../../utils/form_fields";
import { validate } from "../../utils/misc";
import { CategoryAdd, getCategories } from "../../../actions/category_actions";
import LayoutAdmin from "../../../Hoc/adminLayout";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
class AddCategory extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formErrMsg: "",
    formdata: {
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
      }
    }
  };
  componentDidMount() {
    const formdata = this.state.formdata;
    this.props.dispatch(getCategories());
  }
  //

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
      formSuccess: false,
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
      this.props.dispatch(CategoryAdd(dataToSubmit)).then(response => {
        if (response.payload.addSuccess) {
          this.setState({
            formSuccess: true,
            formError: false
          });
        } else {
          this.setState({
            formError: true,
            formErrMsg: "Error in addig new category"
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing Reg entries"
      });
    }
  }
  renderCategories = () =>
    this.props.categories.byName
      ? this.props.categories.byName.map(nav => (
          <div>
            <ListItem
              key={nav._id}
              style={{ padding: "10px", background: "#aaa" }}
            >
              <ListItemText primary={nav.name} />
            </ListItem>
          </div>
        ))
      : null;

  render() {
    return (
      <div className="admin_category_wrapper">
        <div class="container">
          <h2>Categories</h2>
          <div className="admin_two_column">
            <div className="left">
              <List component="div">
                {this.props.categories.byName ? (
                  this.props.categories.byName.length === 0 ? (
                    <div className="no_result">No categories found</div>
                  ) : null
                ) : null}
                {this.renderCategories()}
              </List>
            </div>
            <div className="right" style={{ paddingLeft: "20px" }}>
              <form onSubmit={event => this.submitForm(event)}>
                <div className="enroll_title">Category Name</div>
                <div className="enroll_input">
                  <FormField
                    id={"name"}
                    formdata={this.state.formdata.name}
                    change={element => this.updateForm(element)}
                  />

                  {this.state.formSuccess ? (
                    <div className="success_label">
                      Success - Record saved to database
                    </div>
                  ) : null}
                  {this.state.formError ? (
                    <div className="error_label">
                      Error - Could not save category
                    </div>
                  ) : null}

                  <button
                    onClick={event => this.submitForm(event)}
                    className="button"
                  >
                    Add Category
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
export default connect(mapStateToProps)(withRouter(AddCategory));
