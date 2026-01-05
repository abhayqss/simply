import React, { Component } from 'react'

import {
    map,
    isNumber
} from 'underscore'

import cn from 'classnames'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator'

import { ReactComponent as TopChevron } from 'images/chevron-top.svg'
import { ReactComponent as LeftChevron } from 'images/chevron-left.svg'
import { ReactComponent as RightChevron } from 'images/chevron-right.svg'
import { ReactComponent as BottomChevron } from 'images/chevron-bottom.svg'

import { ReactComponent as Cog } from 'images/cog.svg'

import { ReactComponent as LoaderImg } from 'images/loader.svg'

import './Table.scss'

const PAGINATION_OPTIONS = {
    custom: true,
    paginationSize: 4,
    pageStartIndex: 1,
    hideSizePerPage: true,
    alwaysShowAllBtns: true,
    withFirstAndLast: true
}

function Caption (props) {
    const {
        title,
        className,
        hasOptions,
        onOptions
    } = props

    return (
        <div className={cn('Table-Caption', className)}>
            {title ? (
                <div className='Table-Title'>
                    {title}
                </div>
            ) : null}
            {hasOptions ? (
                <Cog
                    className='Table-Options'
                    onClick={onOptions}
                />
            ) : null}
        </div>
    )
}

function renderSortCaret (order) {

    const dropup = (
        <div key='dropup' className='dropup chevron-green'>
            <TopChevron/>
        </div>
    )

    const dropdown = (
        <div key='dropdown' className='dropdown'>
            <BottomChevron/>
        </div>
    )

    if (!order) return (
        <div className='order'>
            {[dropup, dropdown]}
        </div>
    )

    if (order === 'asc') return (
        <div className='order'>
            {dropup}
        </div>
    )

    return (
        <div className='order'>
            {dropdown}
        </div>
    )
}

function renderHeaderCell (column, colIndex, { sortElement, filterElement }) {
    return (
        <div>
            {filterElement}
            <span className='Table-ColumnTitle'>
                {column.text}
            </span>
            {sortElement}
        </div>
    )
}

function renderLoadingIndication () {
    return (
        <div className='Table-Loader'>
            <LoaderImg className='Table-LoaderImg'/>
        </div>
    )
}

function getDisplayedPageNumbers (size, page, pageSize, totalCount) {
    let numbers = []

    if (totalCount > 0) {
        const maxOffset = Math.ceil(size / 2)

        const pageCount = Math.ceil(totalCount / pageSize)

        const startOffset = page - 1
        const endOffset = pageCount - page

        for (let i = 0; i < Math.min(pageCount, size); i++) {
            let x = 0

            if (startOffset <= maxOffset) {
                x = page - startOffset
            }

            else if (endOffset > maxOffset) {
                x = page - maxOffset
            }

            else x = page - (maxOffset - endOffset + 1)

            numbers.push(x + i)
        }

        if (pageCount > size) {
            return endOffset <= maxOffset ? [1, '...'].concat(numbers)
                : numbers.concat(['...', pageCount])
        }
    }

    return numbers
}

function pageButtonRenderer (props) {
    const {
        page,
        title,
        active,
        disabled,
        onPageChange: cb
    } = props

    const isArrow = ['<', '>'].includes(page)

    if (['<<', '>>'].includes(page)) return null

    return (
        <li key={page} className={cn('page-item', { arrow: isArrow }, { active }, { disabled })}>
            <a
                href="#"
                title={title}
                className={cn('page-link', { active })}
                onClick={(e) => {
                    e.preventDefault();
                    cb && cb(page);
                }}>
                {page === '<' ? <LeftChevron className="prev-page__icon"/> : null}
                {page === '>' ? <RightChevron className="next-page__icon"/> : null}
                {page === '...' ? '...' : null}
                {isNumber(page) ? page : null}
            </a>
        </li>
    );
}

export default class Table extends Component {

    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.object),
        data: PropTypes.arrayOf(PropTypes.object),
        keyField: PropTypes.string,
        noDataText: PropTypes.string,

        hasHover: PropTypes.bool,
        hasOptions: PropTypes.bool,
        hasBorders: PropTypes.bool,
        hasPagination: PropTypes.bool,

        isRemote: PropTypes.bool,
        isStriped: PropTypes.bool,
        isLoading: PropTypes.bool,

        title: PropTypes.string,
        renderCaption: PropTypes.func,
        rowEvents: PropTypes.object,
        expandRow: PropTypes.object,
        pagination: PropTypes.object,
        selectedRows: PropTypes.object,

        className: PropTypes.string,
        containerClass: PropTypes.string,

        getRowStyle: PropTypes.func,
        onRefresh: PropTypes.func,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        data: [],
        columns: [],
        keyField: 'id',
        noDataText: 'No Data',

        isRemote: true,
        isStriped: false,
        isLoading: false,

        hasHover: false,
        hasHeader: false,
        hasBorders: false,
        hasPagination: false,

        rowEvents: {},
        pagination: {},

        getRowStyle: function () {
        },
        onRefresh: function () {
        },
        onSelect: function () {
        },
    }

    onRefresh = (type, { page }) => {
        if (!(type === 'sort')) {
            this.props.onRefresh(page)
        }
    }

    getRowStyle = (row, rowIndex) => {
        return this.props.getRowStyle(row, rowIndex) || {}
    }

    onSelect = (e) => {

    }

    onOptions = () => {

    }

    getColumns () {
        return map(this.props.columns, col => {
            col = { ...col, headerFormatter: renderHeaderCell }
            return col.sort ? { ...col, sortCaret: renderSortCaret } : col
        })
    }

    render () {
        const {
            data,
            title,
            keyField,
            expandRow,
            rowEvents,
            selectedRows,
            className,
            containerClass,
            isRemote,
            isStriped,
            isLoading,
            hasBorders,
            hasOptions,
            hasHover,
            hasPagination,
            pagination,
            noDataText,
            renderCaption
        } = this.props

        const {
            page,
            size,
            totalCount
        } = pagination

        const pageCount = Math.ceil(totalCount / size)

        return (
            <div className={cn('TableContainer', containerClass)}>
                <PaginationProvider
                    pagination={paginationFactory({
                        ...PAGINATION_OPTIONS,
                        ...hasPagination && {
                            page,
                            sizePerPage: size,
                            totalSize: totalCount
                        }
                    })}>
                    {
                        ({ paginationProps, paginationTableProps }) => (
                            <div>
                                <BootstrapTable
                                    remote={isRemote}
                                    expandRow={expandRow}
                                    selectRow={selectedRows}
                                    data={isLoading ? [] : data}
                                    columns={this.getColumns()}
                                    keyField={keyField}
                                    classes={cn('Table', className)}
                                    headerClasses={'Table-Header'}
                                    striped={isStriped}
                                    hover={hasHover}
                                    bordered={hasBorders}
                                    rowStyle={this.getRowStyle}
                                    rowEvents={rowEvents}
                                    caption={renderCaption ? renderCaption(title) : (
                                        <Caption
                                            title={title}
                                            hasOptions={hasOptions}
                                            onOptions={this.onOptions}
                                        />
                                    )}
                                    onTableChange={this.onRefresh}
                                    noDataIndication={isLoading ? renderLoadingIndication : noDataText}
                                    rowClasses={(row, i) => i % 2 === 0 ? 'odd' : 'even'}
                                    {...paginationTableProps}
                                />
                                {hasPagination && (
                                    <div className='row react-bootstrap-table-pagination'>
                                        <div className='col-md-6 col-xs-6 col-sm-6 col-lg-6'/>
                                        <div
                                            className='react-bootstrap-table-pagination-list col-md-6 col-xs-6 col-sm-6 col-lg-6'>
                                            <ul className='pagination react-bootstrap-table-page-btns-ul'>
                                                {pageButtonRenderer({
                                                    page: '<',
                                                    disabled: page === 1,
                                                    title: 'Previous page',
                                                    onPageChange: () => {
                                                        if (page > 1) {
                                                            paginationProps.onPageChange(page - 1)
                                                        }
                                                    }
                                                })}
                                                {map(
                                                    getDisplayedPageNumbers(paginationProps.paginationSize, page, size, totalCount),
                                                    n => (
                                                        pageButtonRenderer(n === '...' ?
                                                            { page: n, title: 'Other pages' } :
                                                            {
                                                                page: n,
                                                                active: page === n,
                                                                title: 'Page ' + n,
                                                                onPageChange: () => {
                                                                    if (n !== page) {
                                                                        paginationProps.onPageChange(n)
                                                                    }
                                                                }
                                                            })
                                                    )
                                                )}
                                                {pageButtonRenderer({
                                                    page: '>',
                                                    disabled: page === pageCount,
                                                    title: 'Next page',
                                                    onPageChange: () => {
                                                        if (page < pageCount) {
                                                            paginationProps.onPageChange(page + 1)
                                                        }
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                </PaginationProvider>
            </div>
        )
    }
}