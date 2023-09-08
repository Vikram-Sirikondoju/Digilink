
import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';

const HierarchyChart = () => {
    const styless = {
        padding: "5px",
        borderRadius: "8px",
        display: "inline-block",
        border: "1px solid red"
    }

    const jsonData = {
        id: 1,
        text: "GLOBAL MNO",

        children: [
            {
                id: 2,
                text: "Operator 1",
                children: [{
                    id: 3,
                    text: "Operator 3",
                    children: []
                },
                {
                    id: 4,
                    text: "Operator 4",
                    children: []
                }]
            },
            {
                id: 3,
                text: "Operator 2",
                children: [
                    {
                        id: 5,
                        text: "Operator 5",
                        children: [ {
                            id: 7,
                            text: "Operator 7",
                            children: []
                        },
                        {
                            id: 8,
                            text: "Operator 8",
                            children: [ {
                                id: 9,
                                text: "Operator 9",
                                children: []
                            }]
                        },{
                            id: 10,
                            text: "Operator 10",
                            children: []
                        }]
                    },
                    {
                        id: 6,
                        text: "Operator 6",
                        children: []
                    }
                ]
            }
        ]
    }
    const createNode = (data) => {
        return (
            <TreeNode key={data.id} label={<div style={styless}>{data.text}</div>}>
                {data.children.map((child) => createNode(child))}
            </TreeNode>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center chart-container">
            <Tree label={<div style={styless}>Root</div>} lineWidth={'2px'}
                lineBorderRadius={'10px'}>
                {jsonData.children.map((child) => createNode(child))}
            </Tree>
        </div>
    )
}

export default HierarchyChart
