import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'

import { MdOutlineDashboard, MdOutlineOtherHouses, MdOutlineListAlt } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { BiCube } from 'react-icons/bi';
import { BsPercent } from 'react-icons/bs';
import { RiHandCoinLine } from 'react-icons/ri';
import { ImFilesEmpty } from 'react-icons/im';
import { FiSettings ,FiDatabase} from 'react-icons/fi';
const navigationIcon = {
    // home: <HiOutlineHome />,
    // singleMenu: <HiOutlineViewGridAdd />,
    // collapseMenu: <HiOutlineTemplate />,
    // groupSingleMenu: <HiOutlineDesktopComputer />,
    // groupCollapseMenu: <HiOutlineColorSwatch />,

    dashboard: <MdOutlineDashboard />,
    user: <FaRegUser />,
    catalouge: <BiCube />,
    wareHouse: <MdOutlineOtherHouses />,
    orders: <MdOutlineListAlt />,
    offers: <BsPercent />,
    billing: <RiHandCoinLine />,
    reports: <ImFilesEmpty />,
    settings: <FiSettings />,
    masterData: <FiDatabase />

}

export default navigationIcon