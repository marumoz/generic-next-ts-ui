"use client"

type ListProps = {
    config: { [key: string ]: string | number }
}
const SimpleList = (props: ListProps) => {
    const { config } = props;
    const keys = Object.keys(config);

    if(keys.length > 0)
        for ( const index in keys ) {
            const key = keys[index]
            const value = config[key]
            
            return (
                <div className='flex flex-row p-3 even:bg-gray-300' key={key + value}>
                    <div className='text-left font-bold flex-2'>{ key}</div>
                    <div className='flex-2 text-right'>{ value }</div>
                </div>
            )
        }
    else
        return (
            <div tw = 'w-full flex items-center justify-center p-4' key='no-data'>
                <p className='text-primary-100 pt-4 pr-2 font-bold rounded w-2/4 text-center border border-gray-500'>There are no records to display</p>
            </div>
        );
};

export default SimpleList;