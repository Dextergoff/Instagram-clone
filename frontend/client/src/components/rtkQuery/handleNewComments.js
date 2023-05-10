const handleNewComments = ({ newItems, currentCache, args }) => {
  const ReplaceComments = () => {
    for (let i in currentCache) {
      currentCache[i] = newItems[i];
    }
  };

  const PushComments = () => {
    currentCache.data.push(...newItems.data);
    currentCache.end_of_data = newItems.end_of_data;
  };

  if (newItems.post !== currentCache.post) {
    ReplaceComments();
  }

  if (newItems.page !== currentCache.page) {
    PushComments();
  }

  // using this current logic to push replys is duplicating comments
};

export { handleNewComments };
