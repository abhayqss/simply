import React from 'react'

import cn from 'classnames'

import './Loader.scss'

import { ReactComponent as LoaderImg } from 'images/loader.svg'

function Loader ({ style, hasBackdrop = false }) {
    return (
        <div
            style={hasBackdrop ? { margin: 0 } : style}
            className={cn('Loader', { 'Loader_has_backdrop': hasBackdrop })}>
            <LoaderImg style={hasBackdrop ? style : null} className='LoaderImg'/>
            {hasBackdrop && (
                <div className='Loader-Backdrop'/>
            )}
        </div>
    )
}

export default Loader;