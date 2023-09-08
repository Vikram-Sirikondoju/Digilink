import React, { useState } from 'react'
import { Tabs } from 'components/ui'
import Password from './Password'
import Profile from './Profile'
const { TabNav, TabList, TabContent } = Tabs
const ProfileTabs = () => {
    const [profile, setProfile] = useState('ADD')

    return (
        <div>
            <p className='mb-4 ml-3'>Home / My Profile / Password </p>
            <Tabs defaultValue="profile">
                <TabList>
                    <TabNav value="profile">Profile</TabNav>
                    <TabNav value="password">Change Password</TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="profile">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Profile</h3>
                        </div>
                        <Profile profile={profile} setProfile={setProfile}/>
                    </TabContent>
                    <TabContent value="password">
                        <div className="lg:flex items-center justify-between my-4">
                            <h3 className="mb-4 lg:mb-0">Change password </h3>
                        </div>
                        <Password />
                    </TabContent>
                </div>

            </Tabs>
        </div>
    )
}

export default ProfileTabs