"use client"

import styled from 'styled-components';
import Router from 'next/router'

import getConfirmMessage from '@services/helpers/confirmMessage';
import SuccessTxnFooter from '@components/ui/elements/successTxnFooter';

interface TxnProps {
    view: string
    stageTxn?: boolean
    formId: string
    canSaveBeneficiary?: boolean
    txnSavebeneficiary?: boolean
    addBeneficiary?(): null, 
    esbMessage: string
    setView?(): null
}
const TxnStatus = (props: TxnProps) => {
    const { view, stageTxn, formId, canSaveBeneficiary, txnSavebeneficiary, addBeneficiary=()=> {}, esbMessage, setView=()=> {} } = props;
	if(view === 'confirmation'){
		return (
			<div className='w-full flex items-center lg:px-2'>
				<div className='hidden lg:block'>
					<ConfirmImg src='/images/success.png' alt='success' />
				</div>
				<div className='w-full flex-1 lg:(pl-10 ml-10 h-full border-l border-gray-200)'>
					<span className='text-primary-100 text-xl'>Success!</span>
					<div className='w-24 h-1 rounded-lg bg-secondary-100 mt-2 lg:w-36' />

					<p className='text-base font-semibold pt-2 lg:text-xl'>
						Your transaction has been { stageTxn ? 'staged' : 'processed' } Successfully
					</p>
					<p className='text-base mt-4'>
						Meanwhile... share the message below to help us get the word out.
					</p>

					<p className='text-xs tracking-wider mt-2 px-3 py-4 leading-relaxed rounded-xl border border-secondary-100 lg:(text-sm)'>
						{getConfirmMessage(formId)}
					</p>

					<p className='mt-6 text-xl font-semibold'>
						Share it on:
					</p>
					<SuccessTxnFooter confirmationmessage={getConfirmMessage(formId)}/>
					
					<div className='mt-3'>
						{ canSaveBeneficiary && txnSavebeneficiary && <button className='rounded-lg text-gray-100 bg-primary-100 font-bold tracking-wide px-8 py-2 text-base mt-4' onClick={ addBeneficiary } > Save Beneficiary </button> }
						<button className='rounded-lg text-gray-100 bg-primary-100 font-bold tracking-wide px-8 py-2 text-base mt-4 ml-4' onClick={()=> Router.push('/main/dashboard')} >
							EXIT
						</button>
					</div>
				</div>
			</div>
		)
	}else{
		return (
			<div className='w-full flex items-center lg:px-16'>
				<div className='hidden lg:block'>
					<ConfirmImg src='/images/failed.png' alt='failed' />
				</div>
				<div className='w-full flex-1 lg:(pl-14 ml-14 h-full border-l border-gray-200)'>
					<span className='text-red-500 text-xl'>Transaction Failed!</span>
					<div className='w-24 h-1 rounded-lg bg-red-500 mt-2 lg:w-36' />

					<p className='text-base font-semibold pt-2 lg:text-xl'>
						Your transaction failed. {esbMessage}
					</p>

					<button className='rounded-lg text-gray-100 bg-primary-100 font-bold tracking-wide px-8 py-2 text-base mt-4' onClick={setView} >
						BACK
					</button>
				</div>
			</div>
		)
	}
}

const ConfirmImg = styled.img`
	width: 100%;
	height: auto;
`;

export default TxnStatus