import Converter from './Converter'
import DataUrlToFileConverter from './DataUrlToFileConverter'
import BinaryToBase64Converter from './BinaryToBase64Converter'
import JsObjectToFormDataConverter from './JsObjectToFormDataConverter'

export default class ConverterFactory {
    static getConverter (type) {
        switch (type) {
            case Converter.types.DATA_URL_TO_FILE: return new DataUrlToFileConverter()
            case Converter.types.BINARY_TO_BASE_64: return new BinaryToBase64Converter()
            case Converter.types.JS_OBJECT_TO_FORM_DATA: return new JsObjectToFormDataConverter()
        }
    }
}