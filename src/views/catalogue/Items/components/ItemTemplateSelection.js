import {
    Input,
    Button,
    FormContainer,
    Card,
    Radio,
} from 'components/ui'
import { Form, Formik } from 'formik'
import { useState, useEffect, useCallback } from 'react'
import { HiOutlineCheckCircle, HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { getItemsTemplates } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'

export const productCategoryOptions = [
    { label: 'Product Category  1', value: 'M' },
    { label: 'Product Category  2', value: 'W' },
    { label: 'Product Category  3', value: 'S' },
    { label: 'Product Category  4', value: 'D' },
    { label: 'Product Category  5 ', value: 'S' },
]
const templateCardData = [
    { id: 3, title: ' PRODUCT', desc: "Description", txt: "Item Description", value: 'O' },
    { id: 1, title: ' DATA PLAN', desc: "Description", txt: "Item Description", value: 'M' },
    { id: 2, title: ' SUBSCRIPTION PLAN', desc: "Description", txt: "Item Description", value: 'F' },
]

const ItemTemplateSelection = ({ onChange, refId, ...props }) => {
    const [selected, setSelected] = useState(props.itemIntials.selectedTemplate.selectedTemplate)
    const dispatch = useDispatch()

    const handleRadioChange = (event) => {
        setSelected(event);
    }
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state?.itemsCreateList?.data?.tableData
    )

    const allTemplates = useSelector((state) => state?.itemsCreateList?.data?.itemsAllTemplateList)
    console.log("allTemplatesallTemplates", allTemplates)
    const fetchData = useCallback(() => {
        dispatch(getItemsTemplates({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">Choose Template</h3>

            <Formik
                initialValues={props.itemIntials.selectedTemplate}
                innerRef={refId}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let dataToStore = props.itemIntials
                    dataToStore.selectedTemplate.selectedTemplate = selected
                    props.setItemInitials(dataToStore)

                    props.setStep(props.step + 1)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="flex justify-between mx-6">
                                    <Input
                                        // ref={searchInput}
                                        className="lg:w-52"
                                        size="sm"
                                        placeholder="Search Templates"
                                        prefix={<HiOutlineSearch className="text-lg" />}
                                        onChange={() => { }}
                                        sytle={{"padding-left":"30px"}}
                                    />
                                    <Button
                                        size="sm"
                                        className="w-32"
                                        icon={<HiOutlineFilter />}
                                        onClick={() => { }}
                                        disabled
                                    >
                                        Filter
                                    </Button>
                                </div>
                                <div>
                                </div>
                                <div className="md:grid grid-cols-3 gap-3 mx-3">
                                    {
                                        allTemplates?.map((el, index) => {
                                            return (
                                                <Card className="mx-3 mb-4 mt-4" key={el.id}>
                                                    <div className="md:grid grid-cols-2">
                                                        <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                                                            {el.tpTitle}{' '}
                                                        </h6>
                                                        <div className=" text-base text-black font-bold flex justify-end">
                                                            <Radio

                                                                key={index}
                                                                value={el.tpUnqId}
                                                                checked={selected === el.tpUnqId}
                                                                onChange={handleRadioChange}
                                                            >
                                                            </Radio>
                                                        </div>
                                                    </div>
                                                    <div className="md:grid grid-cols-1">
                                                        <div className="col-span-2 md:gird mx-2">

                                                            <div className="col-span-1 md:grid grid-cols-1 gap-1">

                                                                <div className='flex flex-col'>
                                                                    <p className="mt-2 text-black font-bold text-base">{el.tpDesc}:</p>
                                                                    <p className="mt-2 text-base">{el.tpType}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Card>
                                            )
                                        })
                                    }
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default ItemTemplateSelection
