import { splitApi } from "endpoints/rtkQuery/splitApi";
const UpdateFollowing = ({
  result,
  dispatch,
  queryArg,
  secondQueryArg,
  queryName,
  page,
}) => {
  console.log(queryArg);

  if (result.data)
    return dispatch(
      splitApi.util.updateQueryData(
        queryName,
        { queryArg, secondQueryArg, page },
        (i) => {
          i.is_following = result.data.is_following;
        }
      )
    );
};
// TODO implement updates when user follows from follower list the queryname has to be passed as a prop to followBtn from other components and data will be retrived and updated properly based on that
export default UpdateFollowing;
