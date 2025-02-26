import React, { useEffect, useState } from 'react'
import Autosuggest  from 'react-autosuggest';
import styled from 'styled-components';

interface ListProps { id: string | number, label: string, value: string }
const getSuggestions     = ( value: string, dataSet: ListProps[] ) => {
	const inputValue = value.trim().toLowerCase()
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : dataSet.filter( (data: ListProps) =>
		data.label.toLowerCase().startsWith( inputValue )
	)
}
const getSuggestionValue = (suggestion: { label: string }) => suggestion.label
const renderSuggestion   = (suggestion: { label: string }) => (
	<div className='hover:text-secondary-100'>
		{suggestion.label}
	</div>
)

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
    style?: { medium: boolean, mdRight?: boolean }
    hasError: boolean
    label: string
    inputId: string
    value: string
    formId: string
    placeholder?: string
    onBlur?: string
    optionsList: ListProps[]
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: { }
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}
const Autocomplete = (props: InputProps) => {
    const {
        style,
        hasError,
        label,
        inputId,
        value,
        formId,
        message,
        formStatus,
        txnData,
        onBlur,
        placeholder,
        onBlurActions,
        optionsList,
        updateText,
        updateState
    } = props;

    const [ userValue, setUserValue ] = useState('');
    const [ suggestions, setSuggestions ] = useState<{ label: string, value: string }[]>([]);

    useEffect(() => {
		const selectedOption  = optionsList.find( e => e.value === value )
        if(value && selectedOption){
            setUserValue(selectedOption.label)
        }
    
        return () => {}
    }, [])
    

    const validateOnBlur = () => {
		const selectedValue  = optionsList.find( e => e.value === value )?.value

		if ( !selectedValue ) {
			updateState( inputId, formId, { hasError: true, textInput: '', message: `Invalid ${inputId}` });
		}else {
			updateState( inputId, formId, { hasError: false, textInput: selectedValue, message: '' });
			onBlur && onBlurActions && onBlurActions[onBlur] && onBlurActions[onBlur]({ ...formStatus, input: value, inputId, ...txnData });
		}
	}
    const handleChangeText = (event: {}, data: { newValue: string }) => {
        setUserValue(data.newValue)

		const selectedValue = optionsList.find( e => e.label === data.newValue )?.value
        if(selectedValue){
            updateText( inputId, formId, { textInput: selectedValue })
        }
	}
    const onSuggestionsFetchRequested = ( data: { value: string }) => {
        setSuggestions(getSuggestions ( data.value, optionsList ))
	}
    const onSuggestionsClearRequested = () => {
		setSuggestions([])
	}
    const inputProps = {
        placeholder,
        value      : userValue,
        onChange   : handleChangeText,
        onBlur     : validateOnBlur
    }

    return (
        <TopDiv className={`w-full h-auto mt-4 text-sm ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
            <label>{label}</label>
            <div className={`relative w-full h-9 mt-1 text-xs border rounded-md focus:outline-none ${hasError ? 'border border-1 border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`} >
                <Autosuggest
                    id={inputId}
                    suggestions                 = { suggestions }
                    onSuggestionsFetchRequested = { onSuggestionsFetchRequested }
                    onSuggestionsClearRequested = { onSuggestionsClearRequested }
                    getSuggestionValue          = { getSuggestionValue }
                    renderSuggestion            = { renderSuggestion }
                    inputProps                  = { inputProps }
                    focusInputOnSuggestionClick = {true}
                />

                <span className={`block ${hasError ? 'text-warning' : ''}`} >{message}</span>

                <style jsx global>{`
                    
                    // Autosuggest
                    .react-autosuggest__container {
                        position: relative;
                        z-index:3;
                    }
                    .react-autosuggest__container , .react-autosuggest__container input {
                        width:97%;
                        height:100%;
                        background-color: transparent;
                    }
                    .react-autosuggest__container input{
                        border    : none;
                        outline   : none;
                        box-shadow: none;
                        appearance: none;
                        padding: 0 0 0 10px
                    }				  
                    .react-autosuggest__input--focused {
                        outline: none;
                    }				  
                    .react-autosuggest__input--open {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }				  
                    .react-autosuggest__suggestions-container {
                        display: none;
                    }				  
                    .react-autosuggest__suggestions-container--open {
                        display         : block;
                        position        : absolute;
                        top             : 50px;
                        width           : 100%;
                        min-height      : 50px;
                        max-height      :150px;
                        overflow        : hidden;
                        overflow-y      : scroll;
                        background-color: #fff;
                        font-weight     : 300;
                        z-index         : 2;
                        box-shadow: 0 0 10px 1px rgba(0,0,0,.05);
                    }				  
                    {/* .react-autosuggest__suggestions-list {
                        margin: 0;
                        padding: 0;
                        list-style-type: none;
                    }				  
                    .react-autosuggest__suggestion {
                        cursor: pointer;
                        padding: 10px 20px;
                    }				  
                    .react-autosuggest__suggestion--highlighted {
                        background-color: orange;
                        color:white
                    } */}
                `}</style>
            </div>
        </TopDiv>
    )
}

const TopDiv = styled.div`
	background-color: transparent;
	& .react-autosuggest__suggestions-list {
		margin: 0;
		padding: 0;
		list-style-type: none;
		color: ${p => p.theme.textColor};
	}				  
	& .react-autosuggest__suggestion {
		cursor: pointer;
		padding: 10px 20px;
		color: ${p => p.theme.textColor};
        font-size: 14px;
        font-weight: 500;
	}				  
	& .react-autosuggest__suggestion--highlighted {
		background-color: ${p => p.theme.secondaryColor};
		color:white;
	}
`;

export default Autocomplete