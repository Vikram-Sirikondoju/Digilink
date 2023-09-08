import Accordion from 'components/shared/Accordion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'components/ui'
import LabellingItem from './LabellingItem'

const Labelling = (props) => {
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
                <LabellingItem dataItem={i} />
            )

            return { id: i?.item_var_id, title:i?.item_var_id, component }
        })
        setAccordionItems(list)
    }

    return (
        <div>
            <Accordion Items={AccordionItems} />
            <div className="mt-4 text-right">
                <Button
                    type={'button'}
                    className="mx-2"
                    onClick={() => props?.onPrevious()}
                    variant="solid"
                    style={{
                        backgroundColor: '#4D4D4D',
                    }}
                >
                    {'Previous'}
                </Button>
                <Button variant="solid" onClick={() => props?.onNext()}>
                    {'Next: Packaging'}
                </Button>
            </div>
        </div>
    )
}

export default Labelling
