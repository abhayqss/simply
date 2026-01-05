import BaseService from './BaseService'

class DirectoryService extends BaseService {
    findStates () {
        return super.request({
            url: '/directory/states',
        })
    }

    findGenders () {
        return super.request({
            url: '/directory/genders',
        })
    }

    findMaritalStatus () {
        return super.request({
            url: '/directory/marital-status',
        })
    }

    findPrimaryFocuses () {
        return super.request({
            url: '/directory/primary-focuses',
        })
    }

    findAgeGroups () {
        return super.request({
            url: '/directory/accepted-age-groups',
        })
    }

    findCareLevels () {
        return super.request({
            url: '/directory/care-levels',
        })
    }

    findCommunityTypes (primaryFocusIds = []) {
        return super.request({
            url: '/directory/community-types',
            params: { primaryFocusIds }
        })
    }

    findOrganizationTypes () {
        return super.request({
            url: '/directory/organization-type',
        })
    }

    findEmergencyServices () {
        return super.request({
            url: '/directory/emergency-services',
        })
    }

    findAdditionalServices () {
        return super.request({
            url: '/directory/additional-services',
        })
    }

    findLanguageServices () {
        return super.request({
            url: '/directory/language-services',
        })
    }

    findTreatmentServices (primaryFocusIds = []) {
        return super.request({
            url: '/directory/services-treatment-approaches',
            params: { primaryFocusIds }
        })
    }

    // todo unused
    findServices (primaryFocusIds) {
        return super.request({
            /*On backend , it have this url*/
            url: '/directory/services-treatment-approaches',
            params: { primaryFocusIds }
        })
    }

    findInsuranceNetworks (params) {
        return super.request({
            url: '/directory/insurance/networks',
            params
        })
    }

    findInsurancePaymentPlans (params) {
        return super.request({
            url: '/directory/insurance/payment-plans',
            params
        })
    }

    findOrganizations () {
        return super.request({
            url: '/authorized-directory/organizations',
        })
    }

    findCommunities (params) {
        return super.request({
            url: '/authorized-directory/communities',
            params
        })
    }

    findDomains () {
        return super.request({
            url: '/directory/service-plan-domains',
        })
    }

    findPriorities () {
        return super.request({
            url: '/directory/service-plan-priorities',
        })
    }

    findSystemRoles ({ isEditable = false } = {}) {
        return super.request({
            url: isEditable ?
                '/authorized-directory/editable-system-roles'
                : '/directory/system-roles',
        })
    }

    findContactStatuses () {
        return super.request({
            url: '/directory/employee-statuses',
        })
    }

    findClientStatuses () {
        return super.request({
            url: '/directory/client-statuses'
        })
    }

    findCareTeamEmployees ({ clientId, communityId }) {
        return super.request({
            url: '/directory/contacts',
            params: { clientId, communityId }
        })
    }

    findCareTeamRoles () {
        return super.request({
            url: '/care-team-members/roles',
        })
    }

    findCareTeamChannels () {
        return super.request({
            url: '/directory/notification-types',
        })
    }

    findCareTeamResponsibilities () {
        return super.request({
            url: '/directory/responsibilities',
        })
    }

    //todo the correct url is /directory/note-subtypes
    findNoteTypes () {
        return super.request({
            url: '/directory/note-types',
        })
    }

    //todo the correct url is /directory/encounter-note-types
    findNoteEncounterTypes () {
        return super.request({
            url: '/directory/encounter-note-type',
        })
    }

    //todo this is not directory controller
    findNoteAdmittanceDates (clientId) {
        return super.request({
            url: '/clients/' + clientId + '/notes/admit-dates',
        })
    }

    //todo the correct url is /directory/event-types
    findEventTypes () {
        return super.request({
            url: '/events/event-types',
        })
    }

    findMarketplaceCommunityLocations () {
        return super.request({
            url: '/directory/marketplace/community-locations',
        })
    }

    findAssessmentSurvey (params) {
        return super.request({
            url: '/authorized-directory/assessment-survey',
            params
        })
    }

    findAssessmentTypes (params) {
        return super.request({
            url: `/authorized-directory/assessment-types`,
            params
        })
    }

    getAssessmentManagement (params) {
        return super.request({
            url: '/authorized-directory/assessment-management',
            params
        })
    }

    getAssessmentScore (params) {
        return super.request({
            url: '/authorized-directory/assessment-score',
            params
        })
    }

    findReportGroups () {
        return super.request({
            url: '/directory/report-groups'
        })
    }

    findReportTypes () {
        return super.request({
            url: '/directory/report-types'
        })
    }
}

const service = new DirectoryService()

export default service