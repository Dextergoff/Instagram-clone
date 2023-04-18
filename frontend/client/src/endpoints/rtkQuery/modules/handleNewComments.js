const handleNewComments = ({newItems, currentCache}) => {
    const isnewpost = newItems.parent !== currentCache.parent
    const isoldpost = currentCache.page !== newItems.page

    const ReplaceComments = () => {
      for (let i in currentCache) {
        currentCache[i] = newItems[i];
      }
    };

    const PushComments = () => {
      currentCache.data.push(...newItems.comments);
      currentCache.end_of_data = newItems.end_of_data;
    };

    if (isnewpost) {
      ReplaceComments();
    } else if (isoldpost) {
      PushComments();
    }
}

export { handleNewComments }