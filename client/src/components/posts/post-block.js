import React from "react";
import Post from "./post";

const PostBlock = props => {
  //   const items = props.posts.map(item => {
  //     return (
  //       <div>
  //         <h3>{item.title}</h3>
  //         <p>{item.text}</p>
  //       </div>
  //     );
  //   });

  const renderPosts = () =>
    props.posts
      ? props.posts.map(post => <Post key={post.id} {...post} />)
      : null;

  return (
    <div>
      <div>
        {props.posts ? (
          props.posts === 0 ? (
            <div>No Currnt posts</div>
          ) : null
        ) : (
          <div>Culd not get posts at this time</div>
        )}
        {/* {items} */}
        {renderPosts()}
      </div>
    </div>
  );
};

export default PostBlock;
