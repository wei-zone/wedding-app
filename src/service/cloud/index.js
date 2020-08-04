/**
 * 云开发数据库API
 */
import { CLOUD_CONFIG } from '../config'

// wx.cloud.init({
//   env: CLOUD_CONFIG.DBID
// })

const db = wx.cloud.database({
  env: CLOUD_CONFIG.DBID
})

const add = function (data, databseName) {
  return db.collection(`${databseName}`).add({
    data: data
  })
}

const get = function (databseName, page) {
  return db.collection(databseName)
    .skip(page * 10)
    .limit(10)
    .get()
}

const getBy = function (data, databseName) {
  return db.collection(`${databseName}`).where(data).get()
}

const getOne = function (id, databseName) {
  return db.collection(`${databseName}`).doc(id).get()
}

const update = function (data, id, databseName) {
  return db.collection(`${databseName}`).doc(id).update({
    data: data
  }).catch(console.error)
}

const remove = function (id, databseName) {
  return db.collection(`${databseName}`).doc(id).remove()
}

const uploadFile = function (cloudPath, filePath) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: `文件上传中…`,
      mask: true
    })
    wx.cloud.uploadFile({
      cloudPath: cloudPath, // 上传至云端的路径
      filePath: filePath, // 小程序临时文件路径
      success: res => {
        wx.hideLoading()
        resolve(res)
      },
      fail: error => {
        wx.hideLoading()
        reject(error)
      }
    })
  })
}

const downloadFile = function (fileID) {
  wx.showLoading({
    title: `文件下载中…`,
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.cloud.downloadFile({
      fileID: fileID, // 文件 ID
      success: res => {
        wx.hideLoading()
        resolve(res)
      },
      fail: error => {
        wx.hideLoading()
        reject(error)
      }
    })
  })
}

const deleteFile = function (fileList) {
  wx.showLoading({
    title: `文件删除中…`,
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.cloud.deleteFile({
      fileList: fileList,
      success: res => {
        wx.hideLoading()
        resolve(res)
      },
      fail: error => {
        wx.hideLoading()
        reject(error)
      }
    })
  })
}

const getTempFileURL = function (fileList) {
  wx.showLoading({
    title: `生成连接中…`,
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.cloud.getTempFileURL({
      fileList: fileList,
      success: res => {
        wx.hideLoading()
        resolve(res)
      },
      fail: error => {
        wx.hideLoading()
        reject(error)
      }
    })
  })
}

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
