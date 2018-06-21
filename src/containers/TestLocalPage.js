import React from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const GET_ALL = gql`
  query {
    networkStatus @client {
        isConnected
    }
    rates(currency: "USD") {
        currency
        rate
    }
  }
`;

class TestLocal extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

    }
    render(){
        console.log( this.props)
        return <div>
           
        </div>
    }
}

const WrappedComponent = graphql(GET_ALL, {
    props: ({ data: { loading, error, networkStatus, rates } }) => {
      if (loading) {
        return { loading };
      }
  
      if (error) {
        return { error };
      }
  
      return {
        loading: false,
        networkStatus,
        rates,
      };
    },
  })(TestLocal);

export default WrappedComponent;