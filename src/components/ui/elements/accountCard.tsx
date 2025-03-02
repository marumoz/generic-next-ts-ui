"use client"

import commaNumber from 'comma-number';

interface AcCardProps { 
    accountName: string
    accountNumber: string
    currency: string
    balance: { AvailableBal: string }, 
    showBalance: boolean
}
const AccountCard = (props: AcCardProps) => {
    const { accountName, accountNumber, currency, balance, showBalance } = props;

	return (
		<div className="w-full pb-2 mt-3 overflow-hidden border-solid border-l-0 border-b-0 border-r-0 border-t-4 rounded shadow border-primary-100 md:(w-80 h-48)">
			<div className="flex items-center justify-between px-2 pt-4 text-sm font-medium leading-snug tracking-wide bg-gray-50">
				<span>Account Name</span>
				<span>Account Number</span>
			</div>
			<div className="flex items-center justify-between px-2 text-sm font-semibold leading-snug tracking-wider bg-gray-50">
				<span>{accountName}</span>
				<span>{accountNumber}</span>
			</div>

			<div className="flex items-center justify-between pt-4 px-2 text-sm font-semibold text-primary-100 leading-snug tracking-wider bg-gray-50">
				<div>
					<p className="font-medium text-sm m-0">Account Balance</p>
					<p className="m-0">{currency} {balance.AvailableBal ? commaNumber(balance.AvailableBal) : "---,---.--"}</p>
				</div>
				<div className='border border-solid border-primary-100 text-primary-100 rounded-md w-20 text-center py-1 font-medium cursor-pointer'>
					{ showBalance && 'Show Bal' }
					{ !showBalance && 'Hide Bal' }
				</div>
			</div>

            <p className="px-12 py-2 mt-5 w-full text-center capitalize rounded-md cursor-pointer md:px-16 text-primary-100 border border-primary-100 border-solid">
                Full account details
            </p>
		</div>
	)
};

export default AccountCard;
