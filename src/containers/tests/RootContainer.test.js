import React from 'React';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme'; 

import client from '@src/client';
import { ApolloProvider } from "react-apollo";
import { Routes } from '../RootContainer';
import HomePage from '../HomePage'; 

describe("test token get",()=>{
    const component = mount(
        <ApolloProvider client={client}>
        <MemoryRouter initialEntries={[ '/home/tk/12345' ]} initialIndex={0}>
            <Routes />
        </MemoryRouter>
        </ApolloProvider>
    );
    it("should open HomePage", ()=>{
        expect(component.find(HomePage).length ).toBe(1);
    })
    it("can get token in HomePage", ()=>{
        expect(component.find(HomePage).props().match.params.token).toBe('12345');
    })
})