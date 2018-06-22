/*
birthday 生日
createdAt 注册时间
errors
examProvince 考试省份
examScore 考试分数
examSubjects 选考科目（新高考）
examYear 考试年份
gender 性别
highSchool (关联)所在高中
  city 市
  district 区/县
  id ID!
  name 学校
  province 省
//invitees 被邀请人 ---- 这两个暂时没取，也是有层级的
//invitor 邀请人
isOldExamType 是否为老高考地区
name 姓名
phone 手机
status 用户状态
studentType 考生类型（文理科-老高考）
subscriptionLevel 用户级别
vipExpiresOn VIP 过期时间
smartWishReportChecks{  测试阶段的判断
    isSubjectInterestsAssessmentReady,
    nextHollandQuestionNum,
    remainingCount,
    canCreate
}
smartWishReports{
    createdAt String
    errors [String]!
    examProvince String
    examScore Int
    examYear Int
    highSchoolName String
    hollandScores [Float!]!霍兰德得分，RIASEC
    id ID
    topSubjectScores ( n = 3 Int ) [SubjectInterestScore!]!学科兴趣得分(从高到低排序) 默认3门
    {
        score
        subject
    }
}
*/
import { topSubjectScoresMaker } from './makers/topSubjectScoresMaker';

const HighSchool = `
highSchool{
    city,
    district,
    id,
    name,
    province
}
`;

const SmartWishReportChecks = `
    smartWishReportChecks{
        isSubjectInterestsAssessmentReady
        nextHollandQuestionNum
        remainingCount
        canCreate
    }
`;
const SmartWishReportMaker = function (n = 3) {
    const TopSubjectScores = topSubjectScoresMaker();
    return `
    smartWishReports{
        createdAt
        errors
        examProvince
        examScore
        examYear
        highSchoolName
        hollandScores
        id
        ${TopSubjectScores}
    }
    `;
}

function UserMaker(sets = {}) {
    let _HighSchool = '', _SmartWishReportChecks = '', _SmartWishReport = '', others = '';
    if (sets.HighSchool) { _HighSchool = HighSchool; }
    if (sets.SmartWishReportChecks) { _SmartWishReportChecks = SmartWishReportChecks; }
    if (sets.SmartWishReport) { _SmartWishReport = SmartWishReportMaker(); }
    if (sets.others) { others = sets.others; }
    return `
        birthday
        createdAt
        errors
        examProvince
        examScore
        examSubjects
        examYear
        gender
        ${_HighSchool}
        isOldExamType
        name
        phone
        ${_SmartWishReportChecks}
        ${_SmartWishReport}
        ${others}
        status
        studentType
        subscriptionLevel
        vipExpiresOn
        highSchoolClass
        schoolClassName
        schoolClassNum
        subscriptionPrice
    `;
}
export const userMaker = UserMaker;

export const User = UserMaker({ HighSchool: true, SmartWishReportChecks: true });

export const UserWithSmartReport = UserMaker({ HighSchool: true, SmartWishReportChecks: true, SmartWishReport: true });

export const UserBasic = UserMaker();