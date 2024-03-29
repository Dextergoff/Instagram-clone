import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { checkAuth, getUser } from "endpoints/auth/user";
import { ProtectedRoute } from "./endpoints/auth/authRoutes";
import Login from "containers/auth/Login";
import Register from "containers/auth/Register";
import ResetPassword from "containers/auth/ResetPassword";
import Posts from "containers/posts/Posts";
import CreatePost from "containers/posts/CreatePost";
import Profile from "containers/profile/Profile";
import Hashtag from "containers/hashtag/Hashtag";
import PostModal from "containers/posts/PostModal";
import Redirect from "components/forms/Redirect";
import onSubmit from "components/forms/onSubmit";
import Forgot from "containers/auth/Forgot";
import NotFoud from "containers/auth/NotFoud";
import MessageWS from "containers/messages/MessageWS";
import ChatRooms from "containers/messages/ChatRooms";
import { library } from "@fortawesome/fontawesome-svg-core";
import Discover from "containers/posts/Discover";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faSquarePlus,
  faBuilding,
  faCompass,
  faUser,
  faEdit,
  faCheckCircle,
  faCircleXmark,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import Messages from "containers/messages/MessageWS";
import FollowerModal from "containers/profile/FollowerModal";
import FollowingModal from "containers/profile/FollowingModal";

library.add(
  faHeart,
  faComment,
  faPaperPlane,
  faSquarePlus,
  faBuilding,
  faCompass,
  faUser,
  faEdit,
  faCheckCircle,
  faCircleXmark,
  faMessage,
  faTrashCan
);
const App = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  let background = location.state && location.state.background;
  useEffect(() => {
    dispatch(checkAuth());
  });

  return (
    <Fragment>
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/h/:hashtag"
          element={
            <ProtectedRoute>
              <Hashtag />
            </ProtectedRoute>
          }
        />
        <Route
          path="/u/:pk"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login Redirect={Redirect} handleSubmit={onSubmit} />}
        />
        <Route
          path="/register"
          element={<Register Redirect={Redirect} handleSubmit={onSubmit} />}
        />
        <Route
          path="/dm/u"
          element={
            <ProtectedRoute>
              <MessageWS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dm"
          element={
            <ProtectedRoute>
              <ChatRooms />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot" element={<Forgot handleSubmit={onSubmit} />} />
        <Route path={`/resetpassword`} element={<ResetPassword />} />
        <Route path="*" element={<NotFoud />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/:pk" element={<PostModal />} />
          <Route path="/followers/" element={<FollowerModal />} />
          <Route path="/following/" element={<FollowingModal />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
