import { splitApi } from "endpoints/rtkQuery/splitApi";
const UpdateComments = ({ parent, dispatch, result, page }) => {
    const pk = parent
    const isreply = page? true : false
    const queryName = isreply? "getReplys" : "getComments"
    const args = isreply ?{ pk, page} : parent
                
    return (
        dispatch(
            splitApi.util.updateQueryData(
                queryName,
                args,
                (data) => {
                        data.data.unshift(result.data.comment);
                }
            )
        )
    )
}

export default UpdateComments