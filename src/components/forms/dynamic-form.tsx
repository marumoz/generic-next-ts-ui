"use client"

import React, { useEffect, useState } from 'react'

import Input from '@components/forms/elements/input';


interface InputProps {
    id: string
    type: string
    label?: string
    helperText?: string
    onBlur?: string
    onChange?: string
    disabled?: boolean
    disablePaste?: boolean
    autofocus?: boolean
    showMeter?: boolean
    digitsOnly?: boolean
    wholeNumber?: boolean
    optional?: boolean
    validation?: {}[]
    optionsList?: { default: boolean, value: string, label: string }[]
    style?: {}
}
interface FormProps {
    config: { formId: string, variant: string, sections: { groupTitle?: string, display: string, elements: InputProps[] }[] }
    isWizardComponent?: boolean
    initialState?: { [key: string]: string }
    txnData?: {}
    onBlurActions?: {}
    // callback(): ()=> void
    // disableForm: boolean
    // backButton: string
    // backButtonText: string
    // secondaryButtonText: string
    // resetButton: string
    // secondaryButton: string
    // buttonSuccess: string
    // buttonDanger: string
    // buttonPrimary: string
    // resetOutlined: string
    // buttonmakefull: string
    // mainSecondary: string
    // backBOutlined: string
    // primarysm: string
    // primarylg: string
    // backsm: string
}
interface InputFields {
    inputId: string
    message: string
    textInput: string
    input?: string
    hasError: boolean
    optional: boolean
}
type FormState = { [key: string]: InputFields[] }

const DynamicForm = (props: FormProps) => {
    const { 
        isWizardComponent = false, 
        config, 
        initialState = {}, 
        txnData, 
        onBlurActions, 
        // callback, 
        // disableForm = false, 
        // backButton, 
        // backButtonText = 'Back', 
        // secondaryButtonText = 'ENTER', 
        // resetButton, 
        // secondaryButton, 
        // buttonSuccess, 
        // buttonDanger, 
        // buttonPrimary, 
        // resetOutlined,
        // buttonmakefull,
        // mainSecondary,
        // backBOutlined,
        // primarysm,
        // primarylg,
        // backsm
    } = props;

    const [ formstateId ] = useState(config.formId)
    const [ dynamicFormState, setDynamicFormState ] = useState<FormState>({})

    useEffect(() => {
        createFormState()
    
        return () => {}
    }, [])
    const createFormState = (): string => {
        if(!isWizardComponent){
            //formState = [{inputId: "username", hasError: false, message: "", textInput: ""}]
            let formState: InputFields[]  = []
			let sections   = config.sections
            let formId     = config.formId

            sections.forEach((formEntry) => {
                let inputs = formEntry.elements

                inputs.forEach((input: InputProps, index) => {
                    //set ids to state
                    if(!['displaylist', 'button', 'component', 'radio', 'airtime-list'].includes(input.type)){
                        let inputId = `${input.id}`
                        formState.push({
                            inputId     ,
                            hasError    : false,
                            message     : input.helperText || "",
                            textInput   : initialState[inputId] || "",
                            optional    : input.optional || false
                        })
                    }

                    if(input.type === 'radio' || input.type === 'airtime-list'){
                        let inputId = `${input.id}`
                        let hasDefault = false
                        let defaultValue = ""
                        let options = input.optionsList || []

                        //get default if any
                        options.map(item => {
                            if(item.default){
                                hasDefault = true
                                defaultValue = item.value
                            }
                        })

                        //set default if none
                        if(!hasDefault ){
                            defaultValue = options[0].value
                        }

                        formState.push({
                            inputId     ,
                            hasError    : false,
                            message     : "",
                            textInput   : defaultValue,
                            optional    : input.optional || false
                        })
                    }
                })
            })
            setDynamicFormState({ [formId]: formState })
        }
        return "success"
    }
    const setFormState = (formId: string, newState: []) => {
        setDynamicFormState({ [formId]: newState })
    }
    const updateInputState = ( inputId: string, formId: string, stateInfo: InputFields ) => {
        setDynamicFormState({
            [formId] : dynamicFormState[formId].map(entry => {
                if(entry.inputId === inputId){
                    entry = {
                        ...entry,
                        textInput: stateInfo.textInput,
                        hasError: stateInfo.hasError || entry.hasError,
                        message: stateInfo.message || entry.message
                    }
                }
                return entry
            })
        })
    }

    const createForm = () => {
        let Form: React.ReactElement[] = []
        let sections = config.sections
        let formId = config.formId;

        sections.forEach((formEntry, index) => {
            let inputs = formEntry.elements;

            Form.push(
                <div key = {`form-fieldItem-${index}`}>
                    {
                        inputs.map((input: InputProps) => {
                            const inputState = dynamicFormState[formId].find(e => e.inputId === `${input.id}`)
                            const isGeneralInput = ["text", "email", "password", "number"].includes(input.type)

                            if(isGeneralInput && inputState){
                                return (
                                    <Input
                                        key           = { `${input.label}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        disabled      = { input.disabled }
                                        disablePaste  = { input.disablePaste }
                                        updateState   = { updateInputState }
                                        updateText    = { updateInputState }
                                        type          = { input.type }
                                        label         = { input.label }
                                        digitsOnly    = { input.digitsOnly }
                                        wholeNumber   = { input.wholeNumber }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        validation    = { input.validation }
                                        value         = { inputState.textInput }
                                        style         = { input.style || {} }
                                        autofocus     = { input.autofocus }
                                        onBlurActions = { onBlurActions || {} }
                                        onBlur        = { input.onBlur }
                                        onChange      = { input.onChange }
                                        txnData       = { txnData || {} }
                                        formStatus    = {{ 
                                            formId, 
                                            formState: dynamicFormState[config.formId], 
                                            setFormState
                                        }}
                                        // showMeter     = { input.showMeter }
                                    />
                                )
                            }
                        })
                    }
                </div>
            )
        })
        return Form;
    }
	return (
		<div className='w-full'>
			{ dynamicFormState[config.formId] && createForm() }
		</div>
	)
}

export default DynamicForm