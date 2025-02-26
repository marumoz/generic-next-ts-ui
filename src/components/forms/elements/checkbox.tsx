"use client"

import React, { useState } from 'react'
import styled from 'styled-components';

interface InputProps {
    inputId: string
    formId: string
    helperText?: string
    label: string | React.JSX.Element
    value: string
    style?: { medium: boolean, mdRight?: boolean }
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}
const CheckBoxInput = (props: InputProps) => {
    const {
        inputId, 
        formId,
        updateText,
        updateState,
        helperText,
        label,
        style,
        value
    } = props;

    const [ isChecked, setisChecked ] = useState<boolean>(false)

    const setCheckBoxState = () => {
        setisChecked(!value)
        updateText ( inputId, formId, { textInput: !value })
        updateState (inputId, formId, { hasError: false, textInput: !value })
    }

    return (
        <div className={`w-full relative mt-4 ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
            <span className='block text-sm tracking-wide font-semibold'>{helperText}</span>
            <CheckLabel className='relative flex flex-row items-center pl-9 mt-1 font-medium cursor-pointer text-sm'>
                <span dangerouslySetInnerHTML = {{ __html: label }}></span>
                <CheckInput className='absolute opacity-0 h-0 w-0' type="checkbox" checked={isChecked} onChange={()=> setCheckBoxState()} />
                <Checkmark className='absolute top-0 left-0 h-8 w-8 bg-white border border-secondary-100 rounded'></Checkmark>
            </CheckLabel>
        </div>
    )
};

const CheckLabel = styled.label`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const Checkmark = styled.span`
    &:after {
        content: "";
        position: absolute;
        display: none;
        left: 12px;
        top: 2px;
        width: 10px;
        height: 20px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

const CheckInput = styled.input`
    &:checked ~ ${Checkmark} {
        background-color: #f7941d;
    };
    &:checked ~ ${Checkmark}:after {
        display: block;
    }
`;

export default CheckBoxInput;