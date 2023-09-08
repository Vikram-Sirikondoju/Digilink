
export default function operatorFakeApi(server, apiPrefix) {
    console.log("apiPrefixapiPrefix",apiPrefix)
    server.get(`${apiPrefix}/account/dgl-acc-mnos`, (schema, { queryParams }) => {
        console.log("queryParams",queryParams)
        const product = schema.db.operatorData
        return product
    })
}