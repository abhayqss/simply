const FIELDS = [
    {
        title: 'Notification Preferences',
        fields: [
            {name: 'allEvents', title: 'All Events'}
        ]
    },
    {
        title: 'Emergency',
        fields: [
            {name: 'accidentRequiringTreatment', title: 'Accident requiring treatment'},
            {name: 'eRVisit', title: 'ER Visit'},
            {name: 'medicalEmergency', title: 'Medical emergency'}
        ]
    },
    {
        title: 'Changing Health Conditions',
        fields: [
            {name: 'assessmentRiskIdentified', title: 'Assessment Risk Identified'},
            {name: 'biometricAlert', title: 'Biometric alert'},
            {name: 'encounterADT', title: 'Encounter-ADT'},
            {name: 'generalChangeInFunctioning', title: 'General change in functioning'},
            {name: 'hospitalization', title: 'Hospitalization'},
            {name: 'remoteMonitoringAlert', title: 'Remote monitoring alert'},
            {name: 'seriousInjury', title: 'Serious injury'},
            {name: 'unexpectedSeriousIllness', title: 'Unexpected serious illness'},
        ]
    },
    {
        title: 'Medications Alerts & Reactions',
        fields: [
            {name: 'adverseReactionToMedication', title: 'Advertise Reaction to Medication'},
            {name: 'medicationAlert', title: 'Medication Alert'},
            {name: 'medicationChange', title: 'Medication Change'},
            {name: 'medicationErrors', title: 'Medication Errors'},
            {name: 'medicationNonCompliance', title: 'Medication non-compliance'},
        ]
    },
    {
        title: 'Behavior / Mental Health',
        fields: [
            {name: 'changeInBehavior', title: 'Change in behavior'},
            {name: 'demonstratingSignsOfDepression', title: 'Demonstrating signs of depression'},
            {name: 'mentalHealthRiskIdentified', title: 'Mental Health Risk Identified'},
            {name: 'physicalAggressionTowardAnotherResulting', title: 'Physical aggression toward another resulting in pain, injury or emotional distress'},
        ]
    },
    {
        title: 'Notes',
        fields: [
            {name: 'addingNote', title: 'Adding a note'},
            {name: 'editingNote', title: 'Editing a note'},
        ]
    },
    {
        title: 'General / Life / Assessment',
        fields: [
            {name: 'circumstancesInvolvingLawEnforcement', title: 'Circumstances involving law enforecement agency, fire department related to the health, safety or supervision of an individual'},
            {name: 'experiencedBarrierToService', title: 'Experienced Barrier to Service (ie - lack of transportation)'},
            {name: 'relocationOfServices', title: 'Fire or event that requires relocation of services for more than 24 hours'},
            {name: 'lifeEvents', title: 'Life Events (ie - change in quardianship, started a new job)'},
            {name: 'patientRecordUpdate', title: 'Patient record update'},
        ]
    },
    {
        title: 'Abuse / Safety',
        fields: [
            {name: 'sexualActivityInvolvingForce', title: 'Sexual activity involving force/coercion'},
            {name: 'suspectedAbuse', title: 'Suspected abuse'},
            {name: 'suspectedExploitation', title: 'Suspected exploitation of a vulnerable adult'},
        ]
    },
]

export default FIELDS