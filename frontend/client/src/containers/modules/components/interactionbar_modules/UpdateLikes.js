import { splitApi } from "endpoints/rtkQuery/splitApi";
const UpdateLikes = ({queryName, addArgument, updateCacheArgument, result, dispatch}) => {

    return (
        dispatch(
            splitApi.util.updateQueryData(
                queryName,
                addArgument
                    ? { updateCacheArgument, addArgument }
                    : updateCacheArgument,
                (response) => {
                    if (response.nested_data) {
                        response = response.nested_data.data.find(
                            (item) => item.pk === result.data.pk
                        );
                    }
                    response.likes = result.data.likes;
                    response.likecount = result.data.likecount;
                }
            )
        )
    )
}

export default UpdateLikes