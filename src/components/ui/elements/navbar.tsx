import React                from 'react'
import { AiOutlineDown }    from 'react-icons/ai'
import styled               from 'styled-components';
import Link                 from 'next/link';
import Router               from 'next/router';
import { FiMenu }           from 'react-icons/fi'
import Image from 'next/image';

interface NavProps {
    signout(): null
    titlebarheader: string
    customerName: string
    openSidebar(): null
}
const Navbar = (props: NavProps) => {
    const { signout, titlebarheader, customerName, openSidebar } = props;

    return (
        <div className='relative' >
            <div className='w-full h-14 bg-secondary-100' />
            <div className='absolute w-full h-14 px-2 flex items-start justify-between top-1 right-0 text-gray-100 tracking-wide lg:px-12'>
                <FiMenu onClick={openSidebar} className="mt-3 font-bold text-xl cursor-pointer focus:outline-none lg:hidden" />
                <p className='font-semibold text-xl mt-2'>
                    {titlebarheader}
                </p>

                <div>
                    <Trigger className='flex items-center justify-center'>
                        <Image src='/images/avatar.png' className='w-10 h-10' alt='avatar' />
                        <p className='text-base font-bold ml-4'>
                            <span>{customerName.split(' ')[0]} {customerName.split(' ')[1]}</span>
                            <span className='block mt-0 font-normal text-sm' >Settings</span>
                        </p>
                        <AiOutlineDown className='ml-2 text-lg font-bold' />
                    </Trigger>

                    <Content className='w-full rounded-b-lg overflow-hidden transition duration-1000 ease-in-out rounded shadow-lg hover:visible' >
                        <div className='flex flex-col w-full h-40 bg-white'>
                            <div className='flex flex-row items-center justify-center w-full border-b border-gray-100 h-3/4'>
                                <div className='w-16 h-16 flex items-center justify-center text-xl rounded-full text-gray-100 font-bold bg-gray-700'>
                                    {customerName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className='flex flex-row w-full h-1/3 text-xs text-gray-500'>
                                <div onClick = { () => Router.push('/main/settings')} 
                                    className="flex w-1/2 items-center justify-center border-r border-gray-100 cursor-pointer hover:text-gray-50 hover:bg-primary-100 active:opacity-0" >
                                    <Link href = "/main/settings">Settings</Link>
                                </div>
                                <div onClick = { signout } className="flex w-1/2 items-center justify-center cursor-pointer hover:text-gray-50 hover:bg-primary-100 active:opacity-0" >Sign Out</div>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        </div>
    );
};

const Content = styled.div`
    visibility: hidden;
    height: 1px;
`;

const Trigger = styled.div`
    &:hover ~ ${Content} {
        visibility: visible;
        height: auto;
    };
`;

export default Navbar