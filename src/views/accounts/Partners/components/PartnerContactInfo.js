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
import { RiCloseCircleFill } from 'react-icons/ri';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useState } from 'react';


const partnerContactInitValues = {
    accFirstName : "",//not in api
    accLastName : "",
    accMiddleName:'',
    accEmailId:"",
    accPrimCont : "", 
    accAltCont : "",
    accFax : "",
    accWebUrl : "",
  }

  const partnerContactValidationSchema = Yup.object().shape({
    accFirstName: Yup
    .string()
    .required("Please enter first name").nullable(),
    // accPrimContName : Yup.string().min(2,"Number must be at least 2 Characters").max(100).required('Please Enter Primary Contact'),
    //accPrimContName : Yup.string().required("Mobile number is required").matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid number"),
    accLastName : Yup.string().min(5,"LastName must be at least 5 characters").max(50,"max. 50 characters allowed").required('Please enter last name').nullable(),
    accEmailId : Yup.string().min(5,"Email id must be at least 5 characters").max(50).email('Please enter valid email id').required('Please enter email id').nullable(),
    accPrimCont :   Yup.string().min(5,"Number must be atleast 5 characters").max(20,"Max 20 characters are allowed")
    .required("Please enter phone number").nullable(),
}) 


const PartnerContactInfo = ({ onChange, refId, ...props }) => { 

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
                initialValues={props.partnerIntialValues.ContactInfo}
                validationSchema={partnerContactValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload ={...props.partnerState, ...values}
                    
                    props.setPartnerState(updatedPayload)

                    let dataToStore = props.partnerIntialValues
                    dataToStore.ContactInfo = values
                    props.setPartnerIntialValues(dataToStore)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">

                                <FormItem
                                        
                                        label={<p>First Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accFirstName && touched.accFirstName}
                                        errorMessage={errors.accFirstName}
                                    >
                                        <Field
                                            values={values.accFirstName}
                                            type="text"
                                            autoComplete="off"
                                            name="accFirstName"
                                            placeholder="Enter First Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        
                                        label="Middle Name"
                                    >
                                        <Field
                                            values={values.accMiddleName}
                                            type="text"
                                            autoComplete="off"
                                            name="accMiddleName"
                                            placeholder="Enter Middle Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        
                                        label={<p>Last Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accLastName && touched.accLastName}
                                        errorMessage={errors.accLastName}
                                    >
                                        <Field
                                            values={values.accLastName}
                                            type="text"
                                            autoComplete="off"
                                            name="accLastName"
                                            placeholder="Enter Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Email ID <span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.accEmailId && touched.accEmailId}
                                        errorMessage={errors.accEmailId}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="accEmailId"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Phone Number <span style={{color: 'red'}}>{'*'}</span></p>}
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
                                            type="tel"
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
                                                    console.log('values.fieldsContact',values)
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
                                    disabled = {values?.fieldsContacts?.length>0&&values?.fieldsContacts[values?.fieldsContacts?.length - 1 ]?.field_value == '' ? true : false}
                                    icon={<BsFillPlusCircleFill fill="#004D99" className='' />}
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

export default PartnerContactInfo