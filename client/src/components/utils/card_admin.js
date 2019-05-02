import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Card extends Component {
  render() {
    const props = this.props;
    return (
      <div className="user_product_block">
        <div className="item">{props._id}</div>

        <div className="item">
          {props.brand.name} {props.name}
        </div>
        <div className="item">{props.category.name}</div>
        <div className="item">${props.price}</div>
        <div className="item">
          <Link to={`/admin/products/${props._id}`}>view</Link>
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
export default connect(mapStateToProps)(withRouter(Card));
