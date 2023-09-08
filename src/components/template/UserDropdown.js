import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'
import appConfig from 'configs/app.config';

const dropdownItemList = [
    {
        label: 'Profile',
        path: 'profile',
        icon: <HiOutlineUser />,
    },
]

export const UserDropdown = ({ className }) => {
    const { usernameOrEmail, password, rememberMe, email, avatar, user_name,role_name,profile_img_url } =
        useSelector((state) => state.auth.user)

        
    const { signOut } = useAuth()

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar shape="circle" src={`${appConfig.apiPrefix}/media/uniqid/${profile_img_url}`} />
            <div className="hidden md:block">
                <div className="text-xs capitalize text-gray-900 dark:text-gray-100">
                    {user_name}
                </div>
                <div className="font-bold text-gray-900 dark:text-gray-100">
                    {role_name}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        {/* <Avatar
                            shape="circle"
                            src={'/img/avatars/thumb100.jpg'}
                        /> */}

                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {user_name}
                            </div>
                            <div className="text-xs">{email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                <div style={{ marginTop: 8 }}></div>
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        eventKey={item.label}
                        key={item.label}
                        className="mb-1"
                    >
                        <Link
                            className="flex gap-2 items-center"
                            to={item.path}
                        >
                            <span className="text-xl opacity-50 text-[#004D99] font-bold text-dark-900 dark:text-slate-50">
                                {item.icon}
                            </span>
                            <span
                                className="font-bold text-dark-900 dark:text-gray-100"
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 400,
                                    fontSize: '15px',
                                    
                                }}
                            >
                                {item.label}
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    onClick={signOut}
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50 text-[#004D99] font-bold text-dark-900 dark:text-slate-50">
                        <HiOutlineLogout />
                    </span>
                    <span
                        className="font-bold text-dark-900 dark:text-gray-100"
                        style={{
                           
                            fontStyle: 'normal',
                            fontSize: 400,
                            fontSize: '15px',
                           
                        }}
                    >
                        Sign Out
                    </span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default withHeaderItem(UserDropdown)
