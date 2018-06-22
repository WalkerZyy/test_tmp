/*
category String!
(本科/专科): 学科门类/专业大类
ADD FRAGMENT
code String!
专业代码
ADD FRAGMENT
degree String!
学历
ADD FRAGMENT
descriptions [MajorDescription!]!
ADD FRAGMENT
employmentRates [MajorEmploymentRate!]!
ADD FRAGMENT
expectingDirections [String!]!
在校生期望从业方向
ADD FRAGMENT
graduationDirections [String!]!
毕业人员从业方向
ADD FRAGMENT
name String!
专业名称
ADD FRAGMENT
postgraduateMajors [String!]!
报考硕士集中专业
ADD FRAGMENT
subject String!
专业类
*/
function majorMaker(sets = {}) {
    if (sets.least) {
        return `
        category
        code
        degree
        name
        subject  
        `
    }
    const employmentRates = sets.withoutRates ? '' : `employmentRates{
        value
        year
    }`;
    return `
        category
        code
        degree
        descriptions{
            name
            value
        }
        ${employmentRates}
        expectingDirections
        graduationDirections
        name
        postgraduateMajors
        subject 
        courses 
    `
}

export const Major = majorMaker();
export const MajorWithoutRates = majorMaker({ withoutRates: true });
export const MajorLeast = majorMaker({
    least: true
});