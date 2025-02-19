/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddQuestionCategoryDto } from '../models/AddQuestionCategoryDto';
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseListQuestionCategoryVo } from '../models/BaseResponseListQuestionCategoryVo';
import type { BaseResponseQuestionCategoryVo } from '../models/BaseResponseQuestionCategoryVo';
import type { UpdateQuestionCategoryDto } from '../models/UpdateQuestionCategoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionCategoryControllerService {

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateQuestionCategory(
requestBody: UpdateQuestionCategoryDto,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/category/que/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns BaseResponseListQuestionCategoryVo OK
     * @throws ApiError
     */
    public static listQuestionCategory(): CancelablePromise<BaseResponseListQuestionCategoryVo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/category/que/list',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static addQuestionCategory(
requestBody: AddQuestionCategoryDto,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/category/que/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseQuestionCategoryVo OK
     * @throws ApiError
     */
    public static getQuestionCategoryById(
id: number,
): CancelablePromise<BaseResponseQuestionCategoryVo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/category/que/get/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteQuestionCategory(
id: number,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/category/que/delete/{id}',
            path: {
                'id': id,
            },
        });
    }

}
