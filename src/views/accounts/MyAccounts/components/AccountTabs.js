import React, { useEffect, useMemo, useState } from 'react'
import { Tabs } from 'components/ui'
import DocumentTableTools from './Document/DocumentTableTools'
import UserRoleTableTools from './UserRoles/UserRoleTableTools'
import UsersTableTools from './Users/UsersTableTools'
import UsersRolesTable from './UserRoles/UsersRolesTable'
import UserTable from './Users/UserTable'
import DocumentTable from './Document/DocumentTable'
import Account from './Accounts'
import { useLocation, useNavigate } from 'react-router-dom'
import HierarchyChart from './HierarchyChart'
import D3HierarchyChart from './Users/D3HierarchyChart'
const { TabNav, TabList, TabContent } = Tabs

const Default = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )
    console.log('pathpath', path)
    useEffect(() => {
        navigate(`/account-menu-item-view-1/${path}`)
    }, [])

    const onTabChange = (val) => {
        navigate(`/account-menu-item-view-1/${val}`)
    }

    const currentTab = useMemo(() => {
        if (path) {
            navigate(`/account-menu-item-view-1/${path}`)
            return path
        } else {
            navigate(`/account-menu-item-view-1/${'accounts'}`)
            return 'accounts'
        }
    }, [path])
    return (
        <div>
            <Tabs
                value={currentTab}
                defaultValue="accounts"
                onChange={(val) => onTabChange(val)}
            >
                {/* <Tabs defaultValue="accounts"> */}
                <TabList>
                    <TabNav value="accounts">Account Details</TabNav>
                    <TabNav value="documents">Document Policy</TabNav>
                    <TabNav value="userRoles">User Roles & Permissions</TabNav>
                    <TabNav value="users">Users</TabNav>
                    <TabNav value="hierarchy">Hierarchy</TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="accounts">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Account Details</h3>
                        </div>
                        <Account />
                    </TabContent>
                    <TabContent value="documents">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Document Policy</h3>
                            <DocumentTableTools />
                        </div>
                        <DocumentTable />
                    </TabContent>
                    <TabContent value="userRoles">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">
                                User Roles & Permissions
                            </h3>
                            <UserRoleTableTools />
                        </div>
                        <UsersRolesTable />
                    </TabContent>
                    <TabContent value="users">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Users</h3>
                            <UsersTableTools />
                        </div>
                        <UserTable />
                    </TabContent>
                    <TabContent value="hierarchy">
                        <h3 className="mb-4 lg:mb-0">Hierarchy</h3>
                        <div className="lg:flex items-center justify-between mb-4">
                            <D3HierarchyChart />
                        </div>
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default Default
