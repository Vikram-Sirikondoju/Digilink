import React, { useCallback } from 'react'
import {

    Upload,
} from 'components/ui'

import { HiOutlineCloudUpload } from 'react-icons/hi'




const SopUploads = () => {


    return (
        <>


            <div>
                <div className="mb-4 mx-4">

                    <h4>UPLOAD IMAGES</h4>
                </div>
                <div className='mx-4'>
                    <Upload draggable>
                        <div className="my-10 text-center">
                            <div className="text-6xl mb-4 flex justify-center">
                                {/* <FcImageFile /> */}
                                <HiOutlineCloudUpload />
                            </div>
                            <p className="font-semibold">
                                <span className="text-gray-800 dark:text-white">
                                    Drop your image here, or{' '}
                                </span>
                                <span className="text-blue-500">browse</span>
                            </p>
                            <p className="mt-1 opacity-60 dark:text-white">
                                Support: jpeg, png, gif
                            </p>
                        </div>
                    </Upload>
                </div>
            </div>
        </>
    )
}

export default SopUploads
