const mergeNewItems = ({currentCache, newItems}) => {
    const includespage = currentCache.nested_data.page.some((page) =>
          newItems.nested_data.page.includes(page)
        );

        if (!includespage) {
    currentCache.nested_data.data.push(...newItems.nested_data.data);
    currentCache.nested_data.page.push(...newItems.nested_data.page);
    currentCache.end_of_data = newItems.end_of_data;
        }
} 

export default mergeNewItems