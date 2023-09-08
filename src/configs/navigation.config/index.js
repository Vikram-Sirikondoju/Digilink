import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { useSelector } from 'react-redux'

let navigationConfigFile = [
    // {
    //     key: 'dashboard',
    //     path: '/dashboard',
    //     title: 'DASHBOARD',
    //     translateKey: 'nav.dashboard',
    //     icon: 'dashboard',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    //     code: 'DASHBOARD',
    // },

    {
        key: 'user',
        path: '/account',
        title: 'ACCOUNT',
        translateKey: 'nav.accountMenu.accountMenu',
        icon: 'user',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['ACCD'],
        code: 'ACC',
        subMenu: [
            {
                key: 'accountMenu.item1',
                path: '/account-menu-item-view-1/accounts',
                title: 'My Account',
                translateKey: 'nav.accountMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['USERS'],
                subMenu: [],
                code: 'MYA',
            },

            {
                key: 'accountMenu.item11',
                path: '/account-menu-item-view-11',
                title: 'Master Roles',
                translateKey: 'nav.accountMenu.item11',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['USERS'],
                subMenu: [],
                code: 'PBR',
            },

            {
                key: 'accountMenu.item2',
                path: '/account-menu-item-view-2',
                title: 'Operators',
                translateKey: 'nav.accountMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['USERS'],
                subMenu: [],
                code: 'OPR',
            },

            {
                key: 'accountMenu.item3',
                path: '/account-menu-item-view-3',
                title: 'Providers',
                translateKey: 'nav.accountMenu.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'PRO',
            },
            {
                key: 'accountMenu.item4',
                path: '/account-menu-item-view-4',
                title: 'Partners',
                translateKey: 'nav.accountMenu.item4',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'PTR',
            },
            {
                key: 'accountMenu.item5',
                path: '/account-menu-item-view-5',
                title: 'Enterprise Customers',
                translateKey: 'nav.accountMenu.item5',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'ENC',
            },
            {
                key: 'accountMenu.item6',
                path: '/account-menu-item-view-6',
                title: 'Retail Customers',
                translateKey: 'nav.accountMenu.item6',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'REC',
            },
            {
                key: 'accountMenu.item7',
                path: '/account-menu-item-view-7',
                title: 'Pending Approvals',
                translateKey: 'nav.accountMenu.item7',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'PEA',
            },
        ],
    },
    {
        key: 'catalouge',
        path: '/catalouge',
        title: 'CATALOUGE',
        translateKey: 'nav.catalougeMenu.catalougeMenu',
        icon: 'catalouge',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        code: 'CAT',
        subMenu: [
            {
                key: 'catalougeMenu.item1',
                path: '/catalouge-menu-item-view-1',
                title: 'Pending Approvals',
                translateKey: 'nav.catalougeMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'TEM',
            },
            {
                key: 'catalougeMenu.item2',
                path: '/catalouge-menu-item-view-2',
                title: 'Items',
                translateKey: 'nav.catalougeMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'ITM',
            },
            {
                key: 'catalougeMenu.item3',
                path: '/catalouge-menu-item-view-3',
                title: 'Solutions',
                translateKey: 'nav.catalougeMenu.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'SOL',
            },
        ],
    },
    {
        key: 'wareHouse',
        path: '/warehouse',
        title: 'WAREHOUSE',
        translateKey: 'nav.wareHouseMenu.wareHouseMenu',
        icon: 'wareHouse',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        code: 'WRH',
        subMenu: [
            {
                key: 'wareHouseMenu.item1',
                path: '/wareHouse-dashboard',
                title: 'Dashboard',
                translateKey: 'nav.wareHouseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'DASW',
            },
            {
                key: 'wareHouseMenu.item2',
                path: '/wareHouse-menu-item-view-2',
                title: 'Warehouse',
                translateKey: 'nav.wareHouseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'WRH',
            },
            {
                key: 'wareHouseMenu.item3',
                path: '/warehouse-workorder',
                title: 'Work Orders',
                translateKey: 'nav.wareHouseMenu.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'WRO',
            },
        ],
    },
    {
        key: 'orders',
        path: '/orders',
        title: 'ORDERS',
        translateKey: 'nav.ordersMenu.ordersMenu',
        icon: 'orders',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
        code: 'ORD',
    },
    {
        key: 'offers',
        path: '/offers-and-cashbacks/offers',
        title: 'OFFERS & CASHBACKS',
        translateKey: 'nav.offersMenu.offersMenu',
        icon: 'offers',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
        code: 'OFR',
    },
    {
        key: 'billing',
        path: '/billing',
        title: 'BILLING',
        translateKey: 'nav.billingMenu.billingMenu',
        icon: 'billing',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        code: 'BIL',
        subMenu: [
            {
                key: 'billingMenu.dashboard',
                path: '/billing-dashboard',
                title: 'Dashboard',
                translateKey: 'nav.billingMenu.dashboard',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'billingMenu.chargeAndBills',
                path: '/billing/unbilled-invoice',
                title: 'Charge & Bills',
                translateKey: 'nav.billingMenu.chargeAndBills',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'CRBS',
            },
            {
                key: 'billingMenu.payments',
                path: '/billing-payments',
                title: 'Payments',
                translateKey: 'nav.billingMenu.payments',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'PAY',
            },
            {
                key: 'billingMenu.settlements',
                path: '/billing-settlements',
                title: 'Settlements',
                translateKey: 'nav.billingMenu.settlements',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'SET',
            },
        ],
    },
    {
        key: 'reports',
        path: '/reports',
        title: 'REPORTS',
        translateKey: 'nav.reportsMenu.reportsMenu',
        icon: 'reports',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        code: 'RPT',
        subMenu: [],
    },
    {
        key: 'settings',
        path: '/settings',
        title: 'SETTINGS',
        translateKey: 'nav.settingsMenu.settingsMenu',
        icon: 'settings',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        code: 'SET',
        subMenu: [
            {
                key: 'settingsMenu.generalSettings',
                path: '/settings-menu-general-settings',
                title: 'General Settings',
                translateKey: 'nav.settingsMenu.generalSettings',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'GES',
                subMenu: [],
            },
            {
                key: 'settingsMenu.passwordPolicy',
                path: '/settings-menu-password-policy',
                title: 'Password Policy',
                translateKey: 'nav.settingsMenu.passwordPolicy',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'PPC',
                subMenu: [],
            },
            {
                key: 'settingsMenu.apiConfiguration',
                path: '/settings-menu-api-configuration',
                title: 'API Configuration',
                translateKey: 'nav.settingsMenu.apiConfiguration',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'APIC',
                subMenu: [],
            },
            {
                key: 'settingsMenu.themeConfiguration',
                path: '/settings-menu-theme-configuraion',
                title: 'Theme Configuration',
                translateKey: 'nav.settingsMenu.themeConfiguration',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'THMC',
                subMenu: [],
            },
            {
                key: 'settingsMenu.brandInfo',
                path: '/settings-menu-brand-info',
                title: 'Brand Info',
                translateKey: 'nav.settingsMenu.brandInfo',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'BRN',
                subMenu: [],
            },
            {
                key: 'settingsMenu.notifications',
                path: '/settings-menu-notifications',
                title: 'Notifications',
                translateKey: 'nav.settingsMenu.notifications',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'NOT',
                subMenu: [],
            },
            // {
            //     key: 'settingsMenu.manageWebSite',
            //     path: '/settings-menu-manage-web-site',
            //     title: 'Manage WebSite',
            //     translateKey: 'nav.settingsMenu.manageWebSite',
            //     icon: '',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [],
            //     code: 'WSE',
            //     subMenu: [],
            // },
        ],
    },

    {
        key: 'masterData',
        path: '/masterdata',
        title: 'MASTER DATA',
        translateKey: 'nav.masterDataMenu.masterDataMenu',
        icon: 'masterData',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        code: 'MSD',
        subMenu: [
            {
                key: 'masterDataMenu.item1',
                path: '/masterDataMenu-item-view-1',
                title: 'Doc Type',
                translateKey: 'nav.masterDataMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'DOCT',
            },
            {
                key: 'masterDataMenu.item2',
                path: '/masterDataMenu-item-view-2',
                title: 'Product Category',
                translateKey: 'nav.masterDataMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'PRDC',
            },
            {
                key: 'masterDataMenu.item3',
                path: '/masterDataMenu-item-view-3',
                title: 'Customer Category',
                translateKey: 'nav.masterDataMenu.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'CUSTC',
            },
            {
                key: 'masterDataMenu.item4',
                path: '/masterDataMenu-item-view-4',
                title: 'Tax Component',
                translateKey: 'nav.masterDataMenu.item4',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'TXC',
            },
            {
                key: 'masterDataMenu.item5',
                path: '/masterDataMenu-item-view-5',
                title: 'currency',
                translateKey: 'nav.masterDataMenu.item5',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'CUR',
            },
            {
                key: 'masterDataMenu.item6',
                path: '/masterDataMenu-item-view-6',
                title: 'Contract Type',
                translateKey: 'nav.masterDataMenu.item6',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
                code: 'CNRT',
            },
            {
                key: 'masterDataMenu.item7',
                path: '/masterDataMenu-item-view-7',
                title: 'Events',
                translateKey: 'nav.masterDataMenu.item7',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'EVNTS',
                subMenu: [],
            },
            {
                key: 'masterDataMenu.item9',
                path: '/masterDataMenu-pages',
                title: 'Pages',
                translateKey: 'nav.masterDataMenu.item9',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                code: 'PGE',
                subMenu: [],
            },
        ],
    },
]

// const navigationConfig = [
//     {
//         key: 'dashboard',
//         path: '/dashboard',
//         title: 'DASHBOARD',
//         translateKey: 'nav.dashboard',
//         icon: 'dashboard',
//         type: NAV_ITEM_TYPE_ITEM,
//         authority: [],
//         subMenu: [],
//         code: 'DASHBOARD',
//     },
//     /** Example purpose only, please remove */
//     {
//         key: 'user',
//         path: '/account',
//         title: 'ACCOUNT',
//         translateKey: 'nav.accountMenu.accountMenu',
//         icon: 'user',
//         type: NAV_ITEM_TYPE_COLLAPSE,
//         authority: ['ACCD'],
//         code: 'ACC',
//         subMenu: [
//             {
//                 key: 'accountMenu.item1',
//                 path: '/account-menu-item-view-1',
//                 title: 'My Account',
//                 translateKey: 'nav.accountMenu.item1',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: ['USERS'],
//                 subMenu: [],
//                 code: 'MYA',
//             },
//             {
//                 key: 'accountMenu.item2',
//                 path: '/account-menu-item-view-2',
//                 title: 'Operators',
//                 translateKey: 'nav.accountMenu.item2',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//                 code: 'OPR',
//             },

//             {
//                 key: 'accountMenu.item3',
//                 path: '/account-menu-item-view-3',
//                 title: 'Providers',
//                 translateKey: 'nav.accountMenu.item3',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'accountMenu.item4',
//                 path: '/account-menu-item-view-4',
//                 title: 'Partners',
//                 translateKey: 'nav.accountMenu.item4',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'accountMenu.item5',
//                 path: '/account-menu-item-view-5',
//                 title: 'Enterprise Customers',
//                 translateKey: 'nav.accountMenu.item5',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'accountMenu.item6',
//                 path: '/account-menu-item-view-6',
//                 title: 'Retail Customers',
//                 translateKey: 'nav.accountMenu.item6',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'accountMenu.item7',
//                 path: '/account-menu-item-view-7',
//                 title: 'Pending Approvals',
//                 translateKey: 'nav.accountMenu.item7',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//         ],
//     },
//     {
//         key: 'catalouge',
//         path: '/catalouge',
//         title: 'CATALOUGE',
//         translateKey: 'nav.catalougeMenu.catalougeMenu',
//         icon: 'catalouge',
//         type: NAV_ITEM_TYPE_COLLAPSE,
//         authority: [],
//         code: 'CAT',
//         subMenu: [
//             {
//                 key: 'catalougeMenu.item1',
//                 path: '/catalouge-menu-item-view-1',
//                 title: 'Templates',
//                 translateKey: 'nav.catalougeMenu.item1',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'catalougeMenu.item2',
//                 path: '/catalouge-menu-item-view-2',
//                 title: 'Items',
//                 translateKey: 'nav.catalougeMenu.item2',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'catalougeMenu.item3',
//                 path: '/catalouge-menu-item-view-3',
//                 title: 'Solutions',
//                 translateKey: 'nav.catalougeMenu.item3',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//         ],
//     },
//     {
//         key: 'wareHouse',
//         path: '/warehouse',
//         title: 'WAREHOUSE',
//         translateKey: 'nav.wareHouseMenu.wareHouseMenu',
//         icon: 'wareHouse',
//         type: NAV_ITEM_TYPE_COLLAPSE,
//         authority: [],
//         subMenu: [
//             {
//                 key: 'wareHouseMenu.item1',
//                 path: '/wareHouse-dashboard',
//                 title: 'Dashboard',
//                 translateKey: 'nav.wareHouseMenu.item1',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'wareHouseMenu.item2',
//                 path: '/wareHouse-menu-item-view-2',
//                 title: 'Warehouse',
//                 translateKey: 'nav.wareHouseMenu.item2',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'wareHouseMenu.item3',
//                 path: '/warehouse-workorder',
//                 title: 'Work Orders',
//                 translateKey: 'nav.wareHouseMenu.item3',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//         ],
//     },
//     {
//         key: 'orders',
//         path: '/orders',
//         title: 'ORDERS',
//         translateKey: 'nav.ordersMenu.ordersMenu',
//         icon: 'orders',
//         type: NAV_ITEM_TYPE_ITEM,
//         authority: [],
//         subMenu: [],
//     },
//     {
//         key: 'offers',
//         path: '/offers',
//         title: 'OFFERS & CASHBACK',
//         translateKey: 'nav.offersMenu.offersMenu',
//         icon: 'offers',
//         type: NAV_ITEM_TYPE_ITEM,
//         authority: [],
//         subMenu: [],
//     },
//     {
//         key: 'billing',
//         path: '/billing',
//         title: 'BILLING',
//         translateKey: 'nav.billingMenu.billingMenu',
//         icon: 'billing',
//         type: NAV_ITEM_TYPE_COLLAPSE,
//         authority: [],
//         subMenu: [
//             {
//                 key: 'billingMenu.dashboard',
//                 path: '/billing-dashboard',
//                 title: 'Dashboard',
//                 translateKey: 'nav.billingMenu.dashboard',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'billingMenu.chargeAndBills',
//                 path: '/billing-charge-and-bills',
//                 title: 'Charge & Bills',
//                 translateKey: 'nav.billingMenu.chargeAndBills',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'billingMenu.payments',
//                 path: '/billing-payments',
//                 title: 'Payments',
//                 translateKey: 'nav.billingMenu.payments',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'billingMenu.settlements',
//                 path: '/billing-settlements',
//                 title: 'Settlements',
//                 translateKey: 'nav.billingMenu.settlements',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//         ],
//     },
//     {
//         key: 'reports',
//         path: '/reports',
//         title: 'REPORTS',
//         translateKey: 'nav.reportsMenu.reportsMenu',
//         icon: 'reports',
//         type: NAV_ITEM_TYPE_ITEM,
//         authority: [],
//         subMenu: [],
//     },
//     {
//         key: 'settings',
//         path: '/settings',
//         title: 'SETTINGS',
//         translateKey: 'nav.settingsMenu.settingsMenu',
//         icon: 'settings',
//         type: NAV_ITEM_TYPE_COLLAPSE,
//         authority: [],
//         subMenu: [
//             {
//                 key: 'settingsMenu.generalSettings',
//                 path: '/settings-menu-general-settings',
//                 title: 'General Settings',
//                 translateKey: 'nav.settingsMenu.generalSettings',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'settingsMenu.apiConfiguration',
//                 path: '/settings-menu-api-configuration',
//                 title: 'API Configuration',
//                 translateKey: 'nav.settingsMenu.apiConfiguration',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'settingsMenu.themeConfiguration',
//                 path: '/settings-menu-theme-configuraion',
//                 title: 'Theme Configuration',
//                 translateKey: 'nav.settingsMenu.themeConfiguration',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'settingsMenu.brandInfo',
//                 path: '/settings-menu-brand-info',
//                 title: 'Brand Info',
//                 translateKey: 'nav.settingsMenu.brandInfo',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'settingsMenu.notifications',
//                 path: '/settings-menu-notifications',
//                 title: 'Notifications',
//                 translateKey: 'nav.settingsMenu.notifications',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'settingsMenu.manageWebSite',
//                 path: '/settings-menu-manage-web-site',
//                 title: 'Manage WebSite',
//                 translateKey: 'nav.settingsMenu.manageWebSite',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//         ],
//     },
//     // MasterData
//     {
//         key: 'masterData',
//         path: '/masterdata',
//         title: 'Master Data',
//         translateKey: 'nav.masterDataMenu.masterDataMenu',
//         icon: 'masterData',
//         type: NAV_ITEM_TYPE_COLLAPSE,
//         authority: [],
//         subMenu: [
//             {
//                 key: 'masterDataMenu.item1',
//                 path: '/masterDataMenu-item-view-1',
//                 title: 'Doc Type',
//                 translateKey: 'nav.masterDataMenu.item1',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'masterDataMenu.item2',
//                 path: '/masterDataMenu-item-view-2',
//                 title: 'Product Category',
//                 translateKey: 'nav.masterDataMenu.item2',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'masterDataMenu.item3',
//                 path: '/masterDataMenu-item-view-3',
//                 title: 'Customer Category',
//                 translateKey: 'nav.masterDataMenu.item3',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'masterDataMenu.item4',
//                 path: '/masterDataMenu-item-view-4',
//                 title: 'Tax Component',
//                 translateKey: 'nav.masterDataMenu.item4',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'masterDataMenu.item5',
//                 path: '/masterDataMenu-item-view-5',
//                 title: 'currency',
//                 translateKey: 'nav.masterDataMenu.item5',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'masterDataMenu.item6',
//                 path: '/masterDataMenu-item-view-6',
//                 title: 'Contract Type',
//                 translateKey: 'nav.masterDataMenu.item6',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//             {
//                 key: 'masterDataMenu.item7',
//                 path: '/masterDataMenu-item-view-7',
//                 title: 'Events',
//                 translateKey: 'nav.masterDataMenu.item7',
//                 icon: '',
//                 type: NAV_ITEM_TYPE_ITEM,
//                 authority: [],
//                 subMenu: [],
//             },
//         ],
//     },
// ]

export default navigationConfigFile