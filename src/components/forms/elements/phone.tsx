import PhoneInput       from 'react-phone-input-2';
import fastValidation   from "@services/helpers/fast-validation";
import styled           from 'styled-components';
import 'react-phone-input-2/lib/style.css'

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
    defaultCountry?: string
    preferredCountries?: string[]
    onBlur?: string
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
}

const PhoneInputText = (props: InputProps) => {
    const {
        // variant,
        helperText,
        style,
        hasError,
        inputId,
        label,
        value,
        formId,
        formStatus,
        txnData,
        onBlur,
        onBlurActions,
        defaultCountry = 'ke',
        preferredCountries = ['ke', 'tz', 'ug', 'uk','us'],
        message,
        updateText,
        updateState
    } = props;

    const handleChangeText = (value: string, data: {} , event: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => {
        console.log(data, event, formattedValue)
        updateText( inputId, formId, { textInput: value })
    }
	const validateOnBlur = ( e: React.FocusEvent<HTMLInputElement, Element> ) => {
        const input = e.target.value.replace(/[^0-9]/g,'')
        const { isValid } = fastValidation({ 
            input: `+${e.target.value.replace(/[^0-9]/g,'')}`,
            error: "Invalid Phone Number", 
            type: "isDiasporaPhoneNumber"
        });

        if ( !isValid ) {
            updateState (inputId, formId, { hasError: true, textInput: input, message: "Invalid Phone Number" })
        }else {
            updateState (inputId, formId, { hasError: false, textInput: input, message: helperText })
            onBlur && onBlurActions && onBlurActions[onBlur] && onBlurActions[onBlur]({ ...formStatus, input, inputId, ...txnData });
        }
	}

    return (
        <TopLabel className={`w-full h-auto mt-4 text-sm ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''} `} $haserror={hasError.toString()}>
            {label}
            <label className={`block w-full h-9 rounded-md ${hasError ? 'border border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}>
                <PhoneInput 
                    country            = {defaultCountry} 
                    onChange           = { handleChangeText } 
                    value              = { value }
                    onBlur             = {validateOnBlur} 
                    inputProps         = {{
                        enablesearch   : 'true'
                    }}
                    preferredCountries = {preferredCountries}
                />
            </label>
            <p className={`${hasError ? 'text-warning' : 'text-inherit'}`} >{message}</p>
        </TopLabel>
    )
}
interface LabelProps {
    $haserror: string
}
const TopLabel = styled.label<LabelProps>`
    /* add check  for outlined */
    .react-tel-input {
        width: 100%;
        margin-top: 0px;
        font-size: 12px;
        border-width: 1px;
        border-radius: 0.375rem;
        height: 100% /* 36px */;
        border-color: ${p => p.$haserror === 'true' ? '#FF0000' : p.theme.borderColor};
        box-shadow:none;
        font-size: 12px;
        background: transparent;
    }   
    .react-tel-input .flag-dropdown {
        border: none;
        background:transparent;
    }                    
    .react-tel-input .form-control {
        height: 100%;
        width: 100%;
        border: none;
        background: transparent;
        /* ${p => p.$haserror ? `focus:border-0 focus:ring ring-warning ring-opacity-70` : `focus:border-0 focus:ring ring-primary-100 ring-opacity-40`}; */
    }
    .react-tel-input .country-list {
        padding: 0px 15px;
    }
    .react-tel-input .country-list .search-box {
        text-transform: capitalize;
        border: none;
        font-size: 12px;
        border-bottom: 1px solid #cacaca;
    }
    .react-tel-input .country-list .search-emoji {
        display: none;
    };
`;

export default PhoneInputText