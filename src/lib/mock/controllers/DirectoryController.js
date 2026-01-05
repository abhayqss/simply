import * as mock from '../MockData'
import Controller from './Controller'

class DirectoryController extends Controller {
    getPath () {
        return '/directory'
    }

    getHandlers () {
        return [
            {
                path: '/primary-focuses',
                handler: () => {
                    return mock.getPrimaryFocuses()
                }
            },
            {
                path: '/insurance-networks',
                handler: (vars, params) => {
                    return mock.getInsuranceNetworks({...vars, ...params})
                }
            },
            {
                path: '/insurance-payment-plans',
                handler: (vars, params) => {
                    return mock.getInsurancePaymentPlans({...vars, ...params})
                }
            },
            {
                path: '/states',
                handler: (vars, params) => {
                    return mock.getStates({...vars, ...params})
                }
            },
            /*{
                path: '/primary-focuses',
                handler: (vars, params) => {
                    return mock.getPrimaryFocuses({...vars, ...params})
                }
            },*/
            /*{
                path: '/care-levels',
                handler: (vars, params) => {
                    return mock.getCareLevels({...vars, ...params})
                }
            },*/
            {
                path: '/community-types',
                handler: (vars, params) => {
                    return mock.getCommunityType({...vars, ...params})
                }
            },
            {
                path: '/organization-types',
                handler: (vars, params) => {
                    return mock.getOrganizationType({...vars, ...params})
                }
            },
            {
                path: '/emergency-services',
                handler: (vars, params) => {
                    return mock.getEmegencyServices({...vars, ...params})
                }
            },
            {
                path: '/ancillary-services',
                handler: (vars, params) => {
                    return mock.getAdditionalServices({...vars, ...params})
                }
            },
            {
                path: '/languages-services',
                handler: (vars, params) => {
                    return mock.getLanguageServices({...vars, ...params})
                }
            },
            /*{
                path: '/services-treatment-approaches',
                handler: (vars, params) => {
                    return mock.getServiceTreatmentApproaches({...vars, ...params})
                }
            },*/
            {
                path: '/domains',
                handler: (vars, params) => {
                    return mock.getDomains({...vars, ...params})
                }
            },
            {
                path: '/priorities',
                handler: (vars, params) => {
                    return mock.getPriorities({...vars, ...params})
                }
            },
            {
                path: '/system-roles',
                handler: (vars, params) => {
                    return mock.getSystemRoles({...vars, ...params})
                }
            },
            {
                path: '/care-team-channels',
                handler: (vars, params) => {
                    return mock.getCareTeamChannels({...vars, ...params})
                }
            },
            {
                path: '/care-team-responsibilities',
                handler: (vars, params) => {
                    return mock.getCareTeamResponsibilities({...vars, ...params})
                }
            },
            {
                path: '/note-subtype',
                handler: (vars, params) => {
                    return mock.getNoteTypes({...vars, ...params})
                }
            },
            {
                path: '/encounter-note-type',
                handler: (vars, params) => {
                    return mock.getNoteEncounterTypes({...vars, ...params})
                }
            },
            {
                path: '/events/event-types',
                handler: (vars, params) => {
                    return mock.getEventTypes({...vars, ...params})
                }
            },
        ]
    }
}

export default new DirectoryController()