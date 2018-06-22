import React, { Component } from 'react';

import { ApolloProvider } from "react-apollo";

//import logo from './logo.svg';
import { Layout } from 'antd'
import RootContainer from './containers/RootContainer';
import client from './client';

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