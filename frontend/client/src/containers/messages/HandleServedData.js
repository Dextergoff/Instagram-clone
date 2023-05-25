import { splitApi } from "endpoints/rtkQuery/splitApi";
const HandleServedData = ({ page, calc_room, dispatch, message }) => {
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
