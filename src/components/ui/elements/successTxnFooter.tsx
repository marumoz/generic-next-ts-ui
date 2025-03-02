import Image from "next/image";

const SuccessTxnFooter = (props: { confirmationmessage: string }) => {
    const { confirmationmessage } = props;
    const IBLink = process.env.IBLink;

	return (
		<div className='mt-6 pb-4 flex items-center justify-between'>
			<a href={`https://www.facebook.com/sharer/sharer.php?u=${IBLink}&p=${confirmationmessage}`} target="_blank" rel="noreferrer">
				<Image src='/images/facebook.png' className='w-10 h-10' alt='facebook' />
			</a>

			<a href={`http://twitter.com/share?text=${confirmationmessage}&hashtags=expressexchange,eef`} target="_blank" rel="noreferrer">
				<Image src='/images/twitter.png' className='w-10 h-10' alt='twitter' />
			</a>

			<a href={`https://wa.me/?text=${confirmationmessage}`} target="_blank" rel="noreferrer">
				{/* https://api.whatsapp.com/send?phone=+254715748115&text=Hi */}
				<Image src='/images/whatsapp.png' className='w-10 h-10' alt='whatsapp' />
			</a>

			<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${IBLink}&title=Express Exchange Online Banking&summary=${confirmationmessage}&text=${confirmationmessage}`} target="_blank" rel="noreferrer">
				<Image src='/images/linkedin.png' className='w-10 h-10' alt='linkedin' />
			</a>
		</div>
	)
}

export default SuccessTxnFooter;