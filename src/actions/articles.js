import { DEL_ARTICLE } from '../constants'

export function delArticle(data) {
    return {
        type: DEL_ARTICLE,
        data,
    }
}