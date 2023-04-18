const getDate = (postdate) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const currentDate = new Date();
    const postDate = new Date(postdate);
    const differenceMs = Math.abs(currentDate - postDate);
    const postAge = Math.round(differenceMs / oneDay);
    if (postAge < 1) {
      return "today";
    }
    if (postAge >= 7) {
      if (postAge >= 365) {
        return Math.round(postAge / 365) + "y";
      }
      return Math.round(postAge / 7 )+ "w";
    } else {
      return postAge + "d";
    }
  };

export default getDate