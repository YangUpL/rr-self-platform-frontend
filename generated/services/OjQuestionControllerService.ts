/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponseOjQuestion } from '../models/BaseResponseOjQuestion';
import type { BaseResponseOjQuestionVO } from '../models/BaseResponseOjQuestionVO';
import type { BaseResponsePageOjQuestion } from '../models/BaseResponsePageOjQuestion';
import type { BaseResponsePageOjQuestionSubmitVO } from '../models/BaseResponsePageOjQuestionSubmitVO';
import type { BaseResponsePageOjQuestionVO } from '../models/BaseResponsePageOjQuestionVO';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionAddRequest } from '../models/QuestionAddRequest';
import type { QuestionEditRequest } from '../models/QuestionEditRequest';
import type { QuestionQueryRequest } from '../models/QuestionQueryRequest';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { QuestionUpdateRequest } from '../models/QuestionUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OjQuestionControllerService {

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateOjQuestion(
requestBody: QuestionUpdateRequest,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponsePageOjQuestionSubmitVO OK
     * @throws ApiError
     */
    public static listOjQuestionSubmitByPage(
requestBody: QuestionSubmitQueryRequest,
): CancelablePromise<BaseResponsePageOjQuestionSubmitVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/question_submit/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static doOjQuestionSubmit(
requestBody: QuestionSubmitAddRequest,
): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/question_submit/do',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponsePageOjQuestionVO OK
     * @throws ApiError
     */
    public static listMyOjQuestionVoByPage(
requestBody: QuestionQueryRequest,
): CancelablePromise<BaseResponsePageOjQuestionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/my/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponsePageOjQuestion OK
     * @throws ApiError
     */
    public static listOjQuestionByPage(
requestBody: QuestionQueryRequest,
): CancelablePromise<BaseResponsePageOjQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponsePageOjQuestionVO OK
     * @throws ApiError
     */
    public static listOjQuestionVoByPage(
requestBody: QuestionQueryRequest,
): CancelablePromise<BaseResponsePageOjQuestionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static editOjQuestion(
requestBody: QuestionEditRequest,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteOjQuestion(
requestBody: DeleteRequest,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static addOjQuestion(
requestBody: QuestionAddRequest,
): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ojquestion/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseOjQuestion OK
     * @throws ApiError
     */
    public static getOjQuestionById(
id: number,
): CancelablePromise<BaseResponseOjQuestion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ojquestion/get',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns BaseResponseOjQuestionVO OK
     * @throws ApiError
     */
    public static getOjQuestionVoById(
id: number,
): CancelablePromise<BaseResponseOjQuestionVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ojquestion/get/vo',
            query: {
                'id': id,
            },
        });
    }

}
