


import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'

import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
    Select,
} from 'components/ui'
import TopCustomersTableSearch from '../TopCustomers/TopCustomersTableSearch'
import TopProvidersTableSearch from './TopProvidersTableSearch'
import TopProviderFilter from './TopProviderFilter'

const TopProvidersTableTools = () => {


    const formFieldsType = [
        { label: 'Text Field', value: 'TF' },
        { label: 'Text Area', value: 'TA' },
        { label: 'Drop Down', value: 'DD' },
        { label: 'Radio Button', value: 'RB' },
        { label: 'Check Boxes', value: 'CB' },
        { label: 'CK Editor', value: 'CK' },
      ]
    return (
        <>
            
                    <div className="flex justify-end  flex-col lg:flex-row lg:items-center">
                        <TopProvidersTableSearch />
                        <TopProviderFilter />
                        <Link
                            className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                            target="_blank"
                            download
                        >
                            <Button block size="sm" icon={<HiDownload />}>
                                Export
                            </Button>
                        </Link>
                    </div>

              



        </>
    )
}

export default TopProvidersTableTools
