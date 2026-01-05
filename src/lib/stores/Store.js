import store from 'local-storage'

export default class Store {
    save (key, data) {
        return store.set(key, data)
    }

    get (key) {
        return store.get(key)
    }

    clear (key) {
        return store.remove(key)
    }
}