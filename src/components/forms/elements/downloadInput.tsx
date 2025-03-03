import React from 'react';

import conf from '@services/api/config.json';
const urls = conf.paths

interface DndProps { 
    label: string 
    downloadUrl: "bulk-template"
    helperText: string
    message: string
    style?: { mdRight?: boolean, medium?: boolean }
}
const DownloadInput = (props: DndProps) => {
    const { label, downloadUrl, helperText, style, message } = props;
    return (
        <div className={`mt-4 ${style?.mdRight ? 'ml-5' : ''}`}>
            <a href={ `/${urls[`${downloadUrl}`]}` } target='_blank' rel="noreferrer" download={helperText} className='py-2 text-sm font-semibold rounded px-7 bg-secondary-100 text-gray-50 active:outline-none'>{label}</a>
            <span className='block mt-2 text-sm font-medium'>{message}</span>
        </div>
    )
}

export default DownloadInput
