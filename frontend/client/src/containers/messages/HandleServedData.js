import { splitApi } from "endpoints/rtkQuery/splitApi";
const HandleServedData = ({
  servedData,
  state,
  calc_room,
  dispatch,
  message,
}) => {
  const { page } = state;
  const jsonMessage = JSON.parse(message.data);
  dispatch(
    splitApi.util.updateQueryData("getMessages", { calc_room, page }, (i) => {
      i.data.push({
        message: jsonMessage.text,
        sender: jsonMessage.sender,
        user: jsonMessage.user,
      });
    })
  );
};

export default HandleServedData;
