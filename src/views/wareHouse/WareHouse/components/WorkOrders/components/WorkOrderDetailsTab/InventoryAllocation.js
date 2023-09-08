import Accordion from 'components/shared/Accordion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InventoryAllocationItem from './InventoryAllocationItem'
import { Link } from 'react-router-dom'
import { Button } from 'components/ui'

const InventoryAllocation = (props) => {
    const [AccordionItems, setAccordionItems] = useState([])
    const data = useSelector((state) => state.wareHouse.data)
    const workOrderItem = data?.workOrderItem
    // const productItems = data?.productItems
    const dgl_wo_intry_allocation = workOrderItem.dgl_wo_intry_allocation
    useEffect(() => {
        handleUpdateAccordions(dgl_wo_intry_allocation)
    }, [dgl_wo_intry_allocation])
    const handleUpdateAccordions = (records) => {
        const list = records?.map((i) => {
            // let title = ''
            // const findItem = productItems?.find(
            //     (prod) => prod?.id === i?.item_id
            // )
            // if (findItem) {
            //     title = findItem?.item_title
            // }
            let component = (
                <InventoryAllocationItem  dataItem={i} />
            )

            return { id: i?.item_var_id, title:i?.item_var_id, component }
        })
        setAccordionItems(list)
    }
    // AccordionItems = [
    //     {
    //         id: 1,
    //         header: 'What is Lorem Ipsum?',
    //         component: <h3>hello</h3>,
    //     },
    //     {
    //         id: 2,
    //         header: 'Where does it come from?',
    //         component: <p>helllo thet</p>,
    //     },
    // ]

    return (
        <div>
            <Accordion Items={AccordionItems} />
            <div className="mt-4 text-right">
                <>
                    <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to={`/warehouse-workorder`}
                    >
                        <Button
                            type={'button'}
                            className="mx-2"
                            onClick={() => console.log('cancel')}
                            variant="solid"
                            style={{
                                backgroundColor: '#4D4D4D',
                            }}
                        >
                            Cancel
                        </Button>
                    </Link>
                </>
                <Button
                    variant="solid"
                    onClick={() => props?.onNext()}
                >
                    {'Next: Labelling'}
                </Button>
            </div>
        </div>
    )
}

export default InventoryAllocation
