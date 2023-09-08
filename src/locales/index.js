import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import es from './lang/es.json'
import ar from './lang/ar.json'
import pt from './lang/pt.json'


import appConfig from 'configs/app.config'

const resources = {
    en: {
        translation: en,
    },
   
    es: {
        translation: es,
    },
    ar: {
        translation: ar
    },

    pt: {
        translation: pt,
    }
   
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: appConfig.locale,
    lng: appConfig.locale,
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
    es: () => import('dayjs/locale/es'),
    ar: () => import('dayjs/locale/ar'),
    pt: () => import('dayjs/locale/pt'),
  
  
}

export default i18n
