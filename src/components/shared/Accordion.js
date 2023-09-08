import { BsChevronDown } from 'react-icons/bs'
const { useState, useRef } = require('react')
const AccordionItem = (props) => {
    const contentEl = useRef()
    const { handleToggle, active, faq } = props
    const { title, id, component } = faq

    return (
        <div className="rc-accordion-card">
            <div className="rc-accordion-header">
                <div
                    className={`rc-accordion-toggle p-3 ${
                        active === id ? 'active' : ''
                    }`}
                    onClick={() => handleToggle(id)}
                >
                    <h5 className="rc-accordion-title">{title}</h5>
                    <BsChevronDown />
                </div>
            </div>
            <div
                ref={contentEl}
                className={`rc-collapse ${active === id ? 'show' : ''}`}
                style={
                    active === id
                        ? { height: contentEl?.current?.scrollHeight }
                        : { height: '0px' }
                }
            >
                <div className="rc-accordion-body">
                    <p className="mb-0">{component}</p>
                </div>
            </div>
        </div>
    )
}

const Accordion = (props) => {
    const [active, setActive] = useState(null)

    const handleToggle = (index) => {
        if (active === index) {
            setActive(null)
        } else {
            setActive(index)
        }
    }

    if(props?.Items === 0){
        return (<></>)
    }
    return (
        <>
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-2">
                        <div className="card">
                            <div className="card-body">
                                {props?.Items?.map((faq, index) => {
                                    return (
                                        <AccordionItem
                                            key={index}
                                            active={active}
                                            handleToggle={handleToggle}
                                            faq={faq}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Accordion
