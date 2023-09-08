import { Link } from 'react-router-dom'
import { Tabs, Button } from 'components/ui'

const OrderOverviewHeaderActions = () => {

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/orders" >
                <Button block variant="solid">
                    Back to Orders
                </Button>
            </Link>

            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download>
                <Button block>
                    Download Invoice
                </Button>
            </Link>
        </div>
    )
}

export default OrderOverviewHeaderActions