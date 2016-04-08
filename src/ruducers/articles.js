import { DEL_ARTICLE } from '../constants'
import { articles as defaultArticles} from '../fixtures'

export default (articles = defaultArticles, action) => {
    const { type, data } = action

    switch (type) {
        case DEL_ARTICLE:
            articles = articles.filter((a) => a.id !== data.id)
    }

    return articles
}