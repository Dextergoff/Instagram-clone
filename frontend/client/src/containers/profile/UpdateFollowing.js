import { splitApi } from "endpoints/rtkQuery/splitApi";
const UpdateFollowing = ({
  result,
  dispatch,
  queryArg,
  secondQueryArg,
  queryName,
  requested_user_pk,
  page,
}) => {
  console.log(result);

  return dispatch(
    splitApi.util.updateQueryData(
      queryName,
      { queryArg, secondQueryArg, page },
      (i) => {
        if (queryName !== "getProfilePage") {
          i = i.nested_data.data.find((item) => item.pk === requested_user_pk);
        } else {
          i.nested_data.user.followers_count = result.data.follower_count;
          i.nested_data.user.following_count = result.data.following_count;
        }
        i.is_following = result.data.is_following;
      }
    )
  );
};
export default UpdateFollowing;
