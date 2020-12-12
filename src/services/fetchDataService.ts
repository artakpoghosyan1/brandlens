import { responseHandler } from './responseHandler'

const BASE_URL = '/'

export const fetchDataService = (url: string, method: string, data?, omitBaseUrl?: boolean) => {
    let options
    const generalOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (data) {
        options = {
            ...generalOptions,
            body: JSON.stringify(data),
        }
    } else {
        options = {
            ...generalOptions,
        }
    }

    const baseUrl = omitBaseUrl ? '' : BASE_URL

    return fetch(`${baseUrl + url}`, options).then(responseHandler.success, responseHandler.failure)
}
