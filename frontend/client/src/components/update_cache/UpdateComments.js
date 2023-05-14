import { splitApi } from "endpoints/rtkQuery/splitApi";
const UpdateComments = ({ parent, dispatch, result, page, queryName }) => {
  parent = parent.pk;
  dispatch(
    splitApi.util.updateQueryData(queryName, {parent, page}, (i) => {
      i.data.unshift(result.data.comment);
    }),
 
  );
  if(queryName === "getReplys"){
    dispatch(
      splitApi.util.updateQueryData("getComments", undefined, (j) => {
        let k = j.data.find((j) => j.pk == Number(parent))
        k.children = k.children + 1
      } ),
    )
  }
};

export default UpdateComments;
