import { splitApi } from "./splitApi";
import mergeNewItems from "./mergeNewItems";
import setResponse from "./setResponse";

const endpoint = "profiles";
splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfilePage: builder.query({
      query: ({ pk, page }) => ({
        url: `profiles/posts/${pk}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),

      serializeQueryArgs: ({ getProfilePage }) => {
        return getProfilePage;
      },

      merge: (currentCache, newItems, args) => {
        mergeNewItems({ currentCache, newItems, args });
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),

    editProfile: builder.mutation({
      query: (body) => ({
        url: `${endpoint}/editprofile`,
        method: "post",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetProfilePageQuery,

  useEditProfileMutation,
} = splitApi;
