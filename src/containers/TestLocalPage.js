import React from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class _AddButton extends React.Component{
  btnHandler = ()=>{
    const p = this.props.addA();
    p.then(function(data){
      console.log(data);
    })
  }
  render(){
    return (<button onClick={this.btnHandler}>add a</button>);
  }
}

const AddButton = graphql(gql`
  mutation {
    updateSth @client{
      b
    }
  }
`, {name: 'addA',update: (proxy, { data }) => {
 console.log(data)
}})(_AddButton);


const GET_ALL = gql`
  query {
    networkStatus @client {
        isConnected
    }
    sth @client {
        a
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
        console.log( this.props);
        const { sth } = this.props;
        return <div>
            <p>sth: {sth ? sth.a : '' }</p>
           <AddButton />
        </div>
    }
}

const WrappedComponent = graphql(GET_ALL, {
    props: ({ data: { loading, error, networkStatus, sth, rates } }) => {
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
        sth
      };
    },
  })(TestLocal);



export default WrappedComponent;