import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment.js";

class Post extends Component {
  renderPostImage(images) {
    return images[0].url;
  }
  render() {
    const props = this.props;
    return (
      <div className="post">
        <div>
          <span className="category">{props.category.name}</span>
          <span className="author">
            {" "}
            by
            {props.author.username ? (
              <span>{props.author.username}</span>
            ) : (
              <span>
                {props.author.name} {props.author.lastname}
              </span>
            )}
          </span>
          <span className="createdAt">
            {" "}
            posted on{" "}
            {props.createdAt
              ? moment(props.createdAt).format("MM-DD-YYYY")
              : props.postDate}
          </span>
        </div>
        <div className="title">
          <Link to={`/post/${props.title}/${props._id}`}>{props.title}</Link>
        </div>
        <Link to={`/post/${props.title}/${props._id}`}>
          {props.images &&
          props.images.length > 0 &&
          props.images[0] != null ? (
            <div
              className="post-image"
              style={{
                background: `url(${this.renderPostImage(
                  props.images
                )}) no-repeat`
              }}
            />
          ) : null}
        </Link>

        <div className="text">{props.text}</div>
        <div className="comments-likes">
          comments ({props.comments.length}) likes: ({props.likes})
        </div>
      </div>
    );
  }
}

export default Post;
