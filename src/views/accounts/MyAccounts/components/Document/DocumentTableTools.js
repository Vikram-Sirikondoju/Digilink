import React, { useEffect } from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import AccountFilter from './DocumentFilter'
import AccountTableSearch from './DocumentTableSearch'
import {
    Button,

} from 'components/ui'
import { MdOutlineSettings } from 'react-icons/md'
import { getDocPolicyList } from '../../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'



const DocumentTableTools = () => {
    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const data = useSelector((state) => state.myaccountList.data.docPolicyList?.res)
    useEffect(() => {
        dispatch(getDocPolicyList({ page_no: 0, page_size: 10, sort_field: 'id', unq_id: enterAccount }))
    }, [])
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <AccountTableSearch />
            <AccountFilter />
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
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<MdOutlineSettings />}>
                    Columns
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/accounts-new-document" >
                <Button block variant='solid' disabled={data && data.length < 5 ? false : true} size="sm" icon={<HiPlusCircle />}>
                    Create
                </Button>
            </Link>
        </div>
    )
}

export default DocumentTableTools
