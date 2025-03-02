"use client"

import React, { useState } from 'react'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

interface CollapseProps {
    panelHeader: string
    children: string | React.JSX.Element
    setdefault?: boolean
}
function Collapse(props: CollapseProps) {
    const {panelHeader, children, setdefault} = props;

    const [panelOpen, setpanelOpen] = useState(setdefault)
    return (
        <div className='border-b-2 border-primary-100'>
            <div className='w-full flex items-center justify-between py-2' onClick = { ()=> setpanelOpen(!panelOpen)}>
                <span className='font-semibold text-base tracking-wider'>{panelHeader}</span> 
                <div>
                    { panelOpen && (<BiUpArrow onClick = { ()=> setpanelOpen(!panelOpen)} />)}
                    { !panelOpen && (<BiDownArrow onClick = { ()=> setpanelOpen(!panelOpen)} />)}
                </div>
            </div>

            <div className={`pb-2 ${panelOpen ? '' : 'hidden'}`} >
                {children}
            </div>
        </div>
    )
}

export default Collapse
