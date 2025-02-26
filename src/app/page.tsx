"use client"

import DynamicForm from '@components/forms/dynamic-form';
import TestForm from '@configs/forms/test.json';
import WizardTestForm from '@configs/forms/wizard';
import FormWizard 	   		from '@components/forms/form-wizard';

const MainPage = () => {
    const submit = (formId: string, formState: {}[], setFormState: (formId: string, newState: []) => void, setLoadingState: (status: boolean) => void, txnData: {}) => {
        setLoadingState(true)
        console.log({ formId, formState, setFormState, setLoadingState, txnData })
        setLoadingState(false)
    }
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className='ml-5 my-4 font-bold text-xl tracking wide'>Test TypeScript Dynamic Form</h1>
            <div className='w-1/2 mb-4'>
                <DynamicForm config={TestForm} callback={submit} resetButton initialState={{ topic: 'DEVOPS' }} />
            </div>
            <div className='w-3/5'>
                <FormWizard config={WizardTestForm} onWizardSubmit={()=> {}} formIsLoading={false} initialState={{ accountNumber: "10", idNumber: "102", accountName: "Maru", email: "maru@x.com", kraPIN: "unknown persons" }}/>
            </div>
        </div>
    )
};

export default MainPage;