import gql from "graphql-tag";
import { User } from "./query/User";

export const LOGIN = gql`
mutation signInWithPwd($phone:String!,$password:String){
    signIn(phone:$phone,password:$password){
        token,
        user{
        ${User}
        }
    }
}
`