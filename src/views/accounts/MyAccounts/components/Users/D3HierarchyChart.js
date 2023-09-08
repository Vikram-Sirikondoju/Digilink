import React, { useEffect, useState } from 'react'
import { Tree } from 'react-d3-tree'
import axios from 'axios'
import { useSelector } from 'react-redux'
import appConfig from 'configs/app.config'

const initialTreeData = {
    name: 'Global MNO',
    code: 'GL1',
    collapsed: false,
    tableType: 'ACCOUNT',
    children: [
        {
            name: 'Operator 1',
            collapsed: true,
            code: 'OP1',
            tableType: 'ACCOUNT',
            attributes: {
                department: 'Fabrication',
            },
            children: [],
        },
        {
            name: 'Operator 2',
            collapsed: true,
            code: 'OP2',
            tableType: 'ACCOUNT',
            children: [],
        },
        {
            name: 'Operator 3',
            collapsed: true,
            code: 'OP3',
            tableType: 'ACCOUNT',
            children: [],
        },
        {
            name: 'Enterprise Customer',
            collapsed: true,
            code: 'EC1',
            tableType: 'CUTOMER',
            children: [],
        },
    ],
}

// let apiresponse = {
//     name: 'RELIANCE GIO',
//     code: 'GL1',
//     collapsed: false,
//     type: 'ACCOUNT',
//     acc_type: 'GlobalMno',
//     children: [
//         {
//             name: 'JioAhmedabad',
//             code: 'OP38',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'JioHyderabad',
//             code: 'OP39',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'adf',
//             code: 'OP46',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Teqsar',
//             code: 'OP48',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Idea',
//             code: 'OP49',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Idea',
//             code: 'OP50',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Idea',
//             code: 'OP52',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'NAVYAPROVIDER45',
//             code: 'PR63',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'SOME PARTNER',
//             code: 'PT75',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'sdfsdfdsnfb',
//             code: 'PT76',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'sdfsdfdsnfb',
//             code: 'PT77',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'sdfsdfdsnfb',
//             code: 'PT78',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'sdfsdfdsnfb',
//             code: 'PT79',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'vodaphone',
//             code: 'OP58',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'NAVYAOP',
//             code: 'OP59',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Gopi',
//             code: 'OP60',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Apple',
//             code: 'OP61',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Classmate',
//             code: 'OP63',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'goPI',
//             code: 'OP64',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'goPI',
//             code: 'OP65',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'goPI',
//             code: 'OP66',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'goPI123',
//             code: 'OP67',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'goPI',
//             code: 'OP68',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'GOpi123',
//             code: 'OP69',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Anil',
//             code: 'OP74',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'sdfsdfdsnfb',
//             code: 'PT81',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'dfjgh4534754359',
//             code: 'PT82',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'ANIL',
//             code: 'OP75',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel india',
//             code: 'OP76',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Lenovo',
//             code: 'OP78',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'navyanewpro12345',
//             code: 'PR67',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'navya1234',
//             code: 'PR68',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'NAVYAPATENR1234',
//             code: 'PT83',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'newoppppprr',
//             code: 'OP81',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'ksffrsgrsghdsfh#wbfdsbhfsb@gdshdf.dd',
//             code: 'PT84',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'AIrtel',
//             code: 'OP83',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'sdffffffffffffff',
//             code: 'OP85',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'sfsdfdsfdsfdsf1111',
//             code: 'OP87',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel',
//             code: 'OP89',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel',
//             code: 'OP90',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel india',
//             code: 'OP91',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel23234245245',
//             code: 'OP92',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel',
//             code: 'OP93',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'navyatodaaa',
//             code: 'OP95',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'navyatodaaa1234',
//             code: 'OP96',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel india',
//             code: 'OP97',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel odisa',
//             code: 'OP99',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'adddddd',
//             code: 'PR79',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'xczxc',
//             code: 'PT93',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'DFSDF',
//             code: 'PT94',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Partner',
//             children: [],
//         },
//         {
//             name: 'Airtel odisa',
//             code: 'OP100',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Airtel india',
//             code: 'OP101',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'adddddd',
//             code: 'PR80',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'GOPI',
//             code: 'PR81',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'GOPI',
//             code: 'PR83',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Provider',
//             children: [],
//         },
//         {
//             name: 'Anil',
//             code: 'OP117',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'test test tests',
//             code: 'OP119',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'Nataraju',
//             code: 'OP126',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'GOPI',
//             code: 'OP127',
//             collapsed: true,
//             type: 'ACCOUNT',
//             acc_type: 'Operator',
//             children: [],
//         },
//         {
//             name: 'NAVYA RETAIL12',
//             code: 'RE34',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Retail Customer',
//             children: [],
//         },
//         {
//             name: 'NAVYA123',
//             code: 'EN33',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'NAVYA 456',
//             code: 'RE37',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Retail Customer',
//             children: [],
//         },
//         {
//             name: 'NAVYArao',
//             code: 'EN34',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'asdasd34',
//             code: 'RE44',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Retail Customer',
//             children: [],
//         },
//         {
//             name: 'newennnnnn1',
//             code: 'EN37',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'NAVYARELIANCE567',
//             code: 'EN38',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'NAVYA RETAIL1234',
//             code: 'RE45',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Retail Customer',
//             children: [],
//         },
//         {
//             name: 'navyaee',
//             code: 'EN39',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: '1234555555',
//             code: 'EN47',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'sd fdsfsdfsd ff s',
//             code: 'EN49',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'bilo',
//             code: 'EN50',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'NAVYAEN',
//             code: 'EN52',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'gopi@getinfy.bom',
//             code: 'EN53',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//         {
//             name: 'bilo3',
//             code: 'EN55',
//             collapsed: true,
//             type: 'CUSTOMER',
//             acc_type: 'Enterprise Customer',
//             children: [],
//         },
//     ],
// }

function D3HierarchyChart() {
    const [treeData, setTreeData] = useState()
    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
    const { token, signedIn,accUnqId} = useSelector((state) => state.auth.session)

    let treeDateFromApi

    useEffect(() => {
        getHierarchyByAccID(enterAccount)
    }, [])

    const axiosInstance = axios.create({
        baseURL: appConfig.apiPrefix,
        headers: {
            Authorization: `Bearer ${token}`,
            USER:accUnqId
        },
    })

    const calculateTranslate = () => {
        const containerWidth = window.innerWidth
        const containerHeight = window.innerHeight
        const centerX = containerWidth / 2
        const centerY = containerHeight / 2

        // Calculate the desired translation for centering the root node
        const translateX = centerX - 250 // Adjust based on your node width
        const translateY = centerY - 250 // Adjust based on your node height

        return {
            x: translateX,
            y: translateY,
        }
    }

    const renderCustomNodeElement = ({ nodeDatum }) => {
        return (
            <g onClick={() => handleNodeClick(nodeDatum)}>
                <circle r={20} fill="#ffbf00" />
                <text
                    textAnchor="middle"
                    y={40}
                    style={{ fontSize: '12px', color: 'blue' }}
                >
                    {nodeDatum.name}
                </text>
            </g>
        )
    }
    const getHierarchyByAccID = async (accId) => {
        axiosInstance
            .get(`/account/hierarchy/${accId}/ACCOUNT`) // Replace with your API endpoint
            .then((response) => {
                const childrenData = response.data
                setTreeData(childrenData)
            })
            .catch((error) => {
                console.error('Error loading children:', error)
            })
    }

    const handleNodeClick = (nodeData) => {
        console.log(' node toggled ')

        if (nodeData.data && nodeData.data.collapsed) {
            //     axiosInstance
            //         .get(`/account/hierarchy/${nodeData.data.code}/ACCOUNT`) // Replace with your API endpoint
            //         .then((response) => {
            //             const childrenData = response.data
            //             const updatedTreeData = {
            //                 ...treeData,
            //                 children: treeData.children.map((child) => {
            //                     if (child.name === nodeData.name) {
            //                         return {
            //                             ...child,
            //                             collapsed: false,
            //                             children: childrenData.map((employee) => ({
            //                                 name: employee.name,
            //                             })),
            //                         }
            //                     }
            //                     return child
            //                 }),
            //             }
            //             setTreeData(updatedTreeData)
            //         })
            //         .catch((error) => {
            //             console.error('Error loading children:', error)
            //         })
            // } else {
            //     // Collapse the node
            //     const updatedTreeData = {
            //         ...treeData,
            //         children: treeData.children.map((child) => {
            //             if (child.name === nodeData.name) {
            //                 return {
            //                     ...child,
            //                     collapsed: true,
            //                     children: [],
            //                 }
            //             }
            //             return child
            //         }),
            //     }
            //     setTreeData(updatedTreeData)
        }
    }

    return (
        <div style={{ width: '100%', height: '500px' }}>
            {treeData && (
                <Tree
                    data={treeData}
                    onNodeClick={handleNodeClick}
                    onNodeToggle={handleNodeClick}
                    translate={calculateTranslate()}
                    separation={{ siblings: 1, nonSiblings: 1.5 }}
                    nodeSvgShape={{ shape: 'rect' }}
                    orientation="Vertical"
                    renderCustomNodeElement={renderCustomNodeElement}
                />
            )}
        </div>
    )
}

export default D3HierarchyChart
