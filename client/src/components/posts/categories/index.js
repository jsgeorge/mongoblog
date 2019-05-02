import React, { Component } from "react";
//import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class CategoryNav extends Component {
  state = {
    value: ""
  };
  handleClick = id => {
    console.log(id);
    this.setState(
      {
        value: id
      },
      () => {
        this.props.handleFilters(id);
      }
    );
  };
  renderNavs = () =>
    this.props.categories
      ? this.props.categories.map(item => (
          <ListItem
            key={item._id}
            onClick={() => {
              this.handleClick(item._id);
            }}
            style={{ padding: "10px 15px" }}
          >
            <ListItemText style={{ cursor: "pointer" }}>
              {item.name}
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
export default CategoryNav;
