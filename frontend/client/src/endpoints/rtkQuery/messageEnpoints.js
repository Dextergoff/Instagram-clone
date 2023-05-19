import { splitApi } from "./splitApi";
import { handleNewComments } from "components/rtkQuery/handleNewComments";
const endpoint = "Messaging";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ room_name }) => ({
        url: `${endpoint}/${room_name}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery } = splitApi;
