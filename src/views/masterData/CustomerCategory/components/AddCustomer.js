import { AdaptableCard, RichTextEditor } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Radio,
    Checkbox,
    Alert
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiCreateCategory, apiUpdatcust } from 'services/CustCategoryService'
import { CustCategoryEditandCopy } from 'utils/campareandCopy'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import ReactHtmlParser from 'html-react-parser'
import { getCustAccount } from '../store/dataSlice'
import * as Yup from "yup";
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const placementList = [
    { name: 'Enterprise Customer', value: 'top' },
    { name: 'Retail Customer', value: 'right' },

]

const validationSchemaforCheckbox = Yup.object().shape({
    Enterprise_Customer: Yup.boolean(),
    Retail_Customer: Yup.boolean(),
}).test('checkbox-required', 'Please select at the customer type', function (value) {

    const isEnterpriseSelected = value.Enterprise_Customer;
    const isRetailSelected = value.Retail_Customer;
    const isAtLeastOneSelected = isEnterpriseSelected || isRetailSelected;
    return isAtLeastOneSelected;
}).nullable()

const custCatValidationSchema = Yup.object().shape({
    // acc_unq_id: Yup.string().required('Please select operator').nullable(),
    title: Yup.string().trim().required('Please enter category title').nullable(),
})

const AddCustomer = (props) => {
    // const [placement, setPlacement] = useState(placementList[1].value)
    // const onPlacementChange = (val) => {
    //     setPlacement(val)
    // }
    // // const onCheck = (value, field, form) => {
    // //     form.setFieldValue(field.name, value)
    // // }
    let customerType = {
        "Enterprise_Customer": false,
        "Retail_Customer": false
    }

    let intialValues = {
        title: "",
        description: "",
        cust_cat_type: {
            Enterprise_Customer: false,
            Retail_Customer: false,
        },
        acc_unq_id: ""
    }
    const {
        enterAccount,
        unq_id, user_type
    } = useSelector((state) => state?.auth?.user)


    const dispatch = useDispatch()
    const [custIntialValues, setCustIntialValues] = useState(intialValues)
    const [userState, setUserState] = useState({})
    const [message, setMessage] = useTimeOutMessage()
    const formikRef = useRef()
    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const rowForEdit = location.state?.data;
    const navigate = useNavigate()
    const checkBoxString = rowForEdit && rowForEdit.cust_cat_type ? JSON.parse(rowForEdit.cust_cat_type) : customerType;
    const [checkboxValues, setCheckboxValues] = useState(checkBoxString);
    const custAccountList = useSelector((state) => state.CustomerCategoryList?.data?.custAccountList)

    const handleCheckboxChange = async (event, name) => {

        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [name]: event.target.checked
        }));
    };

    const submitApi = async (data) => {
        // const cust_cat_desc = ReactHtmlParser(data?.description);
        let intialValues = {
            title: data.title,
            description: data.description,
            cust_cat_type: checkboxValues,
            acc_unq_id: data.acc_unq_id
        }
        let Payload =
        {
            "cust_cat_type": JSON.stringify(intialValues.cust_cat_type),
            "cust_cat_title": data.title.trim(),
            "cust_cat_desc": data?.description,
            "md_cus_status": "ACTIVE",
            "unq_id": user_type !== "GlobalMno" ? enterAccount : data.acc_unq_id
        }

        if (mode === "ADD") {
            const resp = await apiCreateCategory(Payload)

            if (resp.status === 'success') {
                OpenNotification("success", 'Created successfully')
                navigate('/masterDataMenu-item-view-3')


            }
            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        } else if (mode === "EDIT") {

            Payload.id = rowForEdit.id
            Payload.md_cus_status = rowForEdit.md_cus_status

            const resp = await apiUpdatcust(Payload)
            if (resp.status === 'success') {
                OpenNotification("success", 'Updated successfully')
                navigate('/masterDataMenu-item-view-3')


            }
            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
    }

    useEffect(() => {
        if (rowForEdit) {
            const userEditIntialValues = CustCategoryEditandCopy(intialValues, rowForEdit);

            setUserState(userEditIntialValues)
        }

    }, [rowForEdit])

    useEffect(() => {

        dispatch(getCustAccount({ enterAccount }))

    }, [dispatch, enterAccount])


    const validateCheckBox = async (passedValue) => {

        try {
            await validationSchemaforCheckbox.validate({ ...checkboxValues });
        } catch (error) {
            return error.message;
        }

    }

    let breadCrumbList = [{
        name: 'Master Data',
         link:"/home"
    },
    {
        name: 'Customer Category',
        link: "/masterDataMenu-item-view-3"
    },
    {
        name: `Add Customer Category`,
    }]


    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Master Data',
                 link:"/home"
            },
            {
                name: 'Customer Category',
                link: "/masterDataMenu-item-view-3"
            },
            {
                name: rowForEdit?.cust_cat_title,
                link: '/masterDataMenu-item-view-3',
                state: rowForEdit
            },
            {
                name: `Edit Customer Category`,
            },


        ]
    }

    return (
        <>

            {message && <Alert className="mb-4" type="danger" showIcon>
                {message}
            </Alert>}
            <div>
                {/* Master Data / Customer Category / Add Customer Category */}
                <CustomBreadcrumbs list={breadCrumbList} />
            </div>
            <h3 className='mb-5 mt-3'>{mode === "EDIT" ? "Edit " : "Create "}Customer Category</h3>

            <div className="mt-6  rounded ">



                <Formik
                    innerRef={formikRef}
                    initialValues={intialValues}
                    validationSchema={custCatValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        submitApi(values)

                    }}
                >
                    {({ values, touched, errors, isSubmitting }) => {
                        return (
                            <Form>
                                <div style={{ backgroundColor: "#F5F5F5", padding: "15px", marginTop: "10px" }}>
                                    <FormContainer>
                                        <AdaptableCard className="h-full p-4" bodyClass="h-full">
                                            <div className="gap-3 mx-4 my-2 mt-4">
                                                <div className='md:grid grid-cols-2 gap-4'>
                                                    <FormItem
                                                        label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.acc_unq_id && touched.acc_unq_id}
                                                        errorMessage={errors.acc_unq_id}

                                                    >
                                                        <Field name="acc_unq_id" validate={async (passedValue) => {
                                                            if (user_type === "GlobalMno") {
                                                                try {
                                                                    await Yup.string().required('Please select operator').validate(passedValue);
                                                                } catch (error) {
                                                                    return error.message;
                                                                }
                                                            }
                                                        }}>

                                                            {({ field, form }) => (
                                                                <Select
                                                                    isDisabled={user_type !== "GlobalMno" ? true : false}
                                                                    placeholder="Select Operator"
                                                                    field={field}
                                                                    form={form}
                                                                    disabled={true}
                                                                    options={custAccountList}
                                                                    value={user_type !== "GlobalMno" ? custAccountList?.filter(
                                                                        (label) =>
                                                                            label.acc_unq_id === enterAccount
                                                                    ) : custAccountList?.filter(
                                                                        (label) =>
                                                                            label.acc_unq_id === values.acc_unq_id
                                                                    )}
                                                                    onChange={(label) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            label.acc_unq_id
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                </div>
                                                <div className='md:grid grid-cols-2'>
                                                    <FormItem
                                                        label={<p>Select Customer Type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={touched.cust_cat_type && (checkboxValues["Enterprise_Customer"] || checkboxValues["Retail_Customer"]) !== true}
                                                        errorMessage={"Please select at the customer type"}
                                                    >
                                                        <div className="flex mt-2">
                                                            <div className='flex '>

                                                                {/* <p className='text-lg ' >  */}
                                                                <Field className='w-5 h-5 mt-1 '
                                                                    type="checkbox"
                                                                    name="cust_cat_type.Enterprise_Customer" // Match the name used in Yup validation schema
                                                                    checked={checkboxValues["Enterprise_Customer"]}
                                                                    onChange={(e) => handleCheckboxChange(e, "Enterprise_Customer")}
                                                                    validate={validateCheckBox}
                                                                />
                                                                <label className='ml-4 mb-2 text-lg' htmlFor="cust_cat_type.Enterprise_Customer">Enterprise Customer</label>
                                                                {/* </p> */}
                                                            </div>
                                                            <div className='flex ml-3'>
                                                                {/* <p className='text-lg' > */}
                                                                <Field
                                                                    className='w-5 h-5 mt-1 '
                                                                    type="checkbox"
                                                                    name="cust_cat_type.Retail_Customer" // Match the name used in Yup validation schema
                                                                    checked={checkboxValues["Retail_Customer"]}
                                                                    onChange={(e) => handleCheckboxChange(e, "Retail_Customer")}
                                                                    validate={validateCheckBox}
                                                                />
                                                                <label className='text-lg ml-4' htmlFor="cust_cat_type.Retail_Customer">Retail Customer</label>
                                                                {/* </p> */}

                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                    <div className='ml-6'>
                                                        <FormItem
                                                            label={<p>Customer Category Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                            invalid={errors.title && touched.title}
                                                            errorMessage={errors.title}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="title"
                                                                placeholder="Enter Category Title"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </div>
                                                </div>

                                                <FormItem
                                                    label="Description"

                                                >
                                                    <Field name="description"  >
                                                        {({ field, form }) => (
                                                            <RichTextEditor
                                                                value={field.value}
                                                                onChange={(val) =>
                                                                    form.setFieldValue(field.name, val)
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                            </div>
                                        </AdaptableCard>
                                    </FormContainer>
                                </div>
                                <div className="pt-4 text-right  w-full flex justify-end">
                                    <>
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/masterDataMenu-item-view-3">
                                            <Button
                                                className="mx-2"
                                                variant="solid"
                                                style={{
                                                    backgroundColor: "#4D4D4D",
                                                    fontStyle: 'normal',
                                                    fontSize: '18px'
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Link>


                                        <Button type='submit' variant='solid' style={{
                                            fontStyle: 'normal',
                                            fontSize: '18px',
                                        }} >
                                            {'Submit'}
                                        </Button>

                                    </>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </>
    )
}

export default AddCustomer
