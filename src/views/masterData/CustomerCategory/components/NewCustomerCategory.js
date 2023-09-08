import React from 'react'
import AddCustomer from './AddCustomer'
import { useLocation } from 'react-router-dom';

export default function NewCustomerCategory() {
  const location = useLocation();
  const mode = location.state?.mode ? location.state.mode : "ADD";

  return (
    <>
      {/* <div>Master Data / Customer Category / Add Customer Category</div> */}
      <div className='mt-5'>
      {/* <h3 className='mb-5'>{mode === "EDIT" ? "Edit " : "Create "}Customer Category</h3>
        */}
        <AddCustomer />

      </div>
    </>
  )
}
