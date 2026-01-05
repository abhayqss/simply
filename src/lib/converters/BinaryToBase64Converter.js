import Converter from './Converter'

function toBase64 (bytes) {
    return bytes
}

export default class BinaryToBase64Converter extends Converter {
    convert (bytes) {
        return toBase64(bytes)
    }
}