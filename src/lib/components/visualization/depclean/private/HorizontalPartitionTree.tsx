import React, { useMemo } from 'react';
import { Col } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ToolTipContainer } from './ToolTipContainer';
import { dimension } from './interfaces/interfaces';
import { useAppState } from "./AppStateContext";

import { getLinkColorGenerator, getColor } from './utils/treeAccess';
import { getNodesFromParitionTree, filterDeleted, filterVisible } from "./utils/horizontalTree";
import { sizeAccesorMin, midXAccessor, midYAccessor } from './accessors/treeAccessors'
import {
    linkStraightAccesor, linksClassAccessor,
    radialClassAccessor, linkradial
} from './accessors/partitionTreeAccessor';
import { getMainGroupIds, getUniqueArray } from './utils/stringManager';
import { getOmmitedLinks } from "./utils/horizontalTree";
import { providersKey } from './interfaces/interfaces';

import { Links } from './vizUtils/Links';
import { PartitionNode } from './vizUtils/ParitionNode';
import { PartitionLinks } from './vizUtils/PartitionLinks';
import { DelaunayGrid } from './vizUtils/Delaunay';
import { PartitionAreaNode } from './PartitionAreaNode';
import { OmmitedLabels } from './vizUtils/Labels';

const heightPercent = 0.8;

interface HorizontalTreeProps {
    dimensions: dimension,
}

export const HorizontalPartitionTree = ({
    dimensions
}: React.PropsWithChildren<HorizontalTreeProps>) => {

    //get the main state
    const { state } = useAppState();
    const { colorSelected, filtered, viewLinks, viewOmitted } = state;
    //get the nodes witht the tree structure
    const nodes = getNodesFromParitionTree(dimensions, sizeAccesorMin, filtered, heightPercent)
    //get the correct color generator
    const providers: providersKey[] = useMemo(() => getMainGroupIds(getUniqueArray(nodes)), [nodes]);

    const color = useMemo(() => getColor(colorSelected, providers)
        , [colorSelected, providers])


    // GRAPH LINKS LABLES 
    const ommitedLinks = viewOmitted ? getOmmitedLinks(filtered) : <></>;

    return (
        <Col span="20" >
            <div className="wrapper">
                <ToolTipContainer />
                <svg width={dimensions.boundedWidth} height={dimensions.boundedHeight} key={uuidv4()} >
                    <g className="bounds"
                        transform={"translate(" + dimensions.marginLeft + "," + dimensions.marginTop + ")"}
                        key={uuidv4()}>

                        {!viewLinks ? <></> :
                            <PartitionLinks
                                data={nodes.slice(1)}
                                linkAccesor={linkStraightAccesor(heightPercent)}
                                classAccessor={linksClassAccessor}
                                colorAccessor={getLinkColorGenerator(colorSelected)}
                            />}

                        <PartitionNode
                            data={nodes}
                            colorAccessor={colorSelected === "USAGE_RATIO" ? getColor("TRANSPARENT", nodes) : color}
                        />
                        {colorSelected === "USAGE_RATIO" ?
                            <PartitionAreaNode
                                data={nodes
                                    .filter(filterDeleted)
                                    .filter(filterVisible)}
                                colorAccessor={color}
                            /> : <></>
                        }

                        {viewOmitted ?
                            <Links
                                data={ommitedLinks}
                                linkAccesor={linkradial}
                                classAccessor={radialClassAccessor}
                            /> : <></>}

                        {viewOmitted ? <OmmitedLabels data={ommitedLinks} /> : <></>}
                    </g>

                    <DelaunayGrid
                        data={nodes.filter(filterDeleted)}
                        dimensions={dimensions}
                        xAccessor={midXAccessor}
                        yAccessor={midYAccessor}
                        hide={true}
                    />
                </svg>
            </div>
        </Col>
    )
}