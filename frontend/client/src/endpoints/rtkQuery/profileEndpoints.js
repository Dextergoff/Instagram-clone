import { splitApi } from "./splitApi";
import mergeNewItems from "./mergeNewItems";
import setResponse from "./setResponse";

const endpoint = "profiles";
splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfilePage: builder.query({
      query: ({ filter, page }) => ({
        url: `/posts/page/${page}/`,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: filter,
      }),

      serializeQueryArgs: ({ getProfilePage }) => {
        return getProfilePage;
      },

      transformResponse: (response, arg) => {
        setResponse({ response, arg });
        return response;
      },

      merge: (currentCache, newItems) => {
        mergeNewItems({ currentCache, newItems });
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getUser: builder.query({
      query: ({ pk }) => ({
        url: `/profiles/user/${pk}`,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
      }),
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
  useGetUserQuery,
  useEditProfileMutation,
} = splitApi;
