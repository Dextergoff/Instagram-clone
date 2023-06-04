const mergeNewItems = ({ currentCache, newItems, args }) => {
  console.log(newItems.nested_data.page);
  if (currentCache.nested_data.user.pk !== newItems.nested_data.user.pk) {
    currentCache.nested_data = newItems.nested_data;
    currentCache.nested_data.page = newItems.nested_data.page;
    currentCache.end_of_data = newItems.end_of_data;
  } else {
    currentCache.nested_data.data.push(...newItems.nested_data.data);
    currentCache.nested_data.page.push(...newItems.nested_data.page);
    currentCache.end_of_data = newItems.end_of_data;
  }
};

export default mergeNewItems;
