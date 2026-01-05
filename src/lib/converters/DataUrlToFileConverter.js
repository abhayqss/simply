import Converter from './Converter'

function toFile (dataUrl, name) {
    const [other, data] = dataUrl.split(',')

    const mime = other.match(/:(.*?);/)[1]
    const format = mime.split('/')[1]

    const bstr = atob(data)

    let n = bstr.length
    const buffer = new Uint8Array(n)

    while (n--) {
        buffer[n] = bstr.charCodeAt(n);
    }

    return new File(
        [buffer],
        `${name}.${format}`,
        { type: mime }
    )
}

export default class DataUrlToFileConverter extends Converter {
    convert (dataUrl, fileName) {
        return toFile(dataUrl, fileName)
    }
}