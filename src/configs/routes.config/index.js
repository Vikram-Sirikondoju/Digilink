import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: React.lazy(() => import('views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: React.lazy(() =>
            import('views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },

    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },

    {
        key: 'accountMenu.item1',
        path: '/account-menu-item-view-1',
        component: React.lazy(() =>
            import('views/accounts/MyAccounts/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item1',
        path: '/account-menu-item-view-1/:activeTab',
        component: React.lazy(() =>
            import('views/accounts/MyAccounts/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item11',
        path: '/account-menu-item-view-11',
        component: React.lazy(() =>
            import('views/accounts/PublicRoles/index')
        ),
        authority: [],
    },
    {
        key: 'account',
        path: '/accounts-new-public-roles',
        component: React.lazy(() =>
            import('views/accounts/PublicRoles/components/PublicRolesCreate')
            
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item2',
        path: '/account-menu-item-view-2',
        component: React.lazy(() =>
            import('views/accounts/Operators/index')
        ),
        authority: [],
    },

    {
        key: 'accountMenu.item3',
        path: '/account-menu-item-view-3',
        component: React.lazy(() =>
            import('views/accounts/Providers/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item4',
        path: '/account-menu-item-view-4',
        component: React.lazy(() =>
            import('views/accounts/Partners/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item5',
        path: '/account-menu-item-view-5',
        component: React.lazy(() =>
            import('views/accounts/EnterpriseCustomers/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item8',
        path: '/account-menu-item-view-8',
        component: React.lazy(() =>
            import('views/accounts/Operators/components/NewOperators')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item8',
        path: '/account-menu-item-view-8/edit',
        component: React.lazy(() =>
            import('views/accounts/Operators/components/NewOperators')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item9',
        path: '/account-new-enterprise',
        component: React.lazy(() =>
            import('views/accounts/EnterpriseCustomers/components/NewEnterPrise')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item9',
        path: '/account-new-enterprise/edit',
        component: React.lazy(() =>
            import('views/accounts/EnterpriseCustomers/components/NewEnterPrise')
        ),
        authority: [],
    },

    {
        key: 'accountMenu.item6',
        path: '/account-menu-item-view-6',
        component: React.lazy(() =>
            import('views/accounts/ReatailCustomers/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item7',
        path: '/account-menu-item-view-7',
        component: React.lazy(() =>
            import('views/accounts/PendingApproval/index')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item10',
        path: '/account-new-providers',
        component: React.lazy(() =>
            import('views/accounts/Providers/components/NewProviders')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item10',
        path: '/account-new-providers/edit',
        component: React.lazy(() =>
            import('views/accounts/Providers/components/NewProviders')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item11',
        path: '/account-new-partners',
        component: React.lazy(() =>
            import('views/accounts/Partners/components/NewPartners')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item11',
        path: '/account-new-partners/edit',
        component: React.lazy(() =>
            import('views/accounts/Partners/components/NewPartners')
        ),
        authority: [],
    },

    {
        key: 'accountMenu.item12',
        path: '/account-new-retail',
        component: React.lazy(() =>
            import('views/accounts/ReatailCustomers/components/NewRetail')
        ),
        authority: [],
    },
    {
        key: 'accountMenu.item12',
        path: '/account-new-retail/edit',
        component: React.lazy(() =>
            import('views/accounts/ReatailCustomers/components/NewRetail')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item1',
        path: '/catalouge-menu-item-view-1',
        component: React.lazy(() =>
            import('views/catalogue/Templates/index')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item2',
        path: '/catalouge-menu-item-view-2',
        component: React.lazy(() =>
            import('views/catalogue/Items/index')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item3',
        path: '/catalouge-menu-item-view-3',
        component: React.lazy(() =>
            import('views/catalogue/Solutions/index')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item4',
        path: '/catalogue-new-items',
        component: React.lazy(() =>
            import('views/catalogue/Items/components/NewItems')
        ),
        authority: [],
    },

    {
        key: 'catalougeMenu.item5',
        path: '/catalogue-new-solutions',
        component: React.lazy(() =>
            import('views/catalogue/Solutions/components/NewSolutions')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item5',
        path: '/catalogue-new-solutions/edit',
        component: React.lazy(() =>
            import('views/catalogue/Solutions/components/NewSolutions')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item6',
        path: '/catalogue-new-templates',
        component: React.lazy(() =>
            import('views/catalogue/Templates/components/NewTemplates')
        ),
        authority: [],
    },
    {
        key: 'catalougeMenu.item6',
        path: '/catalogue-new-templates/edit',
        component: React.lazy(() =>
            import('views/catalogue/Templates/components/NewTemplates')
        ),
        authority: [],
    },
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() =>
            import('views/orders/index')
        ),
        authority: [],
    },
    {
        key: 'offers',
        path: '/offers-and-cashbacks/:name',
        component: React.lazy(() =>
            import('views/offers&cashback/components/OfferCashBackTab')
        ),
        authority: [],
    },
    {
        key: 'offers-create',
        path: '/offers-create-offers',
        component: React.lazy(() =>
            import('views/offers&cashback/components/Offers/CreateOfferForm')
        ),
        authority: [],
    },
    {
        key: 'offer-view',
        path: '/offer-view',
        component: React.lazy(() =>
            import('views/offers&cashback/components/Offers/ViewOffer')
        ),
        authority: [],
    },
    {
        key: 'orders',
        path: '/warehouse-new-order',
        component: React.lazy(() =>
            import('views/orders/components/NewOrders')
        ),
        authority: [],
    },
    {
        key: 'order-details',
        path: '/order-details',
        component: React.lazy(() =>
            import('views/orders/components/OrderDetailsTabs')
        ),
        authority: [],
    },
    {
        key: 'wareHouse',
        path: '/warehouse-view-warehouse',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/components/WarehousePreview')
        ),
        authority: [],
    },
    {
        key: 'wareHouse',
        path: '/warehouse-new-warehouse',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/components/WareHouseForm')
        ),
        authority: [],
    },
    {
        key: 'wareHouse',
        path: '/wareHouse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/index')
        ),
        authority: [],
    },
    {
        key: 'wareHouse',
        path: '/wareHouse-dashboard',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/components/Dashboard/Dashboard')
        ),
        authority: [],
    },
    {
        key: 'wareHouse',
        path: '/warehouse-workorder',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/components/WorkOrders/WorkOrders')
        ),
        authority: [],
    },
    {
        key: 'workorderdetails',
        path: '/workorder-details/:id',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/components/WorkOrders/components/WorkOrderDetailsTab/WorkOrderTabs')
        ),
        authority: [],
    },
    {
        key: 'wareHouse',
        path: '/warehouse-new-add-inventory',
        component: React.lazy(() =>
            import('views/wareHouse/WareHouse/components/Inventory/AddInventory')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item1',
        path: '/masterDataMenu-item-view-1',
        component: React.lazy(() =>
            import('views/masterData/docType/index')
        ),
        authority: [],
    },
    {
        key: 'cashback',
        path: '/create-cashback',
        component: React.lazy(() =>
            import('views/offers&cashback/components/cashbacks/CreateCashbackForm')
        ),
        authority: [],
    },
    {
        key: 'cashback-view',
        path: '/cashback-view',
        component: React.lazy(() =>
            import('views/offers&cashback/components/cashbacks/ViewCashback')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item1',
        path: '/create-document-type',
        component: React.lazy(() =>
            import('views/masterData/docType/components/CreateDocumentType')
        ),
        authority: [],
    },

    {
        key: 'masterDataMenu.item2',
        path: '/masterDataMenu-item-view-2',
        component: React.lazy(() =>
            import('views/masterData/productCategory/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item2',
        path: '/masterData-new-product-category',
        component: React.lazy(() =>
            import('views/masterData/productCategory/components/NewProductCategory')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item3',
        path: '/masterDataMenu-item-view-3',
        component: React.lazy(() =>
            import('views/masterData/CustomerCategory/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item3',
        path: '/new-CustomerCategory',
        component: React.lazy(() =>
            import('views/masterData/CustomerCategory/components/NewCustomerCategory')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item4',
        path: '/masterDataMenu-item-view-4',
        component: React.lazy(() =>
            import('views/masterData/TaxComponent/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item4',
        path: '/new-TaxComponent',
        component: React.lazy(() =>
            import('views/masterData/TaxComponent/components/NewTaxComponent')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item7',
        path: '/masterDataMenu-item-view-7',
        component: React.lazy(() =>
            import('views/masterData/events/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item9',
        path: '/masterDataMenu-pages',
        component: React.lazy(() =>
            import('views/masterData/pages/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item9',
        path: '/masterDataMenu-pages-add',
        component: React.lazy(() =>
            import('views/masterData/pages/components/AddPage')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item7',
        path: '/add-event',
        component: React.lazy(() =>
            import('views/masterData/events/components/NewEvents')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item5',
        path: '/masterDataMenu-item-view-5',
        component: React.lazy(() =>
            import('views/masterData/currency/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item5',
        path: '/create-currency',
        component: React.lazy(() =>
            import('views/masterData/currency/components/CurrencyConversion')
        ),
        authority: [],
    },

    {
        key: 'account',
        path: '/accounts-new-document',
        component: React.lazy(() =>
            import('views/accounts/MyAccounts/components/Document/DocumentAccountDetails')
        ),
        authority: [],
    },
    {
        key: 'account',
        path: '/accounts-new-user-roles',
        component: React.lazy(() =>
            import('views/accounts/MyAccounts/components/UserRoles/UserRoleDetails')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item6',
        path: '/masterDataMenu-item-view-6',
        component: React.lazy(() =>
            import('views/masterData/contractType/index')
        ),
        authority: [],
    },
    {
        key: 'masterDataMenu.item8',
        path: '/masterDataMenu-item-view-8',
        component: React.lazy(() =>
            import('views/masterData/contractType/components/NewContract')
        ),
        authority: [],
    },
    {
        key: 'account',
        path: '/accounts-new-users',
        component: React.lazy(() =>
            import('views/accounts/MyAccounts/components/Users/CreateUser')
        ),
        authority: [],
    },
    {
        key: 'account',
        path: '/accounts-users-preview',
        component: React.lazy(() =>
            import('views/accounts/MyAccounts/components/Users/UserPreview')
        ),
        authority: [],
    },

    {
        key: 'settings',
        path: '/settings-menu-general-settings',
        component: React.lazy(() =>
            import('views/settings/generalSettings/index')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-password-policy',
        component: React.lazy(() =>
            import('views/settings/passwordPolicy/index')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-password-policy-add',
        component: React.lazy(() =>
            import('views/settings/passwordPolicy/components/AddPasswordPolicy')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-api-configuration',
        component: React.lazy(() =>
            import('views/settings/apiConfiguration/index')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-update-api-configuration',
        component: React.lazy(() =>
            import('views/settings/apiConfiguration/components/UpdateApiConfiguration')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-theme-configuraion',
        component: React.lazy(() =>
            import('views/settings/themeConfiguration/index')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-brand-info',
        component: React.lazy(() =>
            import('views/settings/brandInfo/index')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-notifications',
        component: React.lazy(() =>
            import('views/settings/notifications/index')
        ),
        authority: [],
    },
    // {
    //     key: 'settings',
    //     path: '/settings-menu-manage-web-site',
    //     component: React.lazy(() =>
    //         import('views/settings/manageWebSite/index')
    //     ),
    //     authority: [],
    // },
    {
        key: 'settings',
        path: '/settings-menu-general-settings-edit',
        component: React.lazy(() =>
            import('views/settings/generalSettings/components/GeneralSettingsEdit')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-create-template',
        component: React.lazy(() =>
            import('views/settings/notifications/components/CreateNewTemplate')
        ),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings-menu-send-notifications',
        component: React.lazy(() =>
            import('views/settings/notifications/components/SendNotification')
        ),
        authority: [],
    },

    {
        key: 'billing',
        path: '/billing-dashboard',
        component: React.lazy(() =>
            import('views/billing/Dashboard/index')
        ),
        authority: [],
    },
    {
        key: 'billing',
        path: '/billing/:name',
        component: React.lazy(() =>
            import('views/billing/Charge&Bills/BillingTabs')
        ),
        authority: [],
    },
    {
        key: 'billing',
        path: '/billing-payments',
        component: React.lazy(() =>
            import('views/billing/Payments/index')
        ),
        authority: [],
    },
    {
        key: 'billing',
        path: '/billing-settlements',
        component: React.lazy(() =>
            import('views/billing/Settlements/index')
        ),
        authority: [],
    },
    {
        key: 'billing',
        path: '/billing-enterprise-invoice',
        component: React.lazy(() =>
            import('views/billing/Charge&Bills/components/EnterPriseCustInvoice')
        ),
        authority: [],
    },

    {
        key: 'billing',
        path: '/billing-settlements-id',
        component: React.lazy(() =>
            import('views/billing/Settlements/components/SettlementId/SettlementId')
        ),
        authority: [],
    },
    {
        key: 'Profile',
        path: '/profile',
        component: React.lazy(() =>
            import('views/profile/index')
        ),
        authority: [],
    },
]
