import { splitApi } from "./splitApi";
const callto = 'comments' 


splitApi.injectEndpoints({
  endpoints: (builder) => ({

    getReplys: builder.query({
      query: ({ pk, page }) => ({
        url: `${callto}/replys/${pk}/${page}`,
        method: "get",
      }),
      serializeQueryArgs: ({ getReplys }) => {
        return getReplys;
      },
    }),

    createReply: builder.mutation({
      query: (body) => ({
        url: `${callto}/createreply/`,
        method: "post",
        body: body,
       
      })
    }),

  }),
});

export const { useGetReplysQuery, useCreateReplyMutation } = splitApi;
