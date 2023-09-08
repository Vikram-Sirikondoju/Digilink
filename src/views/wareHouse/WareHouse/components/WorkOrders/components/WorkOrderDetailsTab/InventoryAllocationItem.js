import { Card } from 'components/ui'

const InventoryAllocationItem = (props) => {
    const { dataItem } = props
    return (
        <Card className="mx-3 mb-6">
            <div className="md:grid grid-cols-4">
                <div className="md:gird mx-2">
                    <div className="text-base text-black font-bold   decoration-2">
                        Product Id:
                    </div>
                    <div className="col-span-6 md:grid grid-cols-2 gap-2">
                        <p className="mt-2 text-base">{dataItem?.item_var_id}</p>
                    </div>
                </div>
                <div className="md:gird mx-2">
                    <div className="text-base text-black font-bold   decoration-2">
                        Product Type:
                    </div>
                    <div className=" md:grid grid-cols-2 gap-2">
                        <p className="mt-2 text-base">
                            {dataItem?.item_type}
                        </p>
                    </div>
                </div>
                <div className="md:gird mx-2">
                    <div className="text-base text-black font-bold   decoration-2">
                        Sku Code:
                    </div>
                    <div className="md:grid grid-cols-2 gap-2">
                        <p className="mt-2 text-base">{'--'}</p>
                    </div>
                </div>
                <div className="md:gird mx-2">
                    <div className="text-base text-black font-bold   decoration-2">
                        Allocated Quantity
                    </div>
                    <div className=" md:grid grid-cols-2 gap-2">
                        <p className="mt-2 text-base">{dataItem?.quantity}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default InventoryAllocationItem
