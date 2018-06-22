import { hashHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '@src/constants';

export function getToken(){
    return localStorage.getItem(AUTH_TOKEN)
}

export function setToken(token){
    return localStorage.setItem(AUTH_TOKEN, token);
}

export function haveToken(){
    return !!getToken()
}