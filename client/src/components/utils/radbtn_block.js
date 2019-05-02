import React, { Component } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class RadioBlock extends Component {
  state = {
    open: false,
    value: "0"
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: false });
    }
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

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <FormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<Radio />}
            label={value.name}
          />
        ))
      : null;

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div className="nav_block ">
        <List
          className="mobile_nav"
          style={{ borderBottom: "1px solid #dbdbdb", paddingLeft: "10px" }}
        >
          <ListItem onClick={this.handleClick}>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
        <List
          className="side_nav"
          style={{ borderBottom: "1px solid #dbdbdb", paddingLeft: "10px" }}
        >
          <ListItem>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
          </ListItem>
          <List component="div" disablePadding>
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.renderList()}
            </RadioGroup>
          </List>
        </List>
      </div>
    );
  }
}

export default RadioBlock;
