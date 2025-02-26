"use client"

import React, { useEffect, useState } from 'react';
import { Spin }                 from 'antd';
import { LoadingOutlined }      from '@ant-design/icons';

import TextInput from '@components/forms/elements/input';
import SelectInput from '@components/forms/elements/select';
import TextareaInput from '@components/forms/elements/textarea';
import Autocomplete from '@components/forms/elements/autocomplete';
import PhoneInputText from '@components/forms/elements/phone';
import PinPad from '@components/forms/elements/pinPad';
import CheckBoxInput from '@components/forms/elements/checkbox';
import FileInput from '@components/forms/elements/fileInput';
import DownloadInput from '@components/forms/elements/downloadInput';
import DragndDrop from '@components/forms/elements/dragndDrop';
import RadioButton from '@components/forms/elements/radio';
import SquareList from '@components/forms/elements/squareList';
import AirtimeProviderList from '@components/forms/elements/airtimeProvider';
import BeneficiaryCard from '@components/forms/elements/beneficiaryCard';
import BeneficiaryRadio from '@components/forms/elements/beneficiaryRadio';
import DatePickerInput from './elements/datePicker';
import DateRangeInput from './elements/dateRange';

import Button from '@components/ui/elements/button';

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
    minDate?: string
    maxDate?: string
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
    formId: string, variant: string, submitLabel?: string, gridContainer?: boolean, sections: { groupTitle?: string, display: string, elements: InputProps[] }[]
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
interface FormProps {
    config: FormConfig
    isWizardComponent?: boolean
    initialState?: { [key: string]: string }
    txnData?: { [key: string]: string | number | {} | [] }
    onBlurActions?: {}
    dynamicState?: FormState
    updateInputState?(inputId: string, formId: string, stateInfo: InputFields): void
    updateTextState?(inputId: string, formId: string, stateInfo: { textInput: string }): void
    setFormState?(formId: string, newState: []): void
    setLoadingState?(status: boolean): void
    callback?(formId: string, formState: InputFields[], setFormState: (formId: string, newState: [])=> void, setLoadingState: (status: boolean)=> void, txnData?: { [key: string]: string | number | {} | [] } | undefined): void
    disableForm?: boolean
    backButton?: (formState: InputFields[])=> void
    resetButton?: boolean
    secondaryButton?: (formState: InputFields[])=> void
    secondaryButtonText?: string
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

const DynamicForm = (props: FormProps) => {

    // const [ formstateId ] = useState(config.formId)
    const [ dynamicFormState, setDynamicFormState ] = useState<FormState>({});
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        createFormState();
    
        return () => {};
    }, []);

    const createFormState = (): string => {
        console.log('dynamic form',dynamicState)
        if(!isWizardComponent){
            //formState = [{inputId: "username", hasError: false, message: "", textInput: ""}]
            const formState: InputFields[] = []
			const sections   = config.sections
            const formId     = config.formId

            sections.forEach((formEntry) => {
                const inputs = formEntry.elements
                inputs.forEach((input: InputProps) => {
                    //set ids to state
                    if(!['button', 'component'].includes(input.type)){
                        const inputId = `${input.id}`
                        formState.push({
                            inputId     ,
                            hasError    : false,
                            message     : input.helperText || "",
                            label       : input.label || "",
                            textInput   : initialState[inputId] || "",
                            optional    : input.optional || false
                        })
                    }
                })
            });
            setDynamicFormState({ [formId]: formState });
        }
        return "success";
    };
    const formSetFormState = (formId: string, newState: []) => {
        setDynamicFormState({ [formId]: newState });
    };
    const formUpdateInputState = ( inputId: string, formId: string, stateInfo: InputFields ) => {
        setDynamicFormState({
            [formId] : dynamicFormState[formId].map(entry => {
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
        });
    };
    const formUpdateTextState = ( inputId: string, formId: string, stateInfo: { textInput: string } ) => {
        setDynamicFormState({
            [formId] : dynamicFormState[formId].map(entry => {
                if(entry.inputId === inputId){
                    entry.textInput = stateInfo.textInput
                }
                return entry;
            })
        });
    };
    const resetForm = () => {
        const formId = config.formId;
        const formState = dynamicState[formId];
        setDynamicFormState({
            [formId] : formState.map(entry => {
                if(entry.textInput){
                    entry.hasError = false
                    entry.textInput = ''
                    entry.message = ``
                }
                return entry;
            })
        });
    };
    const setFormLoadingStatus = (status: boolean) => {
        setIsLoading(status);
    };
    const submit = () => {
        const formId = config.formId;
        const formState = dynamicState[formId];
        setDynamicFormState({
            [formId] : formState.map(entry => {
                if(!entry.textInput){
                    entry.hasError = true
                    entry.message = `${entry.inputId} cannot be empty`
                }
                return entry;
            })
        });
    };
    
    const { 
        isWizardComponent = false, 
        config, 
        initialState = {}, 
        txnData, 
        onBlurActions, 
        updateInputState = formUpdateInputState,
        updateTextState = formUpdateTextState,
        setFormState = formSetFormState,
        setLoadingState = setFormLoadingStatus,
        dynamicState = { ...dynamicFormState },
        callback, 
        disableForm, 
        backButton, 
        secondaryButtonText = 'ENTER', 
        resetButton, 
        secondaryButton, 
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

    const createForm = () => {
        const Form: React.ReactElement[] = []
        const sections = config.sections
        const formId = config.formId;
        const formState = dynamicState[formId];

        sections.forEach((formEntry, index) => {
            const inputs = formEntry.elements;
            const display = formEntry.display;
            const groupTitle = formEntry.groupTitle;

            Form.push(
                <div key={`form-fieldItem-${index}`} className={`${display === 'row' ? 'w-full flex flex-row flex-wrap items-start' : 'flex flex-col flex-wrap'}`}>
                    {
                        groupTitle && <p className="py-1 font-semibold tracking-wider" >{groupTitle}</p>
                    }
                    {
                        inputs.map((input: InputProps, index) => {
                            const inputState = formState.find(e => e.inputId === `${input.id}`)
                            const isGeneralInput = ["text", "email", "password", "number"].includes(input.type)

                            if(isGeneralInput && inputState){
                                return (
                                    <TextInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        disabled      = { input.disabled }
                                        disablePaste  = { input.disablePaste }
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        type          = { input.type }
                                        label         = { input.label }
                                        digitsOnly    = { input.digitsOnly }
                                        wholeNumber   = { input.wholeNumber }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        validation    = { input.validation }
                                        value         = { inputState.textInput }
                                        style         = { input.style}
                                        autofocus     = { input.autofocus }
                                        onBlurActions = { onBlurActions}
                                        onBlur        = { input.onBlur }
                                        onChange      = { input.onChange }
                                        txnData       = { txnData || {} }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                        // showMeter     = { input.showMeter }
                                    />
                                )
                            }
                            if(input.type === 'select' && inputState){
                                return (
                                    <SelectInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        optionsList   = { input.optionsList || []}
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'date' && inputState){
                                return (
                                    <DatePickerInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        disabled      = { input.disabled }
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        minDate       = { input.minDate || '' }
                                        maxDate        = { input.maxDate || '' }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style}
                                        onBlurActions = { onBlurActions}
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData || {} }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'daterange' && inputState){
                                return (
                                    <DateRangeInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        disabled      = { input.disabled }
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        minDate       = { input.minDate || '' }
                                        maxDate        = { input.maxDate || '' }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style}
                                        onBlurActions = { onBlurActions}
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData || {} }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'textarea' && inputState){
                                return (
                                    <TextareaInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'autocomplete' && inputState){
                                return (
                                    <Autocomplete
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        optionsList   = { input.optionsList || []}
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        placeholder   = { input.placeholder }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'phone' && inputState){
                                return (
                                    <PhoneInputText
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'pinpad' && inputState){
                                return (
                                    <PinPad
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        pinLength     = { 6 } 
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'checkbox' && inputState){
                                return (
                                    <CheckBoxInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        formId        = { formId }
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        style         = { input.style }
                                        // message       = { inputState.message}
                                        value         = { inputState.textInput }
                                    />
                                )
                            }
                            if(input.type === 'downloadInput' && inputState){
                                return (
                                    <DownloadInput
                                        key           = { `${input.id}-${index}` }
                                        label         = { input.label }
                                        helperText    = { input.helperText || 'Download' }
                                        downloadUrl   = { input.download || 'bulk-template' }
                                        message       = { inputState.message}
                                        style         = { input.style }
                                    />
                                )
                            }
                            if(input.type === 'file' && inputState){
                                return (
                                    <FileInput
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        type          = { input.type }
                                        accept        = { input.accept || '' }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        label         = { input.label }
                                        validation    = { input.validation }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                    />
                                )
                            }
                            if(input.type === 'dragndDrop' && inputState){
                                return (
                                    <DragndDrop
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        hasError      = { inputState.hasError }
                                        type          = { input.type }
                                        accept        = { input.accept || "*"}
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        message       = { inputState.message}
                                        value         = { inputState.textInput || [] }
                                        style         = { input.style }
                                        maxFiles      = { input.maximum || 5 }
                                    />
                                )
                            }
                            if(input.type === 'radio' && inputState){
                                return (
                                    <RadioButton
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        updateText    = { updateTextState }
                                        label         = { input.label }
                                        helperText    = { input.helperText }
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        optionsList   = { input.optionsList || []}
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'squre-list' && inputState){
                                return (
                                    <SquareList
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        label         = { input.label }
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        optionsList   = { input.optionsList || []}
                                    />
                                )
                            }
                            if(input.type === 'image-list' && inputState){
                                return (
                                    <AirtimeProviderList
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        label         = { input.label }
                                        imageSrc      = { input.imageSrc || "" }
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        optionsList   = { input.optionsList || []}
                                    />
                                )
                            }
                            if(input.type === 'beneficiary-card' && inputState){
                                return (
                                    <BeneficiaryCard
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        label         = { input.label }
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'beneficiary-radio' && inputState){
                                return (
                                    <BeneficiaryRadio
                                        key           = { `${input.id}-${index}` }
                                        inputId       = { `${input.id}` }
                                        formId        = { formId }
                                        variant       = { config.variant } 
                                        updateState   = { updateInputState }
                                        label         = { input.label }
                                        value         = { inputState.textInput }
                                        style         = { input.style }
                                        onBlurActions = { onBlurActions }
                                        onBlur        = { input.onBlur }
                                        txnData       = { txnData }
                                        formStatus    = {{ 
                                            formId, 
                                            formState, 
                                            setFormState
                                        }}
                                    />
                                )
                            }
                            if(input.type === 'component'){
                                const showIf = input.showIf

                                if(showIf){
                                    const match = showIf.matches
                                    const showIfValue = formState.find(e => e.inputId === showIf.field)?.textInput
                                    const checks = showIf['checks']

                                    let passedChecks = false

                                    if(checks){
                                        for(const check of checks){
                                            const param = check.param
                                            const matches = check.matches

                                            if(txnData?.[param] !== matches){
                                                passedChecks = false
                                                break;
                                            }else{
                                                passedChecks = true
                                            }
                                        }
                                    }

                                    if(checks && passedChecks){
                                        return showIfValue === match && <React.Fragment key = { `component-${index}` }> {input.component} </React.Fragment>
                                    }

                                    if(!checks){
                                        return showIfValue === match && <React.Fragment key = { `component-${index}` }> {input.component} </React.Fragment>
                                    }
                                }else{
                                    return <React.Fragment key = { `component-${index}` }> {input.component} </React.Fragment>
                                }
                            }
                        })
                    }
                </div>
            )
        })
        return Form;
    };
    
    const isGrid = config.gridContainer;
    const formIsLoading = !isWizardComponent && isLoading;
    const formNotLoading  = !isWizardComponent && !isLoading;
    const formState = dynamicState[config.formId];
    const submitLabel = config.submitLabel || 'Submit';
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ffffff" }} spin />
    let submitAction = submit

    if(callback){
        submitAction = () => callback(config.formId, formState, setFormState, setLoadingState, txnData)
    }

	return (
		<form className={`w-full ${isGrid ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : ''}`}>
			{ formState && createForm() }

            <div className='mt-5'>
                {
                    !disableForm && formNotLoading && (
                        <div className={`w-full flex items-center justify-between`}>
                            {
                                backButton && (
                                    <Button callback={()=> backButton(formState)}>Back</Button>
                                )
                            }
                            {
                                resetButton && (
                                    <Button callback={resetForm} danger>RESET</Button>
                                )
                            }
                            {
                                secondaryButton && (
                                    <Button callback={()=> secondaryButton(formState)}>{secondaryButtonText}</Button>
                                )
                            }
                            <Button callback={submitAction}>{submitLabel}</Button>
                        </div>
                    )
                }
                {
                    !disableForm && formIsLoading && (
                        <Button callback = {() => {}} loading={formIsLoading}>
                            <Spin indicator={antIcon} size= "small"/>
                        </Button>
                    )
                }
            </div>
		</form>
	);
};

export default DynamicForm;