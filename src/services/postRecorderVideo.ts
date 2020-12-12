import { fetchDataService } from './fetchDataService'
import { IRecordedVideo } from '../models/IRecordedVideo'

export const postRecordedVideo = () => {
    return Promise.resolve({
        id: 'id',
        frameThumbnails: [
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
            'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
        ],
        framesCount: 375,
        fps: 25,
        trimData: {
            leftTrimValue: 0,
            rightTrimValue: 0,
            leftTrimDragValue: 0,
            rightTrimDragValue: 0,
            videoCurrentTime: 0,
        },
    })
}
