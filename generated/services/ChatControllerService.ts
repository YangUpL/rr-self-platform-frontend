/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChatControllerService {

    /**
     * @param message 
     * @param prompt 
     * @returns string OK
     * @throws ApiError
     */
    public static basicChat(
message: string,
prompt: string = '',
): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/basic',
            query: {
                'message': message,
                'prompt': prompt,
            },
        });
    }

}
