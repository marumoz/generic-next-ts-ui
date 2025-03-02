import React, { useRef } 		from 'react';
import { AiOutlineFile } 		from 'react-icons/ai';
import { MdDeleteForever } 		from 'react-icons/md';
import { GoPaperclip }          from "react-icons/go";
import styled 					from 'styled-components';

import fastValidation from "@services/helpers/fastValidation";

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
    style?: { medium: boolean, mdRight?: boolean }
    hasError: boolean
    label: string
    inputId: string
    type: string
    value: string
    accept: string
    formId: string
    autofocus?: boolean
    disabled?: boolean
    validation?: ValidationProps[]
    updateState(inputId: string, formId: string, {  }): void
}

const FileInput = (props: InputProps) => {
    const {
        variant,
        style,
        hasError,
        label,
        value,
        inputId,
        autofocus,
        type = 'file',
        disabled,
        message,
        formId,
        accept,
        validation= [],
        updateState
    } = props;

    const inputRef  = useRef(null)
    const validateOnChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>{
		const input    = e.target?.files?.[0]
		const fileType = input ? input.type : false
		const fileName = input ? input.name : false

		if(fileType && input?.type){
		    const fileSize = `${ parseFloat(`${Number(input.size) / (1024 * 1024)}`).toFixed(2)} MB`
            
            let passedValidation = true
			for ( const v of validation ){
				const { isValid } = fastValidation({ 
                    input: fileType, 
                    min: v.min,
                    max: v.max,
                    error: v.error, 
                    type: v.type ,
                    expression: v.expression
                });
	
				if ( !isValid ) {
                    passedValidation = false
					updateState( inputId, formId, { hasError: true, textInput: "", message: `Invalid type ${fileType} (${fileName})` })
					break
				}
			}
            if( passedValidation ) {
                updateState( inputId, formId, { hasError: false, textInput: input, message: `${fileName} - size: ${fileSize}` })
            }
		}else{
			updateState( inputId, formId, { hasError: true, textInput: "", message: `Please select a valid file` })
		}
	}
	const removeFile = () => {
		updateState ( inputId, formId, { hasError: false, textInput: "", message: `` })
	}
	const focusInput = () => {
		// inputRef?.current?.focus();
	}
    
	if(variant === 'outlined'){
		return (
			<div className={`relative inline-block w-full text-xs leading-none border rounded-md cursor-pointer h-9 ${hasError ? 'border border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}>
				<Placeholder className={`absolute top-0 left-0 flex flex-row items-center w-full h-full justify-between ${hasError ? 'text-warning font-bold' : ''}`} onClick = { focusInput } >
					<div tw = "ml-5">
						<AiOutlineFile style = {{ color: hasError ?'red': 'green', fontSize:20 }} />
					</div>
					<p
					dangerouslySetInnerHTML = {{ __html : message || ""}}
					/>
				</Placeholder>
				<TextInput
                    className={`absolute w-full h-full pl-3 text-transparent rounded outline-none opacity-0`}
					ref       = { inputRef }
					autoFocus = { autofocus }
					type      = { type }
					disabled  = { disabled }
					onChange  = { e => validateOnChange ( e ) } //add an onChange handler								
					// value     = { value }
					accept    = { accept }
					required
				/>
			</div>
		)
	}
    if(variant === 'toplabel'){
        return (
            <div className={`w-full h-auto mt-4 text-sm ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
                <span className='block text-sm'>{label}</span>
                <div className='flex mt-1'>
                    <div className={`relative inline-block w-full text-xs leading-none border rounded-md cursor-pointer h-9 ${hasError ? 'border border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}>
                        <Placeholder className={`absolute top-0 left-0 flex flex-row items-center w-full h-full justify-between ${hasError ? 'text-warning font-bold' : ''}`} htmlFor = {inputId}  onClick = { focusInput } >
							
							<p>{message}</p>
							<p className='pb-1 opacity-90'>
								<GoPaperclip style={{ fontSize: '18px', color: 'inherit' }}/>
							</p>
						</Placeholder>

                        <LabelInput
                            className='w-full h-full pl-3 text-transparent outline-none opacity-0'
							ref       = { inputRef }
							autoFocus = { autofocus }
							type      = { 'file' }
							disabled  = { disabled }
							onChange  = { e => validateOnChange ( e ) } //add an onChange handler								
							// value     = { value }
							accept= { accept }
							id = {inputId}
							required
						/>
                    </div>

                    <div className='ml-3 tracking-wide w-28 h-9'>
                        {
                            value && (
                                <p className='flex items-center justify-center text-red-500 font-bold w-full h-full rounded-lg border-2 border-transparent bg-gray-200 cursor-pointer' onClick={() => removeFile()}> 
                                    <MdDeleteForever className='text-lg mr-2' /> REMOVE
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const Placeholder = styled.label`
    padding-left: 0.5rem /* 8px */;
    padding-right: 0.5rem /* 8px */;
`;

const LabelInput = styled.input`
	background: transparent;
    &:focus ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        font-size: 0.75rem /* 12px */;
        line-height: 1rem /* 16px */;
        background-color: #ffffff;
        top: -0.5rem /* -8px */;
    }
    &:disabled ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        background-color: #ffffff;
        top: -1rem /* -16px */;
    };
    &:valid ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        background-color: #ffffff;
        top: -0.5rem /* -8px */;
    };
`;

const TextInput = styled.input`
	background: transparent;
    &:focus ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        background-color: #ffffff;
        top: -0.5rem /* -8px */;
    }
    &:disabled ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        font-size: 0.75rem /* 12px */;
        background-color: #ffffff;
        top: -1rem /* -16px */;
    };
    &:valid ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        font-size: 0.75rem /* 12px */;
        background-color: #ffffff;
        top: -0.5rem /* -8px */;
    };
`;

export default FileInput