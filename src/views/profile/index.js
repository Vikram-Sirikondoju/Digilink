import React from 'react'
import AdaptableCard from './../../components/shared/AdaptableCard';
import ProfileTabs from './components/ProfileTabs';
import { injectReducer } from 'store';
import reducer from './store';

injectReducer('profile', reducer)
const Profile = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <ProfileTabs />
        </AdaptableCard>
    )
}

export default Profile