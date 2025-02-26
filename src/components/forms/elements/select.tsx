"use client"

import { useEffect } from "react"

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
    label: string
    inputId: string
    value: string
    message: string
    helperText?: string
    hasError: boolean
    optionsList: { id: string | number, label: string, value: string }[]
    onBlur?: string
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
    style?: { medium: boolean, mdRight?: boolean }
}
const SelectInput = (props: InputProps) => {
    const {
        variant,
        formId,
        label,
        inputId,
        value,
        hasError,
        optionsList,
        helperText,
        message,
        formStatus,
        onBlur,
        txnData,
        onBlurActions,
        updateText,
        updateState,
        style
    } = props;

    useEffect(() => {
        if(value){
            updateText(inputId, formId, { textInput: value })
        }else if(optionsList?.[0]?.value){
            updateText(inputId, formId, { textInput: optionsList?.[0]?.value })
        }else{}
        
        return () => {}
    }, [])

    const handleChangeText = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const inputVal = event.currentTarget.value
        updateState( inputId, formId, { hasError: false , textInput: inputVal, message: helperText })
        
        if(onBlur && onBlurActions?.[onBlur])
            onBlurActions[onBlur]({ ...formStatus, input: inputVal, inputId, ...txnData })
    }

    if(variant === 'toplabel'){
        return (
            <div className={`relative inline-block w-full h-9 mt-4 mb-5 text-xs text-left ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`} id={inputId}>
                <label className="text-sm" htmlFor={inputId}>{label}</label>
                <select id={inputId} name={inputId} className={`w-full h-full pl-2 mt-1 border rounded focus:outline-none active:outline-none ${hasError ? 'border border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`} onChange={ e => handleChangeText(e)}>
                    {
                        optionsList.map((item, index) => {
                            return (
                                <option key={index} value={item.value} className='hover:bg-secondary-100 hover:text-gray-50'>{item.label}</option>
                            )
                        })
                    }
                </select>
                <span className={`block md:text-sm ${hasError ? 'text-warning' : ''}`}>{message}</span>
            </div>
        )
    }
};

export default SelectInput;