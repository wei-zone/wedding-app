/**
 * 云开发数据库API
 */
import Taro from '@tarojs/taro'
import moment from 'moment'
import cloudConfig from '../config'

const { defaultPageSize } = cloudConfig; // 默认分页
const DateFormat = 'YYYY-MM-DD HH:mm:ss';
const db = Taro.cloud.database({
    env: cloudConfig.DBID
});

/**
 * @desc 添加数据
 * @param dbName
 * @param data
 * @returns {Promise<Taro.DB.Query.IAddResult>}
 */
const add = function (dbName, data) {
    return db.collection(`${dbName}`).add({
        data: {
            ...data,
            "createTime": moment().format(DateFormat)
        }
    })
};

/**
 * @desc 查询数据
 * @param dbName
 * @param current
 * @param pageSize
 * @returns {Promise<Taro.DB.Query.IQueryResult>}
 */
const get = function (dbName, current = 0, pageSize = defaultPageSize) {
    return db.collection(dbName)
        .orderBy('createTime', 'desc') // 时间升序
        .skip(current * 10)
        .limit(pageSize)
        .get()
};

/**
 * @desc 条件查询数据
 * @param dbName
 * @param data
 * @returns {Promise<Taro.DB.Query.IQueryResult>}
 */
const getBy = function (dbName, data) {
    return db.collection(`${dbName}`).where(data).get()
};

/**
 * @desc 获取单条数据
 * @param dbName
 * @param id
 * @returns {void | Promise<Taro.DB.Query.IQuerySingleResult>}
 */
const getOne = function (dbName, id) {
    return db.collection(`${dbName}`).doc(id).get()
};

/**
 * @desc 更新数据
 * @param dbName
 * @param data
 * @param id
 * @returns {Promise<Taro.DB.Query.IUpdateResult | void>}
 */
const update = function (dbName, data, id) {
    return db.collection(`${dbName}`).doc(id).update({
        data: data
    }).catch(console.error)
};

/**
 * @desc 删除
 * @param dbName
 * @param id
 * @returns {void | Promise<Taro.DB.Query.IRemoveResult>}
 */
const remove = function (dbName, id) {
    return db.collection(`${dbName}`).doc(id).remove()
};

/**
 * @desc 文件上传
 * @param cloudPath
 * @param filePath
 * @returns {Promise<unknown>}
 */
const uploadFile = function (cloudPath, filePath) {
    return new Promise((resolve, reject) => {
        Taro.showLoading({
            title: `文件上传中…`,
            mask: true
        });
        Taro.cloud.uploadFile({
            cloudPath: cloudPath, // 上传至云端的路径
            filePath: filePath, // 小程序临时文件路径
            success: res => {
                Taro.hideLoading();
                resolve(res)
            },
            fail: error => {
                Taro.hideLoading();
                reject(error)
            }
        })
    })
};

/**
 * @desc 文件下载
 * @param fileID
 * @returns {Promise<unknown>}
 */
const downloadFile = function (fileID) {
    Taro.showLoading({
        title: `文件下载中…`,
        mask: true
    });
    return new Promise((resolve, reject) => {
        Taro.cloud.downloadFile({
            fileID: fileID, // 文件 ID
            success: res => {
                Taro.hideLoading();
                resolve(res)
            },
            fail: error => {
                Taro.hideLoading();
                reject(error)
            }
        })
    })
};

/**
 * @desc 删除云储存文件
 * @param fileList
 * @returns {Promise<unknown>}
 */
const deleteFile = function (fileList) {
    Taro.showLoading({
        title: `文件删除中…`,
        mask: true
    });
    return new Promise((resolve, reject) => {
        Taro.cloud.deleteFile({
            fileList: fileList,
            success: res => {
                Taro.hideLoading();
                resolve(res)
            },
            fail: error => {
                Taro.hideLoading();
                reject(error)
            }
        })
    })
};

/**
 * @desc 生产文件链接
 * @param fileList
 * @returns {Promise<unknown>}
 */
const getTempFileURL = function (fileList) {
    Taro.showLoading({
        title: `生成连接中…`,
        mask: true
    });
    return new Promise((resolve, reject) => {
        Taro.cloud.getTempFileURL({
            fileList: fileList,
            success: res => {
                Taro.hideLoading();
                resolve(res)
            },
            fail: error => {
                Taro.hideLoading();
                reject(error)
            }
        })
    })
};

export default {
    add,
    get,
    getOne,
    getBy,
    update,
    remove,
    uploadFile,
    downloadFile,
    deleteFile,
    getTempFileURL
}
