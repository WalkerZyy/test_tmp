import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { onError } from "apollo-link-error";
import gql from "graphql-tag";
// import { RetryLink } from "apollo-link-retry";// 还没装，不知道用不用

import { AUTH_TOKEN } from './constants'
// cache
const cache = new InMemoryCache()

// httpLink
const envs = process.env;
const { NODE_ENV } = envs;

let uri = '';
if(NODE_ENV === "development"){
  uri = "https://w5xlvm3vzz.lp.gql.zone/graphql";
  // uri = 'http://127.0.0.1:3000/graphql';
}else{
  uri = "https://www.xunlugaokao.com/graphql";
}

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
      updateSth: (_, args, context, info)=>{
        console.log(_,args,context,info);
        const { cache } = context;
        const query = gql`
          query {
            sth @client {
                a
                b
            }
          }
        `
        const res = cache.readQuery({ query });

        const sth = {
            __typename: 'Sth', //最好带上，不然会提示，据说多层的话不带会出现异常
            a: res.sth.a + 1,
            b: res.sth.b
        };
        const data = {
          sth
        };
        
        cache.writeData({ data });
        return sth;
      }
    },
  },
  // 可以设默认
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    sth: {
      __typename: 'Sth',
      a: 0,
      b: 'b'
    }
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
  httpLinkAuth
]

const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache
});

export default client;