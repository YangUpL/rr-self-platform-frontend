/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddUserDto } from '../models/AddUserDto';
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponseSafetyUser } from '../models/BaseResponseSafetyUser';
import type { BaseResponseSafetyUserPageVo } from '../models/BaseResponseSafetyUserPageVo';
import type { BaseResponseString } from '../models/BaseResponseString';
import type { EmailDto } from '../models/EmailDto';
import type { GlobalDto } from '../models/GlobalDto';
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * @param requestBody 
     * @returns string OK
     * @throws ApiError
     */
    public static uploadFile(
requestBody?: {
file: Blob;
},
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/upload',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateUser(
requestBody: UpdateUserDto,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/updateUser',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseString OK
     * @throws ApiError
     */
    public static sendMail(
requestBody: EmailDto,
): CancelablePromise<BaseResponseString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/sendMail',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseSafetyUser OK
     * @throws ApiError
     */
    public static register(
requestBody: RegisterDto,
): CancelablePromise<BaseResponseSafetyUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static login(
requestBody: LoginDto,
): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseSafetyUserPageVo OK
     * @throws ApiError
     */
    public static getUserList(
requestBody: GlobalDto,
): CancelablePromise<BaseResponseSafetyUserPageVo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/getUserList',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static addUser(
requestBody: AddUserDto,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/addUser',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static resetPassword(
id: number,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/resetPassword',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @returns BaseResponseString OK
     * @throws ApiError
     */
    public static logout(): CancelablePromise<BaseResponseString> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/logout',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseSafetyUser OK
     * @throws ApiError
     */
    public static getUserById(
id: number,
): CancelablePromise<BaseResponseSafetyUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/getUserById',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @returns BaseResponseSafetyUser OK
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<BaseResponseSafetyUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/getCurrent',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteUser(
id: number,
): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/deleteUser/{id}',
            query: {
                'id': id,
            },
        });
    }

}
