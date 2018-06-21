import React, { Component } from 'react';
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { onError } from "apollo-link-error";
// import { RetryLink } from "apollo-link-retry";// 还没装，不知道用不用

import { AUTH_TOKEN } from './constants'
//import logo from './logo.svg';
import { Layout } from 'antd'
import RootContainer from './containers/RootContainer';

// cache
const cache = new InMemoryCache()

// httpLink
const uri = "https://w5xlvm3vzz.lp.gql.zone/graphql";
const httpLink = new HttpLink({ uri})

// 日常带token
const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },
  })
  return forward(operation)
})
const httpLinkAuth = middlewareLink.concat(httpLink)

// 错误处理
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // graphQL的报错
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  // 网络报错
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// 本地缓存
const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
  // 可以设默认
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
  },
});
// 默认的cache也可以这样
// cache.writeData({
//   data: {
//     networkStatus: {
//       __typename: 'NetworkStatus',
//      isConnected: true,
//     },
//   },
// });

const links = [
  errorLink,
  stateLink,
  httpLink
]

const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache
});

// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Layout>
        <RootContainer />
      </Layout>
      </ApolloProvider>
    );
  }
}

export default App;