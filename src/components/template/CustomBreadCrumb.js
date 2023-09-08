import { ActionLink } from 'components/shared'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomBreadcrumbs = ({ list }) => {

    const styles = {
        
    }



    return (
        <nav className="w-full rounded-md pb-2">
            <ol className="list-reset flex">
            {
                list?.map((val, index) => {
                    return <span key={`breadcrumb-${index}`} className='flex'>
                        <li >
                            {val.link ? 
                            val?.state ?
                            <Link
                                to={val.link} state={{data:val?.state}}
                                style={{textDecoration:'none', color:'blue',}}
                            >
                                {val.name}
                            </Link> :  <Link
                                to={val.link}
                                style={{textDecoration:'none', color:'blue',}}
                            >
                                {val.name}
                            </Link>
                            : <>{val.name}</>}
                        </li>
                        {
                            index + 1 < list.length && <li>
                            <span className="mx-2 text-neutral-500 dark:text-neutral-400" key={`breadcrumb-1-${index}`}>
                                /
                            </span>
                        </li>
                        }
                    </span>
                })
            }
            </ol>
        </nav>
    )
}

export default CustomBreadcrumbs
