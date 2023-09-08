import React from 'react'
import { AdaptableCard, } from 'components/shared'
import { Input, FormItem, FormContainer, Button } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Notification, toast } from 'components/ui'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'


export default function UpdateApiConfiguration() {
    const navigate = useNavigate();
    const location = useLocation();

    const mode = location.state?.mode ? location.state.mode : "ADD";


    const optionalValues = {
        name: "",
        baseUrl: "",
        applicationId: "",
        applicationToken: "",
        clientSecret: "",
        lastModified: "",
        modifiedBy: "",
    }

    const validationSchema = Yup.object().shape({

        name: Yup.string().required("Please enter name").min(2).max(100).nullable(),
        baseUrl: Yup.string().required("Please enter base url").min(2).max(255).nullable(),
        applicationId: Yup.string().required("Please enter application id").min(2).max(100).nullable(),
        applicationToken: Yup.string().required("Please enter application token").min(2).max(50).nullable(),
        clientSecret: Yup.string().required("Please enter client secret").min(2).max(50).nullable(),
        lastModified: Yup.string().required("Please enter last modified").min(2).max(50).nullable(),
        modifiedBy: Yup.string().required("Please enter modified by").min(2).max(100).nullable(),
    })
    const toastNotification = (
        <Notification title=" API Configuaration Updated Successfully">
            <p style={{ fontSize: "12px" }}>Detailed Description and advice about Successfullycopywriting</p>
        </Notification>
    );
    function openNotification() {
        toast.push(toastNotification)
    }

    let breadCrumbList = [{
        name: 'Settings',
         link: "/home"
    }, {
        name: 'API Configuration',
        link: "/settings-menu-api-configuration"
    }, {
        name: `Edit API Configuration `,
    }]

    // if (mode === "EDIT") {
    //     breadCrumbList = [
    //         {
    //             name: 'Settings',
    //             // link: '/home',
    //         },
    //         {
    //             name: 'API Configuration',
    //             link: '/settings-menu-api-configuration',
    //         },

    //         {
    //             name: "Edit API Configuration "
    //         },
    //     ]
    // }

    return (
        <>
            {/* <div>Settings/API Configuration/Update API Configuration</div> */}
            <CustomBreadcrumbs  list={breadCrumbList} />
            <div className='mt-5'>
                <h3>Update API Configuration</h3>


                <AdaptableCard className="h-full" bodyClass="h-full" divider>

                    <Formik
                        initialValues={optionalValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)
                            navigate('/settings-menu-api-configuration');

                            console.log(values, "valuess")

                        }}
                    >
                        {({ values, touched, errors, isSubmitting, handleSubmit }) => {
                            return (
                                <>
                                    <Form onSubmit={handleSubmit}>
                                        <FormContainer>
                                            <div style={{ backgroundColor: "#F5F5F5", padding: "20px 4px ", marginTop: "10px" }}>

                                                <div style={{ backgroundColor: "white", padding: "15px 15px" }} className=" gap-4 mx-4">
                                                    <div className="md:grid grid-cols-2 gap-4 mx-4 mt-3 pl-2">
                                                        <FormItem
                                                            label={<p>Name <span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.name && touched.name}
                                                            errorMessage={errors.name}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="name"
                                                                placeholder="Cameron Williamson"
                                                                component={Input}
                                                                style={{ width: "80%" }}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={<p>Base Url <span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.baseUrl && touched.baseUrl}
                                                            errorMessage={errors.baseUrl}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="baseUrl"
                                                                placeholder="http://senger.org/cum-et-et-fugit-architecto-odio-nam"
                                                                component={Input}
                                                                style={{ width: "80%" }}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={<p>Application ID <span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.applicationId && touched.applicationId}
                                                            errorMessage={errors.applicationId}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="applicationId"
                                                                placeholder="ID:52974"
                                                                component={Input}
                                                                style={{ width: "80%" }}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={<p>Application Token <span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.applicationToken && touched.applicationToken}
                                                            errorMessage={errors.applicationToken}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="applicationToken"
                                                                placeholder="MsgU7Lyonr6PqsW"
                                                                component={Input}
                                                                style={{ width: "80%" }}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={<p>Client Secret<span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.clientSecret && touched.clientSecret}
                                                            errorMessage={errors.clientSecret}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="clientSecret"
                                                                placeholder="12*****89"
                                                                component={Input}
                                                                style={{ width: "80%" }}
                                                            />
                                                        </FormItem>
                                                        <div className="md:grid grid-cols-2">
                                                            <FormItem
                                                                label={<p>Last Modified <span style={{ color: "red" }}>{'*'}</span></p>}
                                                                invalid={errors.lastModified && touched.lastModified}
                                                                errorMessage={errors.lastModified}
                                                            >
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="lastModified"
                                                                    placeholder="21/06/23"
                                                                    component={Input}
                                                                    style={{ width: "60%" }}
                                                                />
                                                            </FormItem>
                                                            <FormItem
                                                                label={<p> Modified By<span style={{ color: "red" }}>{'*'}</span></p>}
                                                                invalid={errors.modifiedBy && touched.modifiedBy}
                                                                errorMessage={errors.modifiedBy}
                                                            >
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="modifiedBy"
                                                                    placeholder="Admin"
                                                                    component={Input}
                                                                    style={{ width: "60%" }}
                                                                />
                                                            </FormItem>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </FormContainer>
                                        <div className="mt-4 text-right">

                                            <Link
                                                className="block lg:inline-block md:mb-0 mb-4"
                                                to="/settings-menu-api-configuration">
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
                                            <Button variant="solid" onClick={openNotification} type="submit" style={{
                                                color: "white", 
                                                fontStyle: 'normal',
                                                fontSize: '18px'
                                            }}>Publish</Button>

                                            {/* <Button
                                                    className="mx-2"
                                                    variant="solid"
                                                    type="submit"
                                                    onClick={openNotification}
                                                >
                                                    Publish
                                                </Button> */}



                                        </div>
                                    </Form>
                                </>
                            )
                        }}
                    </Formik>
                </AdaptableCard>




            </div >
        </>
    )
}
