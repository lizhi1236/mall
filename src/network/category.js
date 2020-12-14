import {request} from './request'

export function getLeftItems() {
    return request({
        url: '/category'
    })

}

export function getRightTop(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

export function getGoods(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}