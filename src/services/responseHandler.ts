export type TSuccessHandler<T = any> = (response: any) => Promise<T>
export type TFailureHandler = (err: any) => never

export const responseHandler: {
    success: TSuccessHandler<any>
    failure: TFailureHandler
} = {
    success: (response) => {
        if (response.ok) {
            return response.json().then((data) => {
                if (data.error) {
                    throw {
                        status: response.status,
                        message: data.error.message,
                    }
                }
                return data.data
            })
        } else {
            return response.json().then(
                (data) => {
                    throw {
                        status: response.status,
                        message: data.error.message,
                    }
                },
                () => {
                    throw {
                        status: response.status,
                        message: response.statusText,
                    }
                }
            )
        }
    },
    failure: (err) => {
        throw {
            message: err.message || err.statusText,
        }
    },
}
