import  React, {Component} from 'react'

import cn from 'classnames'
import {map, contains} from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {
    Row,
    Col,
    Badge,
    Button,
    Collapse,
} from 'reactstrap'

import './Documents.scss'

import Table from 'components/Table/Table'
import Detail from 'components/Detail/Detail'
import Actions from 'components/Table/Actions/Actions'
import TextField from 'components/Form/TextField/TextField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import SelectField from 'components/Form/SelectField/SelectField'

import DocumentEditor from "../../Clients/Documents/DocumentEditor/DocumentEditor"

import {getSideBarItems} from '../../SideBarItems'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'
import * as clientDocumentListActions from 'redux/client/document/list/clientDocumentListActions'
import * as clientDeleteDocumentActions from 'redux/client/document/delete/deleteClientDocumentActions'
import * as clientDocumentDetailsActions from 'redux/client/document/details/clientDocumentDetailsActions'

import {PAGINATION} from 'lib/Constants'

import {ReactComponent as Filter} from 'images/filters.svg'
import {ReactComponent as PdfTypeIcon} from 'images/pdf.svg'
import {ReactComponent as XmlTypeIcon} from 'images/xml.svg'
import {ReactComponent as PngTypeIcon} from 'images/png.svg'

import {isEmpty} from 'lib/utils/Utils'

import {clientDocumentsTitleType} from 'lib/mock/MockData'

const DOCUMENT_TYPE_ICONS = {
    'PDF': PdfTypeIcon,
    'XML': XmlTypeIcon,
    'PNG': PngTypeIcon
}

const DOCUMENT_TYPES = ['CCD','FACESHEET']

const {FIRST_PAGE} = PAGINATION

const ICON_SIZE = 36;

const USER_ID = 1106

function getDocumentExtension (title) {
    return title.split('/')[1].toUpperCase()
}

function mapStateToProps (state) {
    const {list, _delete, count} = state.client.document

    return {
        error: list.error,
        isFetching: list.isFetching,
        dataSource: list.dataSource,
        shouldReload: list.shouldReload,

        delete: _delete,

        client: state.client,

        count: count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(clientDocumentListActions, dispatch),

            delete: bindActionCreators(clientDeleteDocumentActions, dispatch),
            details: bindActionCreators(clientDocumentDetailsActions, dispatch),

            sidebar: bindActionCreators(sideBarActions, dispatch),
            client: {
                details: bindActionCreators(clientDetailsActions, dispatch),
            }
        }
    }
}

class Documents extends Component {

    state = {
        selected: null,
        isFilterOpen: true,
        isEditorOpen: false,
    }

    componentDidMount () {
        const { state } = this.props.location

        this.refresh()
        this.updateClientDetails()
        this.updateSideBar()

        if (state) {
            this.setState({ isEditorOpen: state.isEditorOpen })
        }
    }

    componentDidUpdate () {
        const {
            client,
        } = this.props

        if (this.props.shouldReload) {
            this.refresh()
        }

        if (client.details.shouldReload
            && isEmpty(client.details.data)) {
            this.updateClientDetails(true)
        }
    }

    onRefresh = (page) => {
        this.refresh(page)
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter({[name]: value})
    }

    onUploadDocument = () => {
        this.setState({ isEditorOpen: true })
    }

    onDownloadDocument = (document) => {
        const {actions, match} = this.props

        actions.details.load(document.id, match.params.clientId, USER_ID)
    }

    onDeleteDocument = (document) => {
        const {actions, match} = this.props

        actions.delete.deleteDocument(document.id, match.params.clientId, USER_ID)
    }

    onCloseDocumentEditor = () => {
        this.setState({
            selected: null,
            isEditorOpen: false
        })
    }

    onToggleFilter = () => {
        this.setState(s => ({ isFilterOpen: !s.isFilterOpen }))
    }

    onClearFilter = () => {
        this.props.actions.clearFilter()
    }

    onApplyFilter = () => {
        this.refresh()
    }

    update (isReload, page) {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(ds.data))) {

            const { match, actions } = this.props

            const { clientId } = match.params

            const { page: p, size } = ds.pagination

            actions.load({
                userId: USER_ID,
                clientId,
                size,
                page: page || p,
                ...ds.filter.toJS(),
            })
        }
    }

    updateClientDetails (isReload) {
        const {
            match,
            client
        } = this.props

        const {
            clientId
        } = match.params

        const {
            data,
            isFetching,
            shouldReload
        } = client

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(data))) {
            this
                .props
                .actions
                .client
                .details
                .load(clientId)
        }
    }

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear () {
        this.props.actions.clear()
    }

    changeFilter (changes, shouldReload) {
        this.props
            .actions
            .changeFilter(changes, shouldReload)
    }

    updateSideBar () {
        const {
            clientId
        } = this.props.match.params

        this
            .props
            .actions
            .sidebar
            .update({
                isHidden: false,
                items: getSideBarItems({ clientId })
            })
    }

    render () {
        const {
            match,
            className
        } = this.props;

        const {
            clientId
        } = match.params

        const {
            isFilterOpen,
            isEditorOpen,
        } = this.state;

        const {
            client,
            isFetching,
            dataSource: ds
        } = this.props;

        const {
            fullName
        } = client.data || {}

        return (
            <div className={cn('Documents', className)}>
                <Breadcrumbs items={[
                    {title: 'Client', href: '/clients'},
                    {title: fullName || 'Denise Weber', href: `/clients/${clientId || 1}`},
                    {title: 'Documents', href: `/clients/${clientId || 1}/documents`, isActive: true},
                ]}/>
                <Table
                    hasHover
                    hasOptions
                    hasPagination
                    keyField="id"
                    title="Documents"
                    isLoading={isFetching}
                    noDataText="No documents"
                    className="DocumentList"
                    containerClass="DocumentListContainer"
                    data={ds.data}
                    pagination={ds.pagination}
                    columns={[
                        {
                            dataField: 'title',
                            text: 'Title',
                            sort: true,
                            style: {
                                padding: '0 0 0 16px'
                            },
                            formatter: (v, row) => {
                                const TypeIcon = DOCUMENT_TYPE_ICONS[getDocumentExtension(row.mimeType)] || PdfTypeIcon

                                return (
                                    <div className="d-flex">
                                        <TypeIcon
                                            className="DocumentList-DocTitleIcon"
                                        />
                                        <div
                                            className="DocumentList-DocTitleText"
                                            style={
                                                v.includes(DOCUMENT_TYPES[0])
                                                    ? {background: "#d5f3b8"}
                                                    : {}
                                            }>
                                            {v}
                                        </div>
                                    </div>
                                )
                            },
                        },
                        {
                            dataField: 'type',
                            text: 'Type',
                            sort: true,
                        },
                        {
                            dataField: 'size',
                            text: 'Size',
                            headerStyle: {
                                width: '120px',
                            },
                        },
                        {
                            dataField: 'creationTime',
                            text: 'Created',
                            headerStyle: {
                                width: '110px',
                            },
                        },
                        {
                            dataField: 'authorPerson',
                            text: 'Author',
                        },
                        {
                            dataField: 'sharedWith',
                            text: 'Shared With',
                        },
                        {
                            dataField: '',
                            text: '',
                            headerStyle: {
                                width: '200px',
                            },
                            formatter: (v, row) => {
                                return (
                                    <div className="DocumentList-Actions">
                                        <Actions
                                            data={row}
                                            hasInfoAction={true}
                                            hasDeleteAction={!contains(DOCUMENT_TYPES, row.type)}
                                            hasDownloadAction={true}
                                            iconSize={ICON_SIZE}
                                            infoHintClassName="DocumentList-InfoHint"
                                            deleteHintMessage="Delete document"
                                            downloadHintMessage="Download document"
                                            onDelete={this.onDeleteDocument}
                                            onDownload={this.onDownloadDocument}
                                            renderInfoHint={() => (
                                                <div>
                                                    <Detail
                                                        className="DocumentList-DocDetail"
                                                        title="ORGANIZATION NAME">
                                                        {row.dataSource}
                                                    </Detail>
                                                    <Detail
                                                        className="DocumentList-DocDetail"
                                                        title="ORGANIZATION OID">
                                                        {row.dataSourceOid}
                                                    </Detail>
                                                    <Detail
                                                        className="DocumentList-DocDetail"
                                                        title="COMMUNITY NAME">
                                                        {row.community}
                                                    </Detail>
                                                    <Detail
                                                        className="DocumentList-DocDetail"
                                                        title="COMMUNITY OID">
                                                        {row.communityOid}
                                                    </Detail>
                                                </div>
                                            )}
                                        />
                                    </div>
                                )
                            },
                        },
                    ]}
                    renderCaption={title => {
                        return (
                            <>
                                <div className="DocumentList-Caption">
                                    <div className="flex-2">
                                        <div className="DocumentList-Title Table-Title">
                                            {title}
                                            <Badge color="warning" className="DocumentList-DocCount">
                                                {ds.pagination.totalCount}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex-4 text-right">
                                        <Filter
                                            className={cn(
                                                'Documents-FilterBtn',
                                                isFilterOpen
                                                    ? 'Documents-FilterExpanded'
                                                    : 'Documents-FilterCollapsed',
                                            )}
                                            onClick={this.onToggleFilter}
                                        />
                                        <Button
                                            color='success'
                                            className="UploadDocumentBtn"
                                            onClick={this.onUploadDocument}>
                                            Upload Document
                                        </Button>
                                    </div>
                                </div>
                                <Collapse isOpen={isFilterOpen}>
                                    <div className="DocumentList-Filter">
                                        <Row>
                                            <Col md={6}>
                                                <TextField
                                                    type="text"
                                                    name="name"
                                                    value={ds.filter.name}
                                                    label="Search"
                                                    className="margin-bottom-16"
                                                    onChange={this.onChangeFilterField}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Row>
                                                    <Col md={6}>
                                                        <SelectField
                                                            name="typeId"
                                                            value={ds.filter.typeId}
                                                            options={map(clientDocumentsTitleType, ({ id, type }) => ({
                                                                text: type, value: id
                                                            }))}
                                                            label="Document type"
                                                            defaultText="Select"
                                                            isMultiple={false}
                                                            onChange={this.onChangeFilterField}
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button
                                                            outline
                                                            color='success'
                                                            onClick={this.onClearFilter}>
                                                            Clear
                                                        </Button>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button
                                                            color='success'
                                                            onClick={this.onApplyFilter}>
                                                            Apply
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </Collapse>
                            </>
                        )
                    }}
                    onRefresh={this.onRefresh}
                />
                <DocumentEditor
                    isOpen={isEditorOpen}
                    onClose={this.onCloseDocumentEditor}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents)