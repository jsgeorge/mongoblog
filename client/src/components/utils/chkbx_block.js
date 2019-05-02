import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import Collapse from "@material-ui/core/Collapse";

class ChkBxBlock extends Component {
  state = {
    open: false,
    checked: [],
    checkedItems: []
  };

  componentDidMount() {
    //if (this.props.initState) {
    this.setState({ open: false });
    // }
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleAngle = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedItems: newChecked
    });
    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };

  renderNavs = () =>
    this.props.list
      ? this.props.list.map(nav => (
          <div>
            <ListItem key={nav._id} style={{ padding: "10px 15px" }}>
              <ListItemText primary={nav.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  onChange={this.handleToggle(nav._id)}
                  checked={this.state.checked.indexOf(nav._id) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        ))
      : null;

  render() {
    return (
      <div className="nav_block ">
        <List
          className="mobile_nav "
          style={{ borderBottom: "1px solid #dbdbdb" }}
        >
          <ListItem onClick={this.handleClick}>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div">
              {this.props.list ? (
                this.props.list.length === 0 ? (
                  <div className="no_result">No categories found</div>
                ) : null
              ) : null}
              {this.renderNavs()}
            </List>
          </Collapse>
        </List>
        <List
          className="side_nav"
          style={{ borderBottom: "1px solid #dbdbdb" }}
        >
          <ListItem>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
          </ListItem>

          <List component="div">
            {this.props.list ? (
              this.props.list.length === 0 ? (
                <div className="no_result">No categories found</div>
              ) : null
            ) : null}
            {this.renderNavs()}
          </List>
        </List>
      </div>
    );
  }
}

export default ChkBxBlock;
