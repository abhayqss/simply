import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'

import {Image} from 'react-bootstrap'

import {
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import Table from 'components/Table/Table'
import Avatar from 'components/Avatar/Avatar'

import Actions from 'components/Table/Actions/Actions'

import './ClientMatches.scss'

import {path} from 'lib/utils/ContextUtils'
import {DateUtils as DU} from 'lib/utils/Utils'

const {format, formats} = DU

const ACTION_ICON_SIZE = 36

const DATE_FORMAT = formats.americanMediumDate

export default class ClientMatches extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        onEdit: PropTypes.func
    }

    static defaultProps = {
        onEdit: () => {}
    }

    onEdit = (client) => {
        this.props.onEdit(client)
    }

    render () {
        const { data, isFetching } = this.props

        return (
            <div className='ClientMatches'>
                <Table
                    hasHover
                    keyField="id"
                    isLoading={isFetching}
                    className="ClientMatchList"
                    data={data}
                    columns={[
                        {
                            dataField: 'fullName',
                            text: 'Name',
                            headerStyle: {
                                width: '190px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            },
                            formatter: (v, row) => {
                                return (
                                    <div className="d-flex align-items-center">
                                        {row.avatarDataUrl ? (
                                            <Image
                                                src={row.avatarDataUrl}
                                                className={cn(
                                                    'ClientList-ClientAvatar',
                                                    !row.isActive && 'ClientList-ClientAvatar_black-white'
                                                )}
                                            />
                                        ) : (
                                            <Avatar
                                                name={v}
                                                {...!row.isActive && { nameColor: '#e0e0e0' }}
                                            />
                                        )}
                                        {row.canView ? (
                                            <>
                                                <Link
                                                    id={`client-${row.id}`}
                                                    to={path(`/clients/${row.id}`)}
                                                    className={cn('ClientList-ClientName', row.avatarDataUrl && 'margin-left-10')}>
                                                    {v}
                                                </Link>
                                                <Tooltip
                                                    placement="top"
                                                    target={`client-${row.id}`}>
                                                    View client details
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <span
                                                title={v}
                                                id={`client-${row.id}`}
                                                className='ClientList-ClientName'>
                                                    {v}
                                            </span>
                                        )}
                                    </div>
                                )
                            }
                        },
                        {
                            dataField: 'gender',
                            text: 'Gender',
                            headerStyle: {
                                width: '101px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            }
                        },
                        {
                            dataField: 'birthDate',
                            text: 'Birthday',
                            headerStyle: {
                                width: '107px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            },
                            formatter: v => v && format(v, DATE_FORMAT),
                        },
                        {
                            dataField: 'ssnLastFourDigits',
                            text: 'SSN',
                            headerAlign:'right',
                            align:'right',
                            headerStyle: {
                                width: '130px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            },
                            formatter: v => v && `###-##-${v}`
                        },
                        {
                            dataField: 'events',
                            text: 'Events',
                            align:'right',
                            headerStyle: {
                                width: '98px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            }
                        },
                        {
                            dataField: 'community',
                            text: 'Community',
                            headerStyle: {
                                width: '205px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            }
                        },
                        {
                            dataField: 'createdDate',
                            text: 'Created',
                            headerStyle: {
                                width: '105px',
                            },
                            style: (cell, row) => !row.isActive && {
                                opacity: '0.5'
                            },
                            formatter: v => v && format(v, DATE_FORMAT)
                        },
                        {
                            dataField: '',
                            text: '',
                            headerStyle: {
                                width: '150px',
                            },
                            align: 'right',
                            formatter: (v, row) => {
                                return (
                                    <Actions
                                        data={row}
                                        hasEditAction={row.canEdit}
                                        iconSize={ACTION_ICON_SIZE}
                                        editHintMessage="Edit client details"
                                        onEdit={this.onEdit}
                                    />
                                )
                            }
                        }
                    ]}
                    onRefresh={this.onRefresh}
                />
            </div>
        )
    }
}