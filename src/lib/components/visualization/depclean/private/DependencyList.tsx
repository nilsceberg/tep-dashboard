import React from 'react';
import { Tree, Button } from 'antd';
import { useAppState } from "./AppStateContext";
import { formatTree, reduceChildren, filterDeleted, mapKey } from "./utils/treeAccess";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useAppState as useAppMenuState } from "./AppMenuStateContext";

interface dependencyList {
    height: number
}

export const DependencyList = ({ height }: React.PropsWithChildren<dependencyList>) => {
    //get the main state
    const { state } = useAppState();
    const { filteredProject } = state;

    const { menuState, menuDispatch } = useAppMenuState();
    const { viewDependencyList } = menuState;

    const treeData = formatTree([filteredProject]);
    const selectedKeys = treeData[0].children
        .reduce(reduceChildren, [])
        .filter(filterDeleted(true))
        .map(mapKey)

    const handleClick = () => {
        menuDispatch({ type: "VIEW_DEPENDENCY_LIST", payload: !viewDependencyList });
    }


    return (
        <div className="dependency-list">
            <div className="flex flex-center">
                <Button onClick={() => handleClick()} className="" icon={!viewDependencyList ? <PlusOutlined /> : <MinusOutlined />}></Button>
                <h3 style={{ margin: "0 0 0 15px" }}>Dependency list</h3>
            </div>
            {viewDependencyList ?
                <Tree
                    showLine={false}
                    showIcon={false}
                    treeData={treeData}
                    height={height}
                    defaultExpandAll={true}
                    selectable={true}
                    multiple={true}
                    defaultSelectedKeys={selectedKeys}
                    selectedKeys={selectedKeys}
                // disabled={true}
                /> : ""}
        </div>
    )
}