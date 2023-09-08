import { AdaptableCard } from 'components/shared'
import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    FormContainer,
    FormItem,
    Input,
    Select,
    Table,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useState } from 'react'
import { HiMinus, HiMinusCircle, HiPlus, HiPlusCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

const PackagingItem = (props) => {
    const data = useSelector((state) => state.wareHouse.data)
    const dateFormat = 'DD-MM-YYYY'
    const workOrderItem = data?.workOrderItem
    const dgl_wo_intry_allocation = workOrderItem?.dgl_wo_intry_allocation
    const updated_wo_intry_alloc=dgl_wo_intry_allocation?.map(i=> {
        return {value:i?.item_id,label:`${i?.item_id}`}
    })
    const { dataItem } = props
    const handleAddNewPackageItem = (values, setSubmitting) => {
        props?.handleUpdateItem(values)
    }
    const packageItem = {
        ...dataItem,
        package_date: new Date(dataItem?.package_date),
        wo_info_id:workOrderItem?.id
    }
    const [initialState, setInitValues] = useState(packageItem)
    const { Tr, Th, Td, THead, TBody } = Table

    const validationSchema = Yup.object().shape({
        package_id: Yup.number().trim().required('Please enter Package ID ').nullable(),
        package_date: Yup.date().trim().required('Please enter Packaging Date ').nullable(),
        net_weight: Yup.number().trim().required('Please enter Package Net Weight ').nullable(),
        gross_weight: Yup.number().trim().required('Please enter Package Gross Weight ').nullable(),
        length: Yup.number().trim().required('Please enter Length ').nullable(),
        width: Yup.number().trim().required('Please enter Width ').nullable(),
        height: Yup.number().trim().required('Please enter Height ').nullable(),
        bar_code: Yup.string().trim().required('Please enter Barcode ').nullable(),
        special_instruction: Yup.string().trim().required('Please enter Special Instruction ').nullable(),
        is_shipping: Yup.string().trim().required('Please enter Is Shipping ').nullable()
    })

    return (
        <>
            <Card className="mx-3 mb-6">
                <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        handleAddNewPackageItem(values, setSubmitting)
                    }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FormContainer>
                                    <div className="mt-3 dark:bg-gray-700 rounded ">
                                        <div className="p-1">
                                            <AdaptableCard
                                                className="h-full"
                                                bodyClass="h-full"
                                                // divider
                                            >
                                                <div className="md:grid grid-cols-4 gap-2 mx-1">
                                                    <FormItem
                                                        label="Package ID"
                                                        invalid={
                                                            errors.package_id &&
                                                            touched.package_id
                                                        }
                                                        errorMessage={
                                                            errors.package_id
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="package_id"
                                                            disabled={true}
                                                            placeholder="Enter Package ID"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Packaging Date"
                                                        invalid={
                                                            errors.package_date &&
                                                            touched.package_date
                                                        }
                                                        errorMessage={
                                                            errors.package_date
                                                        }
                                                    >
                                                        <Field
                                                            name="package_date"
                                                            placeholder="Select Date"
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <DatePicker
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    placeholder="Select Date"
                                                                    onChange={(
                                                                        date
                                                                    ) => {
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        )
                                                                    }}
                                                                    inputFormat={
                                                                        dateFormat
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label="Package Net Weight"
                                                        invalid={
                                                            errors.net_weight &&
                                                            touched.net_weight
                                                        }
                                                        errorMessage={
                                                            errors.net_weight
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="net_weight"
                                                            autoComplete="off"
                                                            placeholder="Enter Package Net Weight"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Package Gross Weight"
                                                        invalid={
                                                            errors.gross_weight &&
                                                            touched.gross_weight
                                                        }
                                                        errorMessage={
                                                            errors.gross_weight
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="gross_weight"
                                                            autoComplete="off"
                                                            placeholder="Enter Package Gross Weight"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className="md:grid grid-cols-4 gap-2 mx-1 ">
                                                    <FormItem
                                                        label="Length"
                                                        invalid={
                                                            errors.length &&
                                                            touched.length
                                                        }
                                                        errorMessage={
                                                            errors.length
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="length"
                                                            autoComplete="off"
                                                            placeholder="Enter Length"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Width"
                                                        invalid={
                                                            errors.width &&
                                                            touched.width
                                                        }
                                                        errorMessage={
                                                            errors.width
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="width"
                                                            autoComplete="off"
                                                            placeholder="Enter Width"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Height"
                                                        invalid={
                                                            errors.height &&
                                                            touched.height
                                                        }
                                                        errorMessage={
                                                            errors.height
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="height"
                                                            autoComplete="off"
                                                            placeholder="Enter Height"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Barcode"
                                                        invalid={
                                                            errors.bar_code &&
                                                            touched.bar_code
                                                        }
                                                        errorMessage={
                                                            errors.bar_code
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="bar_code"
                                                            autoComplete="off"
                                                            placeholder="Enter Barcode"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <hr className="text-gary-500 my-2" />
                                                <div className="md:grid grid-cols-1 gap-2 mx-1 ">
                                                    <FormItem
                                                        label="Special Instruction"
                                                        invalid={
                                                            errors.special_instruction &&
                                                            touched.special_instruction
                                                        }
                                                        errorMessage={
                                                            errors.special_instruction
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="special_instruction"
                                                            autoComplete="off"
                                                            placeholder="Enter Special Instruction"
                                                            textArea
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className="md:grid grid-cols-1 gap-2 mx-1 ">
                                                    <FormItem
                                                        label="Is Shipping"
                                                        invalid={
                                                            errors.is_shipping &&
                                                            touched.is_shipping
                                                        }
                                                        errorMessage={
                                                            errors.is_shipping
                                                        }
                                                    >
                                                        <Field
                                                            name="is_shipping"
                                                            component={Checkbox}
                                                        />
                                                    </FormItem>
                                                </div>
                                            </AdaptableCard>
                                        </div>
                                        <div className="p-1 bg-grey-400">
                                            <FieldArray name="package_items">
                                                {({ insert, remove, push }) => (
                                                    <>
                                                        <div className="flex justify-end">
                                                            <Button
                                                                variant="twoTone"
                                                                color="blue-600"
                                                                type="button"
                                                                onClick={() =>
                                                                    push({
                                                                        prod_or_package_id:
                                                                            '',
                                                                        manufacturer:
                                                                            '',
                                                                        ord_quantity: 0,
                                                                        description:
                                                                            '',
                                                                        quantity_to_pack: 0,
                                                                        wo_package_id:
                                                                            null,
                                                                    })
                                                                }
                                                            >
                                                                Add
                                                            </Button>
                                                        </div>
                                                        <Table>
                                                            <THead>
                                                                <Tr>
                                                                    <Th>
                                                                        Product/Package
                                                                    </Th>
                                                                    <Th>
                                                                        Manufacturer
                                                                    </Th>
                                                                    <Th>
                                                                        Ordered
                                                                        Quantity
                                                                    </Th>
                                                                    <Th>
                                                                        Description
                                                                    </Th>
                                                                    <Th>
                                                                        Quantity
                                                                        to Pack
                                                                    </Th>
                                                                    <Th></Th>
                                                                </Tr>
                                                            </THead>
                                                            <TBody>
                                                                {values?.package_items?.map(
                                                                    (
                                                                        j,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <Tr
                                                                                key={
                                                                                    j?.id
                                                                                }
                                                                            >
                                                                                <Td>
                                                                                <Field  name={`package_items.${index}.prod_or_package_id`}>
                                                                                        {({
                                                                                            field,
                                                                                            form,
                                                                                        }) => (
                                                                                            <>
                                                                                                <Select
                                                                                                    placeholder="Select Item"
                                                                                                    field={
                                                                                                        field
                                                                                                    }
                                                                                                    form={
                                                                                                        form
                                                                                                    }
                                                                                                    options={
                                                                                                        updated_wo_intry_alloc
                                                                                                    }
                                                                                                    value={updated_wo_intry_alloc?.filter(
                                                                                                        (
                                                                                                            wh
                                                                                                        ) =>
                                                                                                            wh.value ==
                                                                                                            j.prod_or_package_id
                                                                                                    )}
                                                                                                    onChange={(
                                                                                                        wh
                                                                                                    ) => {
                                                                                                        form.setFieldValue(
                                                                                                            field.name,
                                                                                                            wh.value
                                                                                                        )
                                                                                                    }}
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                    </Field>
                                                                                </Td>
                                                                                <Td>
                                                                                    <Field
                                                                                        type="text"
                                                                                        name={`package_items.${index}.manufacturer`}
                                                                                        autoComplete="off"
                                                                                        placeholder="Enter manufacturer"
                                                                                        component={
                                                                                            Input
                                                                                        }
                                                                                        
                                                                                    />
                                                                                    
                                                                                </Td>
                                                                                <Td>
                                                                                    <Field
                                                                                        type="number"
                                                                                        name={`package_items.${index}.ord_quantity`}
                                                                                        autoComplete="off"
                                                                                        placeholder="Enter Order Qty"
                                                                                        component={
                                                                                            Input
                                                                                        }
                                                                                    />
                                                                                </Td>
                                                                                <Td>
                                                                                    <Field
                                                                                        type="text"
                                                                                        name={`package_items.${index}.description`}
                                                                                        autoComplete="off"
                                                                                        placeholder="Enter description"
                                                                                        component={
                                                                                            Input
                                                                                        }
                                                                                    />
                                                                                </Td>
                                                                                <Td>
                                                                                    <Field
                                                                                        type="number"
                                                                                        name={`package_items.${index}.quantity_to_pack`}
                                                                                        autoComplete="off"
                                                                                        placeholder="Enter Pack Qty"
                                                                                        component={
                                                                                            Input
                                                                                        }
                                                                                    />
                                                                                </Td>
                                                                                <Td>
                                                                                    <HiMinusCircle
                                                                                        color="red"
                                                                                        size={
                                                                                            '1.2rem'
                                                                                        }
                                                                                        onClick={() =>
                                                                                            remove(
                                                                                                index
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </Td>
                                                                            </Tr>
                                                                        )
                                                                    }
                                                                )}
                                                            </TBody>
                                                        </Table>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="my-2 text-right">
                                            <>
                                                <Button
                                                    className="mx-2"
                                                    variant="twoTone"
                                                    color="blue-600"
                                                    type={'submit'}
                                                >
                                                    {'Update Package'}
                                                </Button>
                                                <Button
                                                    className="mx-2"
                                                    variant="twoTone"
                                                    color="red-600"
                                                    onClick={()=>props?.handleRemoveItem(values?.package_id)}
                                                    type={'button'}
                                                >
                                                    {'Delete Package'}
                                                </Button>
                                            </>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </Card>
        </>
    )
}

export default PackagingItem
