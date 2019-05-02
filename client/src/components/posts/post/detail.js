import React, { Component } from "react";
import moment from "moment/moment.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import posts from "../../../db/posts.json";
// import categories from "../../../db/categories.json";
import CategoryNav from "../categories";
import { getCategories } from "../../../actions/category_actions";
import {
  getPostsbyId,
  clearPostById,
  commentAdd
} from "../../../actions/post_actions";
import FormField from "../../utils/form_fields";
import { update, generateData, isFormValid } from "../../utils/form_actions";

class PostDetail extends Component {
  title = this.props.match.params.label;
  state = {
    filtered: [],
    msg: "",
    active: false,
    formError: false,
    formErrMsg: "",
    formdata: {
      comment: {
        element: "input",
        value: "",
        label: false,
        labelText: "comment",
        config: {
          name: "comment_input",
          type: "text",
          placeholder: "Enter comment"
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

  componentDidMount() {
    const postId = this.props.match.params.id;
    // let filtered = this.state.posts.filter(item => {
    //   return item.id.indexOf(postId) > -1;
    // });
    // this.setState({
    //   filtered
    // });
    this.props.dispatch(getPostsbyId(postId, "single"));

    this.props.dispatch(getCategories());
  }
  componentWillUnmount() {
    this.props.dispatch(clearPostById());
  }
  // renderPost = () =>
  //   this.state.filtered
  //     ? this.state.filtered.map(item => (
  //         <div className="post-detail">
  //           <h6>{item.category.name}</h6>
  //           <div className="author">
  //             <strong>{item.author}</strong> {item.postDate}
  //           </div>

  //           <h3>{item.title}</h3>
  //           <p>{item.text}</p>

  //           <div className="comments-likes">
  //             comments ({item.comments.length}) likes: ({item.likes})
  //           </div>
  //           <div className="comments" />
  //           {item.comments ? (
  //             item.comments.map(com => (
  //               <div className="comment">
  //                 <strong>{com.user}</strong> {com.text}
  //               </div>
  //             ))
  //           ) : (
  //             <p>No Comments Yet</p>
  //           )}
  //         </div>
  //       ))
  //     : null;
  updateForm(element) {
    const newFormData = update(element, this.state.formdata, "comment");
    this.setState({
      formError: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }
  submitComment(event) {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "addcomment");
    let formIsValid = isFormValid(this.state.formdata, "addcomment");

    if (formIsValid) {
      const postId = this.props.match.params.id;
      this.props.dispatch(commentAdd(postId, dataToSubmit)).then(response => {
        if (response.payload.addSuccess) {
          // this.props.history.push("/");
        } else {
          this.setState({
            formError: true,
            formErrMsg: "Error Could  not post at this time"
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing  entries"
      });
    }
  }
  renderImage = images => {
    return images[0].url;
  };
  renderPostImage = images =>
    images.length > 0 ? (
      <div
        className="post-image"
        style={{
          background: `url(${this.renderImage(images)}) no-repeat`
        }}
      />
    ) : null;
  renderAddComment = () =>
    this.props.user.userData.isAuth ? (
      <div className="add-comment">
        <h5>Add your Comment</h5>
        <form onSubmit={event => this.submitComment(event)}>
          <FormField
            id={"comment"}
            formdata={this.state.formdata.comment}
            change={element => this.updateForm(element)}
          />
          <div className="button-wrapper">
            <button
              onClick={event => this.submitComment(event)}
              className="button-green"
            >
              GO
            </button>
          </div>
        </form>
      </div>
    ) : null;
  renderLike = () =>
    this.props.user.userData.isAuth ? (
      <div className="like-btn-wrapper">
        <button className="like-btn">Like</button>
      </div>
    ) : null;
  renderComments = comments =>
    comments ? (
      comments.map(com => (
        <div className="comment">
          <strong>{com.username}</strong> {com.comment}
        </div>
      ))
    ) : (
      <p>No Comments Yet</p>
    );
  renderPost = () =>
    this.props.posts.byId
      ? this.props.posts.byId.map(item => (
          <div className="post-detail">
            <h6>{item.category.name}</h6>
            <div className="author">
              <strong>
                {item.author.name} {item.author.lastname}
              </strong>{" "}
              {item.createdAt
                ? moment(item.createdAt).format("MM-DD-YYYY")
                : item.postDate}
            </div>
            {this.renderPostImage(item.images)}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="comments-likes">
              comments ({item.comments.length}) likes: ({item.likes})
            </div>
            {this.renderAddComment()}
            {this.renderLike()}
            <div className="comments" />
            {this.renderComments(item.comments)}
          </div>
        ))
      : null;

  render() {
    return (
      <div className="page-container">
        <div className="container">
          <div className="post-detail-wrapper">{this.renderPost()}</div>
          <div className="sidebar">
            <div className="newPost">
              <Link to={"/posts/new"} className="btnNewPost">
                New Post
              </Link>
            </div>
            <div>
              {" "}
              <CategoryNav categories={this.props.categories.byName} />
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
export default connect(mapStateToProps)(PostDetail);
