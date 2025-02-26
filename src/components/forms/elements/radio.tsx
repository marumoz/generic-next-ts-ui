import { useEffect } from 'react';
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
    optionsList: { value: string, label: string }[]
    variant: string
    helperText?: string
    inputId: string
    value: string
    label: string
    style?: { medium?: boolean, mdRight?: boolean, bgColor?: string }
    formId: string
    onBlur?: string,
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}
const RadioButton = (props: InputProps) => {
    const {
        optionsList, 
        inputId, 
        value, 
        label, 
        style = {}, 
        updateState, 
        updateText, 
        formId, 	
        onBlur        = false,
        onBlurActions = false,
        formStatus    = {},
        txnData       = {} 
    } = props;
    
        useEffect(() => {
            if(value){
                updateText(inputId, formId, { textInput: value })
            }else if(optionsList?.[0]?.value){
                updateText(inputId, formId, { textInput: optionsList?.[0]?.value })
            }else{}
            
            return () => {}
        }, [])

	const onChange = ( val: string ) => {
        console.log(val)
		updateState( inputId,formId, { hasError: false, textInput: val, message : "" } )

		onBlur && onBlurActions && onBlurActions [ onBlur ] && onBlurActions [ onBlur ]({ ...formStatus, input: val, inputId,...txnData })
	}

    return (
        <div className={`w-full h-auto mt-4 ${style.medium ? 'md:w-sm' : ''} ${style.mdRight ? 'md:ml-sm' : ''}`}>
			<label className='block text-sm'>{label}</label>
            <div className='flex flex-row items-center'>
				{
					optionsList.map ( ( option ) => {
						return (
							<div 
								className='relative inline-block pr-3 mt-3 mr-5'
								key 		= { option.value } 
								data-key 	= { option.value }								
								onClick  	= { () => onChange ( option.value )}
							>

								{/* radio input */}
								<RadioInput 
									type     = "radio" 
									id       = { option.value } 
									name     = { inputId } 
									value    = { option.value }
									checked  = { option.value === value }
									onChange = { () => alert ( `Value is - ${ option.value }` )}
									$bgcolor  ={style.bgColor || "#494949"}
								/>

								{/* radio label */}
								<Placeholder className='relative' $bgcolor={style.bgColor || '#494949'} >{ option.label }</Placeholder>
							</div>
						)
					})
				}
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
            left: 3.8px /* 0.25rem 4px */;
            border-radius: 0.75rem /* 12px */;
            content      : " ";
            top: 8.5px;
            ${props=> props.$bgcolor ? { backgroundColor: props.$bgcolor } : '' };
        }
    }
`;

export default RadioButton