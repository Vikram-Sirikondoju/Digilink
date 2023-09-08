import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Tooltip,
    Dialog,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from "yup";
import { validateURL } from 'views/Servicefile';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';


const provContactInitValues = {
    accPrimeContFirstName: "",//not in api
    accPrimeContLastName:"",
    accEmailId: "",
    accPrimCont: "",
    accAltCont: "",
    accFax: "",
    accWebUrl: "",
}
const initialValues = {
    fields: [],
  };

const provContactValidationSchema = Yup.object().shape({
    accPrimeContFirstName: Yup.string().required('Please enter first name').min(2,"Contact must be atleast 2 characters").max(100).nullable(),
    accPrimeContLastName: Yup.string().required('Please enter last name').min(2,"Contact must be atleast 2 characters").max(100).nullable(),
    accEmailId: Yup.string().min(5,"Email id must be at least 5 characters").max(50).email('Please enter valid email id').required('Please enter email id').nullable(),
    accPrimCont: Yup.string().min(5,"Number must be atleast 5 characters").max(20,"Max 20 characters are allowed")
    .required("Please enter phone number").nullable(),
    //  accWebUrl: Yup
    // .string().required("Please enter url").url()

    
})

const ProviderContactInfo = ({ onChange, refId, ...props }) => {

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
            push({ field_title: newLabel, field_value: '',field_type:'CONTACT',  })
            setNewLabel('')
            setIsOpen(false)
        }
    }


    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">CONTACT INFO</h3>

            <Formik innerRef={refId}
                initialValues={props.provideIntialValues.ContactInfo}
                validationSchema={provContactValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.providerState, ...values }

                    props.setProviderState(updatedPayload)

                    let dataToStore = props.provideIntialValues
                    dataToStore.ContactInfo = values
                    props.setProviderIntialValues(dataToStore)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>First Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accPrimeContFirstName && touched.accPrimeContFirstName}
                                        errorMessage={errors.accPrimeContFirstName}
                                    >
                                        <Field
                                            values={values.accPrimeContFirstName}
                                            type="text"
                                            autoComplete="off"
                                            name="accPrimeContFirstName"
                                            placeholder="Enter First Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label={<p>Middle Name</p>}>
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accPrimeContMidName"
                                            placeholder="Enter Middle Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label={<p>Last Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accPrimeContLastName && touched.accPrimeContLastName}
                                        errorMessage={errors.accPrimeContLastName}
                                    >
                                        <Field
                                            values={values.accPrimeContLastName}
                                            type="text"
                                            autoComplete="off"
                                            name="accPrimeContLastName"
                                            placeholder="Enter Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Email ID<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accEmailId && touched.accEmailId}
                                        errorMessage={errors.accEmailId}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accEmailId"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Phone Number<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accPrimCont && touched.accPrimCont}
                                        errorMessage={errors.accPrimCont}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accPrimCont"
                                            placeholder="Enter Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Alternate Phone Number"
                                        invalid={errors.accAltCont && touched.accAltCont}
                                        errorMessage={errors.accAltCont}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accAltCont"
                                            placeholder="Enter Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Fax Number"
                                        invalid={errors.accFax && touched.accFax}
                                        errorMessage={errors.accFax}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accFax"
                                            placeholder="Enter Fax Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Website URL"
                                        invalid={errors.accWebUrl && touched.accWebUrl}
                                        errorMessage={errors.accWebUrl}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accWebUrl"
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

                            <div>
                                <Button
                                type='button'
                                variant='plain'
                                className="font-bold"
                                style={{ color: '#004D99'}}
                                onClick={() => openDialog()}
                                icon={<BsFillPlusCircleFill fill="#004D99" className='' />}
                                disabled = {values?.fieldsContacts?.length>0&&values.fieldsContacts[values?.fieldsContacts?.length - 1]?.field_value == '' ? true : false}
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

export default ProviderContactInfo
