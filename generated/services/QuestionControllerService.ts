/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddQuestionDto } from '../models/AddQuestionDto';
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponsePublicKeyVo } from '../models/BaseResponsePublicKeyVo';
import type { BaseResponseQuestionNoAnswerPageVo } from '../models/BaseResponseQuestionNoAnswerPageVo';
import type { BaseResponseQuestionVo } from '../models/BaseResponseQuestionVo';
import type { ListQuestionDto } from '../models/ListQuestionDto';
import type { UpdateQuestionDto } from '../models/UpdateQuestionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionControllerService {

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateQuestion(
requestBody: UpdateQuestionDto,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseQuestionNoAnswerPageVo OK
     * @throws ApiError
     */
    public static listQuestion(
requestBody: ListQuestionDto,
): CancelablePromise<BaseResponseQuestionNoAnswerPageVo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static addQuestion(
requestBody: AddQuestionDto,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns BaseResponsePublicKeyVo OK
     * @throws ApiError
     */
    public static getPublicKey(): CancelablePromise<BaseResponsePublicKeyVo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/publicKey',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseQuestionVo OK
     * @throws ApiError
     */
    public static getQuestionById(
id: string,
): CancelablePromise<BaseResponseQuestionVo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/get',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteQuestionById(
id: number,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/delete/{id}',
            path: {
                'id': id,
            },
        });
    }

}
