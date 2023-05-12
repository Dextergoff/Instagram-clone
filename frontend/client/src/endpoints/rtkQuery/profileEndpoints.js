import { splitApi } from "./splitApi";
import mergeNewItems from "components/rtkQuery/mergeNewItems";
import setResponse from "components/rtkQuery/setResponse";

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
        // pushes new items to currentCacge
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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

export const { useGetProfilePageQuery, useEditProfileMutation } = splitApi;
