import wildCardSearch from 'utils/wildCardSearch'
import sortBy from 'utils/sortBy'
import paginate from 'utils/paginate'

export default function retailsFakeApi(server, apiPrefix) {
    server.post(`${apiPrefix}/sales/dashboard`, (schema) => {
        return schema.db.retailssalesDashboardData[0]
    })

    server.post(`${apiPrefix}/retails/sales/products`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody)
        const { pageIndex, pageSize, sort, query } = body
        const { order, key } = sort
        const products = schema.db.retailsproductsData
        const sanitizeProducts = products.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeProducts
        let total = products.length

        if ((key === 'category' || key === 'name') && order) {
            data.sort(sortBy(key, order === 'desc', (a) => a.toUpperCase()))
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt))
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.del(
        `${apiPrefix}/retails/sales/products/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            schema.db.retailsproductsData.remove({ id })
            return true
        }
    )

    server.get(`${apiPrefix}/retails/sales/product`, (schema, { queryParams }) => {
        const id = queryParams.id
        const product = schema.db.retailsproductsData.find(id)
        return product
    })

    server.put(
        `${apiPrefix}/retails/sales/products/update`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            const { id } = data
            schema.db.retailsproductsData.update({ id }, data)
            return true
        }
    )

    server.post(
        `${apiPrefix}/retails/sales/products/create`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            schema.db.retailsproductsData.insert(data)
            return true
        }
    )

    server.get(`${apiPrefix}/retails/sales/orders`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, sort, query } = queryParams
        const { order, key } = JSON.parse(sort)
        const orders = schema.db.retailsordersData
        const sanitizeProducts = orders.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeProducts
        let total = orders.length

        if (key) {
            if (
                (key === 'date' ||
                    key === 'status' ||
                    key === 'paymentMehod') &&
                order
            ) {
                data.sort(sortBy(key, order === 'desc', parseInt))
            } else {
                data.sort(sortBy(key, order === 'desc', (a) => a.toUpperCase()))
            }
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.del(
        `${apiPrefix}/retails/sales/orders/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            id.forEach((elm) => {
                schema.db.retailsordersData.remove({ id: elm })
            })
            return true
        }
    )

    server.get(
        `${apiPrefix}/retails/sales/orders-details`,
        (schema, { queryParams }) => {
            const { id } = queryParams
            const orderDetail = schema.db.retailsorderDetailsData
            orderDetail[0].id = id
            return orderDetail[0]
        }
    )
}
