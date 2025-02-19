/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OjQuestion } from './OjQuestion';
import type { OrderItem } from './OrderItem';

export type PageOjQuestion = {
    records?: Array<OjQuestion>;
    total?: number;
    size?: number;
    current?: number;
    orders?: Array<OrderItem>;
    optimizeCountSql?: PageOjQuestion;
    searchCount?: PageOjQuestion;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    /**
     * @deprecated
     */
    pages?: number;
};
