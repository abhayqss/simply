
export function Response (onSuccess, onFailure) {
    return function ({ success, data, error, ...rest } = {}) {
        if (success) {
            if (onSuccess) return onSuccess ({ data, ...rest })
        }

        else if (onFailure) return onFailure(error)
    }
}