import { splitApi } from "endpoints/rtkQuery/splitApi";
const storeMessage = ({ jsonMessage, page, calc_room, dispatch }) => {
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
export default storeMessage;
