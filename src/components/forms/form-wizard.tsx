"use client"

import React, { useEffect, useState } from 'react'
import { Spin }             from 'antd';
import { LoadingOutlined }  from '@ant-design/icons';

import DynamicForm     from './dynamic-form';
import CheckBox 	   from '@components/ui/elements/checkbox';
import CamelToSentence from "@services/helpers/camelToSentence";

interface InputProps {
    id: string
    type: string
    label: string
    accept?: string
    helperText?: string
    imageSrc?: string
    component?: string | React.JSX.Element
    showIf?: { matches: string, field: string, checks?: { param: string, matches: string }[] }
    maximum?: number
    download?: 'bulk-template'
    placeholder?: string
    onBlur?: string
    onFocus?: string
    onChange?: string
    disabled?: boolean
    disablePaste?: boolean
    autofocus?: boolean
    showMeter?: boolean
    digitsOnly?: boolean
    wholeNumber?: boolean
    optional?: boolean
    validation?: { type: string, error: string }[]
    optionsList?: { id: string | number, label: string, value: string }[]
    style?: { medium: boolean, mdRight?: boolean }
}
interface FormConfig {
    formId: string, variant: string, gridContainer?: boolean, sections: { groupTitle?: string, display: string, elements: InputProps[] }[]
}
interface WizFormConfig {
    stepName: string
    stepTitle: string
    stepType: string
    heading?: string
    subHeading?: string
    hideDetails?: boolean
    checkToSubmit?: boolean
    actionButtonLabel?: string
    component?: React.JSX.Element
    checkBoxContent?: string | React.JSX.Element
    formConfig?: FormConfig
}
interface WizardProps {
    config: WizFormConfig[]
    onCancel?(): void
    initialState?: { [key: string]: string }
    onBlurActions?: {}
    txnData?: {}
    onStepSubmit?(formId: string, formStateData: {}, setFormState: (formId: string, newState: InputFields[])=> void, {}): void
    onWizardSubmit({}): void
    formIsLoading: boolean
}
interface InputFields {
    label: string
    inputId: string
    message: string
    textInput: string
    hasError: boolean
    optional: boolean
}
type FormState = { [key: string]: InputFields[] }

const FormWizard = (props: WizardProps) => {
    const { 
        config, onCancel, onBlurActions, initialState = {},  
        txnData = {}, onStepSubmit, onWizardSubmit, formIsLoading 
    } = props;
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ffffff" }} spin />

    const [ currentStep, setCurrentStep ] = useState<number>(1);
    const [ dynamicFormState, setDynamicFormState ] = useState<FormState>({});
    const [ showCheckBox, setShowCheckBox ] = useState<boolean>(false);
    const [ checkBoxSelected, setCheckBoxSelected ] = useState<boolean>(false);
    const [ checkBoxLabel, setCheckBoxLabel ] = useState<string | React.JSX.Element>('');

    useEffect(() => {
        createFormState();
    
        return () => {};
    }, []);

    const stepData = config[currentStep - 1];
    const keys = Object.keys(dynamicFormState);

    if( stepData.checkToSubmit ){
        setShowCheckBox(true)
    }
    if( stepData.checkBoxContent ){
        setCheckBoxLabel(stepData.checkBoxContent)
    }

    const createFormState = () => {
        const allForms: { [key: string]: InputFields[] } = {}
        config.map( (entry) => {
            if(entry.stepType === "form" && entry.formConfig){
                const formState: InputFields[] = []
                const formConfig = entry.formConfig
                const sections = formConfig.sections
                const formId = formConfig.formId

                sections.forEach(formEntry => {
                    const inputs = formEntry.elements
                    inputs.forEach((input: InputProps) => {
						if(!['button', 'component'].includes(input.type)){
							formState.push({
                                inputId     : `${input.id}`,
                                hasError    : false,
                                message     : input.helperText || "",
                                label       : input.label || "",
                                textInput   : initialState[input.id] || "",
                                optional    : input.optional || false
							})
						}
                    })
                });
                allForms[formId] = formState
            }
        });
        setDynamicFormState(allForms);
        console.log('>>>>>><<<<<', allForms)
    }
    const updateInputState = (inputId: string, formId: string, stateInfo: InputFields) => {
        const updatedFormState = dynamicFormState[formId].map(entry => {
            if(entry.inputId === inputId){
                entry = {
                    ...entry,
                    textInput: stateInfo.textInput,
                    hasError: stateInfo.hasError,
                    message: stateInfo.message
                }
            }
            return entry;
        })
        setDynamicFormState({ ...dynamicFormState, [formId]: updatedFormState });
    }
    const updateTextState = ( inputId: string, formId: string, stateInfo: { textInput: string } ) => {
        const updatedFormState = dynamicFormState[formId].map(entry => {
            if(entry.inputId === inputId){
                entry.textInput = stateInfo.textInput
            }
            return entry
        })
        setDynamicFormState({ ...dynamicFormState, [formId]: updatedFormState });
    }
    const nextStep = () => {
        if(stepData.stepType === 'form' && stepData.formConfig){
            const formId = stepData.formConfig.formId
            const formStateData = dynamicFormState[formId]
            console.log(formId, dynamicFormState)

            let hasError = false
            const updatedFormState = formStateData.map(entry => {
                if (!entry.optional && entry.textInput.trim() === '') {
                    hasError = true
                    entry.hasError = true
                    entry.message = `${entry.inputId} cannot be empty`
                }
                if (entry.hasError) {
                    hasError = true
                    entry.hasError = true
                }
                return entry
            })
            setDynamicFormState({ ...dynamicFormState, [formId]: updatedFormState });
            if(!hasError){
                setCurrentStep(currentStep + 1)
            }
        }else{
            setCurrentStep(currentStep + 1)
        }
    }
    const wizardNextStep = () => {
        if(onStepSubmit && stepData?.formConfig){
            const formId = stepData.formConfig.formId
            const formStateData = dynamicFormState[formId]
            onStepSubmit(formId, formStateData, setFormState, { currentStep, ...dynamicFormState, checkBoxSelected })
        }else{
            nextStep()
        }
    }
	const previousStep = () => {
        setCurrentStep(currentStep - 1)
    }
    const setFormState = (formId: string, newState: InputFields[]) => {
        setDynamicFormState({ [formId]: newState });
    }
    const setCheckBoxState = () => {
        setCheckBoxSelected(!checkBoxSelected)
    }

    return (
        <div className='lg:w-full lg:flex'>
            {/* wizard steps */}
            <div className='flex items-start justify-around mt-2 overflow-ellipsis lg:hidden'>
                {
                    config.map((stepInfo, stepIndex) => {
                        return (
                            <div key={stepInfo.stepName + stepIndex} className={`w-12 text-center py-2 px-1 font-bold text-base border-b-2 uppercase mr-4 overflow-ellipsis ${stepIndex + 1 === currentStep ? 'text-secondary-100 border-secondary-100' : 'text-gray-400 border-transparent'}`} >
                                <span>{stepIndex + 1}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='hidden lg:block'>
                <div className='flex h-20 rounded-lg px-4 pb-2'>
                    <p className='font-bold text-5xl self-end text-primary-100'>
                        0{currentStep}
                    </p>
                    <p className='ml-2 font-normal text-3xl self-center text-primary-100'>
                        <span>/</span>
                        <span>0{config.length}</span>
                    </p>
                </div>

                <div className='w-80 mt-3 pt-3 pl-3 border border-primary-100 border-dashed rounded-lg'>
                    {
                        config.map((stepInfo, stepIndex) => {
                            return (
                                <div key={stepInfo.stepName + 'lg' + stepIndex} className='pb-5' >
                                    <span className={`font-bold tracking-wide text-base uppercase ${stepIndex + 1 === currentStep ? 'text-secondary-100' : 'text-gray-400'}`}>0{stepIndex + 1}. {stepInfo.stepName}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='lg:ml-6'>
                {/* current step title */}
                <p className='mt-3 font-semibold text-xl tracking-wide text-primary-100 lg:text-3xl'>
                    { stepData['stepTitle'] }
                </p>

                {/* display current step */}
                {
                    stepData['stepType'] === 'form' && stepData['formConfig'] && (
                        <DynamicForm  
                            isWizardComponent       = { true }
                            updateInputState        = { updateInputState }
                            updateTextState         = { updateTextState }
                            config                  = { stepData['formConfig'] }
                            dynamicState            = {{ ...dynamicFormState }}
                            onBlurActions           = { onBlurActions }
                            txnData                 = { txnData }
                        />
                    )
                }
                {
                    stepData['stepType'] === 'summary' && (
                        <div>
                            <h2 className='text-lg' >
                                { stepData.heading }
                            </h2>
                            <p dangerouslySetInnerHTML={{ __html: stepData.subHeading || 'Confirm Your Information' }} />
                            {
                                keys.map((key) => {
                                    const data = dynamicFormState[key]
                                        return (
                                            !stepData.hideDetails && (
                                                <React.Fragment key = {key} >
                                                    <p className='w-full text-sm font-bold pt-2 pr-3 text-left' >
                                                        {CamelToSentence(key)}
                                                    </p>
                                                    {
                                                        data.map(entry => (
                                                            <div className='relative float-left w-full even:bg-gray-200' key={entry.inputId} >
                                                                <p className='relative float-left text-right w-52 leading-normal pr-2 text-gray-400 first:text-left first:font-normal even:bg-gray-200'>
                                                                    {CamelToSentence(entry.inputId)}
                                                                </p>
                                                                <p className='relative float-left text-right w-52 leading-normal pr-2 text-gray-400 first:text-left first:font-normal even:bg-gray-200'>
                                                                    {entry.textInput.toString()}
                                                                </p>
                                                            </div>
                                                        ))
                                                    }
                                                </React.Fragment>
                                            )
                                        )
                                })
                            }
                        </div>
                    )
                }
                {/* here we can set up any component added  */}
                { stepData.component } 

                {/* checkbox if enabled */}
                { 
                    showCheckBox && (
                        <CheckBox 
                            isChecked        = { checkBoxSelected } 
                            label            = { checkBoxLabel } 
                            setCheckBoxState = { setCheckBoxState }
                        />
                    )
                }

                {/* navigation buttons */}
                <div className='mt-6 pb-3 flex items-center justify-between' >
                    {
                        currentStep === 1 && onCancel && (
                            <button className='text-center h-11 rounded-lg text-secondary-100 uppercase px-4 font-semibold tracking-wide bg-transparent border-3 border-secondary-100' onClick = { onCancel }>
                                cancel
                            </button>
                        )
                    }
                    {
                        currentStep > 1 && (
                            <button className='text-center h-11 rounded-lg text-secondary-100 uppercase px-4 font-semibold tracking-wide bg-transparent border-3 border-secondary-100' onClick = { previousStep }>
                                Back
                            </button>
                        )
                    }
                    {
                        !formIsLoading && currentStep < config.length && (
                            <button className='text-center h-11 rounded-lg text-gray-100 uppercase px-4 font-semibold tracking-wide bg-secondary-100' onClick = { wizardNextStep } >
                                continue
                            </button>
                        )
                    }
                    {
                        formIsLoading && currentStep < config.length && (
                            <button className='text-center h-11 rounded-lg text-gray-100 uppercase px-4 font-semibold tracking-wide bg-secondary-100' onClick = { ()=> {} } >
                                <Spin indicator={antIcon} size= "small"/>
                            </button>
                        )
                    }
                    {/* final step */}
                    {
                        currentStep === config.length && !showCheckBox && (
                            <button className='text-center h-11 rounded-lg text-gray-100 uppercase px-4 font-semibold tracking-wide bg-secondary-100' onClick = { () => onWizardSubmit({ currentStep, ...dynamicFormState, checkBoxSelected }) } >
                                { stepData.actionButtonLabel || "Submit" }
                            </button>
                        )
                    }
                    {
                        currentStep === config.length && showCheckBox && checkBoxSelected && (
                            <button className='text-center h-11 rounded-lg text-gray-100 uppercase px-4 font-semibold tracking-wide bg-secondary-100' onClick = { () => onWizardSubmit({ currentStep, ...dynamicFormState, checkBoxSelected }) } >
                                { stepData.actionButtonLabel || "Submit" }
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default FormWizard;