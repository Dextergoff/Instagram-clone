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
  console.log(queryName, queryArg, secondQueryArg, page);

  return dispatch(
    splitApi.util.updateQueryData(
      queryName,
      { queryArg, secondQueryArg, page },
      (i) => {
        if (queryName !== "getProfilePage") {
          i = i.nested_data.data.find((item) => item.pk === requested_user_pk);
        }
        i.is_following = result.data.is_following;
      }
    )
  );
};
export default UpdateFollowing;
