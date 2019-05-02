import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, withRouter } from "react-router-dom";

class MobileCategory extends Component {
  renderNavs = () =>
    this.props.categories
      ? this.props.categories.map(item => (
          <ListItem key={item._id} style={{ padding: "10px 15px" }}>
            <ListItemText style={{ cursor: "pointer" }}>
              <Link to={`/posts/${item.name}/${item._id}`}>{item.name}</Link>
            </ListItemText>
          </ListItem>
        ))
      : null;
  render() {
    return (
      <div className="category-wrapper">
        {this.props.categories ? (
          this.props.categories.length === 0 ? (
            <div>No Currnt categories</div>
          ) : (
            <div />
          )
        ) : (
          <div>Culd not get categories at this time</div>
        )}

        <h4>Categories</h4>
        <List component="div">{this.renderNavs()}</List>
      </div>
    );
  }
}

export default MobileCategory;
