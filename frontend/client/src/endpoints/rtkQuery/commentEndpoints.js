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

      merge: (currentCache, newItems, args) => {
        handleNewComments({ currentCache, newItems, args });
        currentCache.end_of_data = newItems.end_of_data;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getReplys: builder.query({
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
      merge: (currentCache, newItems, args) => {
        currentCache.data.push(...newItems.data);
        currentCache.end_of_data = newItems.end_of_data;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
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
  useGetReplysQuery,

  useCreateCommentMutation,
  useLikeCommentMutation,
} = splitApi;
