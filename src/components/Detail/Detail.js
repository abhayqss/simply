import React from 'react'
import cn from 'classnames'

import './Detail.scss'

export default function Detail (props) {
    const {
        title,
        children,
        className,
        titleClassName,
        valueClassName,
        renderIcon
    } = props

    return children ? (
        <div className={cn('Detail', className)}>
            <span className={cn('Detail-Title', titleClassName)}>{title}</span>
            <div className={cn('Detail-Value', valueClassName)}>
                {children}
                {renderIcon && renderIcon()}
            </div>
        </div>
    ) : null
}