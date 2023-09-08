import React from 'react'
import { Tabs } from 'components/ui'
import SettlementsTableTools from './Settlements/SettlementsTableTools'
import SettlementsTable from './Settlements/SettlementsTable'
import PartnerSettlementsTableTools from './PartnerSettlements/PartnerSettlementsTableTools'
import PartnerSettlementsTable from './PartnerSettlements/PartnerSettlementsTable'
import CashbackSettlementsTableTools from './CashBackSettlements/CashbackSettlementsTableTools'
import CashbackSettlementsTable from './CashBackSettlements/CashbackSettlementsTable'
import TaxSettlementsTableTools from './TaxSettlements/TaxSettlementsTableTools'
import TaxSettlementsTable from './TaxSettlements/TaxSettlementsTable'



const { TabNav, TabList, TabContent } = Tabs

const SettlementsTab = () => {
    return (
        <div>
            <Tabs defaultValue="providerSettlements">
                <TabList>
                    <TabNav value="providerSettlements">Provider Settlements</TabNav>
                    <TabNav value="partnerSettlements">Partner Settlemets</TabNav>
                    <TabNav value="cashbackSettllements">Cashback Settlements</TabNav>
                    <TabNav value="taxSettlements">Tax Settlements</TabNav>
                </TabList>
                <div>
                    <TabContent value="providerSettlements">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Settlements</h3>
                            <SettlementsTableTools/>
                        </div>
                        <SettlementsTable/>
                    </TabContent>
                </div>
                <div>
                    <TabContent value="partnerSettlements">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Settlements</h3>
                            <PartnerSettlementsTableTools/>
                        </div>
                        <PartnerSettlementsTable/>
                    </TabContent>
                </div>
                <div>
                    <TabContent value="cashbackSettllements">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Settlements</h3>
                            <CashbackSettlementsTableTools/>
                        </div>
                        <CashbackSettlementsTable/>
                    </TabContent>
                </div>
                <div>
                    <TabContent value="taxSettlements">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Settlements</h3>
                            <TaxSettlementsTableTools/>
                        </div>
                       <TaxSettlementsTable/>
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default SettlementsTab

