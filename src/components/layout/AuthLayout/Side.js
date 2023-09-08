import React, { cloneElement } from 'react'
import { Avatar } from 'components/ui'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-3 h-full "
        >
            <div
                className="col-span-12 bg-no-repeat bg-cover flex  flex-col justify-center items-center bg-white dark:bg-gray-800 hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/avatars/loginbg.jpg')`,
                }}
            >
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-4">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>

                <div className='mb-2 mt-3 position-fixed '>
                    <div className='flex' >
                        <span style={{ color: "white" }}>
                            &copy; {`${new Date().getFullYear()}`}{' '}
                            <span className="font-semibold">{`${APP_NAME}`}</span> All
                            rights reserved. (v1.10)
                        </span>
                        <div className="ml-8" style={{ color: "white" }}>
                            <a
                                className="text-gray"
                                href='https://cmp.airlinq.com:7880/AQPrivacyTerms'
                                target="_blank"
                                
                            >
                              
                                Term & Conditions
                                
                            </a>
                            <span className="mx-2 text-muted"> | </span>
                            <a
                                className="text-gray"
                                href="/#"
                                onClick={(e) => e.preventDefault()}
                            >
                                Privacy & Policy
                            </a>
                        </div>
                    </div>

                </div>

            </div>


        </div>


    )
}

export default Side
