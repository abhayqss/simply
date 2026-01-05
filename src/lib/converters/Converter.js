const DATA_URL_TO_FILE = 0
const BINARY_TO_BASE_64 = 1
const JS_OBJECT_TO_FORM_DATA = 2


export default class Converter {

    static types = {
        DATA_URL_TO_FILE: DATA_URL_TO_FILE,
        BINARY_TO_BASE_64: BINARY_TO_BASE_64,
        JS_OBJECT_TO_FORM_DATA: JS_OBJECT_TO_FORM_DATA
    }

    convert (data) {}
}