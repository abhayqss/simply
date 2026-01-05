import React, {Component, Fragment} from 'react'

import $ from 'jquery'
import 'jquery.scrollto'
import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    map,
    where,
    sortBy,
    filter,
    reject,
    compact,
    flatten,
    groupBy,
    findWhere
} from 'underscore'

import {
    Carousel,
    CarouselItem,
    CarouselIndicators
} from 'reactstrap'

import Highlighter from 'react-highlight-words'

import './InsuranceWizard.scss'

import Loader from '../Loader/Loader'

import {
    containsIgnoreCase
} from 'lib/utils/Utils'

import {ReactComponent as Checked} from 'images/ok.svg'

const DEFAULT_SCROLL_DURATION = 500

const CASH_OR_SELF_PAYMENT_NAME = 'CASH_OR_SELF_PAYMENT'

const STEP_TITLES = ['Carrier', 'Blue Cross Blue Shield (BCBS)', 'Payment Plan']

function InsuranceWizardTab ({ index, title, isActive, isChecked, onClick }) {
    return (
        <div
            className={cn(
                'InsuranceWizard-Tab',
                isActive && 'InsuranceWizard-Tab_active',
                isChecked && 'InsuranceWizard-Tab_checked'
            )}
            onClick={() => { onClick(index) }}>
            <div className='d-flex flex-row justify-content-start'>
                <div className='InsuranceWizard-TabTitle'>
                    {title}
                </div>
                {isChecked && <Checked className='InsuranceWizard-TabCheckedIcon' />}
            </div>
            <div className={cn(
                'InsuranceWizard-StepIndicator',
                isActive && 'InsuranceWizard-StepIndicator_active',
            )}/>
        </div>
    )
}

export default class InsuranceWizard extends Component {
    static propTypes = {
        step: PropTypes.number,
        data: PropTypes.object,

        searchText: PropTypes.string,
        minSearchTextLength: PropTypes.number,

        innerRef: PropTypes.object,
        maxHeight: PropTypes.number,

        loadingSteps: PropTypes.arrayOf(PropTypes.number),
        completedSteps: PropTypes.arrayOf(PropTypes.number),

        onChangeNetwork: PropTypes.func,
        onChangePaymentPlan: PropTypes.func,

        onChangeStep: PropTypes.func
    }

    static defaultProps = {
        step: 1,
        data: {},

        searchText: '',
        maxHeight: 300,
        minSearchTextLength: 1,

        loadingSteps: [],
        completedSteps: [],

        onChangeStep: () => {}
    }

    componentDidMount () {
        const { data } = this.props

        if (data.selectedNetworkId) {
            const $node = $(this.props.innerRef.current)
            let $target = $node.find(`#network-${data.selectedNetworkId}`)

            if (data.selectedPaymentPlanId) {
                $target = $node.find(`#network-${data.selectedNetworkId}-payment-plan-${data.selectedPaymentPlanId}`)
            }

            this.scroll($target)
        }
    }

    scroll (target, duration = DEFAULT_SCROLL_DURATION, opts) {
        const node = this.props.innerRef.current
        node && $(node).scrollTo(target, duration, opts)
    }

    render () {
        const {
            data,
            step,

            innerRef,
            maxHeight,

            searchText,
            minSearchTextLength,

            loadingSteps,
            completedSteps,

            onChangeNetwork,
            onChangePaymentPlan,

            onChangeStep
        } = this.props

        const selectedNetwork = findWhere(data.networks, {id: data.selectedNetworkId})

        const popularNetworks = where(data.networks, {isPopular: true})

        let networkPaymentPlans = selectedNetwork ? map(
            selectedNetwork.paymentPlans,
            o => ({ networkId: selectedNetwork.id, ...o })
        ) : []

        const popularPaymentPlans = where(networkPaymentPlans, {isPopular: true})

        const cashOrSelfPayment = findWhere(data.networks, { name: CASH_OR_SELF_PAYMENT_NAME })

        let networks = cashOrSelfPayment ? reject(
            data.networks, o => o.name === CASH_OR_SELF_PAYMENT_NAME
        ) : data.networks

        const shouldSearch = searchText && searchText.length >= minSearchTextLength

        const composed = shouldSearch ? filter([
            ...networks,
            ...flatten(
                map(
                    networks,
                    o => map(
                        o.paymentPlans,
                        p => ({ networkId: o.id, networkTitle: o.title, ...p })
                    )
                )
            )
        ], o => containsIgnoreCase(o.title, searchText)) : []

        return (
            <div
                ref={innerRef}
                style={{ maxHeight }}
                className='InsuranceWizardPopup'>
                <div className='InsuranceWizard'>
                    <div className='InsuranceWizard-PickerTitle'>
                        {reject(STEP_TITLES, (t, i) => !data.bcbs && i === 1)[step]}
                    </div>
                    <div className='InsuranceWizard-Tabs'>
                        <InsuranceWizardTab
                            index={0}
                            title='STEP 1: CHOOSE CARRIER'
                            isActive={step === 0}
                            isChecked={completedSteps.includes(0)}
                            onClick={onChangeStep}
                        />
                        <InsuranceWizardTab
                            index={1}
                            title='STEP 2: CHOOSE PLAN'
                            isActive={step === 1}
                            isChecked={completedSteps.includes(1)}
                            onClick={onChangeStep}
                        />
                    </div>
                    <div className='InsuranceWizard-Body'>
                        <Carousel activeIndex={step} next={onChangeStep} previous={onChangeStep}>
                            <CarouselIndicators
                                items={[{key: 1}, {key: 2}]}
                                activeIndex={step}
                                className='InsuranceWizard-Indicators'
                                onClickHandler={() => {}}
                            />
                            {compact([
                                <CarouselItem key='1' className='InsuranceWizard-Picker InsuranceWizard-NetworkPicker'>
                                    {shouldSearch ? (
                                        <>
                                            {map(sortBy(composed, 'title'), o => (
                                                <div
                                                    key={o.id + o.name}
                                                    className='InsuranceWizard-PickerItem'
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        if (o.networkId) onChangePaymentPlan(o)
                                                        else onChangeNetwork(o)
                                                    }}>
                                                    <Highlighter
                                                        highlightClassName='InsuranceWizard-Highlight'
                                                        searchWords={[searchText]}
                                                        textToHighlight={`${o.networkId ? `${o.networkTitle} - ${o.title}` : o.title}`}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {cashOrSelfPayment && (
                                                <div className='InsuranceWizard-PickerSection'>
                                                    <div
                                                        className='InsuranceWizard-PickerItem'
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            onChangeNetwork(cashOrSelfPayment)
                                                        }}>
                                                        Cash or self-payment
                                                    </div>
                                                </div>
                                            )}
                                            {popularNetworks.length > 0 && (
                                                <div className='InsuranceWizard-PickerSection'>
                                                    <div className='InsuranceWizard-PickerSectionTitle'>
                                                        Popular carriers
                                                    </div>
                                                    {map(popularNetworks, o => (
                                                        <div
                                                            key={o.id}
                                                            className='InsuranceWizard-PickerItem'
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                onChangeNetwork(o)
                                                            }}>
                                                            {o.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {networks && (
                                                <div className='InsuranceWizard-PickerSection'>
                                                    <div className='InsuranceWizard-PickerSectionTitle'>
                                                        All carriers
                                                    </div>
                                                    {map(
                                                        sortBy(
                                                            map(
                                                                groupBy(
                                                                    networks,
                                                                    o => o.title.charAt(0).toLowerCase()
                                                                ),
                                                                (group, key) => ({ group, key })
                                                            ),
                                                            'key'
                                                        ),
                                                        ({ key, group }) => (
                                                            <Fragment key={key}>
                                                                <div
                                                                    className='InsuranceWizard-PickerItem InsuranceWizard-NetworkGroupTitle'>
                                                                    {key.toUpperCase()}
                                                                </div>
                                                                {map(group, o => (
                                                                    <div
                                                                        key={o.id}
                                                                        id={`network-${o.id}`}
                                                                        className='InsuranceWizard-PickerItem'
                                                                        onClick={e => {
                                                                            e.stopPropagation()
                                                                            onChangeNetwork(o)
                                                                        }}>
                                                                        {o.title}
                                                                    </div>
                                                                ))}
                                                            </Fragment>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </CarouselItem>,
                                <CarouselItem key='2' className='InsuranceWizard-Picker InsuranceWizard-PaymentPlanPicker'>
                                    {loadingSteps.includes(1) ? (
                                        <Loader/>
                                    ) : (
                                        <>
                                            {popularPaymentPlans.length > 0 && (
                                                <div className='InsuranceWizard-PickerSection'>
                                                    <div className='InsuranceWizard-PickerSectionTitle'>
                                                        Popular plans
                                                    </div>
                                                    {map(popularPaymentPlans, o => (
                                                        <div
                                                            key={o.id}
                                                            className='InsuranceWizard-PickerItem'
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                onChangePaymentPlan(o)
                                                            }}>
                                                            {o.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {networkPaymentPlans && (
                                                <div className='InsuranceWizard-PickerSection'>
                                                    <div className='InsuranceWizard-PickerSectionTitle'>
                                                        All plans
                                                    </div>
                                                    {map(
                                                        sortBy(
                                                            map(
                                                                groupBy(
                                                                    networkPaymentPlans,
                                                                    o => o.title.charAt(0).toLowerCase()
                                                                ),
                                                                (group, key) => ({ group, key })
                                                            ),
                                                            'key'
                                                        ),
                                                        ({ key, group }) => (
                                                            <Fragment key={key}>
                                                                <div
                                                                    className='InsuranceWizard-PickerItem InsuranceWizard-NetworkGroupTitle'>
                                                                    {key.toUpperCase()}
                                                                </div>
                                                                {map(group, o => (
                                                                    <div
                                                                        key={o.id}
                                                                        id={`network-${o.networkId}-payment-plan-${o.id}`}
                                                                        className='InsuranceWizard-PickerItem'
                                                                        onClick={e => {
                                                                            e.stopPropagation()
                                                                            onChangePaymentPlan(o)
                                                                        }}>
                                                                        {o.title}
                                                                    </div>
                                                                ))}
                                                            </Fragment>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </>)}
                                </CarouselItem>
                            ])}
                        </Carousel>
                    </div>
                </div>
            </div>
        )
    }
}