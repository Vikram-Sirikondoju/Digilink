import React, {useState} from 'react'
import { Button, Dialog, } from 'components/ui'
import {HiDatabase} from 'react-icons/hi'
import {FiDatabase} from 'react-icons/fi'
import { BiRefresh } from 'react-icons/bi'
import { RiCheckboxCircleFill } from 'react-icons/ri'


function CancelledOrderedPopup() {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }
    return(

        <div>
            {/* <Button variant="solid" onClick={() => openDialog()}>
                <BiRefresh/>
            </Button> */}
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                width={800}
                height={450}
            >
            
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Sync API</h5>
                    <hr style={{color: "1px solid gray"}} />   
                    <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                        <div style={{display:"flex", flexDirection:"column", marginLeft:"25px"}}>
                            <HiDatabase/>
                            <p>Sync Database-1</p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginLeft:"25px"}}>
                            <BiRefresh/>
                            <p style={{color:"gray"}}>and</p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginLeft:"25px"}}>
                            <FiDatabase/>
                            <p>OD-1 DB</p>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                    <button className="text-blue-800" style={{border:"2px solid blue", height:"30px", width:"70px"}}>Sync</button>
                    </div>
                    <div>
                        <h6>Syncing in progress</h6>
                        <div style={{display:"flex", marginTop:"10px"}}>
                            <RiCheckboxCircleFill className='mt-1 mr-3'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div style={{display:"flex", marginTop:"10px"}}>
                            <RiCheckboxCircleFill  className='mt-1 mr-3'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div style={{display:"flex", marginTop:"10px"}}>
                            <RiCheckboxCircleFill  className='mt-1 mr-3'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div style={{display:"flex", marginTop:"10px"}}>   
                            <RiCheckboxCircleFill  className='mt-1 mr-3'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="mr-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Done
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default CancelledOrderedPopup