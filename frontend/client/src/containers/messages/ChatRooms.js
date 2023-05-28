import { useState } from "react";

import { useGetChatRoomQuery } from "endpoints/rtkQuery/messageEnpoints";

const ChatRooms = () => {
  const { userobj } = useSelector((state) => state.user);
  const [state, setState] = useState({
    skip: true,
  });
  const { skip } = state;
  const { data = [] } = useGetChatRoomQuery(userobj?.pk, { skip: skip });
  console.log(data);
};
export default ChatRooms;
