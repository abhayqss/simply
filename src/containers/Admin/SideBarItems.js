import React from "react";

import {ReactComponent as List} from "images/list.svg";
import {ReactComponent as Persons} from "images/persons.svg";
import {ReactComponent as Clients} from "images/person-hierarhy.svg";
import {ReactComponent as SuggestedMatches} from "images/shape.svg";
import {ReactComponent as ManualMatching} from "images/pointer.svg";

const SIDE_BAR_ITEMS = [
    {
        section: {
            title: 'Administration',
            items: [
                {
                    title: 'Organizations',
                    href: '/admin/organizations',
                    hintText: 'Organization Listing',
                    renderIcon: (className) => <List className={className} />
                },
                {
                    title: 'Contacts',
                    href: '/admin/contacts',
                    hintText: 'Contact Listing',
                    renderIcon: (className) => <Persons className={className} />
                }
            ]
        }
    },
    /*{
        section: {
            title: 'PATIENTS MATCHING',
            items: [
                {
                    title: 'Suggested Matching',
                    href: '/admin/suggested-matches',
                    renderIcon: (className) => <SuggestedMatches className={className} />
                },
                {
                    title: 'Manual Matching',
                    href: '/admin/manual-matching',
                    renderIcon: (className) => <ManualMatching className={className} />
                }
            ]
        }
    }*/
]

export function getSideBarItems () {
    return SIDE_BAR_ITEMS
}