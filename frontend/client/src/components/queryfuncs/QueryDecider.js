const QueryDecider = ({ useCachedData, queryPost, pk }) => {
    let data
    
    if (useCachedData.data) {
        data = useCachedData.data?.nested_data.data.find(
            (item) => item.pk === Number(pk)
        );
    }
    if (queryPost.data) {
        data = queryPost.data
    }
    return (
        data
    )
}

export default QueryDecider