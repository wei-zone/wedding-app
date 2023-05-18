/**
 * @Description: 工具类
 * @author: forguo
 * @date: 2020/7/17
 */

/***
 * @description 去除对象空元素
 * @param data
 */
export const clearEmpty = function (data) {
    let params = {
        ...data
    };
    for (let key in params) {
        if (params[key] === '' || params[key] == null) {
            delete params.key;
        }
    }
    return params;
};

/**
 * @description 求数组最大值
 * @param arr
 * */
export const getMaxNum = function (arr) {
    const length = arr.length;
    let max = arr[0]; // 默认第一个最大
    for (let i = 0; i < length; i++) {
        max = Math.max(max, arr[i]);
    }
    return Math.ceil(max);
};


/**
 * @description 随机获取弹幕颜色
 * @returns {string}
 */
export const getRandomColor = function () {
    const rgb = [];
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length === 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
};
