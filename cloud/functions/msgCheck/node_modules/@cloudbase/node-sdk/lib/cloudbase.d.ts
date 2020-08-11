import { Db } from '@cloudbase/database';
import { ICloudBaseConfig, ICustomReqOpts, ICustomErrRes, IDeleteFileRes, IGetFileUrlRes, IDownloadFileRes, IUploadFileRes, IContext } from './type';
import { Log } from './log';
export declare class CloudBase {
    static scfContext: IContext;
    static parseContext(context: IContext): IContext;
    /**
     * 获取当前函数内的所有环境变量(作为获取变量的统一方法，取值来源process.env 和 context)
     */
    static getCloudbaseContext(context?: IContext): any;
    config: ICloudBaseConfig;
    private clsLogger;
    private extensionMap;
    constructor(config?: ICloudBaseConfig);
    init(config?: ICloudBaseConfig): void;
    registerExtension(ext: any): void;
    invokeExtension(name: any, opts: any): Promise<any>;
    database(dbConfig?: any): Db;
    /**
     * 调用云函数
     *
     * @param param0
     * @param opts
     */
    callFunction({ name, data }: {
        name: any;
        data: any;
    }, opts?: ICustomReqOpts): Promise<any>;
    auth(): any;
    /**
     * openapi调用
     *
     * @param param0
     * @param opts
     */
    callWxOpenApi({ apiName, requestData }: {
        apiName: any;
        requestData: any;
    }, opts?: ICustomReqOpts): Promise<any>;
    /**
     * wxpayapi调用
     *
     * @param param0
     * @param opts
     */
    callWxPayApi({ apiName, requestData }: {
        apiName: any;
        requestData: any;
    }, opts?: ICustomReqOpts): Promise<any>;
    /**
     * 微信云调用
     *
     * @param param0
     * @param opts
     */
    callCompatibleWxOpenApi({ apiName, requestData }: {
        apiName: any;
        requestData: any;
    }, opts?: ICustomReqOpts): Promise<any>;
    /**
     * 上传文件
     *
     * @param param0
     * @param opts
     */
    uploadFile({ cloudPath, fileContent }: {
        cloudPath: any;
        fileContent: any;
    }, opts?: ICustomReqOpts): Promise<IUploadFileRes>;
    /**
     * 删除文件
     *
     * @param param0
     * @param opts
     */
    deleteFile({ fileList }: {
        fileList: any;
    }, opts?: ICustomReqOpts): Promise<ICustomErrRes | IDeleteFileRes>;
    /**
     * 获取临时连接
     *
     * @param param0
     * @param opts
     */
    getTempFileURL({ fileList }: {
        fileList: any;
    }, opts?: ICustomReqOpts): Promise<ICustomErrRes | IGetFileUrlRes>;
    /**
     * 下载文件
     *
     * @param params
     * @param opts
     */
    downloadFile(params: {
        fileID: string;
        tempFilePath?: string;
    }, opts?: ICustomReqOpts): Promise<ICustomErrRes | IDownloadFileRes>;
    /**
     * 获取上传元数据
     *
     * @param param0
     * @param opts
     */
    getUploadMetadata({ cloudPath }: {
        cloudPath: any;
    }, opts?: ICustomReqOpts): Promise<any>;
    /**
     * 获取logger
     *
     */
    logger(): Log;
}
