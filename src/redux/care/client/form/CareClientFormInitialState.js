const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: true,
    isFetching: false,
    fields: new Record({
        id: null,

        contactName: '',
        contactNameHasError: false,
        contactNameErrorText: '',

        role: '',
        roleHasError: false,
        roleErrorText: '',

        description: '',
        descriptionHasError: false,
        descriptionErrorText: '',

        includeDocument: false,
        includeDocumentHasError: false,
        includeDocumentErrorText: '',

        allEventsResponsibility: '',
        allEventsResponsibilityHasError: false,
        allEventsResponsibilityErrorText: '',

        allEventsChannel: '',
        allEventsChannelHasError: false,
        allEventsChannelErrorText: '',

        accidentRequiringTreatmentResponsibility: '',
        accidentRequiringTreatmentResponsibilityHasError: false,
        accidentRequiringTreatmentResponsibilityErrorText: '',

        accidentRequiringTreatmentChannel: '',
        accidentRequiringTreatmentChannelHasError: false,
        accidentRequiringTreatmentChannelErrorText: '',

        eRVisitResponsibility: '',
        eRVisitResponsibilityHasError: false,
        eRVisitResponsibilityErrorText: '',

        eRVisitChannel: '',
        eRVisitChannelHasError: false,
        eRVisitChannelErrorText: '',

        medicalEmergencyResponsibility: '',
        medicalEmergencyResponsibilityHasError: false,
        medicalEmergencyResponsibilityErrorText: '',

        medicalEmergencyChannel: '',
        medicalEmergencyChannelHasError: false,
        medicalEmergencyChannelErrorText: '',

        assessmentRiskIdentifiedResponsibility: '',
        assessmentRiskIdentifiedResponsibilityHasError: false,
        assessmentRiskIdentifiedResponsibilityErrorText: '',

        assessmentRiskIdentifiedChannel: '',
        assessmentRiskIdentifiedChannelHasError: false,
        assessmentRiskIdentifiedChannelErrorText: '',

        biometricAlertResponsibility: '',
        biometricAlertResponsibilityHasError: false,
        biometricAlertResponsibilityErrorText: '',

        biometricAlertChannel: '',
        biometricAlertChannelHasError: false,
        biometricAlertChannelErrorText: '',

        encounterADTResponsibility: '',
        encounterADTResponsibilityHasError: false,
        encounterADTResponsibilityErrorText: '',

        encounterADTChannel: '',
        encounterADTChannelHasError: false,
        encounterADTChannelErrorText: '',

        generalChangeInFunctioningResponsibility: '',
        generalChangeInFunctioningResponsibilityHasError: false,
        generalChangeInFunctioningResponsibilityErrorText: '',

        generalChangeInFunctioningChannel: '',
        generalChangeInFunctioningChannelHasError: false,
        generalChangeInFunctioningChannelErrorText: '',

        hospitalizationResponsibility: '',
        hospitalizationResponsibilityHasError: false,
        hospitalizationResponsibilityErrorText: '',

        hospitalizationChannel: '',
        hospitalizationChannelHasError: false,
        hospitalizationChannelErrorText: '',

        remoteMonitoringAlertResponsibility: '',
        remoteMonitoringAlertResponsibilityHasError: false,
        remoteMonitoringAlertResponsibilityErrorText: '',

        remoteMonitoringAlertChannel: '',
        remoteMonitoringAlertChannelHasError: false,
        remoteMonitoringAlertChannelErrorText: '',

        seriousInjuryResponsibility: '',
        seriousInjuryResponsibilityHasError: false,
        seriousInjuryResponsibilityErrorText: '',

        seriousInjuryChannel: '',
        seriousInjuryChannelHasError: false,
        seriousInjuryChannelErrorText: '',

        unexpectedSeriousIllnessResponsibility: '',
        unexpectedSeriousIllnessResponsibilityHasError: false,
        unexpectedSeriousIllnessResponsibilityErrorText: '',

        unexpectedSeriousIllnessChannel: '',
        unexpectedSeriousIllnessChannelHasError: false,
        unexpectedSeriousIllnessChannelErrorText: '',

        adverseReactionToMedicationResponsibility: '',
        adverseReactionToMedicationResponsibilityHasError: false,
        adverseReactionToMedicationResponsibilityErrorText: '',

        adverseReactionToMedicationChannel: '',
        adverseReactionToMedicationChannelHasError: false,
        adverseReactionToMedicationChannelErrorText: '',

        medicationAlertResponsibility: '',
        medicationAlertResponsibilityHasError: false,
        medicationAlertResponsibilityErrorText: '',

        medicationAlertChannel: '',
        medicationAlertChannelHasError: false,
        medicationAlertChannelErrorText: '',

        medicationChangeResponsibility: '',
        medicationChangeResponsibilityHasError: false,
        medicationChangeResponsibilityErrorText: '',

        medicationChangeChannel: '',
        medicationChangeChannelHasError: false,
        medicationChangeChannelErrorText: '',

        medicationErrorsResponsibility: '',
        medicationErrorsResponsibilityHasError: false,
        medicationErrorsResponsibilityErrorText: '',

        medicationErrorsChannel: '',
        medicationErrorsChannelHasError: false,
        medicationErrorsChannelErrorText: '',

        medicationNonComplianceResponsibility: '',
        medicationNonComplianceResponsibilityHasError: false,
        medicationNonComplianceResponsibilityErrorText: '',

        medicationNonComplianceChannel: '',
        medicationNonComplianceChannelHasError: false,
        medicationNonComplianceChannelErrorText: '',

        changeInBehaviorResponsibility: '',
        changeInBehaviorResponsibilityHasError: false,
        changeInBehaviorResponsibilityErrorText: '',

        changeInBehaviorChannel: '',
        changeInBehaviorChannelHasError: false,
        changeInBehaviorChannelErrorText: '',

        demonstratingSignsOfDepressionResponsibility: '',
        demonstratingSignsOfDepressionResponsibilityHasError: false,
        demonstratingSignsOfDepressionResponsibilityErrorText: '',

        demonstratingSignsOfDepressionChannel: '',
        demonstratingSignsOfDepressionChannelHasError: false,
        demonstratingSignsOfDepressionChannelErrorText: '',

        mentalHealthRiskIdentifiedResponsibility: '',
        mentalHealthRiskIdentifiedResponsibilityHasError: false,
        mentalHealthRiskIdentifiedResponsibilityErrorText: '',

        mentalHealthRiskIdentifiedChannel: '',
        mentalHealthRiskIdentifiedChannelHasError: false,
        mentalHealthRiskIdentifiedChannelErrorText: '',

        physicalAggressionTowardAnotherResultingResponsibility: '',
        physicalAggressionTowardAnotherResultingResponsibilityHasError: false,
        physicalAggressionTowardAnotherResultingResponsibilityErrorText: '',

        physicalAggressionTowardAnotherResultingChannel: '',
        physicalAggressionTowardAnotherResultingChannelHasError: false,
        physicalAggressionTowardAnotherResultingChannelErrorText: '',

        addingNoteResponsibility: '',
        addingNoteResponsibilityHasError: false,
        addingNoteResponsibilityErrorText: '',

        addingNoteChannel: '',
        addingNoteChannelHasError: false,
        addingNoteChannelErrorText: '',

        editingNoteResponsibility: '',
        editingNoteResponsibilityHasError: false,
        editingNoteResponsibilityErrorText: '',

        editingNoteChannel: '',
        editingNoteChannelHasError: false,
        editingNoteChannelErrorText: '',

        circumstancesInvolvingLawEnforcementResponsibility: '',
        circumstancesInvolvingLawEnforcementResponsibilityHasError: false,
        circumstancesInvolvingLawEnforcementResponsibilityErrorText: '',

        circumstancesInvolvingLawEnforcementChannel: '',
        circumstancesInvolvingLawEnforcementChannelHasError: false,
        circumstancesInvolvingLawEnforcementChannelErrorText: '',

        experiencedBarrierToServiceResponsibility: '',
        experiencedBarrierToServiceResponsibilityHasError: false,
        experiencedBarrierToServiceResponsibilityErrorText: '',

        experiencedBarrierToServiceChannel: '',
        experiencedBarrierToServiceChannelHasError: false,
        experiencedBarrierToServiceChannelErrorText: '',

        relocationOfServicesResponsibility: '',
        relocationOfServicesResponsibilityHasError: false,
        relocationOfServicesResponsibilityErrorText: '',

        relocationOfServicesChannel: '',
        relocationOfServicesChannelHasError: false,
        relocationOfServicesChannelErrorText: '',

        lifeEventsResponsibility: '',
        lifeEventsResponsibilityHasError: false,
        lifeEventsResponsibilityErrorText: '',

        lifeEventsChannel: '',
        lifeEventsChannelHasError: false,
        lifeEventsChannelErrorText: '',

        patientRecordUpdateResponsibility: '',
        patientRecordUpdateResponsibilityHasError: false,
        patientRecordUpdateResponsibilityErrorText: '',

        patientRecordUpdateChannel: '',
        patientRecordUpdateChannelHasError: false,
        patientRecordUpdateChannelErrorText: '',

        sexualActivityInvolvingForceResponsibility: '',
        sexualActivityInvolvingForceResponsibilityHasError: false,
        sexualActivityInvolvingForceResponsibilityErrorText: '',

        sexualActivityInvolvingForceChannel: '',
        sexualActivityInvolvingForceChannelHasError: false,
        sexualActivityInvolvingForceChannelErrorText: '',

        suspectedAbuseResponsibility: '',
        suspectedAbuseResponsibilityHasError: false,
        suspectedAbuseResponsibilityErrorText: '',

        suspectedAbuseChannel: '',
        suspectedAbuseChannelHasError: false,
        suspectedAbuseChannelErrorText: '',

        suspectedExploitationResponsibility: '',
        suspectedExploitationResponsibilityHasError: false,
        suspectedExploitationResponsibilityErrorText: '',

        suspectedExploitationChannel: '',
        suspectedExploitationChannelHasError: false,
        suspectedExploitationChannelErrorText: '',
    })()
})