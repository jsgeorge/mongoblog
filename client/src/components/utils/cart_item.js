import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductById } from "../../actions/product_actions";

class CartItem extends Component {
  componentDidMount() {
    const props = this.props;
    // this.props.dispatch(getProductById(props.id, "single"));
  }
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  }
  render() {
    const props = this.props;

    return (
      <div>
        {/* {this.props.products.byId
          ? this.props.products.byId.map(product => (
              <div> */}
        <td>
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(props.images)}) no-repeat`
            }}
          />
        </td>

        <td>{props.name}</td>
        <td>${props.price} </td>

        <td>{props.quantity}</td>
        <td>${props.price * props.quantity}</td>
      </div>
      //       ))
      //     : "loading"}
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(CartItem);
