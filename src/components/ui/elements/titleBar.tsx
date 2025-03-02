"use client"

import { RiHome6Line } 		from "react-icons/ri";

const TitleBar = () => {
	return (
		<div className='pt-8 items-center lg:flex lg:pb-1 lg:w-full'>
			<div className='w-full bg-secondary-500 flex items-center px-6 py-2 rounded-lg'>
				<div className='bg-primary-100 flex items-center justify-center rounded-lg text-gray-100 font-medium text-xl h-8 w-8 lg:w-12 lg:h-12 lg:text-4xl' >
					<RiHome6Line />
				</div>

				<p className='tracking-wide ml-2 lg:ml-4'>
					<span className='font-bold text-2xl text-primary-100'>Express Exchange Financial Online Banking</span>
					<span className='block font-medium text-sm mt-1 text-secondary-100'>Thank you for banking with us. It&#39;s a pleasure to serve you.</span>
				</p>
			</div>
		</div>
	)
};

export default TitleBar;