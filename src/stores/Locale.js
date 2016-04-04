import AppDispatcher from '../dispatcher'
import { LOAD_DICT, _START, _SUCCESS } from '../actions/constants'
import SimpleStore from './SimpleStore'
import { loadDict } from '../actions/locale'

class Locale extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case LOAD_DICT + _START:                  
                    this[data.id] = {}
                    this[data.id].loading = true
                    break;                    
                    
                case LOAD_DICT + _SUCCESS:
                    this.__add(data)
                    this.currentLang = data.id
                    this[data.id].loading = false
                    this[data.id].loaded = true                  
                    break;

                default: return
            }

            this.emitChange()
        })
    }
    
    getOrLoadDict(lang) {
        if (!this[lang] || (!this[lang].loaded && !this[lang].loading)) loadDict(lang)
        return this.getById(lang) || this.getById(this.currentLang) || {}
    }    

}

export default Locale