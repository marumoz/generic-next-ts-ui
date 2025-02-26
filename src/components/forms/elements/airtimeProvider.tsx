import Image from "next/image";

interface InputProps {
    optionsList: { label: string, value: string }[]
    variant: string
    label: string
    inputId: string
    value: string
    formId: string
    imageSrc: string
    updateState(inputId: string, formId: string, {  }): void
    style?: { medium: boolean, mdRight?: boolean }
}
const AirtimeProviderList = (props: InputProps) => {
    const { optionsList, inputId, value, formId, updateState, imageSrc = '/images/logo.png', style, label } = props;

    const onChange = (val: string) => {
		updateState( inputId, formId, { hasError: false, textInput: val, message : "" } )
	}

    return (
        <div className={`w-full h-11 mb-4 text-xs text-left ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
            <span>{label}</span>
            <div className="flex flex-row items-center mb-3">
                {
                    optionsList.map((option) => {
                        const name =  option.value.toLowerCase()
                        return (
                            <div
                                className="flex flex-col items-center"
                                key 		= { option.value } 
                                data-key 	= { option.value }								
                                onClick  	= { () => onChange( option.value )}
                            >
                                <div className="w-24 cursor-pointer h-full">
                                    <Image className={`w-full rounded overflow-hidden hover:grayscale-0 ${value === option.value ? 'grayscale-[0]' : 'grayscale-[100]'}`} src={imageSrc} alt={`${name}`} />
                                </div>
                                <label tw = "capitalize mt-3 text-gray-600" >{ option.label.toLowerCase() }</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AirtimeProviderList