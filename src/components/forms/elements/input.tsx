import React from 'react'
import styled from 'styled-components'
import fastValidation   from "@services/helpers/fast-validation";

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
    helperText?: string
    message?: string
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
    digitsOnly?: boolean
    disablePaste?: boolean
    wholeNumber?: boolean
    validation?: { [ key: string]: string }[]
    onBlurActions: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData: { [ key: string]: string }
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}

const TextInput = (props: InputProps) => {
    const {
        variant,
        helperText,
        style = {},
        hasError,
        label,
        inputId,
        autofocus,
        type = 'text',
        disabled,
        value,
        digitsOnly,
        wholeNumber,
        formId,
        onChange,
        formStatus,
        txnData,
        onBlur,
        onBlurActions,
        validation= [],
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
            for ( let v of validation ){

				const { isValid, message = `Invalid ${label}` } = fastValidation( 
					input, 
					v.min,
					v.max,
					v.error, 
					v.type ,
                    v.expression
				)

				if ( !isValid ) {
					updateState( inputId, formId, { hasError: true, textInput: input, message: `Invalid ${label}` })
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

        for ( let v of validation ){
			const { isValid, message = v.error } = fastValidation ( 
				input, 
				v.min,
				v.max,
				v.error, 
				v.type ,
                v.expression
			)

			if ( !isValid ) {
				updateState( inputId, formId, { hasError: true, textInput: input, message: v.error })
				break
			}
			else {
				//update the form state for this particular input
				updateState( inputId, formId, { hasError: false, textInput: input, message: helperText })

				//perform our on blur actions
				onBlur && onBlurActions && onBlurActions[onBlur] && onBlurActions[onBlur]({ ...formStatus, input, inputId,...txnData })
			}
		}
    }

    if(variant && variant === 'toplabel')
        return (
            <label className={`w-full h-auto mb-4 text-sm ${style.medium ? 'md:w-sm' : ''} ${style.mdRight ? 'md:ml-sm' : ''}`}>
                {label}
                <LabelInput
                className={`w-full pl-2 mt-3 text-xs border rounded-md h-9 focus:outline-none active:outline-none ${hasError ? 'focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}
                id        = {inputId}
                // ref       = {inputRef}
                autoFocus = {autofocus}
                type      = {type}
                disabled  = {disabled}
                onBlur    = {validateOnBlur}
                onKeyUp   = {validateOnEnter}
                onChange  = {handleChangeText}
                value     = {value}
                required
                haserror = {hasError.toString()}
                />
                <TextMessage haserror={hasError.toString()} >{message}</TextMessage>
            </label>
        )
}

interface StyledProps {
    haserror: string
}

const LabelInput = styled.input<StyledProps>`
    border-color: ${p => p.haserror === 'true' ? p.theme.dangerColor : p.theme.borderColor};
    background: transparent;
    cursor: ${props => props.disabled ? 'not-allowed' : ''} ;
`;

const TextMessage = styled.p<StyledProps>`
    color: ${props => props.haserror === 'true' ? props.theme.dangerColor : 'inherit'};
`;

export default TextInput