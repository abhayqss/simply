import React from "react";

import {ReactComponent as Events} from "images/client-events.svg"
import {ReactComponent as CCDDetails} from "images/ccd-details.svg"
import {ReactComponent as Details} from "images/client-details.svg"
import {ReactComponent as Assessments} from "images/assessments.svg"
import {ReactComponent as Documents} from "images/document-list.svg"
import {ReactComponent as ServicePlans} from "images/service-plans.svg"

export function getSideBarItems (params) {
    const {
        clientId,
        eventCount,
        assessmentCount,
        documentCount,
        servicePlanCount,
    } = params

    const path = `/clients/${clientId}`

    return [
        {
            title: 'Dashboard',
            href: path,
            hintText: 'Dashboard',
            renderIcon: (className) => <Details className={className} />
        },
        /*{
            title: 'Care Team',
            href: `${path}/care-team`,
            hintText: 'Care Team Listing',
            renderIcon: (className) => <Details className={className} />
        },
        {
            title: 'Events & Notes',
            extraText: eventCount,
            href: `${path}/events`,
            hintText: 'Event and Note Listing',
            renderIcon: (className) => <Events className={className} />
        },*/
        /*{
            title: 'CCD',
            href: `${path}/ccd-details`,
            hintText: 'CCD',
            renderIcon: (className) => <CCDDetails className={className} />
        },
        {
            title: 'Documents',
            extraText: documentCount,
            href: `${path}/documents`,
            hintText: 'Document Listing',
            renderIcon: (className) => <Documents className={className} />
        },*/
        {
            title: 'Assessments',
            extraText: assessmentCount,
            href: `${path}/assessments`,
            hintText: 'Assessment Listing',
            renderIcon: (className) => <Assessments className={className} />
        },
        {
            title: 'Service Plans',
            extraText: servicePlanCount,
            href: `${path}/service-plans`,
            hintText: 'Service Plan Listing',
            renderIcon: (className) => <ServicePlans className={className} />
        }
    ]
}