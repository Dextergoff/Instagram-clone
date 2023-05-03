import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { checkAuth } from "endpoints/auth/user";
import { ProtectedRoute } from './endpoints/auth/authRoutes'
import LoginPage from "containers/auth/LoginPage";
import DashboardPage from "containers/auth/DashboardPage";
import RegisterPage from "containers/auth/RegisterPage";
import ResetPasswordSendMail from "containers/auth/ResetPasswordSendMail";
import ResetPassword from "containers/auth/ResetPassword";
import NotFoudPage from "containers/auth/NotFoudPage";
import PostsPage from "containers/posts/PostsPage"
import CreatePostPage from "containers/posts/CreatePostPage"
import ProfilePage from "containers/profile/ProfilePage";
import HashtagPosts from "containers/hashtag/HashtagPosts";
import PostModal from "components/modal/PostModal";
import onSubmit from "components/forms/onSubmit";
import Redirect from "components/forms/Redirect";
const App = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  let background = location.state && location.state.background;

 
  useEffect(() => {
    dispatch(checkAuth())
  });

  return (
    <Fragment>
      <Routes location={background || location}>
        <Route path="/" element={<ProtectedRoute><PostsPage /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePostPage/></ProtectedRoute>} />
        <Route path="/h/:hashtag" element={<ProtectedRoute><HashtagPosts/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path="/u" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="/login" element={<LoginPage Redirect={Redirect} handleSubmit={onSubmit}/>} />
        <Route path="/register" element={<RegisterPage Redirect={Redirect} handleSubmit={onSubmit}/>} />
        <Route path="/resetpasswordsm" element={<ResetPasswordSendMail handleSubmit={onSubmit}/>} />
        <Route path={`/resetpassword`} element={<ResetPassword/>}/>
        <Route path="*" element={<NotFoudPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/:pk" element={<PostModal/>} />
        </Routes>
      )}
     </Fragment>
  );
};

export default App;
