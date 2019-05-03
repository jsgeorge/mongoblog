import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./Hoc/layout";
import Auth from "./Hoc/auth";

import Posts from "./components/posts";
import Login2 from "./components/auth/login2";
import Register from "./components/auth/register";
import UserInfo from "./components/user";
import EditAccount from "./components/user/edit_account";

import AddPost from "./components/posts/addPost";
import PostDetail from "./components/posts/post/detail";
import MobileCategories from "./components/posts/categories/mobile-categories";

import AddCategory from "./components/user/admin/addCategory";

/****************************************************************** */

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/posts/categories"
          component={Auth(MobileCategories, null)}
        />
        <Route path="/posts/:category/:id" component={Auth(Posts, null)} />

        <Route path="/post/:label/:id" component={Auth(PostDetail, null)} />
        <Route path="/posts/new" component={Auth(AddPost, true)} />
        <Route path="/user" component={Auth(UserInfo, true)} />
        <Route path="/edit-account" component={Auth(EditAccount, true)} />
        <Route
          path="/admin/categories/add"
          component={Auth(AddCategory, true)}
        />
        <Route path="/login" component={Auth(Login2, false)} />
        <Route path="/register" component={Auth(Register, false)} />
        <Route exact path="/" component={Auth(Posts, null)} />
        <Route
          render={() => (
            <div className="pageNotFound">
              {" "}
              <h3>404 Page not Found</h3>
            </div>
          )}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
