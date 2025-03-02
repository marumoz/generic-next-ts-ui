
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { MdPlayArrow } 					from 'react-icons/md'
import { RiArrowDownSFill } 			from 'react-icons/ri'
import { FaHome, FaStore, FaKey, FaMailBulk, FaUsers } from "react-icons/fa";
import { MdAccountTree, MdPayments } 	from "react-icons/md";
import { BsSendFill } 					from "react-icons/bs";
import { FaSchool, FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidInstitution } 			from "react-icons/bi";
import { IoSettings } 					from "react-icons/io5";
import { RiShoppingCartFill } 			from "react-icons/ri";
import { FiMenu }           from 'react-icons/fi'

import Links  from '@configs/data/links';

const sharedLinks  = Links['sidenav']
const corporateLinks  = Links['corporateLinks']

interface SidebarProps {
    activeSideMenu: string
    activeSideMiniMenu: string
}
const Sidebar = (props: SidebarProps) => {
    const { activeSideMenu, activeSideMiniMenu } = props;

    const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false);
	const [ menuOpen, setOpenmenu ] = useState("Dashboard");
	const [ submenuOpen, setSubmenu ] = useState(false);
	const [ minimenuOpen, setMinimenu ] = useState('');

	useEffect(() => {
		setMinimenu(activeSideMiniMenu)
	}, [])

	const NavLinks = GenerateLinks('default', ['dashboard']);
	const setOpenMenus = (menu: string) => {
		setOpenmenu(menu) 
		// updateActiveSideMenu(menu)
		setSubmenu( menuOpen !== menu ? true : !submenuOpen)
	};
	const setOpenSubMenu = (menu: string) => {
		// updateActiveSideMiniMenu(menu)
		setMinimenu(minimenuOpen === menu ? '' : menu)
	};
	const checkActiveLink = (menu: string) => {
        const currentUrl = window.location.pathname;
		return currentUrl.includes(menu)
	};

    return (
        <>
        <div onClick={()=> setSidebarOpen(false)} className={`fixed z-20 inset-0 left-64 bg-black opacity-50 transition-opacity lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}></div>

        <p className='absolute px-2 top-1 left-0 text-primary-100 tracking-wide lg:hidden'>
            <FiMenu onClick={()=> setSidebarOpen(true)} className="mt-1 font-bold text-2xl cursor-pointer focus:outline-none lg:hidden" />
        </p>

        <MainDiv className={`h-screen w-64 bg-secondary-100 shadow-sm fixed inset-y-0 left-0 overflow-y-auto transform transition duration-300 ${sidebarOpen ? 'ease-out translate-x-0 z-30 lg:translate-x-0 lg:static lg:inset-0 lg:z-0' : 'ease-in -translate-x-full lg:translate-x-0 lg:static lg:inset-0'}`}>
            <div className='sticky top-0 w-full py-3'>
                <Image width={200} height={66} src = "/images/logo.png" className="sticky top-0 mx-auto" alt='ebankinglogo' />
            </div>
            <nav className='flex flex-col pt-2 pb-12 px-4'>
                {
                    NavLinks.map((link, index) => {
                        const isActive = checkActiveLink(link.path)
                        const openSub = submenuOpen || isActive && !submenuOpen

                        if(!link.children){
                            return (
                                <div key={`sidenav-${link.name}${index}`} className={`${isActive ? 'bg-primary-100 flex items-center w-full py-2 pl-5 mb-3 overflow-hidden text-sm tracking-wide text-gray-100 cursor-pointer rounded-lg' : 'flex items-center justify-between w-full py-2 pl-5 mb-3 overflow-hidden text-sm tracking-wide text-secondary-400 bg-transparent cursor-pointer rounded-lg hover:text-gray-100 hover:transform hover:scale-100 hover:duration-500 hover:bg-primary-100 hover:rounded-lg hover:pl-5'}`}>
                                    <Link href={link.path} className='w-full'>
                                        <span className='w-full flex items-center text-sm'>
                                            <SidebarIcons iconName={link.icon} />
                                            <span className="ml-3 font-medium"> {link.text} </span>
                                        </span>
                                    </Link>
                                </div>
                            )
                        }else{
                            return (
                                <div key={`sidenav-${link.name}${index}`} className='transform transition-all duration-1000 ease-in-out delay-500'>
                                    <div key={`sidenav-${link.name}${index}`} className={`hover:bg-secondary-100 hover:text-gray-100 ${isActive ? 'bg-primary-100 flex items-center w-full py-2 pl-5 mb-3 overflow-hidden text-sm tracking-wide text-gray-100 cursor-pointer rounded-lg' : 'flex items-center justify-between w-full py-2 pl-5 mb-3 overflow-hidden text-sm tracking-wide text-secondary-400 bg-transparent cursor-pointer rounded-lg hover:text-gray-100 hover:transform hover:scale-100 hover:duration-500 hover:bg-primary-100 hover:rounded-lg hover:pl-5'}`} onClick={() => setOpenMenus(link.text)}>
                                    <div className='flex'>
                                        <Image src = {`/images/sidenav/${link.icon}.png`} className='w-5 h-5' alt={link.icon} />
                                        <span className="ml-2 font-medium text-xs"> {link.text} </span>
                                    </div>
                                    {
                                        !isActive && !openSub && (<MdPlayArrow className='text-xs mr-2' />)
                                    }
                                    {
                                        !isActive && openSub && menuOpen !== link.text && (<MdPlayArrow className='text-xs mr-2' />)
                                    }
                                    {
                                        !isActive && openSub && menuOpen === link.text && (<RiArrowDownSFill className='text-base mr-2' />)
                                    }
                                    </div>

                                    {
                                        activeSideMenu === link.text && (
                                            <div className='pl-10 transform transition-all duration-1000 ease-in-out delay-500'>
                                                {
                                                    openSub && link.children.map((child, index) => {
                                                        let isactiveSubMenu = checkActiveLink(child.path)

                                                        if(child.children){
                                                            return (
                                                                <div key={`menu-child-${child.text}${index}`} className={`flex flex-col mt-3 tracking-wider cursor-default ${isactiveSubMenu ? 'mr-5 text-primary-100' : 'text-gray-700'}`} role="menuitem">
                                                                        <div className='flex w-full opacity-95 items-center justify-between py-2 pr-1 font-medium hover:pl-1 hover:mr-1 hover:font-semibold hover:text-gray-50 hover:bg-secondary-100 hover:rounded' onClick={()=> setOpenSubMenu( child['text'])} >
                                                                            <span className="ml-5"> {child['text']} </span>
                                                                            {minimenuOpen !== child['text'] && <MdPlayArrow  />}
                                                                            {minimenuOpen === child['text'] && <RiArrowDownSFill className='text-base' />}
                                                                        </div>
                                                                        {
                                                                            minimenuOpen === child['text'] && child['children'].map((miniChild) => {
                                                                                isactiveSubMenu = checkActiveLink(miniChild['path'])
                                                                                return (
                                                                                    <div key = {'minichild' + miniChild['text']}  >
                                                                                        <Link href = {miniChild['path']}>
                                                                                            <div className={`flex opacity-95 items-center mt-1 mx-5 py-2 tracking-wider font-medium hover:pl-1 hover:mr-1 hover:font-semibold hover:bg-secondary-100 hover:text-gray-50 hover:transform hover:scale-100 hover:rounded ${isactiveSubMenu ? 'mr-7 text-primary-100' : 'text-gray-700'}`}
                                                                                            role="menuitem"
                                                                                            >
                                                                                                <span className="ml-5"> {miniChild['text']} </span>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </div>
                                                                            )})
                                                                        }
                                                                </div>
                                                            )
                                                        }else{
                                                            return (
                                                                <React.Fragment key={`menu-child-${child.text}${index}`}>
                                                                    <Link href = {child['path']} passHref>
                                                                        <a className={`flex items-center mt-3 py-2 tracking-wider font-medium hover:pl-3 hover:mr-5 hover:font-semibold hover:bg-secondary-100 hover:opacity-90 hover:text-gray-50 hover:transform hover:scale-100 hover:duration-700) rounded ${isactiveSubMenu ? 'mr-5 text-primary-100' : ''}`}
                                                                        role="menuitem"
                                                                        >
                                                                            <span className="ml-5"> {child['text']} </span>
                                                                        </a>
                                                                    </Link>
																</React.Fragment>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    })
                }
            </nav>
        </MainDiv>
        </>
    )
};

const SidebarIcons = (props: {iconName: string}) => {
    const { iconName } = props;
	return (
		<>
			{
				iconName === 'dashboard' && ( <FaHome/> )
			}
			{
				iconName === 'corporate' && ( <FaKey/> )
			}
			{
				iconName === 'accounts' && ( <MdAccountTree/> )
			}
			{
				iconName === 'fundstransfer' && ( <BsSendFill/> )
			}
			{
				iconName === 'bills' && ( <MdPayments/> )
			}
			{
				iconName === 'schools' && ( <FaSchool/> )
			}
			{
				iconName === 'institutions' && ( <BiSolidInstitution/> )
			}
			{
				iconName === 'bulks' && ( <FaMailBulk/> )
			}
			{
				iconName === 'settings' && ( <IoSettings/> )
			}
			{
				iconName === 'merchants' && ( <FaStore/> )
			}
			{
				iconName === 'marketplace' && ( <RiShoppingCartFill/> )
			}
			{
				iconName === 'beneficiaries' && ( <FaUsers/> )
			}
			{
				iconName === 'cheques' && ( <FaMoneyCheckDollar/> )
			}
		</>
	)
}

const GenerateLinks = ( type = 'default', permissions = ['*'] ) => {
    type SubLink = {
        name: string,
        icon: string,
        text: string,
        path: string,
        serviceId?: string | string[],
        children?: { sId?: string, text: string, path: string, children?: [] }[]
    }
    type LinkProps = SubLink[]
    let generated: LinkProps = [
        {
            name: 'dashboard',
            icon: 'dashboard',
            text: 'Dashboard',
            path: '/main/dashboard'
        }
    ]

    switch(type) {
        case 'default':
            generated = [ ...generated, ...sharedLinks ]
            break;
        case 'corporate':
            generated = [ ...generated, ...corporateLinks, ...sharedLinks ]
            break;
    }

    //Sidebar Permissions
    if(permissions[0] !== '*'){
        const allMenus: LinkProps = []

        generated.forEach(menu => {
            //No permissions configured
            if(!menu.serviceId){
                allMenus.push(menu)
            }
            //Is Included ID
            if(menu.serviceId && typeof menu.serviceId === 'string' && permissions.includes(menu.serviceId)){
                allMenus.push(menu)
            }
            //Is Included ID
            if(menu.serviceId && Array.isArray(menu.serviceId) && menu.serviceId.length > 0 && menu.serviceId.find(e => permissions.includes(e))){
                allMenus.push(menu)
            }
            //Has Children
            if(menu.children && allMenus.find(e => e.name === menu.name)){
                allMenus.map(item => {
                    if(menu.children && item.name === menu.name){
                        item.children = menu.children.filter(e => e.sId && permissions.includes(e.sId) || !e.sId)
                    }
                    return item
                })
            }
        });

        generated = [ ...allMenus ]
    }
    return generated;
}

const MainDiv = styled.div`
	transition: all 800ms ease;
::-webkit-scrollbar {
	width: 0px;
}
`;

export default Sidebar;