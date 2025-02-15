import DynamicForm from '@components/forms/dynamic-form'
import TestForm from '@configs/forms/test.json'

const MainPage = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className='ml-5 my-4 font-bold text-xl tracking wide'>Test TypeScript Dynamic Form</h1>
            <div className='w-1/2'>
                <DynamicForm config={TestForm} />
            </div>
        </div>
    )
}

export default MainPage