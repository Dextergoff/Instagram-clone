import { splitApi } from "./splitApi";
const callto = 'comments' 


splitApi.injectEndpoints({
  endpoints: (builder) => ({

    getReplys: builder.query({
      query: ({ pk, page }) => ({
        url: `${callto}/replys/${pk}/${page}`,
        method: "get",
      }),
      
    }),

    createReply: builder.mutation({
      query: (body) => ({
        url: `${callto}/createreply/`,
        method: "post",
        body: body,
        headers: {
          "Content-type": "application/json",
        },
      })
    }),

  }),
});

export const { useGetReplysQuery, useCreateReplyMutation } = splitApi;
