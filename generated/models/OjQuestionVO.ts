/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from './JudgeConfig';
import type { OjTemplate } from './OjTemplate';
import type { SafetyUser } from './SafetyUser';

export type OjQuestionVO = {
    id?: number;
    title?: string;
    content?: string;
    tags?: Array<string>;
    submitNum?: number;
    acceptedNum?: number;
    judgeConfig?: JudgeConfig;
    template?: OjTemplate;
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    userVO?: SafetyUser;
};
