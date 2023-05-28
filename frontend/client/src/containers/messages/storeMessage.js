import { splitApi } from "endpoints/rtkQuery/splitApi";
const storeMessage = ({ jsonMessage, page, room_name, dispatch }) => {
  dispatch(
    splitApi.util.updateQueryData("getMessages", { room_name, page }, (i) => {
      i.data.push({
        message: jsonMessage.text,
        sender: jsonMessage.sender,
        user: jsonMessage.user,
      });
    })
  );
};
export default storeMessage;
