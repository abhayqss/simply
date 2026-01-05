import Converter from './Converter'
import { isArray, isObject } from "underscore";

function toFormData (o, formData = new FormData(), namespace) {
    for (let k in o) {
        if (o.hasOwnProperty(k)) {

            const v = o[k]

            if (isObject(v) && !(isArray(v) || v instanceof File)) {
                toFormData(v, formData, k)
            }

            /**
             * Note! We cannot send null or undefined in FormData
             * because Spring parse them as strings 'null' and
             * 'undefined' then throws type cast Exception
             * */
            else if (v !== null && v !== undefined) {
                formData.append(namespace ? `${namespace}.${k}` : k, v)
            }
        }
    }

    return formData
}

export default class JsObjectToFormDataConverter extends Converter {
    convert (o) {
        return toFormData(o)
    }
}