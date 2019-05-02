import React, { Component } from "react";
import Header from "../components/header_footer2/header";
import Footer from "../components/header_footer2/footer";

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
