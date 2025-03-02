import React from 'react'

import FlexTable from '@components/ui/elements/table';

interface BulkTProps {
    config: { data: [], columns: [], Errors: { debitErrors: { column: string}[],  txnCountErrors: { txnCount: number }[],  dataErrors: [],  currencyErrors: { error: string, expected: string, got: string }[] } }
    type: string
    deleteAction?(): null
}
const BulkTable = (props: BulkTProps) => {
    const { 
        config: { data, columns, Errors },
        type= "",
        deleteAction=() => null
    } = props;
    
    // Error checking
    // let debitErrors: { column: string}[] = [], txnCountErrors: { txnCount: number }[] = [], dataErrors:[] = [], currencyErrors = [];
    // if (Errors){
    //     debitErrors    = Errors.debitErrors
    //     txnCountErrors = Errors.txnCountErrors
    //     dataErrors     = Errors.dataErrors
    //     currencyErrors = Errors.currencyErrors
    // }
    const { debitErrors, txnCountErrors, currencyErrors, dataErrors } = Errors
    const errorList = []
    if ( Errors ) {
        debitErrors.forEach( e => errorList.push(`${e.column} is not provided`) )
        if ( txnCountErrors ) {
            errorList.push(`Only ${txnCountErrors[0].txnCount} transaction was found (NB: You can only perform bulk uploads on more than 5 Transactions. )`)
            
        }
        if (currencyErrors){
            currencyErrors.forEach( e => errorList.push(`${e.error.replace(/_/g, ' ')} expected ${e.expected} got ${e.got}`) )
        }
    }
    const noDataErrors = debitErrors.length > 0 && txnCountErrors.length > 0 && currencyErrors.length > 0

    return (
        <>
            <div className='w-full flex flex-row flex-wrap overflow-hidden h-full min-h-28'>
                {
                    data.length > 0 && noDataErrors && (
                        <FlexTable config={{data, columns}} key={type} dataErrors={dataErrors} removeRow={deleteAction} dtType={type} />
                    )
                }
            </div>
            <div className = "w-full flex items-center justify-center pt-3 pr-5">
                {
                    errorList.length > 0 && (
                        <div className = "text-red-300 pt-4 pr-8 bg-red-100 border border-secondary-100 rounded w-9/12 text-xs">
                            <h2 className = "capitalize font-semibold ml-3 text-sm tracking-wide"><b>{type.replace(/-/g,' ')} upload errors</b></h2><br/><br/>
                            <ul>
                                {
                                    errorList.map ( ( err, index ) => (
                                        <li 
                                            key = {index} 
                                            dangerouslySetInnerHTML = {{ 
                                                __html: `->  &nbsp; &nbsp; ${err.replace(/accountName/g, 'The Ordering Account name').replace(/accountNumber/g, 'The Ordering Account')}`
                                            }}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
                { 
                     data.length <= 0 && errorList.length === 0 && <p tw ='w-2/4 font-bold text-center'>There are no records to display</p> 
                }
            </div>
        </>
    );
};

export default BulkTable;