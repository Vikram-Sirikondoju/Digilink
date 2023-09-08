import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
// import DocTypeTableSearch from './DocTypeTableSearch'
import { Link } from 'react-router-dom'
// import OperatorsFilter from './ItemsFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
// import DocTypeFilter from './DocTypeFilter'
// import NewOperators from './NewItems'
import Password from './../../../profile/components/Password';
import PasswordPolicy from './../index';
import PasswordPolicyTableSearch from './PasswordPolicyTableSearch';


const PasswordPolicyTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (

        <div className="flex flex-col lg:flex-row lg:items-center">
            <PasswordPolicyTableSearch />
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/settings-menu-password-policy-add"
            >
                <Button block

                    style={{
                        fontStyle: 'normal',
                    }}
                    className='flex justify-center pt-[6px] gap-1' variant="solid"
                    size="sm" disabled={!canAdd} >
                    <p className='pt-[2px]'><HiPlusCircle /></p>
                    Add Password Policy
                </Button>

            </Link>


        </div>
    )
}

export default PasswordPolicyTableTools
