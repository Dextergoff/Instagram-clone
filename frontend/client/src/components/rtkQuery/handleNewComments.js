const handleNewComments = ({ newItems, currentCache, args }) => {
  const ReplaceComments = () => {
    currentCache.data = newItems.data;
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
};

export { handleNewComments };
