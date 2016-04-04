import AppDispatcher from '../dispatcher'
import { LOAD_DICT, _START, _SUCCESS, } from './constants'

// TODO: place in json, add AJAX
export function loadDict(lang) {
    let data = { "id": lang }
    
    AppDispatcher.dispatch({
        type: LOAD_DICT + _START,
        data: data
    })
    
    switch (lang) {
        case 'rus':
            data = Object.assign(data, {
                "app_name": "Новости",
                "app_loading": "Загрузка...",
                "app_user": "Текущий пользователь",
                "sign_in": "Войти",
                "art": "статья",
                "art_loading": "Загрузка статьи...",
                "art_new": "Создать статью",
                "art_del": "удалить",
                "art_comments": "Комментариев к статье",
                "coms_loading": "Загрузка комментариев...",
                "coms_show": "показать комментарии",
                "coms_hide": "скрыть комментарии",
                "com_add": "добавить комментарий",
                "not_found": "Не найдено",
            })
    }    
    setTimeout(() => AppDispatcher.dispatch({
        type: LOAD_DICT + _SUCCESS,
        data: data
    }), 500)
}