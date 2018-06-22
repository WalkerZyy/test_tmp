import gql from "graphql-tag";
import { MajorLeast } from "./query/Major";

export const GET_MAJORS = gql`
query getMajors($degree:String!,$category:String,$subject:String){
    majors(degree:$degree, category:$category, subject:$subject){
        ${MajorLeast}
    }
}
`;