"use client"

import styled from 'styled-components'

const Footer = () => {
	return (
		<>
			<Div className='hidden w-full lg:flex items-center justify-between py-2 px-4 fixed bottom-0 text-xs font-normal leading-normal tracking-wider cursor-default'>
				<span className="hidden lg:flex">Copyright&copy; Express Exchange Financial S.A { new Date().getFullYear() }</span>
				<address className='p-0 m-0'>
					Need help? Talk to us via <a className='hover:text-primary-100' href="mailto:info@expressexchangefinancial.cm">info@expressexchangefinancial.cm</a> <a className='hover:text-primary-100' href="tel:+237 691 619 134"> | Call +237 691 619 134</a>
					<a className='ml-1 hover:text-primary-100' target = '_blank' href='https://twitter.com/Expressexchang' rel="noreferrer">Twitter</a>
					<a className='ml-1 hover:text-primary-100' target = '_blank' href='https://www.facebook.com/expressexchangecameroun/' rel="noreferrer">Facebook</a>
					<a className='ml-1 hover:text-primary-100' target = '_blank' href='https://www.instagram.com/expressexchangesa/' rel="noreferrer">Instagram</a>
					<a className='ml-1 hover:text-primary-100' target = '_blank' href='https://api.whatsapp.com/send?phone=+237682625205&text=Hi' rel="noreferrer">WhatsApp</a>
				</address>
				
				<span>
					{/* <a target = '_blank' href='https://www.faulukenya.com/privacy-policy/' rel="noreferrer" tw='hover:text-primary-100'>Security</a> */}
					<a className='ml-2' target = '_blank' href='https://www.expressexchangefinancial.cm/privacy-policy/' rel="noreferrer" >
						<span className='hover:text-primary-100'>Privacy Policy</span>
					</a> 
					<a className='ml-2' target = '_blank' href='https://www.expressexchangefinancial.cm/moneyphone/' rel="noreferrer" >| <span className='hover:text-primary-100'>Terms & Conditions</span></a> 
				</span>
			</Div>
			
			<Div className='lg:hidden w-full flex flex-col py-1 px-2 fixed bottom-0 text-xs font-normal leading-normal tracking-wider cursor-default'>
				<address className='p-0 m-0'>
					Need help? Talk to us via: 
					<a className='ml-1 hover:text-primary-100' href="tel:+237 691 619 134">Call +237 691 619 134</a>
				</address>
				
				<p className='w-full flex items-center justify-between'>
					<span>Copyright&copy; EEF S.A { new Date().getFullYear() }</span>
					<a className='hover:text-primary-100' target = '_blank' href='https://www.expressexchangefinancial.cm/moneyphone/' rel="noreferrer"><span>Terms & Conditions</span></a> 
				</p>
			</Div>
		</>
	);
};

const Div = styled.div`
	background-color: rgba(255, 255, 255, 0.8);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default (Footer)