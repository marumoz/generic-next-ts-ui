"use client"

interface PanelProps { 
    children: string | React.JSX.Element
    title: string
    removeEdges?: boolean
    smallEdges?: boolean
}
const Panel = (props: PanelProps) => {
    const { children, title, removeEdges, smallEdges } = props;
	return (
		<>
			<p tw='w-full py-4 pl-4 font-bold tracking-wide text-xl bg-secondary-100 text-gray-50 rounded-t-lg mt-4'>
				{ title }
			</p>
			<div className={`tracking-wide bg-secondary-500 ${removeEdges ? '' : 'px-4 pt-6 pb-5 lg:px-12'} ${smallEdges ? 'px-4 py-3 lg:px-6' : ''}`} >
				{children}
			</div>
		</>
	)
};

export default Panel;