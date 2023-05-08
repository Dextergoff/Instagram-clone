import { splitApi } from "./splitApi";
import { handleNewComments } from "components/rtkQuery/handleNewComments";
const endpoint = "comments";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ parent, page }) => ({
        url: `${endpoint}/${parent}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),

      serializeQueryArgs: ({ getComments }) => {
        return getComments;
      },

      merge: (currentCache, newItems) => {
        handleNewComments({ currentCache, newItems });
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    likeComment: builder.mutation({
      query: ({ pk, user }) => ({
        url: `${endpoint}/like/`,
        method: "post",
        body: { pk, user },
      }),
    }),

    createComment: builder.mutation({
      query: (body) => ({
        url: `${endpoint}/createcomment/`,
        method: "post",
        body: body,
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
} = splitApi;
