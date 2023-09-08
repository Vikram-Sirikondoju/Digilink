import React, { useState } from 'react'
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
import TopCustomersFilter from './TopCustomersFilter'
import TopCustomersTableSearch from './TopCustomersTableSearch'


const TopCustomersTableTool = () => {

    const data = [
        {
          value: 1,
          label: "Enterprise Customers"
        },
        {
          value: 2,
          label: "Retail Customers"
        },
        {
          value: 3,
          label: "Enterprise Customers"
        }
        
      ];

    // const [inputValue, setInputValue] = useState()

    const [selectedValue, setSelectedValue] = useState(3);
 
    
    const handleChange = e => {
      setSelectedValue(e.value);
    }
   




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
                <TopCustomersTableSearch />
                <TopCustomersFilter />
                <Link
                    className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                    target="_blank"
                    download
                >
                    <Button block size="sm" icon={<HiDownload />}>
                        Export
                    </Button>
                </Link>


                <div className=' rounded-md  w-56'>

                   

                    <Select  
                        placeholder="Select Option"
                        value={data.find(obj => obj.value === selectedValue)} // set selected value
                        options={data} // set list of the data
                        onChange={handleChange} // assign onChange function
                    />

                </div>




            </div>





        </>
    )
}

export default TopCustomersTableTool
