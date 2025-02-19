/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OjQuestionSubmitVO } from './OjQuestionSubmitVO';
import type { OrderItem } from './OrderItem';

export type PageOjQuestionSubmitVO = {
    records?: Array<OjQuestionSubmitVO>;
    total?: number;
    size?: number;
    current?: number;
    orders?: Array<OrderItem>;
    optimizeCountSql?: PageOjQuestionSubmitVO;
    searchCount?: PageOjQuestionSubmitVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    /**
     * @deprecated
     */
    pages?: number;
};
