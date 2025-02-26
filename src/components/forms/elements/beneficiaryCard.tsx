import { useEffect } from 'react';
import { BsCircle } from 'react-icons/bs';

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
    label: string
    inputId: string
    value: string
    formId: string
    onBlur?: string
    style?: { medium?: boolean, mdRight?: boolean }
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    txnData?: {}
    updateState(inputId: string, formId: string, {  }): void
}
const BeneficiaryCard = (props: InputProps) => {
    const { updateState, inputId, formId, onBlurActions, formStatus, txnData = {}, onBlur, value, style = {}, label } = props;

    useEffect(() => {
        updateState( inputId,formId, { hasError: false, textInput: "other-beneficiary", message : "" } )
        
        return () => {}
    }, [])
    

    const handleChangeText = ( val: string ) => {
		updateState( inputId,formId, { hasError: false, textInput: val, message : "" } )

        if(onBlur && onBlurActions && onBlurActions[onBlur])
		    onBlurActions[onBlur]({ ...formStatus, input: val, inputId, ...txnData })
	}

    return (
        <div className={`w-full mt-4 ${style.medium ? 'md:w-sm' : ''} ${style.mdRight ? 'md:ml-sm' : ''}`}>
            <span className='block'>{label}</span>
            <div className='flex flex-row items-center justify-between text-center mt-1'>
                <div className={`flex items-center justify-center h-10 px-2 font-bold rounded cursor-pointer w-sm ${value === 'saved-beneficiary' ? 'border-2 border-secondary-100' : 'border border-bordercolor'}`} onClick={() => handleChangeText( "saved-beneficiary" )}>
                    <p className='flex items-center' >
                        <BsCircle className={`${value === 'saved-beneficiary' ? 'text-secondary-100' : ''}`} />
                        <span className={`ml-2 ${value === 'saved-beneficiary' ? 'text-secondary-100' : ''}`} >Saved Beneficiary</span>
                    </p>
                </div>

                <div className={`flex items-center justify-center h-10 px-2 font-bold rounded cursor-pointer w-sm ${value === 'other-beneficiary' ? 'border-2 border-secondary-100' : 'border border-bordercolor'}`} onClick={() => handleChangeText( "other-beneficiary" )}>
                    <p className='flex items-center'>
                        <BsCircle className={`${value === 'other-beneficiary' ? 'text-secondary-100' : ''}`} />
                        <span className={`ml-2 ${value === 'other-beneficiary' ? 'text-secondary-100' : ''}`} >Other Beneficiary</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BeneficiaryCard;