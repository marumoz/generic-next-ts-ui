import React, { useEffect } from 'react';
import styled from 'styled-components';

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
    inputId: string
    label: string
    value: string
    formId: string
    onBlur?: string
    style?: { medium?: boolean, mdRight?: boolean }
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateState(inputId: string, formId: string, {  }): void
}
const BeneficiaryRadio = (props: InputProps) => {
	const { 
		inputId, 
		label, 
		style = {}, 
		updateState, 
		formId, 
		onBlurActions, 
		formStatus, 
		txnData = {}, 
		onBlur 
	} = props;

	const [ active, setActive ] = React.useState<string>('other-beneficiary');
    useEffect(() => {
        updateState( inputId,formId, { hasError: false, textInput: "other-beneficiary", message : "" } )
        
        return () => {}
    }, [])

	const changeBeneficiary = ( val: string ) => { 
		updateState ( inputId, formId, { hasError: false, textInput: val, message : "" } )
		setActive(val)

		onBlur && onBlurActions && onBlurActions[onBlur] && onBlurActions[onBlur]({ ...formStatus, textInput: val.toLowerCase(), inputId, ...txnData })
	};

    return (
        <div className={`w-full h-auto mb-4 text-sm ${style.medium ? 'md:w-sm' : ''} ${style.mdRight ? 'md:ml-sm' : ''}`}>
			{label}
			<div className='mt-3 w-full flex items-center justify-between'>
				<RadioButton value="other-beneficiary" label="Other Account" onChange={changeBeneficiary} checked={ active === "other-beneficiary" } />
				
				<RadioButton value="saved-beneficiary" label="Saved Accounts" onChange={changeBeneficiary} checked={ active === "saved-beneficiary" } />
			</div>
		</div>
    )
};

interface RadioProps {
    value: string, 
    label: string
    onChange: (value: string)=> void
    checked: boolean
}

const RadioButton = (props: RadioProps) => {
    const { value, label, onChange, checked } = props;
	const mockChange = () => {}
	return (
		<div className="flex flex-row items-center">
			<div 
				className 	= "relative inline-block" 
				key 		= { value } 
				data-key 	= { value }								
				onClick  	= { () => onChange(value)}
			>
				<RadioInput 
					type     = "radio" 
					id       = { value } 
					name     = { label } 
					value    = { value }
					checked  = { checked }
					$bgcolor="#494949"
					onChange  	= { () => mockChange ()}
				/>
				<Placeholder $bgcolor="#494949" >{ label }</Placeholder>
			</div>
		</div>
	)
}

interface StyleProps {
    $bgcolor: string
}
const Placeholder = styled.label<StyleProps>`
	color: ${props => props.$bgcolor};
    &:before {
        position: relative;
        display: inline-block;
        width: 1.25rem /* 20px */;
        height: 1.25rem /* 20px */;
        margin-right: 0.25rem /* 4px */;
        background-color: transparent;
        top: 4px /* 4px */;
        border-radius: 0.75rem /* 12px */;
        border-width: 2px;
        border-color: #f3f4f6;
		${props=> props.$bgcolor ? { borderColor: props.$bgcolor } : '' };
        content: " ";
    };
`;

const RadioInput = styled.input<StyleProps>`
    display: none;
    &:checked ~ ${Placeholder} {
        &:after{
            position: absolute;
            display: block;
            height: 13px /* 0.75rem 12px */;
            width: 13px /* 0.75rem 12px */;
            left: 3.5px /* 0.25rem 4px */;
            border-radius: 0.75rem /* 12px */;
            content      : " ";
            top: 7.7px;
            ${props=> props.$bgcolor ? { backgroundColor: props.$bgcolor } : '' };
        }
    }
`;

export default BeneficiaryRadio