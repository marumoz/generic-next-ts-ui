import React from 'react'
import styled from 'styled-components'
import { GoPaperclip }          from "react-icons/go";

import fastValidation from "@services/helpers/fastValidation";

interface ValidationProps {
    type: string
    error: string
    min?: number
    max?: number
    expression?: string
}
type FType = [] | string | ""
interface InputProps {
    variant: string
    helperText?: string
    message?: string
    style?: { medium?: boolean, mdRight?: boolean, widthAuto?: boolean }
    hasError: boolean
    label?: string
    inputId: string
    autofocus?: boolean
    type: string
    value: FType
    formId: string
    onChange?: string
    onBlur?: string
    disabled?: boolean
    accept: string
    maxFiles: number
    maxSize?: number
    validation?: ValidationProps[]
    updateState(inputId: string, formId: string, {  }): void
}

const DragndDrop = (props: InputProps) => {
    const {
        helperText,
        style,
        hasError,
        label,
        inputId,
        autofocus,
        disabled,
        formId,
        validation= [],
        accept,
        maxFiles,
        maxSize = 20,
        message,
        updateState
    } = props;
    let { value } = props;

    if(typeof value === 'string'){
        value = []
    }
    
    const inputRef  = React.useRef(null)

    const validateOnChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>{
        // let arraFiles = {...e.target.files}
        // delete arraFiles['length']
        // arraFiles = Object.values(arraFiles)
		const input    = e.target?.files?.[0]
		const fileType = input ? input.type : false
		const fileName = input ? input.name : false
        console.log(value)
        
        //for (let i of arraFiles) {
            if( fileType && input){
                const fileSize = Number(input.size / (1024 * 1024))
        
                let files: { name: string }[] = [ ...value ]
        
                const fileWithinSize = fileSize && fileSize < maxSize
                const fileExists = files.find(e => e.name === fileName)
                
                if(fileExists){
                    updateState( inputId, formId, { hasError: false, textInput: files, message: `File exists (${fileName})` })
                }
                if(input && !fileWithinSize){
                    updateState( inputId, formId, { hasError: false, textInput: files, message: `File exceeds limit (${maxSize} MB)` })
                }
                if(!input){
                    updateState( inputId, formId, { hasError: false, textInput: files, message: `Please select a file` })
                }
        
                if(fileType && fileName && !fileExists && fileWithinSize && files.length < maxFiles){
                    files = [...files, input]
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
                            updateState( inputId, formId, { hasError: true, textInput: files, message: `Invalid type ${fileType} (${fileName})` })
                            break
                        }
                    }
                    if( passedValidation ) {
                        updateState( inputId, formId, { hasError: false, textInput: files, message: `` })
                    }
                }else if(files.length === maxFiles){
                    updateState ( inputId, formId, { hasError: false, textInput: files, message: `Maximum files ${maxFiles}` })
                }else if(files.length < 1 && fileWithinSize){
                    updateState ( inputId, formId, { hasError: true, textInput: files, message: `Please select a valid file` })
                }
            }
	}
    const removeFile = (removeFile: { name: string }) => {
        if(value){
            let files: { name: string }[] = [ ...value ]
            files = files.filter(e => e.name !== removeFile.name)
            updateState ( inputId, formId, { hasError: false, textInput: files, message: `` })
        }
    }

    return (
        <>
            <div className={`justify-center w-full mt-4 ${style?.widthAuto ? 'w-auto' : ''} ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
                <span className='block font-bold tracking-wide text-xs mb-1'>{helperText}</span>
                <div className={`relative inline-block text-xs leading-none border border-dashed rounded-lg cursor-pointer h-36 w-full ${hasError ? 'border border-warning' : 'border border-gray-400'}`}>
                    <Placeholder className={`absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full py-4 ${hasError ? 'text-warning font-bold' : ''}`}>
                        <GoPaperclip style={{ fontSize: '24px', color: 'inherit' }}/>
                        <div className='flex flex-row text-center text-sm'>
                            <span tw = "font-semibold text-center" dangerouslySetInnerHTML = {{ __html : label || "" }} />
                            {
                                hasError && <span className='font-semibold block text-center text-danger' dangerouslySetInnerHTML = {{ __html : message || ""}} ></span>
                            }
                        </div>
                    </Placeholder>
                    <LabelInput
                        className='w-full h-full pl-3 text-transparent outline-none opacity-0'
                        ref       = { inputRef }
                        autoFocus = { autofocus }
                        type      = { 'file' }
                        disabled  = { disabled }
                        onChange  = { e => validateOnChange(e) }							
                        // value     = { value }
                        accept    = { accept }
                        id = {inputId}
                        required
                        // multiple
                    />
                </div>
                <div className='flex flex-col my-2'>
                    {
                        value && value.map((item: { name: string }, index) => (
                            <p key = {index} className={`font-semibold leading-tight text-left ${hasError ? 'text-warning' : ''}`}>
                                {item.name}
                                <span className='ml-3 font-bold cursor-pointer text-xl text-warning' onClick = {()=> removeFile(item)}>X</span>
                            </p>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const Placeholder = styled.label`
    width: 100%;
`;

const LabelInput = styled.input`
	background: transparent;
    &:focus ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        font-size: 0.75rem /* 12px */;
        background-color: #ffffff;
        top: -0.5rem /* -8px */;
    }
    &:disabled ~ ${Placeholder} {
        height: 1rem /* 16px */;
        padding-left: 0.25rem /* 4px */;
        padding-right: 0.25rem /* 4px */;
        font-size: 0.75rem /* 12px */;
        background-color: #ffffff;
        top: -1rem /* -8px */;
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

export default DragndDrop