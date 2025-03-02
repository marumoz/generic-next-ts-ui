import React from 'react'
import fastValidation from "@services/helpers/fastValidation";

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
    message?: string
    style?: { medium?: boolean, mdRight?: boolean, small?: boolean }
    hasError: boolean
    label?: string
    inputId: string
    value: string
    formId: string
    rows?: number
    disabled?: boolean
    onBlur?: string
    validation?: ValidationProps[]
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}

const TextareaInput = (props: InputProps) => {
    const {
        variant,  
        label, 
        helperText, 
        disabled = false,
        inputId, 
        validation = [],
        formId,
        hasError,	
        updateText,
        updateState,
        value,
        style,
        onBlur,
        onBlurActions,
        formStatus = {},
        txnData = {},
        rows = 4
    } = props
    let { message } = props

    const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const input = event.target.value;

        updateText( inputId, formId, { textInput: input });
    }
    const validateOnBlur = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
        const input = event.target.value

        let passedValidation = true
        for ( const v of validation ){
			const { isValid, message = v.error } = fastValidation({ 
                input, 
                min: v.min,
                max: v.max,
                error: v.error, 
                type: v.type ,
                expression: v.expression
            })

			if ( !isValid ) {
                passedValidation = false
				updateState( inputId, formId, { hasError: true, input, message })
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
    if ( helperText ) {
        message = helperText
    }

    if(variant === 'toplabel'){
        return (
            <div className={`w-full h-auto mt-4 text-sm ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`} id={inputId} >
                <label tw = "w-full leading-snug" >
                    <span tw = "block">{label}</span>
                    <textarea
                        className={`w-full h-40 pl-2 mt-1 text-sm border rounded-md focus:outline-none active:outline-none ${hasError ? 'border border-1 border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'} ${style?.small ? 'h-20' : 'h-40'}`}
                        rows={ rows }
                        onChange={handleChangeText}
                        onBlur={validateOnBlur}
                        value={ value }
                        disabled={disabled}
                    />
                </label>

                <p className={`pt-1 ${hasError ? 'text-warning' : ''}`} >{message}</p>
            </div>
        )
    }
};

export default TextareaInput;