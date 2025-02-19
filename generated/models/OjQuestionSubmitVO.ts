/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from './JudgeInfo';
import type { OjQuestionVO } from './OjQuestionVO';
import type { SafetyUser } from './SafetyUser';

export type OjQuestionSubmitVO = {
    id?: number;
    language?: string;
    code?: string;
    judgeInfo?: JudgeInfo;
    status?: number;
    questionId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    userVO?: SafetyUser;
    questionVO?: OjQuestionVO;
};
