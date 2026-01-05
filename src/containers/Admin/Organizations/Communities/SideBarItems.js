import React from "react";

import {ReactComponent as Details} from "images/folder.svg";
import {ReactComponent as Handsets} from "images/mobile.svg";
import {ReactComponent as Location} from "images/location.svg";
import {ReactComponent as Zones} from "images/zone.svg";
import {ReactComponent as DeviceTypes} from "images/warning.svg";

export function getSideBarItems (params) {
    const {
        orgId,
        commId,
        handsetCount,
        locationCount,
        zoneCount,
        deviceTypeCount
    } = params

    const path = `/admin/organizations/${orgId}/communities/${commId}`

    return [
        {
            title: 'Details',
            href: path,
            hintText: 'Details',
            renderIcon: (className) => <Details className={className} />
        },
        {
            title: 'Handsets',
            extraText: handsetCount,
            href: `${path}/handsets`,
            hintText: 'Handsets',
            renderIcon: (className) => <Handsets className={className} />
        },
        {
            title: 'Locations',
            extraText: locationCount,
            href: `${path}/locations`,
            hintText: 'Locations',
            renderIcon: (className) => <Location className={className} />
        },
        {
            title: 'Zones',
            extraText: zoneCount,
            href: `${path}/zones`,
            hintText: 'Zones',
            renderIcon: (className) => <Zones className={className} />
        },
        {
            title: 'Device Types',
            extraText: deviceTypeCount,
            href: `${path}/device-types`,
            hintText: 'Device Types',
            renderIcon: (className) => <DeviceTypes className={className} />
        }
    ]
}