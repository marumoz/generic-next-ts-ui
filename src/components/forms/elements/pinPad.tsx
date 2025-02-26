"use client"

import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type BlurFunc = ({}) => void
type FormStateFunc = (formId: string, newState:[]) => void
interface InputFields {
    inputId: string
    message: string
    textInput: string
    hasError: boolean
    optional: boolean
}
interface InputProps {
    variant: string
    formId: string
    inputId: string
    label: string
    value: string
    message: string
    onBlur?: string
    helperText?: string
    hasError: boolean
    pinLength?: number
    style?: { medium: boolean, mdRight?: boolean }
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}
const PinPad = (props: InputProps) => {
    const {
        label,
        value,
        message,
        hasError,
        pinLength = 6,
        style,
        formId,
        inputId,
        formStatus,
        txnData,
        onBlur,
        onBlurActions,
        updateText,
        updateState
    }= props;
    const [ padKeys, setPadKeys ] = useState<number[]>([1,2,3,4,5,6,7,8,9,0]);
    const [ showKeypad, setShowKeypad ] = useState<boolean>(false);

    const shuffleKeys = () => {
        const newPKeys = [ ...padKeys ];

        for( let i = newPKeys.length - 1; i > 0; i--){
            const keyArray = new Uint32Array(1);
            window.crypto.getRandomValues(keyArray);
            const j = parseInt(keyArray[0].toString().charAt(0), 10);
            const temp = newPKeys[i];
            newPKeys[i] = newPKeys[j]
			newPKeys[j] = temp
        }
        setPadKeys(newPKeys);
        updateText(inputId, formId, { textInput: '' });
        setShowKeypad(true);
    }
    const handleScrambledChangeText = (input: string | number) => {
        if(input === "close"){
            setShowKeypad(false)
            updateState(inputId, formId, { hasError: false, input: "", message: "" })
        }else{
            const newPin = `${value}${input}`;
            if(newPin.length <= pinLength){
                updateText(inputId, formId, { textInput: newPin })
                if(newPin.length === pinLength){
                    setShowKeypad(false)
                    onBlur && onBlurActions && onBlurActions[onBlur] && onBlurActions[onBlur]({ ...formStatus, input: newPin, inputId, ...txnData });
                }
            }
        }
    }

    return (
        <div className={`w-full relative mt-4 ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
            <p className='text-sm font-semibold'>{label}</p>
            <div className={`w-full h-12 mt-2 text-sm`} onClick={()=> shuffleKeys()}>
                <input
                    className={`w-full h-full bg-transparent pl-2 text-xs border rounded-md focus:outline-none active:outline-none pointer-events-none ${hasError ? 'border border-1 border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}
                    // id={inputId}
                    type='password'
                    value={value}
                    disabled
                />
            </div>
            <span className={`${hasError ? 'text-warning' : ''}`}>{message}</span>
            {
                showKeypad && (
                    <div className='bg-gray-50 absolute w-48 ml-2 h-auto text-sm tracking-wide rounded shadow-md -top-3 left-full z-10'>
                        <div className='flex flex-row flex-wrap items-center justify-end' >
                            {
                                padKeys.map((entry, index) => {
                                    return <span className='flex items-center justify-center w-1/3 h-12 text-sm font-medium outline-none cursor-pointer active:opacity-0 focus:outline-none active:outline-none hover:bg-secondary-200' key={index} onClick={() => handleScrambledChangeText(entry) } >
                                        {entry}
                                    </span>
                                })
                            }
                            <span className='flex items-center justify-center w-1/3 h-12 text-sm font-medium outline-none cursor-pointer active:opacity-0 focus:outline-none active:outline-none hover:bg-secondary-200' key={'scrambled-keyboard-reset'} onClick = { () => handleScrambledChangeText('close') } >
                                <AiOutlineClose style = {{ color:'rgba(255,0,0,.5)'}}/>
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default PinPad;