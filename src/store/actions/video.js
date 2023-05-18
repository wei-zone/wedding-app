

/**
 * @Description: 视频、祝福
 * @author: forguo
 * @date: 2020/7/22
*/

import request from "../request";

// 获取视频
// eslint-disable-next-line import/prefer-default-export
export const dispatchGetVideo = () => {
    return () => request.request({
        url: '/wedding_video',
    })
};
