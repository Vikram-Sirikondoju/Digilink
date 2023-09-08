import { AdaptableCard } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    Select,
    FormItem,
    FormContainer,
    Switcher,
    Badge,
    Checkbox,
    Alert
} from 'components/ui'
import { Link, useNavigate } from 'react-router-dom'
import useDirection from 'utils/hooks/useDirection'
import { Field, Form, Formik } from 'formik'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HiCheck } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import * as Yup from 'yup'
import { apiSubmitTheme, apiUpdateTheme } from 'services/ThemeConfigService'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import useDarkMode from 'utils/hooks/useDarkMode'
import { GetThemeInfo } from '../store/dataSlice'
import { setThemeColor, setThemeColorLevel } from 'store/theme/themeSlice'
// const placementList = [
//     { name: 'Fixed', value: 'top' },
//     { name: 'Percentage', value: 'right' },

// ]
const dirList = [
    { value: 'LTR', label: 'LTR' },
    { value: 'RTL', label: 'RTL' },
]

const themeValues = [
    { value: 'true', lable: "true" },
    { value: 'false', lable: "false" },

]

const colorList = [
    { label: 'Red', value: 'red' },
    { label: 'Orange', value: 'orange' },
    { label: 'Amber', value: 'amber' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Lime', value: 'lime' },
    { label: 'Green', value: 'green' },
    { label: 'Emerald', value: 'emerald' },
    { label: 'Teal', value: 'teal' },
    { label: 'Cyan', value: 'cyan' },
    { label: 'Sky', value: 'sky' },
    { label: 'Blue', value: 'blue' },
    { label: 'Indigo', value: 'indigo' },
    { label: 'Violet', value: 'violet' },
    { label: 'Purple', value: 'purple' },
    { label: 'Fuchsia', value: 'fuchsia' },
    { label: 'Pink', value: 'pink' },
    { label: 'Rose', value: 'rose' },
]

const colorLevelList = [
    { label: '400', value: 400 },
    { label: '500', value: 500 },
    { label: '600', value: 600 },
    { label: '700', value: 700 },
    { label: '800', value: 800 },
    { label: '900', value: 900 },
]

const initialValues = {
    unq_id: "",
    // id: "",
    thm_colour: "",
    thm_font_family: "cursive",
    thm_mode: false,
    thm_orientation: "",
    thm_colour_level: 500
}

const validateFormikTheme = Yup.object().shape({
    // unq_id: Yup.string().required("Please select language preferences").nullable(),
    // thm_colour: Yup.string().required("Please select language preferences").nullable(),
    // thm_font_family: Yup.string().required("Please select language preferences").nullable(),
    // thm_mode: Yup.string().required("Please select language preferences").nullable(),
    // thm_orientation: Yup.string().required("Please select language preferences").nullable(),
})


const ThemeConfigurationDetails = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formikRef = useRef()

    const { unq_id, acc_mno_unq_id } = useSelector((state) => state.auth.user)
    const themeInfo = useSelector((state) => state.themeInfo?.data?.getThemeData[state.themeInfo?.data?.getThemeData.length - 1])
    const themeInfoArr = useSelector((state) => state.themeInfo?.data?.getThemeData)
    const [message, setMessage] = useTimeOutMessage()

    const [isDark, setIsDark] = useDarkMode()
    const [useDir, setUseDir] = useDirection()
    // const [isDark, setIsDark] = useState(themeInfo? themeInfo?.thm_mode : false)
    const [direction, updateDirection] = useState('LTR')
    const [themeInitValues, setThemeInitValues] = useState(initialValues)

    // const onSwitchChange = useCallback((checked,form,field) => {
    //         form.setFieldValue(field.name,!checked)
    //         setIsDark(!checked)
    // },[setIsDark])

    const ColorBadge = ({ className, themeColor }) => {
        const primaryColorLevel = useSelector(
            (state) => state.theme.primaryColorLevel
        )

        return (
            <Badge
                className={className}
                innerClass={classNames(`bg-${themeColor}-${primaryColorLevel}`)}
            />
        )
    }

    const CustomSelectOption = ({ innerProps, label, value, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 ${isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                {...innerProps}
            >
                <div className="flex items-center gap-2">
                    <ColorBadge themeColor={value} />
                    <span>{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const onDirChange = (val, form, field) => {
        form.setFieldValue(field.name, val)
        updateDirection(val)
    }

    const onSaveColorTheme = useCallback(async (values) => {
        values.unq_id = unq_id
        values.thm_font_family = 'cursive'
        let isChangedInputs = true
        if (values.thm_mode === themeInfo?.thm_mode && values.thm_orientation === themeInfo?.thm_orientation && values.thm_colour === themeInfo?.thm_colour && values.thm_colour_level === themeInfo?.thm_colour_level) {
            isChangedInputs = false
        }
        if (isChangedInputs) {


            let resp
            if (themeInfo == undefined) {
                resp = await apiSubmitTheme(values)
            } else {
                values.id = themeInfo?.id
                resp = await apiUpdateTheme(values)

            }
            if (resp.status === 'success') {
                dispatch(GetThemeInfo({ unq_id: acc_mno_unq_id }))
                OpenNotification('success', 'Changed successfully')
                setIsDark(values.thm_mode ? 'dark' : 'light')
                setUseDir(values.thm_orientation)
                dispatch(setThemeColor(values.thm_colour))
                dispatch(setThemeColorLevel(values.thm_colour_level))
            }
            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp))
            }
        } else {

            OpenNotification("warning", "Please do some changes in themes")
        }
    }, [dispatch, themeInfo])

    const onClickReset = (resetForm) => {
        resetForm({ values: initialValues, touched: {}, errors: {} })
        updateDirection('LTR')
    }

    useEffect(() => {
        dispatch(GetThemeInfo({ unq_id: acc_mno_unq_id }))
    }, [dispatch, unq_id])

    const preValuesToTheme = (themeInfo, initialValues) => {
        initialValues.thm_mode = themeInfo?.thm_mode
        initialValues.thm_colour = themeInfo?.thm_colour
        initialValues.thm_orientation = themeInfo?.thm_orientation
        initialValues.thm_font_family = themeInfo?.thm_font_family
        initialValues.thm_colour_level = themeInfo?.thm_colour_level
        // initialValues.id = themeInfo?.id


        return initialValues
    }

    useEffect(() => {
        const a = preValuesToTheme(themeInfo, initialValues)
        setThemeInitValues(a)
        updateDirection(a.thm_orientation)
    }, [themeInfo])

    return (
        <>
            <h3 className='mb-4'>Theme Configuration</h3>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {Array.isArray(message) ? message.join(", ") : message}
                </Alert>
            )}
            <Formik innerRef={formikRef}
                initialValues={themeInitValues}
                // validationSchema={validateFormikTheme}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    onSaveColorTheme(values)
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue, resetForm }) => {
                    return (
                        <Form>
                            <div className="p-5" style={{ backgroundColor: "#f5f5f5" }}>
                                <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                    <FormContainer>
                                        <div className="md:grid gap-4 mx-4 pl-2">
                                            <FormItem
                                                label="Dark Mode" style={{ fontSize: "16px" }}
                                            >
                                                <p style={{ fontSize: "11px" }}>Switch theme to dark mode</p>
                                                <Field name='thm_mode'>
                                                    {({ field, form }) => (
                                                        <Switcher className='mt-3' checked={values.thm_mode}
                                                            onChange={(checked) => form.setFieldValue(field.name, !checked)}
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                            <FormItem
                                                label="Orientation" style={{ fontSize: "16px" }}
                                            >
                                                <p style={{ fontSize: "11px" }}>Select a direction</p>
                                                <Field name='thm_orientation'>
                                                    {({ field, form }) => (
                                                        <div className='mt-4'>
                                                            <InputGroup size="sm">
                                                                {dirList.map((dir) => (
                                                                    <Button type="button" className={`w-24 ${direction === dir.value ? "bg-gray-400" : "bg-gray-50"}`}
                                                                        key={dir.value}
                                                                        active={direction === dir.value}
                                                                        onClick={() => onDirChange(dir.value, form, field)}
                                                                    >
                                                                        {dir.label}
                                                                    </Button>
                                                                ))}
                                                            </InputGroup>
                                                        </div>
                                                    )}
                                                </Field>
                                            </FormItem>
                                            <div className='md:grid grid-cols-5 gap-4'>
                                                <FormItem label="Color Theme" >
                                                    <Field name="thm_colour">
                                                        {({ field, form }) => (
                                                            <Select placeholder="Select Color Theme" field={field} form={form} options={colorList}
                                                                value={colorList.filter((color) => color.value === values.thm_colour)}
                                                                onChange={(obj) => form.setFieldValue(field.name, obj.value)}
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                                <FormItem label="Color Level" >
                                                    <Field name="thm_colour_level">
                                                        {({ field, form }) => (
                                                            <Select placeholder="Select Color Level" options={colorLevelList} field={field} form={form}
                                                                value={colorLevelList.filter((color) => color.value === values.thm_colour_level)}
                                                                onChange={(obj) => form.setFieldValue(field.name, obj.value)}
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                            </div>
                                        </div>
                                    </FormContainer>
                                </AdaptableCard>
                            </div>
                            <div className="mt-4 text-right">
                                <Button type="button" className="mx-2" variant="solid"
                                    onClick={() => onClickReset(resetForm)}
                                    style={{ backgroundColor: "#4D4D4D", fontStyle: 'normal', fontSize: '18px' }}>
                                    Reset
                                </Button>
                                <Button variant="solid" type='Submit' style={{ color: "white", fontStyle: 'normal', fontSize: '18px' }}>
                                    Save
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}


export default ThemeConfigurationDetails

