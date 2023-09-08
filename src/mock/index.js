import { createServer } from 'miragejs'
import appConfig from 'configs/app.config'

import { signInUserData } from './data/authData'
import {
    productsData,
    ordersData,
    orderDetailsData,
    salesDashboardData,
} from './data/operatorsData'
import {
    enterpriseproductsData,
    enterpriseordersData,
    enterpriseorderDetailsData,
    enterprisesalesDashboardData,
} from './data/enterpriseCoustmerData'

import {
    retailsproductsData,
    retailsordersData,
    retailsorderDetailsData,
    retailssalesDashboardData,
} from './data/retailCustomerData'
import {
    providersproductsData,
    providersordersData,
    providersorderDetailsData,
    providerssalesDashboardData,
} from './data/providersData'

import {
    partnersproductsData,
    partnersordersData,
    partnersorderDetailsData,
    partnerssalesDashboardData,
} from './data/partnersData'

import {
    wareHousesalesDashboardData,
    wareHousesproductsData,
    wareHouseOrdersData,
    wareHousesorderDetailsData
} from './data/wareHouseData'
import { operatorData } from './data/operators'
import { authFakeApi, enterpriseFakeApi, operatorsFakeApi, retailsFakeApi, providersFakeApi, partnersFakeApi, wareHouseFakeApi, operatorFakeApi } from './fakeApi'



const { apiPrefix, mockApiPrefix, enableMock } = appConfig
const baseUrl = enableMock ? mockApiPrefix : apiPrefix
console.log("baseUrlbaseUrl",baseUrl)
export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                operatorData,
                signInUserData,
                ordersData,
                productsData,
                ordersData,
                orderDetailsData,
                salesDashboardData,
                enterpriseproductsData,
                enterpriseordersData,
                enterpriseorderDetailsData,
                enterprisesalesDashboardData,
                retailsproductsData,
                retailsordersData,
                retailsorderDetailsData,
                retailssalesDashboardData,
                providersproductsData,
                providersordersData,
                providersorderDetailsData,
                providerssalesDashboardData,
                partnersproductsData,
                partnersordersData,
                partnersorderDetailsData,
                partnerssalesDashboardData,
                wareHousesalesDashboardData,
                wareHousesproductsData,
                wareHouseOrdersData,
                wareHousesorderDetailsData,
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                let isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()
            operatorFakeApi(this, baseUrl)
            authFakeApi(this, baseUrl)
            operatorsFakeApi(this, baseUrl)
            enterpriseFakeApi(this, baseUrl)
            retailsFakeApi(this, baseUrl)
            providersFakeApi(this, baseUrl)
            partnersFakeApi(this, baseUrl)
            wareHouseFakeApi(this, baseUrl)
        },
    })
}
