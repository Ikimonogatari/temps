import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const hlfGatewayDsolutionsApi = createApi({
  reducerPath: "hlfGatewayDsolutionsApi",
  tagTypes: ["org-list", "diploma-list", "org-diploma-list"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hlf-gateway.dsolutions.mn",
    prepareHeaders: (headers) => {
      const bearerToken = Cookies.get("bearerToken");
      if (bearerToken) {
        headers.set("Authorization", `Bearer ${bearerToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    enroll: builder.mutation({
      query: ({ username, password }) => ({
        url: `/service-wallet/enroll`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
    identity: builder.query({
      query: () => ({
        url: `/service-wallet/identity`,
        method: "GET",
      }),
    }),
    evaluateTransaction: builder.query({
      query: ({ channel, contract, name, args }) => ({
        url: `/service-api/chaincode/evaluateTransaction`,
        method: "POST",
        body: {
          channel,
          contract,
          name,
          args,
        },
      }),
    }),
    submitTransaction: builder.mutation({
      query: ({ channel, contract, name, args }) => ({
        url: `/service-api/chaincode/submitTransaction`,
        method: "POST",
        body: {
          channel,
          contract,
          name,
          args,
        },
      }),
    }),
    listOrgs: builder.query({
      query: ({ channel, contract, args }) => ({
        url: `/service-api/chaincode/evaluateTransaction`,
        method: "POST",
        body: {
          channel,
          contract,
          name: "ListOrgs",
          args,
        },
      }),
      providesTags: ["org-list"],
    }),
    listOrgDiploma: builder.query({
      query: ({ channel, contract, args }) => ({
        url: `/service-api/chaincode/evaluateTransaction`,
        method: "POST",
        body: {
          channel,
          contract,
          name: "ListOrgDiploma",
          args,
        },
      }),
      providesTags: ["org-diploma-list"],
    }),
    listDiploma: builder.query({
      query: ({ channel, contract, args }) => ({
        url: `/service-api/chaincode/evaluateTransaction`,
        method: "POST",
        body: {
          channel,
          contract,
          name: "ListDiploma",
          args,
        },
      }),
      providesTags: ["diploma-list"],
    }),
    createDiplomaBatch: builder.mutation({
      query: ({ args }) => ({
        url: `/service-api/chaincode/submitTransaction`,
        method: "POST",
        body: {
          channel: "",
          contract: "diploma",
          name: "CreateDiplomaBatch",
          args,
        },
      }),
      invalidatesTags: ["org-diploma-list"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useEnrollMutation,
  useIdentityQuery,
  useEvaluateTransactionQuery,
  useSubmitTransactionMutation,
  useListOrgsQuery,
  useListOrgDiplomaQuery,
  useListDiplomaQuery,
  useCreateDiplomaBatchMutation,
} = hlfGatewayDsolutionsApi;
