import React from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Helmet } from 'react-helmet';
import '@less/home.less';
import { Layout } from 'antd'
const { Content } = Layout;

class Home extends React.Component{
    constructor(props){
      super(props);
      //console.log(props);
      //不那样写就要这样老老实实bind this
      //this._myHandler = this._myHandler.bind(this);
    }
    
    handlerUpdate = () => {
      //console.log(this)
      this.props.updateNetworkStatus(true);
    }
    render(){
      return (
        <Layout>
            <Helmet>
                <title>主页</title>
            </Helmet>
            <Content>
            <h2>Home</h2>
            <button className="btn" onClick={this.handlerUpdate}>handlerUpdate</button>
            </Content>
        </Layout>
      )
    }
  }

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`;


const HomePage = graphql(UPDATE_NETWORK_STATUS, {
props: ({ mutate }) => ({
    updateNetworkStatus: isConnected => mutate({ variables: { isConnected } }),
}),
})(Home);

export default HomePage;