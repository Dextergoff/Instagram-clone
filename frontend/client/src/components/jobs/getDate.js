import PostAge from "containers/posts/PostAge";

const getDate = (postdate) => {
  const oneDay = 60 * 24;
  const currentDate = new Date();
  const postDate = new Date(postdate);
  const differenceMs = Math.abs(currentDate - postDate);
  const postAge = Math.round(differenceMs / oneDay);

  const getMinutes = (seconds) => {
    var minutes = Math.floor(seconds / 60);
    return minutes + "minutes ago";
  };

  const getHours = (seconds) => {
    var hours = Math.floor(seconds / 3600);
    return hours + "hours ago";
  };

  const getDays = (hours) => {
    var days = Math.floor(hours / 86400);
    return days + " days ago";
  };

  while (postAge <= 60) {
    return postAge + "seconds ago";
  }
  while (postAge <= 3600) {
    return getMinutes(postAge);
  }
  while (postAge <= 86400) {
    return getHours(postAge);
  }

  while (postAge <= 31536000) {
    return getDays(postAge);
  }
};

export default getDate;
