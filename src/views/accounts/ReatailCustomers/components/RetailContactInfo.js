import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Dialog,
    Tooltip,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from "yup";
import { validateURL } from 'views/Servicefile';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';

const retailContactInitValues = {

    custFirstName: "",
    custLastName: "",
    custMiddleName: "",
    custEmailId: "",
    custAltCont: "",
    custFax: "",
    custWebUrl: "",
}

const retailContactValidationSchema = Yup.object().shape({
    custFirstName: Yup
        .string()
        .required("Please enter first name").nullable(),
    custLastName: Yup
        .string()
        .required("Please enter last name").nullable(),
    // .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number"),

    custEmailId: Yup.string().required('Please enter email id').email("Please enter valid email id").nullable(),
    // custAltCont: Yup
    // .string()
    // .required("Please enter phone number")
    // .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter valid number").nullable(),

    custPhone: Yup.string().min(2, "Number must be atleast 2 characters").max(20, "Max 20 characters are allowed")
        .required("Please enter phone number").nullable(),
    //custPrimCont: Yup.string().required('Please Enter  Phone Number'),
    // custFax: Yup.string().required('Please Enter Fax'),
    //custWebUrl: Yup.string().required('Please Enter Web Url'),
})
const RetailContactInfo = ({ onChange, refId, ...props }) => {

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [newLabel, setNewLabel] = useState('')

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }
    const onDialogOk = (push, values) => {
        if (newLabel !== '') {
            push({ field_title: newLabel, field_value: '',field_type:'CONTACT' })
            setNewLabel('')
            setIsOpen(false)
        }
    }


    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">CONTACT INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.retailIntialValues.retailContactInitValues}
                validationSchema={retailContactValidationSchema}
                onSubmit={(values, { setSubmitting }) => {


                    setSubmitting(true)
                    let updatedPayload = { ...props.retailState, ...values }

                    props.setRetailState(updatedPayload)

                    let dataToStore = props.retailIntialValues
                    dataToStore.retailContactInitValues = values
                    props.setRetailIntialValues(dataToStore)

                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>First Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custFirstName && touched.custFirstName}
                                        errorMessage={errors.custFirstName}
                                    >
                                        <Field
                                            values={values.custFirstName}
                                            type="text"
                                            autoComplete="off"
                                            name="custFirstName"
                                            placeholder="Enter First Name "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Middle Name"
                                    >
                                        <Field
                                            values={values.custMiddleName}
                                            type="text"
                                            autoComplete="off"
                                            name="custMiddleName"
                                            placeholder="Enter Middle Name "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Last Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custLastName && touched.custLastName}
                                        errorMessage={errors.custLastName}
                                    >
                                        <Field
                                            values={values.custLastName}
                                            type="text"
                                            autoComplete="off"
                                            name="custLastName"
                                            placeholder="Enter Last Name "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Email ID<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custEmailId && touched.custEmailId}
                                        errorMessage={errors.custEmailId}
                                    >
                                        <Field
                                            values={values.custEmailId}
                                            type="text"
                                            autoComplete="off"
                                            name="custEmailId"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Phone Number<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custPhone && touched.custPhone}
                                        errorMessage={errors.custPhone}
                                    >
                                        <Field
                                            values={values.custPhone}
                                            type="text"
                                            autoComplete="off"
                                            name="custPhone"
                                            placeholder="Enter Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Alternate Phone Number"
                                    // invalid={errors.custAltCont && touched.custAltCont}
                                    // errorMessage={errors.custAltCont}
                                    >
                                        <Field
                                            values={values.custAltCont}
                                            type="text"
                                            autoComplete="off"
                                            name="custAltCont"
                                            placeholder="Enter Alternate Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Fax Number"
                                        invalid={errors.custFax && touched.custFax}
                                        errorMessage={errors.custFax}
                                    >
                                        <Field
                                            values={values.custFax}
                                            type="text"
                                            autoComplete="off"
                                            name="custFax"
                                            placeholder="Enter Fax Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Website URL"
                                        invalid={errors.custWebUrl && touched.custWebUrl}
                                        errorMessage={errors.custWebUrl}
                                    >
                                        <Field
                                            // values={values.custWebUrl}
                                            type="text"
                                            autoComplete="off"
                                            name="custWebUrl"
                                            placeholder="Enter Website URL"
                                            component={Input}
                                            validate={validateURL}
                                        />
                                    </FormItem>
                                    <FieldArray name="fieldsContact">
                                        {({ push, remove }) => (
                                            <>

                                                {values.fieldsContact.map((item, index) => {
                                                    return (
                                                        <FormItem
                                                            label={
                                                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                                    <p style={{ marginRight: '20px' }}>{item.field_title}</p>
                                                                    <Tooltip title={`Remove`}>
                                                                        <span
                                                                            className={`cursor-pointer  text-${'rose'}-800 hover:text-${'rose'}-800`}
                                                                            onClick={() => remove(index)}
                                                                            style={{ marginLeft: 'auto' }}
                                                                        >
                                                                            <RiCloseCircleFill />
                                                                        </span>
                                                                    </Tooltip>
                                                                </div>

                                                            }
                                                        >

                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder=""
                                                                component={Input}
                                                                name={`fieldsContact[${index}].field_value`}
                                                            />

                                                        </FormItem>

                                                    )
                                                })}

                                                <Dialog
                                                    isOpen={dialogIsOpen}
                                                    onClose={onDialogClose}
                                                    onRequestClose={onDialogClose}
                                                    shouldCloseOnOverlayClick={false}
                                                    shouldCloseOnEsc={false}
                                                >
                                                    <FormItem
                                                        label="Field Title"
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="title"
                                                            placeholder="Enter Field Title"
                                                            component={Input}
                                                            value={newLabel}
                                                            onChange={(e) => setNewLabel(e.target.value)}
                                                        />
                                                    </FormItem>
                                                    <div className="text-right mt-6">
                                                        <Button
                                                            className="ltr:mr-2 rtl:ml-2"
                                                            variant="plain"
                                                            onClick={onDialogClose}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button variant="solid" onClick={() => onDialogOk(push, values,)}>
                                                            Okay
                                                        </Button>
                                                    </div>
                                                </Dialog>

                                            </>
                                        )}
                                    </FieldArray>

                                </div>

                            </FormContainer>
                            <div className="mt-2">
                                <Button
                                    type="button"
                                    variant="plain"
                                    className="font-bold"
                                    style={{ color: '#004D99' }}
                                    onClick={() => openDialog()}
                                    icon={<BsFillPlusCircleFill fill="#004D99" className='' />}
                                    disabled={values?.fieldsContacts?.length>0&&values.fieldsContacts[values?.fieldsContacts?.length - 1]?.field_value === '' ? true : false}
                                >
                                    ADD CUSTOM FIELD
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default RetailContactInfo
