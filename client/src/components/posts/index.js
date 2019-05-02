import React, { Component } from "react";
import { connect } from "react-redux";
import PostBlock from "./post-block";
import UserPanel from "./user-panel";
// import categories from "../../db/categories.json";
// import posts from "../../db/posts.json";
import { getCategories } from "../../actions/category_actions";
import { getPosts } from "../../actions/post_actions";
import CategoryNav from "./categories";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import FormField from "../utils/form_fields";
import { update, generateData, isFormValid } from "../utils/form_actions";

class Posts extends Component {
  state = {
    grid: "",
    limit: 20,
    skip: 0,
    ctgryId: "",
    srchStr: "",
    filters: {
      category: [],
      user: [],
      title: ""
    },
    msg: "",
    err: false,
    errMsg: "",
    active: false,
    formError: false,
    formErrMsg: "",
    formdata: {
      title: {
        element: "input",
        value: "",
        label: false,
        labelText: "title",
        config: {
          name: "title_input",
          type: "text",
          placeholder: "Search Posts"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentWillMount() {
    this.props.getCategories();
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      console.log(id);
      this.handleFilters(id, "category");
    } else {
      const { skip, limit, filters } = this.state;
      this.props.getPosts(skip, limit, filters);
    }
  }
  componentDidMount = () => {
    //const { skip, limit, filters } = this.state;
    // this.props.dispatch(getCategories());
    //this.props.dispatch(getPosts(skip, limit, filters));
  };
  searchPostsHandler = event => {
    // event.preventDefault();
    // const value = event.target.value === "" ? false : true;
    // this.setState({
    //   active: value
    // });

    //this.setState({ srchStr: event.target.value });
    //this.handleFilters(this.state.srchStr, "search");
    // let filtered = this.state.posts.filter(item => {
    //   return item.title.indexOf(srchStr) > -1;
    // });
    // this.setState({
    //   filtered
    // });
    let srch = event.target.value;
    //this.setState({ srchStr: srch });
    this.handleFilters(srch, "title");
  };
  handleFilters = (filters, type) => {
    const newFilters = { ...this.state.filters };
    newFilters[type] = filters;
    if (type === "title") {
      newFilters["title"] = filters;
    }
    console.log(newFilters);
    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };
  handleSearch = () => {
    console.log(this.state.srchStr);
    // const newFilters = { ...this.state.filters };
    // newFilters["title"] = this.state.srchStr;
    // this.showFilteredResults(newFilters);
    // this.setState({
    //   filters: newFilters
    // });
  };
  updateForm(element) {
    const newFormData = update(element, this.state.formdata, "comment");
    this.setState({
      formError: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }

  showFilteredResults = filters => {
    console.log(filters);
    this.props.dispatch(getPosts(0, this.state.limit, filters)).then(() => {
      this.setState({ skip: 0 });
    });
  };
  submitSearch(event) {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "srchTitle");
    let formIsValid = isFormValid(this.state.formdata, "srchTitle");

    if (formIsValid) {
      console.log(dataToSubmit.title);
      const title = dataToSubmit.title;
      this.handleFilters(title, "title");
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing  entries"
      });
    }
  }
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <div className="posts-wrapper">
            <div
              className="search-form-mobile"
              style={{
                background: `${this.state.active ? "blue" : "#fff"}`
              }}
            >
              <form onSubmit={event => this.submitSearch(event)}>
                {/* <input
                  type="text"
                  name="srchStr"
                  id="srchStr"
                  placeholder="Search posts..."
                  onChange={this.searchPostsHandler}
                />
                <button onClick={() => this.handleSearch}>GO</button> */}
                <FormField
                  id={"title"}
                  formdata={this.state.formdata.title}
                  change={element => this.updateForm(element)}
                />
                <button onClick={event => this.submitSearch(event)}>GO</button>
              </form>
            </div>

            {this.props.posts && this.props.posts.toViewSize > 0 ? (
              <div>
                <PostBlock
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.posts.toViewSize}
                  posts={this.props.posts.toView}
                />
              </div>
            ) : (
              <div className="msg">
                No posts found for the selected creteria
              </div>
            )}
          </div>

          <div className="sidebar">
            {this.props.user.userData.isAuth ? (
              <span>
                <div className="newPost">
                  <Link to={"/posts/new"} className="btnNewPost">
                    New Post
                  </Link>
                </div>
              </span>
            ) : null}
            <div>
              <CategoryNav
                categories={this.props.categories.byName}
                handleFilters={filters =>
                  this.handleFilters(filters, "category")
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    categories: state.categories,
    posts: state.posts
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCategories,
      getPosts
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
