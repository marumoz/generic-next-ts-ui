"use client"

import { Spin }                 from 'antd';
import { LoadingOutlined }      from '@ant-design/icons';
import styled from 'styled-components';

interface ButtonProps {
    primary?: boolean
    outlined?: boolean
    secondary?: boolean
    danger?: boolean
    success?: boolean
    lg?: boolean
    makefull?: boolean
    greyb?: boolean
    loading?: boolean
    children: string | React.ReactElement
    callback(): void
}
const Button = (props: ButtonProps) => {
    const { primary, outlined, secondary, danger, success, greyb, makefull, lg, loading, children, callback } = props;
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ffffff" }} spin />

    return (
        <StyledButton type='button' onClick={callback} disabled={loading} className={`px-2 py-2 flex items-center justify-center tracking-wide text-base font-bold text-center rounded-lg shadow-none outline-none cursor-pointer active:outline-none hover:opacity-80 focus:outline-none text-gray-50 border-2 border-secondary-100 bg-secondary-100 lg:w-max lg:px-8 ${primary && !outlined ? 'border-primary-100 bg-primary-100' : '' } ${secondary && outlined ? 'bg-transparent border-secondary-100 text-secondary-100' : '' } ${primary && outlined ? 'bg-transparent border-primary-100 text-primary-100' : '' } ${danger && outlined ? 'bg-transparent border-warning text-warning' : '' } ${danger && !outlined ? 'border-warning bg-warning' : '' } ${success ? 'border-success bg-success' : '' } ${greyb ? 'border-gray-500 bg-gray-500' : '' } ${makefull ? 'w-full lg:w-full' : '' } ${lg ? 'py-4' : '' }`}>
            {
                loading ? <Spin indicator={antIcon} size= "small"/> : children
            }
        </StyledButton>
    )
};

const StyledButton = styled.button`
    transition: "all .15s ease";
`;

export default Button;