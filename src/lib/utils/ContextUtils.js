import {context} from "../../config";

export function path (...paths) {
    const path = paths.join('')
    const root = context ? `${context}` : ''
    return path.charAt(0) === '/' ? `${root}${path}` : `${root}/${path}`
}