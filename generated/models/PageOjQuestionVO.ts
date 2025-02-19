/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OjQuestionVO } from './OjQuestionVO';
import type { OrderItem } from './OrderItem';

export type PageOjQuestionVO = {
    records?: Array<OjQuestionVO>;
    total?: number;
    size?: number;
    current?: number;
    orders?: Array<OrderItem>;
    optimizeCountSql?: PageOjQuestionVO;
    searchCount?: PageOjQuestionVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    /**
     * @deprecated
     */
    pages?: number;
};
