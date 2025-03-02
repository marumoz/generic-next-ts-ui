"use client"

import React from "react";

interface TabProps {
    config: { tabs: { title: string, content: string | React.JSX.Element }[] }
}
const Tabs = (props: TabProps) => {
    const { config } = props;
    const [openTab, setOpenTab] = React.useState(1);

    return (
        <div tw="flex flex-wrap">
            <div tw="w-full">
                <ul tw="flex flex-row flex-wrap pb-4 mb-0 list-none" role="tablist">
                    { 
                        config.tabs.map ( (tab,index) => (
                            
                            <li 
                                tw="flex-auto mt-2 mr-2 -mb-px text-center last:mr-0"
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(index + 1);
                                }}
                                key       = { index }
                                >
                            <span
                                className={`text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal active:outline-none focus:outline-none ${openTab === index + 1 ? 'text-white bg-primary-100' : 'bg-white text-primary-100'}`}
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(index + 1);
                                }}
                                data-toggle="tab"
                                role="tablist"
                            >
                                {tab.title}
                            </span>
                            </li>
                        ))
                    }
                </ul>

                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
                    <div className="flex-auto px-4 py-5">
                        { 
                            config.tabs.map ( (tab, index ) => (
                                <div className={`${openTab === index + 1 ? 'block' : 'hidden'}`} key={index} id={'link' + (index + 1)}>
                                    {tab.content}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;