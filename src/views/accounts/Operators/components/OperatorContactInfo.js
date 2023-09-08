import {
    Input,
    FormItem,
    FormContainer,
    Tooltip,
    Dialog,
    Button,
} from 'components/ui'
import { Field, FieldArray } from 'formik'
import { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { RiCloseCircleFill } from 'react-icons/ri';
import { validateURL } from 'views/Servicefile';

const OperatorContactInfo = ({ onChange, ...props }) => {
    const { errors, touched, values } = props
    // const validate = (values) => {
    //     const errors = {};
      
    //     if (values) {
    //       const urlPattern = /^(https?:\/\/)?(www\.)?([^\s.]+\.[^\s]{2,}|localhost)(\/[^\s]*)?$/;
    //       if (!urlPattern.test(values)) {
    //         errors.accWebUrl = 'Invalid URL format';
    //       }
    //     }
      
    //     return errors;
    //   };

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
            <FormContainer>
                <div className="md:grid grid-cols-4 gap-4 mx-4">
                    <FormItem
                        label={<p>First Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.custFirstName && touched.custFirstName}
                        errorMessage={errors.custFirstName}
                    >
                        <Field
                            type="tel"
                            autoComplete="off"
                            name="ContactInfo.custFirstName"
                            placeholder="Enter First Name"
                            component={Input}
                        />
                    </FormItem>

                    <FormItem
                        label="Middle Name"
                    >
                        <Field
                          
                            type="text"
                            autoComplete="off"
                            name="ContactInfo.custMiddleName"
                            placeholder="Enter Middle Name "
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                       
                        label={<p>Last Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.custLastName && touched.custLastName}
                        errorMessage={errors.custLastName}
                    >
                        <Field
                           
                            type="text"
                            autoComplete="off"
                            name="ContactInfo.custLastName"
                            placeholder="Enter Last Name "
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>Email ID <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accEmailId && touched.accEmailId}
                        errorMessage={errors.accEmailId}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="ContactInfo.accEmailId"
                            placeholder="Enter Email Address"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>Phone Number <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accPrimCont && touched.accPrimCont}
                        errorMessage={errors.accPrimCont}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="ContactInfo.accPrimCont"
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
                            name="ContactInfo.accAltCont"
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
                            name="ContactInfo.accFax"
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
                            name="ContactInfo.accWebUrl"
                            placeholder="Enter Website URL"
                            component={Input}
                            validate={validateURL}
                           
                        />
                    </FormItem>

                    <FieldArray name="ContactInfo.fieldsContact">
                        {({ push, remove }) => (
                            <>

                                {values.fieldsContact.map((item, index) => {
                                    return (
                                        <FormItem
                                            label={
                                                <div style={{ display: 'flex', alignItems: 'center',flexWrap:'wrap' }}>
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
                                                name={`ContactInfo.fieldsContact[${index}].field_value`}
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
                    disabled = {values.fieldsContact[values.fieldsContact.length - 1 ]?.field_value == '' ? true : false}
                >
                    ADD CUSTOM FIELD
                </Button>
            </div>
        </>
    )
}
export default OperatorContactInfo
