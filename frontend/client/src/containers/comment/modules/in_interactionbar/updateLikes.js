import { splitApi } from "endpoints/rtkQuery/splitApi";
const updateLikes = ({ dispatch, result,pk,page}) => {
    const isreply = result.data.isreply
    const queryName = isreply ? "getReplys" : "getComments"
return(
    dispatch(
        splitApi.util.updateQueryData(
          queryName,
          { pk, page },
          (data) => {
            let comment = data.data.find(
              (item) => item.pk === result.data.pk
            );
            comment.likes = result.data.likes;
            comment.likecount = result.data.likecount;
          }
        )
    //   TODO REPLY LIKES NOT UPDATING 
)
)
}

export default updateLikes