"use client"

import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import moment from 'moment';
import { useEffect } from 'react';

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
    formId: string
    variant: string
    inputId: string
    label: string
    value: string
    message: string
    maxDate?: string
    minDate?: string
    helperText?: string
    hasError: boolean
    disabled?: boolean
    style?: { medium?: boolean, mdRight?: boolean }
    onBlur?: string
    onBlurActions?: { [ key: string]: BlurFunc }
    formStatus: { [ key: string]: string | InputFields[] | FormStateFunc }
    updateText(inputId: string, formId: string, {  }): void
    updateState(inputId: string, formId: string, {  }): void
    txnData?: {  }
}
const DateRangeInput = (props: InputProps) => {
    const { inputId, label, value, hasError, message, style, formId, onBlur, onBlurActions, formStatus, updateText, updateState, txnData, disabled } = props;
    let { maxDate, minDate } = props;
    
    useEffect(() => {
        if(!value){
            updateText(inputId, formId, { textInput: [dayjs(), dayjs()] });
        }
        if(minDate === 'above18'){
            updateText(inputId, formId, { textInput: moment().subtract(18, 'years').format('YYYY-MM-DD') });
        }
    
        return () => {};
    }, []);
    
    if(minDate === 'above18'){
        maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
    }
    if(maxDate === 'today'){
        maxDate = moment().format('YYYY-MM-DD');
    }
    if(minDate === 'today'){
        minDate = moment().format('YYYY-MM-DD');
    }

    const handleChangeText = <T,>(date: T, dateString: [string, string]) => {
        console.log('MMMMMMMMMMMMMMMMMMMMMMMM',dateString)
        if(dateString){
            updateState( inputId, formId, { textInput: dateString, hasError: false, message: '' });

            if(onBlur && onBlurActions?.[onBlur])
                onBlurActions [ onBlur ]({ ...formStatus, input: dateString, inputId, ...txnData });
        }
    };

    return (
        <div className={`w-full mt-4 ${style?.medium ? 'md:w-sm' : ''} ${style?.mdRight ? 'md:ml-sm' : ''}`}>
			<label htmlFor={inputId}>{label}</label>
            <div className={`relative w-full mt-3 text-xs border rounded-md h-9 ${hasError ? 'border border-warning focus:border-0 focus:ring ring-warning ring-opacity-70' : 'focus:border-0 focus:ring ring-primary-100 ring-opacity-40'}`}>
                <DatePicker.RangePicker
                    onChange = { handleChangeText }
                    value    = {value ? [ dayjs(value[0]), dayjs(value[1])] : [dayjs(), dayjs()]}
                    className={`absolute top-0 left-0 w-full h-full m-0 bg-transparent border-0 rounded-md focus:outline-none`}
                    maxDate={maxDate ? dayjs(maxDate) : undefined} 
                    id = {inputId}
                    minDate={minDate ? dayjs(minDate) : undefined}
                    allowClear={false}
                    disabled={disabled}
                />
            </div>
            <span className={`block ${hasError ? 'text-warning' : 'text-inherit'}`} >{message}</span>
        </div>
    )
};

export default DateRangeInput;