import { CloudBase } from '../cloudbase';
export declare function auth(cloudbase: CloudBase): {
    getUserInfo(): {
        openId: any;
        appId: any;
        uid: any;
        customUserId: any;
        isAnonymous: boolean;
    };
    getAuthContext(context: any): Promise<any>;
    getClientIP(): any;
    createTicket: (uid: any, options?: any) => string;
};
