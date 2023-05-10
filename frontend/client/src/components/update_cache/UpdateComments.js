import { splitApi } from "endpoints/rtkQuery/splitApi";
const UpdateComments = ({ parent, dispatch, result, page, queryName }) => {
  parent = parent.pk;
  const args = { parent, page };
  return dispatch(
    splitApi.util.updateQueryData(queryName, args, (data) => {
      data.data.unshift(result.data.comment);
    })
  );
};

export default UpdateComments;
