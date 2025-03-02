"use client"

import React from 'react'
import styled from 'styled-components'
import fastValidation   from "@services/helpers/fastValidation";

type BlurFunc = ({}) => void
type FormStateFunc = (formId: string, newState:[]) => void
interface InputFields {
    inputId: string
    message: string
    textInput: string
    hasError: boolean
    optional: boolean
}
interface ValidationProps {
    type: string
    error: string
    min?: number
    max?: number
    expression?: string
}
interface InputProps {
    variant: string
    helperText?: string
    message: string
    style?: { medium?: boolean, mdRight?: boolean }
    hasError: boolean
    label?: string
    inputId: string
    autofocus?: boolean
    type: string
    value: string
    formId: string
    onChange?: string
    onBlur?: string
    disabled?: boolean
    optional?: boolean
    digitsOnly?: boolean
    disablePaste?: boolean
    wholeNumber?: boolean
    validation?: ValidationProps[]
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}

const TextInput = (props: InputProps) => {
    const {
        variant,
        helperText,
        style,
        hasError,
        label,
        inputId,
        autofocus,
        type = 'text',
        disabled,
        optional,
        value,
        digitsOnly,
        wholeNumber,
        formId,
        onChange,
        formStatus,
        txnData,
        onBlur,
        onBlurActions,
        validation = [],
        updateText,
        updateState
    } = props;
    let {
        message
    } = props;

    if(helperText){
        message = helperText
    }
    
    const validateOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = (event.target as HTMLInputElement).value

        if(event.keyCode === 13){
            for ( const v of validation ){

				const { isValid, message = `Invalid ${label}` } = fastValidation({ 
                    input, 
                    min: v.min,
                    max: v.max,
                    error: v.error, 
                    type: v.type ,
                    expression: v.expression
                })

				if ( !isValid ) {
					updateState( inputId, formId, { hasError: true, textInput: input, message })
					break
				}
			}
        }
    }
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let input = event.target.value

        if(digitsOnly){
            input = input.replace(/[^.0-9]/g, '').replace(/,/g, '')
        }
        if(wholeNumber){
            input = input.replace(/[^0-9]/g, '').replace(/,/g, '')
        }
        if(inputId === 'amount'){
            input = input.replace(/,/g, '')
        }
        
        updateText(inputId, formId, { textInput: input })
        onChange && onBlurActions && onBlurActions[onChange] && onBlurActions[onChange]({ ...formStatus, input, inputId, ...txnData })
    }
    const validateOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        let input = event.target.value
        if(inputId === 'amount' || digitsOnly){
            input = input.replace(/,/g, '')
        }

        let passedValidation = true
        for ( const v of validation ){
			const { isValid, message = v.error } = fastValidation({ 
				input, 
				min: v.min,
				max: v.max,
				error: v.error, 
				type: v.type ,
                expression: v.expression
			});

			if ( !isValid ) {
				updateState( inputId, formId, { hasError: true, textInput: input, message })
                passedValidation = false
				break
			}
		}
        if(passedValidation){
            updateState( inputId, formId, { hasError: false, textInput: input, message: helperText })
        }
        if(passedValidation && onBlur && onBlurActions?.[onBlur] ){
            onBlurActions[onBlur]({ ...formStatus, input, inputId,...txnData })
        }
    }

    if(variant === 'toplabel'){
        return (
            <div className={`w-full h-auto mt-4 text-sm text-left ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
                <label id={inputId}>
                    {label}
                    <LabelInput
                    className={`w-full bg-transparent pl-2 mt-1 text-xs border rounded-md h-9 focus:outline-none active:outline-none ${hasError ? 'border border-1 border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}
                    id        = {inputId}
                    // ref       = {inputRef}
                    autoFocus = {autofocus}
                    type      = {type}
                    disabled  = {disabled}
                    onBlur    = {validateOnBlur}
                    onKeyUp   = {validateOnEnter}
                    onChange  = {handleChangeText}
                    value     = {value}
                    required  = {!optional}
                    $haserror = {hasError.toString()}
                    autoComplete='off'
                    />
                    <span className={`block ${hasError ? 'text-warning' : 'text-inherit'}`} >{message}</span>
                </label>
            </div>
        )
    }else if(variant === 'outlined'){
        <div>
            create outlined text input
        </div>
    }
};

interface StyledProps {
    $haserror: string
}

const LabelInput = styled.input<StyledProps>`
    cursor: ${props => props.disabled ? 'not-allowed' : ''} ;
`;

export default TextInput;