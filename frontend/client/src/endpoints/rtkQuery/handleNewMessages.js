const handleNewMessages = ({ newItems, currentCache, args }) => {
  const Replace = () => {
    currentCache.data = newItems.data;
  };

  const Push = () => {
    currentCache.data.unshift(...newItems.data);
    currentCache.end_of_data = newItems.end_of_data;
  };

  if (newItems.room_name !== currentCache.room_name) {
    Replace();
  }
  if (newItems.page !== currentCache.page) {
    Push();
  }
};

export { handleNewMessages };
