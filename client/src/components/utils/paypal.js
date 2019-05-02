import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment);
    };
    const onCancel = data => {};
    const onError = data => {};
    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;
    const client = {
      sandbox:
        "AaUhF9y8Jr1zFNNISvMvCVHLhHxPMSeeBmWNzK8S_V_0bYY7NW7moE797faknx6sYM3RZi5QIV4WOAcp",
      production:
        "EPu-GTT1vOSZuqOHTHNRbvhFehcCiZZ9lmcuw8Bf287CmDFDsSoR9WwKVbfZC500XZBqTvdpm5g-hL86"
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default Paypal;
