import { splitApi } from "./splitApi";
import { handleNewComments } from "components/rtkQuery/handleNewComments";
const endpoint = "comments";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ sender_name, receiver_name }) => ({
        url: `${endpoint}/${sender_name}/${receiver_name}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery } = splitApi;
