// 接口请求url
const BASE_URL = 'http://localhost'; // 开发
// const BASE_URL = 'https://www.forguo.cn'; // 生产

module.exports = {
    env: {
        NODE_ENV: '"production"'
    },
    defineConstants: {
        BASE_URL: BASE_URL,
    },
    mini: {},
    h5: {},
};
