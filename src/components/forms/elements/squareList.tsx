interface InputProps {
    variant: string
    label: string
    inputId: string
    formId: string
    value: string
    optionsList: { id: string | number, label: string, value: string }[]
    updateState(inputId: string, formId: string, {  }): void
    style?: { medium: boolean, mdRight?: boolean }
}

const SquareList = (props: InputProps) => {
    const { updateState, inputId, formId, optionsList = [], value, label, style } = props;

    const handleChangeText = (val: string) => {
		updateState(inputId, formId, { hasError: false, textInput: val, message : "" })
	};

    return (
        <div className={`w-full flex flex-row items-center mb-3 ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`} >
            <span>{label}</span>
            {
                optionsList.map((option) => {
                    return (
                        <div className="flex items-center mr-4 cursor-pointer"
                            key 		= { option.value } 
                            data-key 	= { option.value }								
                            onClick  	= { () => handleChangeText(option.value)}
                        >
                            <div className={`flex items-center justify-center px-9 py-5 ${value === option.value ? 'border-2 border-primary-100 bg-primary-100 text-secondary-100' : 'border border-bordercolor'}`} >
                                { option.label }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default SquareList;