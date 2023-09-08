import { Button } from 'components/ui'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const UserPreview = () => {

    const location = useLocation()
    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const rowForEdit = location.state?.data
    const navigate = useNavigate()
    // const [row, setRow] = useState('')

    const onEdit = ({row}) => {
        navigate(`/accounts-new-users`, {
            state: { data: rowForEdit, mode: 'EDIT' },
        })

    }

    const addressParts = [
        rowForEdit.add_line1,
        rowForEdit.add_line2,
        rowForEdit.city,
        rowForEdit.state,
        rowForEdit.country
      ];

      const formattedAddress = addressParts.filter(Boolean).join(', ');

    return (
        <>
            <div>Users / TE1122</div>
            <div className='flex justify-between mt-6'>
                <h3>TE1122</h3>

                {/* <Link to="/accounts-new-users"> */}
                    <Button variant="solid" icon={<MdModeEdit />}
                    onClick={onEdit}
                    >
                        Edit
                    </Button>
                {/* </Link> */}
            </div>

            <div style={{ backgroundColor: '#F5F5F5' }}
                className="p-4 mt-6">

                <div className='card p-4'>
                    <h5>BASIC DETAILS</h5>
                    <div className='grid grid-cols-6 mt-4'>
                        <div>
                            <p className='text-black font-bold'>Name</p>
                            <p>{rowForEdit.first_name} {rowForEdit.middle_name} {rowForEdit.last_name}</p>

                        </div>
                        <div>
                            <p className='text-black font-bold'>Email ID</p>
                            <p>{rowForEdit.email}</p>

                        </div>
                        <div>
                            <p className='text-black font-bold'>Phone Number</p>
                            <p>{rowForEdit.phone}</p>

                        </div> 
                        <div>
                            <p className='text-black font-bold'>User Role</p>
                            <p>{rowForEdit.role_name}</p>

                        </div>
                        <div>
                            <p className='text-black font-bold'>Profile Image</p>
                            <p>{rowForEdit.profile_img}</p>

                        </div>

                    </div>

                    <div className='mt-6 grid grid-cols-1'>
                        <p className='text-black font-bold'>Address</p>
                        {formattedAddress}

                    </div>

                </div>

            </div>
        </>
    )
}

export default UserPreview