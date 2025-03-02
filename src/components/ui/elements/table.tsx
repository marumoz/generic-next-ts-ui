import React, { useState, useRef }    from 'react'
import styled               from 'styled-components'
import { FiEdit, FiEye }    from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import * as XLSX            from 'xlsx';
import { useReactToPrint }  from 'react-to-print';
import { Spin }                 from 'antd';
import { LoadingOutlined }      from '@ant-design/icons';

type TableData = (string | number)[][]
interface TableProps {
    loading?: boolean
    config: { columns: string[], data: TableData }
    isReviewable?: boolean
    reviewTrigger?: string
    reviewText?: string
    hidereviewText?: string
    onReview?(index: number):  null
    isEditable?: boolean
    isDeletable?: boolean
    isViewable?: boolean
    deleteAction?(index: number):  null
    editAction?(index: number):  null
    viewAction?(index: number):  null
    dataErrors?: { id: number, column: number}[]
    removeRow?(errorIndex: number, dtType: string):  null
    dtType?: string
    showHeader?: boolean
    worksheetname?: string
    fileName?: string
}
const ConfigTable = (props: TableProps) => {
    const { 
        loading       , 
        config        : { columns, data }, 
        isReviewable  = false, 
        reviewTrigger = 'default',
        reviewText    = "Approve/Reject",
        hidereviewText = 'Pending Approval',
        onReview      = () => null,
        isEditable    = false, 
        isDeletable   = false,
        isViewable	  = false,
        deleteAction  = () => null,
        editAction  = () => null,
        viewAction  = () => null,
        dataErrors,
        removeRow,
        dtType,
        showHeader,
        worksheetname = 'statement',
        fileName = 'file'
    } = props;
    const printDocRef = useRef<HTMLDivElement>(null);
	const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ffa500" }} spin />
    
    const handlePrint = useReactToPrint({ contentRef: printDocRef });

    //force Update hook for deleting entries
    function useForceUpdate(){
        const [ value, setValue ] = useState(0); // integer state
        return () => setValue(value + 1); // update the state to force render
    }
    const forceUpdate = useForceUpdate();

    const isActionable = isEditable ? true : isDeletable ? true : isViewable ? true : isReviewable ? true : dataErrors

    const exportToExcel = () => {
        //build excel data
        const excelData = []
        for(const item1 of data) {
            const json2Value: { [key: string]: string | number } = {}
            for (const index1 in item1){
                json2Value[columns[index1]] = item1[index1]
            }
            excelData.push(json2Value)
        }
  
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        //   wb.Props = {
        //     Title: "iKonnect Fullstatement",
        //     Subject: "full-statement",
        //     Author: "Moses Maru",
        //     CreatedDate: new Date()
        //   };
        XLSX.utils.book_append_sheet(wb, ws, worksheetname);
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }

    return (
        <Container className="mb-6 rounded shadow-md w-full">
            
            {
                data.length > 0 && showHeader && (
                    <div className='flex items-center justify-end pt-1 pb-2 px-2'>
                            <button onClick = {() => exportToExcel()} className='cursor-pointer py-2 px-7 mr-3 text-white bg-secondary-100 rounded font-semibold text-xs tracking-wide focus:outline-none active:outline-none'>Downlod as Excel</button>
                        
                            <button onClick = {() => handlePrint()} className='cursor-pointer py-2 px-7 text-white bg-secondary-100 rounded font-semibold text-xs tracking-wide focus:outline-none active:outline-none'>Print/Downlod as PDF</button>
                    </div>
                )
            }
            <div className='flex items-center justify-center'>
                {/* <div tw="w-full lg:w-5/6">*/}
                    <div className='w-full h-full overflow-auto max-h-96'> 
                        <table className='relative w-full h-full table-auto' id="divToPrint">
                            <thead className='relative z-2'>
                                <tr className='sticky top-0 text-sm font-medium leading-normal capitalize rounded-lg cursor-default'>
                                    {
                                        columns.map((entry, index) => {
                                            return <Header className='sticky top-0 py-3 pl-1 text-left border-r-2 border-gray-300' key = {`${entry + index}`}>
                                                {entry}
                                            </Header>
                                        })
                                    }

                                    {
                                        data.length > 0 && isActionable && <Header className='sticky top-0 py-3 pl-1 text-center'>Actions</Header>
                                    }
                                    
                                </tr>
                            </thead>
                            <tbody className='text-sm font-normal'>

                                {
                                    data.map((entry, index) => {
                                        const rowHasError = dataErrors && dataErrors.find(row => row.id  === entry[0])
                                        let errorIndex: number;

                                        if( rowHasError && dataErrors){
                                            errorIndex = dataErrors.find(row => row.id  === entry[0])?.id || 0
                                        }

                                        return <RowContainer $haserror = {rowHasError ? true: false} className='border-b border-gray-200 even:bg-gray-50 hover:bg-gray-100 break-all' key = {`data-row-${index}`} >
                                            {
                                                entry.map((item, itemIndex) => {
                                                    const hasError = dataErrors && dataErrors.find( row => row.id === entry[0] && row.column === itemIndex )

                                                    //if(item !== 'hide' && item !== 'show')
                                                    return <DataContainer $haserror={hasError ? true: false} className='py-3 pl-1 text-left border-r-2 border-gray-300' $noitems={entry.length} key={`${item}${itemIndex}`}>{item}</DataContainer>
                                                })
                                            }


                                            {
                                                isActionable && (
                                                    <td className='px-1 py-3 text-center'>
                                                        <div className='flex justify-center items-center'>
                                                            { isViewable && <div className='w-4 transform hover:text-successColor hover:scale-110 cursor-pointer text-base' onClick = { ()=> viewAction(index)}>
                                                                <FiEye />
                                                                </div>
                                                            }
                                                            { isEditable && <div className='w-4 ml-2 transform hover:text-primary-100 hover:scale-110 cursor-pointer text-base' onClick = { ()=> editAction(index)}>
                                                                <FiEdit/>
                                                                </div>
                                                            }
                                                            { isDeletable && <div className='w-4 ml-2 transform hover:text-warning hover:scale-110 cursor-pointer text-lg' onClick = { ()=> deleteAction(index)}>
                                                                <RiDeleteBin6Line />
                                                                </div> 
                                                            }

                                                            {
                                                                isReviewable &&  reviewTrigger === 'button' && !entry.includes('hide') && (
                                                                    <button className='flex items-center justify-center py-1 ml-2 text-sm font-bold capitalize border-2 rounded-md shadow-none outline-none cursor-pointer text-primary-100 w-28 border-primary-100 active:outline-none hover:opacity-80 focus:outline-none' onClick = { () => onReview ( index ) }>{reviewText}</button>
                                                                )
                                                            
                                                            }

                                                            {
                                                                isReviewable &&  reviewTrigger === 'button' && entry.includes('hide') && (
                                                                    <button className='flex items-center justify-center py-1 ml-2 text-sm font-bold capitalize border-2 rounded-md shadow-none outline-none cursor-pointer text-primary-100 w-32 border-primary-100 active:outline-none hover:opacity-80 focus:outline-none bg-gray-300' onClick = { () => {}}>{hidereviewText}</button>
                                                                )
                                                            
                                                            }
                                                            { rowHasError && removeRow && dtType && (
                                                                <button className='w-4 ml-2 transform hover:text-warning active:outline-none active:border active:border-warning active:rounded' onClick = { ()=>removeRow(errorIndex, dtType) && forceUpdate()}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                              </button> 
                                                            )
                                                            }
                                                        </div>
                                                    </td>
                                                )
                                            }
                                        </RowContainer>
                                    })
                                }
                            </tbody>
                        </table>

                        {
                            data.length === 0 && <div className='flex flex-row items-center justify-center w-full p-5 overflow-hidden font-bold text-center'>
                                { loading && <div><Spin indicator={antIcon} size= "large"/> <span className='block text-xs tracking-wider font-medium leading-loose' >Fetching records...</span> </div>}
                                { !loading && <p className='px-12 py-3 mt-10 text-xs tracking-wide border rounded text-secondary-100 border-secondary-100'>There are no records to display</p>}
                            </div>
                        }
                    </div>
                 {/*</div> */}
            </div>
        </Container>
    );
};

interface RowProps {
    $haserror?: boolean
}
interface ContainerProps extends RowProps {
    $noitems: number
}

const Container = styled.div`
    background-color: ${props => props.theme.lightColor};
`;

const RowContainer = styled.tr<RowProps>`
    background: ${p => p.$haserror ? '#ff00000d' : ''};
`;

const DataContainer = styled.td<ContainerProps>`
    background: ${p => p.$haserror ? '#fbe8e8' : ''};
    max-width: ${p => `${100 / p.$noitems}%`};
`;

const Header = styled.th`
    background-color: #E6E7E8;
`;

export default ConfigTable;
