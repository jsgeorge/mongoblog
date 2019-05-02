import React, { Component } from "react";
import MobileCategory from "./mobile-category";
import { connect } from "react-redux";
import { getCategories } from "../../../actions/category_actions";

class MobileCategories extends Component {
  componentDidMount = () => {
    this.props.dispatch(getCategories());
  };
  render() {
    return (
      <div>
        <MobileCategory categories={this.props.categories.byName} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};
export default connect(mapStateToProps)(MobileCategories);
