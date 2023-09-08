import React from 'react'
import AddCurrencyConversion from './AddCurrencyConversion'
import { useLocation } from 'react-router-dom';



const CurrencyConversion = () => {
  const location = useLocation();
const mode = location.state?.mode ? location.state.mode : "ADD";


  return (
    <div className='mt-5'>
      {/* <h3 className='mb-5'>{mode === "EDIT" ? "Edit " : "Create "}Currency Conversion</h3> */}
        <AddCurrencyConversion />
    </div>
  )
}

export default CurrencyConversion