import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom'
import { haveToken } from '@src/utils/utils';

class CareerPlansPage extends React.PureComponent{
    render(){
        if(!haveToken()){
            return <Redirect to="/login" />;
        }
        return (
            <Layout>
                CareerPlansPage
            </Layout>
        ); 
    }
}

export default CareerPlansPage;