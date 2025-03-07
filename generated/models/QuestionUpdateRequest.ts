/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
import type { OjTemplate } from './OjTemplate';

export type QuestionUpdateRequest = {
    id?: number;
    title?: string;
    content?: string;
    tags?: Array<string>;
    answer?: string;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    template?: OjTemplate;
};
