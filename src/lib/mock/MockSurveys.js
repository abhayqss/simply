export const comprehensive = {
    "pages": [
        {
            "name": "Guide",
            "tabKey": 0,
            "elements": [
                {
                    "type": "html",
                    "name": "No completion instructions1",
                    "html": "<p class=\"guide__no-instruction-text\">The SeniorConnect assessment tool is a vehicle to explore, discover, document, understand and address the social determinants of health (SDOH) that can impact a senior’s chronic condition and, if left unchecked or unmanaged, could worsen and escalate their status from merely chronic to frail or complex.</p><p class=\"guide__no-instruction-text\">The focus of SeniorConnect as a program is to help seniors engage in managing their own chronic conditions and ideally stabilize or slow the progression of their condition. As a service coordinator, you play an essential and important role in this engagement process.</p><p class=\"guide__no-instruction-text\">Keep in mind that the SeniorConnect assessment tool is not a scoring instrument or an algorithm that produces a “score” or defines specific interventions or actions. It is designed to help you learn more about the senior as you apply your professional knowledge, experience, and critical thinking skills to develop a service plan that connects the senior to services in their community and identifies areas of learning for the senior around their condition.</p>"
                }
            ]
        },
        {
            "name": "Demographics",
            "tabKey": 1,
            "visible": true,
            "elements": [
                {
                    "type": "html",
                    "name": "Collapse/Expand All",
                    "html": "<a class=\"sv-expand-all-sections-btn\">Expand All</a>\n<a class=\"sv-collapse-all-sections-btn\">Collapse All</a>"
                },
                {
                    "type": "panel",
                    "name": "General",
                    "assessmentSectionAnchor": "General",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "text",
                            "name": "Date started",
                            "title": "Date started",
                            "calendarFlag": "customdatepicker",
                            "readOnly": true
                        },
                        {
                            "type": "text",
                            "name": "Completed by",
                            "title": "Completed by",
                            "maxLength": 256,
                            "readOnly": true
                        },
                        {
                            "type": "checkbox",
                            "renderAs": "prettycheckbox",
                            "name": "Who is completing the assessment",
                            "title": "Who is completing the assessment",
                            "choices": [
                                "Caregiver",
                                "Family",
                                "Patient",
                                "Other"
                            ]
                        }
                    ],
                    "title": "General",
                    "state": "expanded"
                },
                {
                    "type": "panel",
                    "name": "Demographics",
                    "assessmentSectionAnchor": "Demographics",
                    "isNavigable": true,
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "text",
                            "name": "First name",
                            "title": "First name",
                            "maxLength": 256
                        },
                        {
                            "type": "text",
                            "name": "Last name",
                            "title": "Last name",
                            "maxLength": 256,
                            "startWithNewLine": false
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Gender",
                            "title": "Gender",
                            "choices": [
                                "Male",
                                "Female",
                                "Unknown"
                            ]
                        },
                        {
                            "type": "text",
                            "name": "Date of Birth",
                            "title": "Date of Birth",
                            "calendarFlag": "withoutTime",
                            "disableFuture": true,
                            "inputType": "text"
                        },
                        {
                            "type": "dropdown",
                            "name": "Race",
                            "title": "Race",
                            "choices": [
                                "Alaska Native",
                                "American Indian",
                                "Asian",
                                "Black or African American",
                                "Hispanic or Latino",
                                "Native Hawaiian or Pacific Islander",
                                "White",
                                "Other"
                            ]
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Marital status",
                            "title": "Marital status",
                            "choices": [
                                "Married",
                                "Widow",
                                "Divorced",
                                "Living with partner",
                                "Separated",
                                "Never married"
                            ],
                            "choicesOrder": "asc"
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you a veteran? ",
                            "title": "Are you a veteran? ",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you receiving Veteran benefits?",
                            "title": "Are you receiving Veteran benefits?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "comment",
                            "name": "Power of attorney",
                            "title": "Power of attorney",
                            "maxLength": 5000
                        },
                        {
                            "type": "comment",
                            "name": "Health Care Surrogate",
                            "title": "Health Care Surrogate",
                            "maxLength": 5000
                        },
                        {
                            "type": "text",
                            "name": "Monthly income, $",
                            "title": "Monthly income, $",
                            "inputMask": "9{0,5}",
                            "placeHolder": "$"
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Food support",
                            "title": "Food support",
                            "choices": [
                                "Yes",
                                "No",
                                "Unknown"
                            ]
                        },
                        {
                            "type": "panel",
                            "name": "Address",
                            "thirdLevel": "Address",
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "Street5",
                                    "title": "Street",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "City",
                                    "title": "City",
                                    "maxLength": 256,
                                    "startWithNewLine": false
                                },
                                {
                                    "type": "text",
                                    "name": "State",
                                    "title": "State",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Zip Code",
                                    "title": "Zip Code",
                                    "inputMask": "9{0,5}",
                                    "startWithNewLine": false
                                }
                            ],
                            "title": "Address"
                        },
                        {
                            "type": "panel",
                            "name": "Telecom",
                            "thirdLevel": "Telecom",
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "Email",
                                    "title": "Email",
                                    "inputMask": "email",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Home phone number",
                                    "title": "Home phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "text",
                                    "name": "Cell phone number",
                                    "title": "Cell phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "text",
                                    "name": "Work phone number",
                                    "title": "Work phone number",
                                    "inputMask": "9{0,16}"
                                }
                            ],
                            "title": "Telecom"
                        },
                        {
                            "type": "panel",
                            "name": "Emergency contact #1",
                            "title": "Emergency contact #1",
                            "panelAnchor": "Emergency contact #1",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "First name1",
                                    "title": "First name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Last Name1",
                                    "title": "Last Name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Phone number",
                                    "title": "Phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "panel",
                                    "name": "Address",
                                    "thirdLevel": "Address",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "Street1",
                                            "title": "Street",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "City1",
                                            "title": "City",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "State1",
                                            "title": "State",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Zip Code1",
                                            "title": "Zip Code",
                                            "inputMask": "9{0,5}"
                                        }
                                    ],
                                    "title": "Address"
                                }
                            ]
                        },
                        {
                            "type": "panel",
                            "name": "Emergency contact #2",
                            "title": "Emergency contact #2",
                            "panelAnchor": "Emergency contact #2",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "demographics.emergencyContact2.firstName",
                                    "title": "First name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "demographics.emergencyContact2.lastName",
                                    "title": "Last Name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "demographics.emergencyContact2.phoneNumber",
                                    "title": "Phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "panel",
                                    "name": "demographics.emergencyContact2.address",
                                    "thirdLevel": "Address",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact2.address.street",
                                            "title": "Street",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact2.address.city",
                                            "title": "City",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact2.address.state",
                                            "title": "State",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact2.address.zipCode",
                                            "title": "Zip Code",
                                            "inputMask": "9{0,5}"
                                        }
                                    ],
                                    "title": "Address"
                                }
                            ]
                        },
                        {
                            "type": "panel",
                            "name": "Emergency contact #3",
                            "title": "Emergency contact #3",
                            "panelAnchor": "Emergency contact #3",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "demographics.emergencyContact3.firstName",
                                    "title": "First name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "demographics.emergencyContact3.lastName",
                                    "title": "Last Name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "demographics.emergencyContact3.phoneNumber",
                                    "title": "Phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "panel",
                                    "name": "demographics.emergencyContact3.address",
                                    "thirdLevel": "Address",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact3.address.street",
                                            "title": "Street",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact3.address.city",
                                            "title": "City",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact3.address.state",
                                            "title": "State",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "demographics.emergencyContact3.address.zipCode",
                                            "title": "Zip Code",
                                            "inputMask": "9{0,5}"
                                        }
                                    ],
                                    "title": "Address"
                                }
                            ]
                        },
                        {
                            "type": "panel",
                            "name": "Primary Care Physician",
                            "panelAnchor": "Primary Care Physician",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "First name2",
                                    "title": "First name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Last Name2",
                                    "title": "Last Name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Phone number1",
                                    "title": "Phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "panel",
                                    "name": "Address",
                                    "thirdLevel": "Address",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "Street2",
                                            "title": "Street",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "City2",
                                            "title": "City",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "State2",
                                            "title": "State",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Zip Code2",
                                            "title": "Zip Code",
                                            "inputMask": "9{0,5}"
                                        }
                                    ],
                                    "title": "Address"
                                }
                            ],
                            "title": "Primary Care Physician"
                        },
                        {
                            "type": "panel",
                            "name": "Specialty Physicians",
                            "panelAnchor": "Specialty Physicians",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "First name3",
                                    "title": "First name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Last Name3",
                                    "title": "Last Name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Specialty",
                                    "title": "Specialty",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Phone number2",
                                    "title": "Phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "panel",
                                    "name": "Address",
                                    "thirdLevel": "Address",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "Street3",
                                            "title": "Street",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "City3",
                                            "title": "City",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "State3",
                                            "title": "State",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Zip Code3",
                                            "title": "Zip Code",
                                            "inputMask": "9{0,5}"
                                        }
                                    ],
                                    "title": "Address"
                                }
                            ],
                            "title": "Specialty Physicians"
                        },
                        {
                            "type": "panel",
                            "name": "Pharmacy",
                            "panelAnchor": "Pharmacy",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "Name",
                                    "title": "Name",
                                    "maxLength": 256
                                },
                                {
                                    "type": "text",
                                    "name": "Phone number3",
                                    "title": "Phone number",
                                    "inputMask": "9{0,16}"
                                },
                                {
                                    "type": "panel",
                                    "name": "Address",
                                    "thirdLevel": "Address",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "Street4",
                                            "title": "Street",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "City4",
                                            "title": "City",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "State4",
                                            "title": "State",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Zip Code4",
                                            "title": "Zip Code",
                                            "inputMask": "9{0,5}"
                                        }
                                    ],
                                    "title": "Address"
                                }
                            ],
                            "title": "Pharmacy"
                        }
                    ],
                    "title": "Demographics",
                    "state": "collapsed"
                }
            ]
        },
        {
            "name": "Medical History",
            "tabKey": 2,
            "elements": [
                {
                    "type": "html",
                    "name": "Collapse/Expand All",
                    "html": "<a class=\"sv-expand-all-sections-btn\" >Expand All</a>\n<a class=\"sv-collapse-all-sections-btn\">Collapse All</a>"
                },
                {
                    "type": "panel",
                    "name": "Medical History",
                    "assessmentSectionAnchor": "Medical History",
                    "isNavigable": true,
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Medical History",
                            "panelAnchor": "Medical History",
                            "isNavDestination": true,
                            "isRequired": false,
                            "elements": [
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Cardiac",
                                    "title": "Cardiac",
                                    "choices": [
                                        "Arrhythmia",
                                        "CP",
                                        "Cardiomyopathy",
                                        "Congestive heart failure (CHF)",
                                        "Hypertension (HTN)",
                                        "Myocardial infarction (MI)",
                                        "Peripheral vascular disease (PVD)",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Pulmonary",
                                    "title": "Pulmonary",
                                    "choices": [
                                        "Asbestosis",
                                        "Asthma",
                                        "Chronic obstructive pulmonary disease (COPD)",
                                        "Emphysema",
                                        "Pneumonia",
                                        "Pulmonary HTN",
                                        "Tuberculosis (TB)",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment1",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Diabetic",
                                    "title": "Diabetic",
                                    "choices": [
                                        "Insulin dependent",
                                        "Type 1 or Type 2",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment2",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Neurological",
                                    "title": "Neurological",
                                    "choices": [
                                        "Cerebrovascular accident (CVA)",
                                        "Cognitive decline",
                                        "Dementia",
                                        "Dizziness and vertigo",
                                        "Headaches",
                                        "Multiple sclerosis (MS)",
                                        "Para/quad",
                                        "Parkinsons",
                                        "Seizures",
                                        "Transient Ischemic Attack (TIA)",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Gastrointestina",
                                    "title": "Gastrointestina",
                                    "choices": [
                                        "Constipation",
                                        "Crohns",
                                        "Diarrhea",
                                        "Diverticulosis/Diverticulitis",
                                        "Gallbladder",
                                        "IBS",
                                        "Liver",
                                        "Pancreas",
                                        "Ulcers",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment3",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Musculoskeletal",
                                    "title": "Musculoskeletal",
                                    "choices": [
                                        "Arthritis (osteo/rheumatoid)",
                                        "Falls",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment4",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Gyn/urinary",
                                    "title": "Gyn/urinary",
                                    "choices": [
                                        "Benign prostatic hyperplasia (BPH)",
                                        "Chronic kidney disease",
                                        "Frequent urinary tract infection (UTI)",
                                        "Incontinence/retention",
                                        "Renal failure",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment5",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Infectious disease",
                                    "title": "Infectious disease",
                                    "choices": [
                                        "Hepatitis",
                                        "Thyroid disease",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment6",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Immune disorders",
                                    "title": "Immune disorders",
                                    "choices": [
                                        "Human immunodeficiency virus (HIV)",
                                        "Lupus",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment7",
                                    "title": "Comment"
                                },
                                {
                                    "type": "panel",
                                    "name": "Chronic Pain",
                                    "thirdLevel": "Chronic Pain",
                                    "elements": [
                                        {
                                            "type": "text",
                                            "name": "Location",
                                            "title": "Location",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Agitators",
                                            "title": "Agitators",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Severity",
                                            "title": "Severity",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "text",
                                            "name": "Length of time",
                                            "title": "Length of time",
                                            "maxLength": 256
                                        },
                                        {
                                            "type": "comment",
                                            "name": "Relieving factors/interventions",
                                            "title": "Relieving factors/interventions",
                                            "maxLength": 5000
                                        },
                                        {
                                            "type": "comment",
                                            "name": "Comment8",
                                            "title": "Comment"
                                        }
                                    ],
                                    "title": "Chronic Pain"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Behavioral health",
                                    "title": "Behavioral health",
                                    "choices": [
                                        "Anxiety",
                                        "Depressions",
                                        "ETOH/drug abuse",
                                        "Schizophrenia",
                                        "Tobacco",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment11",
                                    "title": "Comment"
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Wounds",
                                    "title": "Wounds",
                                    "choices": [
                                        "Decubitus",
                                        "Diabetic wound",
                                        "Stasis ulcer",
                                        "Trauma wound",
                                        "Not provided",
                                        "Other"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment12",
                                    "title": "Comment"
                                }
                            ],
                            "title": "Medical History"
                        },
                        {
                            "type": "panel",
                            "name": "Measurements",
                            "panelAnchor": "Measurements",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "Height, in",
                                    "title": "Height, in",
                                    "inputFormat": "9{0,3}.9{0,5}"
                                },
                                {
                                    "type": "text",
                                    "name": "Weight, lbs",
                                    "title": "Weight, lbs",
                                    "inputFormat": "9{0,3}.9{0,5}"
                                },
                                {
                                    "type": "expression",
                                    "name": "BMI",
                                    "title": "BMI",
                                    "expression": "703*{Weight, lbs}/({Height, in}*{Height, in})",
                                    "displayStyle": "decimal",
                                    "maximumFractionDigits": 2,
                                    "minimumFractionDigits": 0
                                }
                            ],
                            "title": "Measurements"
                        },
                        {
                            "type": "panel",
                            "name": "Vision & Hearing & Dental",
                            "panelAnchor": "Vision & Hearing & Dental",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Vision & Hearing & Dental\t",
                                    "title": "Vision & Hearing & Dental\t",
                                    "choices": [
                                        "Dentures",
                                        "Hearing loss",
                                        "Speech (communication challenges)",
                                        "Vision: wear glasses",
                                        "Wear hearing aids"
                                    ],
                                    "choicesOrder": "asc"
                                },
                                {
                                    "type": "comment",
                                    "name": "When was the last time you had your eye's tested; hearing evaluated; dental cleaning/appt?",
                                    "title": "When was the last time you had your eye's tested; hearing evaluated; dental cleaning/appt?"
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment13",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Vision & Hearing & Dental"
                        },
                        {
                            "type": "panel",
                            "name": "Admissions",
                            "panelAnchor": "Admissions",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "text",
                                    "name": "Last admission date",
                                    "calendarFlag": "noLimit",
                                    "customdatepicker": true,
                                    "title": "Last admission date"
                                },
                                {
                                    "type": "comment",
                                    "name": "What sent you to the ED that day? Were you admitted?",
                                    "title": "What sent you to the ED that day?  Were you admitted?",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "text",
                                    "name": "Last ED visit date",
                                    "calendarFlag": "noLimit",
                                    "customdatepicker": true,
                                    "title": "Last ED visit date"
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment14",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "text",
                                    "name": "# of ED visits in the last six months",
                                    "title": "# of ED visits in the last six months",
                                    "inputMask": "9{0,256}"
                                },
                                {
                                    "type": "text",
                                    "name": "Last hospital admission date",
                                    "calendarFlag": "noLimit",
                                    "customdatepicker": true,
                                    "title": "Last hospital admission date"
                                },
                                {
                                    "type": "text",
                                    "name": "Reason for admission",
                                    "title": "Reason for admission",
                                    "maxLength": 256
                                }
                            ],
                            "title": "Admissions"
                        },
                        {
                            "type": "panel",
                            "name": "Medication list",
                            "panelAnchor": "Medication list",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "comment",
                                    "name": "Medications",
                                    "title": "Medications",
                                    "maxLength": 5000,
                                    "placeHolder": "Flag polypharmacy and high risk meds"
                                }
                            ],
                            "title": "Medication list"
                        },
                        {
                            "type": "panel",
                            "name": "Home services",
                            "panelAnchor": "Home services",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Home services",
                                    "title": "Home services",
                                    "choices": [
                                        "Home health/telehealth",
                                        "DME",
                                        "Oxygen",
                                        "Outpatient therapy"
                                    ],
                                    "choicesOrder": "asc"
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment15",
                                    "visibleIf": "{Home services} notempty",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Home services"
                        },
                        {
                            "type": "panel",
                            "name": "Other",
                            "panelAnchor": "Other",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "comment",
                                    "name": "POLST/MOLST - advanced directives",
                                    "title": "POLST/MOLST - advanced directives",
                                    "maxLength": 20000
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Orientation",
                                    "title": "Orientation",
                                    "choices": [
                                        "Alert and oriented",
                                        "Somewhat confused",
                                        "Confused (person, place, date, president)"
                                    ]
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment16",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "checkbox",
                                    "renderAs": "prettycheckbox",
                                    "name": "Recent immunizations",
                                    "title": "Recent immunizations",
                                    "choices": [
                                        "Flu/Pneumonia",
                                        "Hepatitis"
                                    ],
                                    "choicesOrder": "asc"
                                },
                                {
                                    "type": "text",
                                    "name": "Date of last immunization",
                                    "calendarFlag": "noLimit",
                                    "customdatepicker": true,
                                    "visibleIf": "{Recent immunizations} notempty",
                                    "title": "Date of last immunization"
                                }
                            ],
                            "title": "Other"
                        }
                    ],
                    "title": "Medical History",
                    "state": "expanded"
                }
            ]
        },
        {
            "name": "WellRx",
            "tabKey": 3,
            "elements": [
                {
                    "type": "html",
                    "name": "Collapse/Expand All",
                    "html": "<a class=\"sv-expand-all-sections-btn\" >Expand All</a>\n<a class=\"sv-collapse-all-sections-btn\">Collapse All</a>"
                },
                {
                    "type": "panel",
                    "name": "WellRx questionnaire",
                    "assessmentSectionAnchor": "WellRx questionnaire",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?",
                            "title": "In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "name": "priority1",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment17",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you homeless or worried that you might be in the future?",
                            "title": "Are you homeless or worried that you might be in the future?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority4",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "text",
                            "name": "Would you like us to provide you with resources for safe housing throughout the community?",
                            "visibleIf": "{Are you homeless or worried that you might be in the future?} = \"Yes\"",
                            "title": "Would you like us to provide you with resources for safe housing throughout the community?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority5",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you homeless or worried that you might be in the future?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment18",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you have trouble paying for your utilities (gas/electric/phone)?",
                            "title": "Do you have trouble paying for your utilities (gas/electric/phone)?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority7",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "text",
                            "name": "Would you like us to provide you with resources that may help with assistance for utilizes?",
                            "visibleIf": "{Do you have trouble paying for your utilities (gas/electric/phone)?} = \"Yes\"",
                            "title": "Would you like us to provide you with resources that may help with assistance for utilizes?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority8",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Do you have trouble paying for your utilities (gas/electric/phone)?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment19",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you have trouble finding or paying for a ride?",
                            "title": "Do you have trouble finding or paying for a ride?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority10",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "text",
                            "name": "Would you like us to provide you with transportation assistance or resources for transportation?",
                            "visibleIf": "{Do you have trouble finding or paying for a ride?} = \"Yes\"",
                            "title": "Would you like us to provide you with transportation assistance or resources for transportation?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority11",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Do you have trouble finding or paying for a ride?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment20",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you currently caregiving for any children in your home? ",
                            "title": "Are you currently caregiving for any children in your home? ",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority13",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are they school age or younger?",
                            "visibleIf": "{Are you currently caregiving for any children in your home? } = \"Yes\"",
                            "title": "Are they school age or younger?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority14",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you currently caregiving for any children in your home? } = \"Yes\""
                        },
                        {
                            "type": "text",
                            "name": "Do you need daycare or better daycare for your grand/kids?",
                            "visibleIf": "{Are you currently caregiving for any children in your home? } = \"Yes\"",
                            "title": "Do you need daycare or better daycare for your grand/kids?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority15",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you currently caregiving for any children in your home? } = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment21",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you currently working?",
                            "title": "Are you currently working?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority17",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you have any concerns about your job?",
                            "visibleIf": "{Are you currently working?} = \"Yes\"",
                            "title": "Do you have any concerns about your job?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority18",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you currently working?} = \"Yes\""
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you need help finding a better job?",
                            "visibleIf": "{Are you currently working?} = \"Yes\"",
                            "title": "Do you need help finding a better job?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority19",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you currently working?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment22",
                            "visibleIf": "{Are you currently working?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you understand your current health status?",
                            "title": "Do you understand your current health status?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority21",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment23",
                            "visibleIf": "{Do you understand your current health status?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you concerned about someone in your home using drugs or alcohol?",
                            "title": "Are you concerned about someone in your home using drugs or alcohol?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority23",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment24",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you feel unsafe in your daily life?",
                            "title": "Do you feel unsafe in your daily life?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority  ",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "In what ways do you feel unsafe?",
                            "visibleIf": "{Do you feel unsafe in your daily life?} = \"Yes\"",
                            "title": "In what ways do you feel unsafe?",
                            "maxLength": 5000
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority25",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Do you feel unsafe in your daily life?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment25",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Is anyone in your home threatening or abusing you?",
                            "title": "Is anyone in your home threatening or abusing you?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority27",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Follow up",
                            "placeHolder": "Contact family services and add follow up",
                            "visibleIf": "{Is anyone in your home threatening or abusing you?} = \"Yes\"",
                            "title": "Follow up",
                            "maxLength": 5000
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority28",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Is anyone in your home threatening or abusing you?} = \"Yes\""
                        }
                    ],
                    "title": "WellRx questionnaire",
                    "state": "expanded"
                },
                {
                    "type": "panel",
                    "name": "Community/social integration: community support",
                    "assessmentSectionAnchor": "Community/social integration: community support",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "checkbox",
                            "renderAs": "prettycheckbox",
                            "name": "Current living situation",
                            "title": "Current living situation",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "{Are you homeless or worried that you might be in the future?} = \"No\" or {Current living situation} notempty or {Are you homeless or worried that you might be in the future?} empty"
                                }
                            ],
                            "choices": [
                                "Live alone",
                                "Live with family member",
                                "Live with friend or relative",
                                "Live with spouse",
                                "Other"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority29",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment26",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "checkbox",
                            "renderAs": "prettycheckbox",
                            "name": "Living conditions",
                            "title": "Living conditions",
                            "choices": [
                                "Apartment",
                                "Assisted living facility (ALF)",
                                "Condominium",
                                "Duplex",
                                "Group home",
                                "Home",
                                "Homeless",
                                "Mobile home",
                                "One story",
                                "Two story"
                            ],
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "{Are you homeless or worried that you might be in the future?} = \"No\" or {Living conditions} notempty or {Are you homeless or worried that you might be in the future?} empty"
                                }
                            ],
                            "choicesOrder": "asc"
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority31",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment27",
                            "title": "Comment",
                            "maxLength": 5000
                        }
                    ],
                    "title": "Community/social integration: community support",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Upstream Risk Screening Tool",
                    "assessmentSectionAnchor": "Upstream Risk Screening Tool",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "matrix",
                            "name": "Upstream Risk Screening",
                            "title": "Upstream Risk Screening",
                            "columns": [
                                "0",
                                "1-2",
                                "3-4",
                                "Almost daily",
                                "Multiple times a day"
                            ],
                            "rows": [
                                "In a typical week, how many times do you talk on the telephone with family, friends or neighbors, # per week?",
                                "How often do you get together with friends or relatives, # per week?",
                                "How often do you attend religious or faith based services, # per month?",
                                "How often do you attend meetings of the clubs or organizations you belong too, # per month? "
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority33",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment28",
                            "title": "Comment",
                            "maxLength": 5000
                        }
                    ],
                    "title": "Upstream Risk Screening Tool",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Spiritual Assessment",
                    "assessmentSectionAnchor": "Spiritual Assessment",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "May I ask you about your Faith background?",
                            "title": "May I ask you about your Faith background?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority35",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you have a spiritual or faith preference?",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Do you have a spiritual or faith preference?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority36",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Spiritual or faith preferences",
                            "visibleIf": "{Do you have a spiritual or faith preference?} = \"Yes\" and {May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Spiritual or faith preferences",
                            "maxLength": 5000
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority37",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Do you have a spiritual or faith preference?} = \"Yes\" and {May I ask you about your Faith background?} = \"Yes\""
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Does your spirituality impact the health decisions you make?",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Does your spirituality impact the health decisions you make?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority38",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment29",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are there resources in your faith community that you would like for me to help mobilize on your behalf?",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Are there resources in your faith community that you would like for me to help mobilize on your behalf?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority40",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment30",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Does your current situation affect your ability to do the things that usually help you spiritually?",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Does your current situation affect your ability to do the things that usually help you spiritually?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority42",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment31",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "comment",
                            "name": "How would you like me to address your faith needs in your health care?",
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\"",
                            "title": "How would you like me to address your faith needs in your health care?",
                            "maxLength": 5000
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority44",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{May I ask you about your Faith background?} = \"Yes\""
                        }
                    ],
                    "title": "Spiritual Assessment",
                    "state": "collapsed"
                }
            ]
        },
        {
            "name": "Additional Questions",
            "tabKey": 4,
            "elements": [
                {
                    "type": "html",
                    "name": "Collapse/Expand All",
                    "html": "<a class=\"sv-expand-all-sections-btn\" >Expand All</a>\n<a class=\"sv-collapse-all-sections-btn\">Collapse All</a>"
                },
                {
                    "type": "panel",
                    "name": "ADLs Assessment",
                    "assessmentSectionAnchor": "ADLs Assessment",
                    "isNavigable": true,
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Bathing",
                            "panelAnchor": "Bathing",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Bathing ADL's",
                                    "title": "Bathing ADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Bathing ADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority45",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you use a shower or a tub?",
                                    "title": "Do you use a shower or a tub?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you use a shower or a tub?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority46",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "If your not using the tub/shower, why?",
                                    "visibleIf": "{Do you use a shower or a tub?} = \"No\"",
                                    "title": "If your not using the tub/shower, why?",
                                    "maxLength": 5000,
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or ({Do you use a shower or a tub?} = \"Yes\") or {If your not using the tub/shower, why?} notempty"
                                        }
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority47",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you use a shower or a tub?} = \"No\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have any equipment you use such as a tub seat or hand held shower?",
                                    "title": "Do you have any equipment you use such as a tub seat or hand held shower?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have any equipment you use such as a tub seat or hand held shower?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority48",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment32",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Bathing"
                        },
                        {
                            "type": "panel",
                            "name": "Dressing",
                            "panelAnchor": "Dressing",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Dressing ADL's",
                                    "title": "Dressing ADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Dressing ADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority50",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have any trouble putting on clothes?",
                                    "title": "Do you have any trouble putting on clothes?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have any trouble putting on clothes?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority51",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Which ones?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Which ones?} notempty or ({Do you have any trouble putting on clothes?} <> \"Yes\")"
                                        }
                                    ],
                                    "visibleIf": "{Do you have any trouble putting on clothes?} = \"Yes\"",
                                    "title": "Which ones?",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority52",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have any trouble putting on clothes?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have pain when dressing?",
                                    "title": "Do you have pain when dressing?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have pain when dressing?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority53",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Pain",
                                    "visibleIf": "{Do you have pain when dressing?} = \"Yes\"",
                                    "title": "Pain",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority54",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have pain when dressing?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you wish you had help?",
                                    "title": "Do you wish you had help?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you wish you had help?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority55",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment33",
                                    "visibleIf": "{Do you wish you had help?} = \"Yes\"",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Dressing"
                        },
                        {
                            "type": "panel",
                            "name": "Toileting",
                            "panelAnchor": "Toileting",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Toileting ADL's",
                                    "title": "Toileting ADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Toileting ADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority57",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have any problems with getting to the bathroom on time?",
                                    "title": "Do you have any problems with getting to the bathroom on time?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have any problems with getting to the bathroom on time?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority58",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Problems with getting to the bathroom",
                                    "visibleIf": "{Do you have any problems with getting to the bathroom on time?} = \"Yes\"",
                                    "title": "Problems with getting to the bathroom",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority59",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have any problems with getting to the bathroom on time?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Problems getting on/off the toilet?",
                                    "title": "Problems getting on/off the toilet?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Problems getting on/off the toilet?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority60",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Problems getting on/off the toilet",
                                    "visibleIf": "{Problems getting on/off the toilet?} = \"Yes\"",
                                    "title": "Problems getting on/off the toilet",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority61",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Problems getting on/off the toilet?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have grab bars or equipment that help?",
                                    "title": "Do you have grab bars or equipment that help?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have grab bars or equipment that help?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority62",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you feel you need equipment?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you feel you need equipment?} notempty or ({Do you have grab bars or equipment that help?} <> \"No\")"
                                        }
                                    ],
                                    "visibleIf": "{Do you have grab bars or equipment that help?} = \"No\"",
                                    "title": "Do you feel you need equipment?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority63",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have grab bars or equipment that help?} = \"No\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment34",
                                    "visibleIf": "{Do you feel you need equipment?} = \"Yes\"",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Toileting"
                        },
                        {
                            "type": "panel",
                            "name": "Eating",
                            "panelAnchor": "Eating",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Eating ADL's",
                                    "title": "Eating ADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Eating ADL's} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority65",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have any trouble chewing or swallowing your food?",
                                    "title": "Do you have any trouble chewing or swallowing your food?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Do you have any trouble chewing or swallowing your food?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority66",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Troubles",
                                    "visibleIf": "{Do you have any trouble chewing or swallowing your food?} = \"Yes\"",
                                    "title": "Troubles",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority67",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have any trouble chewing or swallowing your food?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Any problem with gripping or holding onto utensils or bringing your hand to your mouth?",
                                    "title": "Any problem with gripping or holding onto utensils or bringing your hand to your mouth?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Any problem with gripping or holding onto utensils or bringing your hand to your mouth?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority68",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Problems",
                                    "visibleIf": "{Any problem with gripping or holding onto utensils or bringing your hand to your mouth?} = \"Yes\"",
                                    "title": "Problems",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority69",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Any problem with gripping or holding onto utensils or bringing your hand to your mouth?} = \"Yes\""
                                }
                            ],
                            "title": "Eating"
                        }
                    ],
                    "title": "ADLs Assessment",
                    "state": "expanded"
                },
                {
                    "type": "panel",
                    "name": "IADLs Assessment",
                    "assessmentSectionAnchor": "IADLs Assessment",
                    "isNavigable": true,
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Medications",
                            "panelAnchor": "Medications",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Medications IADL's",
                                    "title": "Medications IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Medications IADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority70",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Can you open your pill bottles?",
                                    "title": "Can you open your pill bottles?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Can you open your pill bottles?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority71",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you use a pill box?",
                                    "title": "Do you use a pill box?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you use a pill box?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority72",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you wish you hade more help with organizing your medications so you can take them easier?",
                                    "title": "Do you wish you hade more help with organizing your medications so you can take them easier?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you wish you hade more help with organizing your medications so you can take them easier?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority73",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Help with organizing your medications",
                                    "visibleIf": "{Do you wish you hade more help with organizing your medications so you can take them easier?} = \"Yes\"",
                                    "title": "Help with organizing your medications",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority74",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you wish you hade more help with organizing your medications so you can take them easier?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Can you see the labels on the pill bottles?",
                                    "title": "Can you see the labels on the pill bottles?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Can you see the labels on the pill bottles?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority75",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Medications Comment",
                                    "title": "Medications Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority76",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                }
                            ],
                            "title": "Medications"
                        },
                        {
                            "type": "panel",
                            "name": "Housekeeping",
                            "panelAnchor": "Housekeeping",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Housekeeping IADL's",
                                    "title": "Housekeeping IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Housekeeping IADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority77",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you get help cleaning your home?",
                                    "title": "Do you get help cleaning your home?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you get help cleaning your home?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority78",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you wish you had help1?",
                                    "title": "Do you wish you had help?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you wish you had help1?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority79",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "What do you need the most help with?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {What do you need the most help with?} notempty or ({Do you wish you had help1?} <> \"Yes\")"
                                        }
                                    ],
                                    "visibleIf": "{Do you wish you had help1?} = \"Yes\"",
                                    "title": "What do you need the most help with?",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority80",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you wish you had help1?} = \"Yes\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Housekeeping Comment",
                                    "title": "Housekeeping Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority81",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                }
                            ],
                            "title": "Housekeeping"
                        },
                        {
                            "type": "panel",
                            "name": "Meals",
                            "panelAnchor": "Meals",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Meals IADL's",
                                    "title": "Meals IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Meals IADL's} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority82",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "matrix",
                                    "name": "Do you use a stove / oven / microwave?",
                                    "title": "Do you use a stove / oven / microwave?",
                                    "columns": [
                                        "Yes",
                                        "No"
                                    ],
                                    "rows": [
                                        "Do you use a stove?",
                                        "Do you use oven?",
                                        "Do you use a microwave?"
                                    ],
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Do you use a stove / oven / microwave?.Do you use a microwave?} notempty or {Do you use a stove / oven / microwave?.Do you use oven?} notempty or {Do you use a stove / oven / microwave?.Do you use a stove?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty)"
                                        }
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority83",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Why?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty) and ({Do you use a stove / oven / microwave?.Do you use a microwave?} <> \"No\" or \n{Do you use a stove / oven / microwave?.Do you use a stove?} <> \"No\" or \n{Do you use a stove / oven / microwave?.Do you use oven?} <> \"No\") or {Why?} notempty"
                                        }
                                    ],
                                    "visibleIf": "{Do you use a stove / oven / microwave?.Do you use a microwave?} = \"No\" or \n{Do you use a stove / oven / microwave?.Do you use a stove?} = \"No\" or \n{Do you use a stove / oven / microwave?.Do you use oven?} = \"No\"",
                                    "title": "Why?",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority84",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you use a stove / oven / microwave?.Do you use a microwave?} = \"No\" or \n{Do you use a stove / oven / microwave?.Do you use a stove?} = \"No\" or \n{Do you use a stove / oven / microwave?.Do you use oven?} = \"No\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you get meals on wheels?",
                                    "title": "Do you get meals on wheels?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Do you get meals on wheels?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty)"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority85",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you wish you had more help with meal preparation?",
                                    "title": "Do you wish you had more help with meal preparation?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Do you wish you had more help with meal preparation?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority86",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment35",
                                    "visibleIf": "{Do you wish you had more help with meal preparation?} = \"Yes\"",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Meals"
                        },
                        {
                            "type": "panel",
                            "name": "Laundry",
                            "panelAnchor": "Laundry",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Laundry IADL's",
                                    "title": "Laundry IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{Laundry IADL's} notempty or {Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority88",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Does anyone help you with your laundry?",
                                    "title": "Does anyone help you with your laundry?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{Does anyone help you with your laundry?} notempty or ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty)"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority89",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you feel you need help?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{Do you feel you need help?} notempty or ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or ({Does anyone help you with your laundry?} <> \"No\")"
                                        }
                                    ],
                                    "visibleIf": "{Does anyone help you with your laundry?} = \"No\"",
                                    "title": "Do you feel you need help?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority90",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Does anyone help you with your laundry?} = \"No\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Why?1",
                                    "visibleIf": "{Does anyone help you with your laundry?} = \"No\" and {Do you feel you need help?} = \"No\"",
                                    "title": "Why?",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority91",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Does anyone help you with your laundry?} = \"No\" and {Do you feel you need help?} = \"No\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment36",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Laundry"
                        },
                        {
                            "type": "panel",
                            "name": "Telephone",
                            "panelAnchor": "Telephone",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Telephone IADL's",
                                    "title": "Telephone IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Telephone IADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority93",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Are you able to adequately hear on your telephone?",
                                    "title": "Are you able to adequately hear on your telephone?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Are you able to adequately hear on your telephone?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority94",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have trouble dialing numbers?",
                                    "title": "Do you have trouble dialing numbers?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Do you have trouble dialing numbers?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority95",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you own a cell phone?",
                                    "title": "Do you own a cell phone?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Do you own a cell phone?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority96",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "text",
                                    "name": "What number do you call in an emergency?",
                                    "title": "What number do you call in an emergency?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {What number do you call in an emergency?} notempty"
                                        }
                                    ],
                                    "maxLength": 256
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority97",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment37",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Telephone"
                        },
                        {
                            "type": "panel",
                            "name": "Cooking/baking concerns",
                            "panelAnchor": "Cooking/baking concerns",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Cooking/baking IADL's",
                                    "title": "Cooking/baking IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Cooking/baking IADL's} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority99",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have a gas stove?",
                                    "title": "Do you have a gas stove?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Do you have a gas stove?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority100",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment38",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Cooking/baking concerns"
                        },
                        {
                            "type": "panel",
                            "name": "Shopping",
                            "panelAnchor": "Shopping",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Shopping IADL's",
                                    "title": "Shopping IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {Shopping IADL's} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority102",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "How do you get your groceries?",
                                    "title": "How do you get your groceries?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {How do you get your groceries?} notempty or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty"
                                        }
                                    ],
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority103",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment39",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Shopping"
                        },
                        {
                            "type": "panel",
                            "name": "Paying bills/finances",
                            "panelAnchor": "Paying bills/finances",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Paying bills/finances IADL's",
                                    "title": "Paying bills/finances IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty) and ({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Paying bills/finances IADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority105",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you receive help with paying your bills?",
                                    "title": "Do you receive help with paying your bills?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty) and ({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Do you receive help with paying your bills?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority106",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you struggle to write checks or balance your checkbook?",
                                    "title": "Do you struggle to write checks or balance your checkbook?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty) and ({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Do you struggle to write checks or balance your checkbook?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority107",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Why?2",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} = \"No\" or {In the last 2 months did you or others you live with eat smaller meals or skip meals because you didn't have money for food?} empty) and ({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) or {Why?2} notempty or {Do you struggle to write checks or balance your checkbook?} <> \"Yes\""
                                        }
                                    ],
                                    "visibleIf": "{Do you struggle to write checks or balance your checkbook?} = \"Yes\"",
                                    "title": "Why?",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority108",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you struggle to write checks or balance your checkbook?} = \"Yes\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment40",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Paying bills/finances"
                        },
                        {
                            "type": "panel",
                            "name": "Assistance with medical appointments",
                            "panelAnchor": "Assistance with medical appointments",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Assistance with medical appointments IADL's",
                                    "title": "Assistance with medical appointments IADL's",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Assistance with medical appointments IADL's} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Independent",
                                        "Some assistance",
                                        "Total assistance"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority110",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you get help making appointments such as doctor",
                                    "title": "Do you get help making appointments such as doctor, dentist, etc.?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Do you get help making appointments such as doctor} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority111",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you drive?",
                                    "title": "Do you drive?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Do you drive?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority112",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you wish you had help3?",
                                    "title": "Do you wish you had help?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Do you wish you had help3?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority113",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Help needed",
                                    "visibleIf": "{Do you wish you had help3?} = \"Yes\"",
                                    "title": "Help needed",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority114",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you wish you had help3?} = \"Yes\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment41",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Assistance with medical appointments"
                        }
                    ],
                    "title": "IADLs Assessment",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Mobility",
                    "assessmentSectionAnchor": "Mobility",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Independent?",
                            "title": "Independent?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Independent?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority116",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment42",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Utilizes a cane?",
                            "title": "Utilizes a cane?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Utilizes a cane?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority118",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment43",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Utilizes a walker?",
                            "title": "Utilizes a walker?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Utilizes a walker?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority120",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "text",
                            "name": "What kind of walker?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {What kind of walker?} notempty or {Utilizes a walker?} <> \"Yes\""
                                }
                            ],
                            "visibleIf": "{Utilizes a walker?} = \"Yes\"",
                            "title": "What kind of walker?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority121",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Utilizes a walker?} = \"Yes\""
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Does it have wheels?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Does it have wheels?} notempty or {Utilizes a walker?} <> \"Yes\""
                                }
                            ],
                            "visibleIf": "{Utilizes a walker?} = \"Yes\"",
                            "title": "Does it have wheels?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority122",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Utilizes a walker?} = \"Yes\""
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "How many wheels?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {How many wheels?} notempty or ({Does it have wheels?} <> \"Yes\")"
                                }
                            ],
                            "visibleIf": "{Does it have wheels?} = \"Yes\"",
                            "title": "How many wheels?",
                            "choices": [
                                "2",
                                "4"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority123",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Does it have wheels?} = \"Yes\""
                        },
                        {
                            "type": "text",
                            "name": "When was the last time someone looked at your walker?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {When was the last time someone looked at your walker?} notempty or ({Utilizes a walker?} <> \"Yes\")"
                                }
                            ],
                            "visibleIf": "{Utilizes a walker?} = \"Yes\"",
                            "title": "When was the last time someone looked at your walker?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority124",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Utilizes a walker?} = \"Yes\""
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Have you fallen in the last year?",
                            "title": "Have you fallen in the last year?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Have you fallen in the last year?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority125",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "rating",
                            "name": "How many times?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {How many times?} notempty or ({Have you fallen in the last year?} <> \"Yes\")"
                                }
                            ],
                            "visibleIf": "{Have you fallen in the last year?} = \"Yes\"",
                            "title": "How many times?",
                            "rateValues": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10"
                            ],
                            "rateMax": 10
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority126",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Have you fallen in the last year?} = \"Yes\""
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you have difficulty leaving the home; changing position in bed?",
                            "title": "Do you have difficulty leaving the home; changing position in bed?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Do you have difficulty leaving the home; changing position in bed?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority127",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Able to walk up a flight of stairs?",
                            "title": "Able to walk up a flight of stairs?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Able to walk up a flight of stairs?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority128",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you need a handrail to walk up a flight?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "{Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty or {Do you need a handrail to walk up a flight?} notempty or {Able to walk up a flight of stairs?} <> \"Yes\""
                                }
                            ],
                            "visibleIf": "{Able to walk up a flight of stairs?} = \"Yes\"",
                            "title": "Do you need a handrail to walk up a flight? ",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority129",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Able to walk up a flight of stairs?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment44",
                            "visibleIf": "{Able to walk up a flight of stairs?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Walk a city block 250-350 feet?",
                            "title": "Walk a city block 250-350 feet?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Walk a city block 250-350 feet?} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority131",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Do you take rest breaks or use an assistive device?",
                            "title": "Do you take rest breaks or use an assistive device?",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you have trouble finding or paying for a ride?} = \"No\" or {Do you have trouble finding or paying for a ride?} empty) or {Do you take rest breaks or use an assistive device?} notempty or ({Walk a city block 250-350 feet?} <> \"Yes\")"
                                }
                            ],
                            "visibleIf": "{Walk a city block 250-350 feet?} = \"Yes\"",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority132",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Walk a city block 250-350 feet?} = \"Yes\""
                        },
                        {
                            "type": "comment",
                            "name": "Comment45",
                            "visibleIf": "{Walk a city block 250-350 feet?} = \"Yes\"",
                            "title": "Comment",
                            "maxLength": 5000
                        }
                    ],
                    "title": "Mobility",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Home Evaluation",
                    "assessmentSectionAnchor": "Home Evaluation",
                    "isNavigable": true,
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Grab bars",
                            "panelAnchor": "Grab bars",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Grab bars in tub, shower, toilet",
                                    "title": "Grab bars in tub, shower, toilet",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Grab bars in tub, shower, toilet} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority134",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you feel you need them?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you feel you need them?} notempty or ({Grab bars in tub, shower, toilet} <> \"No\")"
                                        }
                                    ],
                                    "visibleIf": "{Grab bars in tub, shower, toilet} = \"No\"",
                                    "title": "Do you feel you need them?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority135",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Grab bars in tub, shower, toilet} = \"No\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment46",
                                    "visibleIf": "{Grab bars in tub, shower, toilet} = \"No\"",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Grab bars"
                        },
                        {
                            "type": "panel",
                            "name": "Cleanliness",
                            "panelAnchor": "Cleanliness",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have help cleaning your home?",
                                    "title": "Do you have help cleaning your home?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have help cleaning your home?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority137",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment47",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "rating",
                                    "name": "Range of cleanliness",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Range of cleanliness} notempty"
                                        }
                                    ],
                                    "title": "Range of cleanliness",
                                    "rateValues": [
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                        "10"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority139",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                }
                            ],
                            "title": "Cleanliness"
                        },
                        {
                            "type": "panel",
                            "name": "Animals",
                            "panelAnchor": "Animals",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have animals in the home?",
                                    "title": "Do you have animals in the home?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have animals in the home?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority140",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "text",
                                    "name": "What type and how many?",
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\"",
                                    "title": "What type and how many?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {What type and how many?} notempty or ({Do you have animals in the home?} <> \"Yes\")"
                                        }
                                    ],
                                    "maxLength": 256
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority141",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you get help taking care of your animals?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you get help taking care of your animals?} notempty or ({Do you have animals in the home?} <> \"Yes\")"
                                        }
                                    ],
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\"",
                                    "title": "Do you get help taking care of your animals?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority142",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\""
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you feel you need help?1",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you feel you need help?1} notempty or ({Do you have animals in the home?} <> \"Yes\")"
                                        }
                                    ],
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\"",
                                    "title": "Do you feel you need help?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority144",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment48",
                                    "visibleIf": "{Do you have animals in the home?} = \"Yes\"",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Animals"
                        },
                        {
                            "type": "panel",
                            "name": "Smoke detector",
                            "panelAnchor": "Smoke detector",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Working smoke detector/carbon monoxide detector?",
                                    "title": "Working smoke detector/carbon monoxide detector?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Working smoke detector/carbon monoxide detector?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority146",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "text",
                                    "name": "Last time batteries were checked?",
                                    "visibleIf": "{Working smoke detector/carbon monoxide detector?} = \"Yes\"",
                                    "title": "Last time batteries were checked?",
                                    "calendarFlag": "customdatepicker",
                                    "disableFuture": true,
                                    "customdatepicker": true
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority147",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Working smoke detector/carbon monoxide detector?} = \"Yes\""
                                }
                            ],
                            "title": "Smoke detector"
                        },
                        {
                            "type": "panel",
                            "name": "Steps",
                            "panelAnchor": "Steps",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do steps have proper hand rails?",
                                    "title": "Do steps have proper hand rails?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do steps have proper hand rails?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority148",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you feel you need them?1",
                                    "visibleIf": "{Do steps have proper hand rails?} = \"No\"",
                                    "title": "Do you feel you need them?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you feel you need them?1} notempty or ({Do steps have proper hand rails?} <> \"Yes\")"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority149",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do steps have proper hand rails?} = \"No\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment49",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Steps"
                        },
                        {
                            "type": "panel",
                            "name": "Trip hazards",
                            "panelAnchor": "Trip hazards",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "matrix",
                                    "name": "Trip hazards1",
                                    "title": "Trip hazards",
                                    "columns": [
                                        "Yes",
                                        "No"
                                    ],
                                    "rows": [
                                        "Throw rugs",
                                        "Uneven flooring",
                                        "Clutter",
                                        "Trash"
                                    ],
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Trip hazards1.Throw rugs} notempty or {Trip hazards1.Uneven flooring} notempty or {Trip hazards1.Clutter} notempty or {Trip hazards1.Trash} notempty"
                                        }
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority151",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Are you pathways clear to walk in your home?",
                                    "title": "Are you pathways clear to walk in your home?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Are you pathways clear to walk in your home?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority152",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you use throw rugs?",
                                    "title": "Do you use throw rugs?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you use throw rugs?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority153",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do the throw rugs have non skid backing?",
                                    "title": "Do the throw rugs have non skid backing?",
                                    "visibleIf": "{Do you use throw rugs?} = \"Yes\"",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "{Do the throw rugs have non skid backing?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority154",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "visibleIf": "{Do you use throw rugs?} = \"Yes\"",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment50",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Trip hazards"
                        },
                        {
                            "type": "panel",
                            "name": "Water, heating, lighting",
                            "panelAnchor": "Water, heating, lighting",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Running water?",
                                    "title": "Running water?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) and ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Running water?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority156",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment51",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Adequate heating and cooling?",
                                    "title": "Adequate heating and cooling?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) and ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Adequate heating and cooling?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority158",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Are you able to see your thermostat to adjust it?",
                                    "visibleIf": "{Adequate heating and cooling?} = \"No\"",
                                    "title": "Are you able to see your thermostat to adjust it?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) and ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Are you able to see your thermostat to adjust it?} notempty or ({Adequate heating and cooling?} <> \"No\")"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority159",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Adequate heating and cooling?} = \"No\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment52",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Electricity and lighting?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) and ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Electricity and lighting?} notempty"
                                        }
                                    ],
                                    "title": "Electricity and lighting?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority161",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you use a night light?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you homeless or worried that you might be in the future?} = \"No\" or {Are you homeless or worried that you might be in the future?} empty) and ({Do you have trouble paying for your utilities (gas/electric/phone)?} = \"No\" or {Do you have trouble paying for your utilities (gas/electric/phone)?} empty) and ({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you use a night light?} notempty or ({Electricity and lighting?} <> \"Yes\")"
                                        }
                                    ],
                                    "visibleIf": "{Electricity and lighting?} = \"Yes\"",
                                    "title": "Do you use a night light?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority162",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Electricity and lighting?} = \"Yes\""
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment53",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Water, heating, lighting"
                        },
                        {
                            "type": "panel",
                            "name": "Appliances & emergency response systems",
                            "panelAnchor": "Appliances & emergency response systems",
                            "isNavDestination": true,
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Concerns clutter;hoarding; are your pathways free of clutter?",
                                    "title": "Concerns clutter; hoarding; are your pathways free of clutter?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Concerns clutter;hoarding; are your pathways free of clutter?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority164",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment54",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "matrix",
                                    "name": "Adequate appliances",
                                    "title": "Adequate appliances",
                                    "columns": [
                                        "Yes",
                                        "No"
                                    ],
                                    "rows": [
                                        "Refrigerator",
                                        "Stove"
                                    ],
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Adequate appliances.Refrigerator} notempty  or {Adequate appliances.Stove} notempty"
                                        }
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority166",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment55",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "text",
                                    "name": "Personal emergency response systems",
                                    "title": "Personal emergency response systems",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Personal emergency response systems} notempty"
                                        }
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority168",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you have trouble getting in and out of bed?",
                                    "title": "Do you have trouble getting in and out of bed?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you have trouble getting in and out of bed?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority169",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you use any device that helps you get in/out of bed?",
                                    "title": "Do you use any device that helps you get in/out of bed?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you use any device that helps you get in/out of bed?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority170",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Do you think you need a device?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Do you feel unsafe in your daily life?} = \"No\" or {Do you feel unsafe in your daily life?} empty) or {Do you think you need a device?} notempty or ({Do you use any device that helps you get in/out of bed?} <> \"No\")"
                                        }
                                    ],
                                    "visibleIf": "{Do you use any device that helps you get in/out of bed?} = \"No\"",
                                    "title": "Do you think you need a device?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority171",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true,
                                    "visibleIf": "{Do you use any device that helps you get in/out of bed?} = \"No\""
                                }
                            ],
                            "title": "Appliances & emergency response systems"
                        }
                    ],
                    "title": "Home Evaluation",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Caregiver assessment",
                    "assessmentSectionAnchor": "Caregiver assessment",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Are you currently providing care for anyone in your home?",
                            "title": "Are you currently providing care for anyone in your home?",
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority172",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "How much time do you spend each week providing care?",
                            "visibleIf": "{Are you currently providing care for anyone in your home?} = \"Yes\"",
                            "title": "How much time do you spend each week providing care?",
                            "choices": [
                                "24/7",
                                "About 40 hours",
                                "Between 10-40 hours",
                                "Less then 10 hours a week"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority173",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you currently providing care for anyone in your home?} = \"Yes\""
                        },
                        {
                            "type": "checkbox",
                            "renderAs": "prettycheckbox",
                            "name": "What types of caregiving are you providing?",
                            "visibleIf": "{Are you currently providing care for anyone in your home?} = \"Yes\"",
                            "title": "What types of caregiving are you providing?",
                            "choices": [
                                "Total care",
                                "Meals",
                                "Medications",
                                "Transportation",
                                "Bathing",
                                "Dressing",
                                "Cleaning",
                                "Taking care of finances",
                                "Grocery shopping"
                            ],
                            "choicesOrder": "asc"
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority174",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true,
                            "visibleIf": "{Are you currently providing care for anyone in your home?} = \"Yes\""
                        }
                    ],
                    "title": "Caregiver assessment",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Caregiver Assessment - How are you?",
                    "assessmentSectionAnchor": "Caregiver Assessment - How are you?",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Do you currently have any concerns about your caregiving (in the past week)?",
                            "thirdLevel": "Do you currently have any concerns about your caregiving (in the past week)?",
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Had trouble keeping my mind on what I was doing?",
                                    "title": "Had trouble keeping my mind on what I was doing?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority175",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment56",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt that I couldn't leave my relative alone?",
                                    "title": "Felt that I couldn't leave my relative alone?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority177",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment57",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Had difficulty making decisions?",
                                    "title": "Had difficulty making decisions?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority179",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment58",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt completely overwhelmed?",
                                    "title": "Felt completely overwhelmed?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority181",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment59",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt useful and needed?",
                                    "title": "Felt useful and needed?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority183",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment60",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt lonely?",
                                    "title": "Felt lonely?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority185",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment61",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Been upset that my relative has changed so much from his/her former self?",
                                    "title": "Been upset that my relative has changed so much from his/her former self?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority187",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment62",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt a loss of privacy and/or personal time?",
                                    "title": "Felt a loss of privacy and/or personal time?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority189",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment63",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Been edgy or irritable?",
                                    "title": "Been edgy or irritable?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority191",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment64",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Had sleep disturbed because of care for my relative?",
                                    "title": "Had sleep disturbed because of care for my relative?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority193",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment65",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Had a crying spell?",
                                    "title": "Had a crying spell?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority195",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment66",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt strained between work and family responsibilities?",
                                    "title": "Felt strained between work and family responsibilities?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority197",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment67",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Had back pain?",
                                    "title": "Had back pain?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority199",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment68",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Felt ill: headaches, stomach problems, common cold?",
                                    "title": "Felt ill: headaches, stomach problems, common cold?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority201",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment69",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Been satisfied with the support my family has given me?",
                                    "title": "Been satisfied with the support my family has given me?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority203",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment70",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Found my relatives' living condition to be inconvenient or a barrier to care?",
                                    "title": "Found my relatives' living condition to be inconvenient or a barrier to care?",
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority205",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment71",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "rating",
                                    "name": "On a scale of 1-10 with 1 being \"not stressful\" to 10 being \"extremely stressful\" please rate your current level of stress.",
                                    "title": "On a scale of 1-10 with 1 being \"not stressful\" to 10 being \"extremely stressful\" please rate your current level of stress.",
                                    "valueName": "On a scale of 1-10 with 1 being \"not stressful\" to 10 being \"extremely stressful\" please rate your current level of stress",
                                    "rateValues": [
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                        "10"
                                    ],
                                    "rateMax": 10
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority207",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment72",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "rating",
                                    "name": "On a scale of 1-10 with 1 being \"very healthy\" to 10 being \"very ill\" please rate your current health to where it was last year.",
                                    "title": "On a scale of 1-10 with 1 being \"very healthy\" to 10 being \"very ill\" please rate your current health to where it was last year.",
                                    "rateValues": [
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                        "10"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority209",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment73",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Do you currently have any concerns about your caregiving (in the past week)?"
                        }
                    ],
                    "title": "Caregiver Assessment - How are you?",
                    "state": "collapsed"
                }
            ]
        },
        {
            "name": "Behavioral Health",
            "tabKey": 5,
            "elements": [
                {
                    "type": "html",
                    "name": "Collapse/Expand All",
                    "html": "<a class=\"sv-expand-all-sections-btn\" >Expand All</a>\n<a class=\"sv-collapse-all-sections-btn\">Collapse All</a>"
                },
                {
                    "type": "panel",
                    "name": "Patient Health Questionnaire-2 (PHQ-2)",
                    "assessmentSectionAnchor": "Patient Health Questionnaire-2 (PHQ-2)",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Over the last two weeks, how often have you been  bothered by any of the following problems?",
                            "thirdLevel": "Over the last two weeks, how often have you been  bothered by any of the following problems?",
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Little interest or pleasure in doing things",
                                    "title": "Little interest or pleasure in doing things",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority211",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment74",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Feel down or depressed",
                                    "title": "Feel down or depressed",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority213",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment75",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Over the last two weeks, how often have you been bothered by any of the following problems?"
                        }
                    ],
                    "title": "Patient Health Questionnaire-2 (PHQ-2)",
                    "state": "expanded"
                },
                {
                    "type": "panel",
                    "name": "Patient Health Questionnaire-9 (PHQ-9)",
                    "assessmentSectionAnchor": "Patient Health Questionnaire-9 (PHQ-9)",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Over the last two weeks, how often have you been bothered by any of the following problems?",
                            "thirdLevel": "Over the last two weeks, how often have you been bothered by any of the following problems?",
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Trouble falling or staying asleep, or sleeping too much",
                                    "title": "Trouble falling or staying asleep, or sleeping too much",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority215",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment78",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Feeling tired or having little energy",
                                    "title": "Feeling tired or having little energy",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority217",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment79",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Poor appetite or overeating",
                                    "title": "Poor appetite or overeating",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority219",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment80",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
                                    "title": "Feeling bad about yourself-or that you are a failure or have let yourself or your family down",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority221",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment81",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Trouble concentrating on things, such as reading the newspaper or watching television",
                                    "title": "Trouble concentrating on things, such as reading the newspaper or watching television",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority223",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment82",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Moving or speaking so slowly that other people could have noticed. Or the opposite-being so fidgety or restless that you have been moving around a lot more than usual",
                                    "title": "Moving or speaking so slowly that other people could have noticed. Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual",
                                    "valueName": "Moving or speaking so slowly that other people could have noticed  Or the opposite-being so fidgety or restless that you have been moving around a lot more than usual",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority225",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment83",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Thoughts that you would be better off dead, or of hurting yourself in some way",
                                    "title": "Thoughts that you would be better off dead, or of hurting yourself in some way",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority227",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment84",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Over the last two weeks, how often have you been bothered by any of the following problems?"
                        }
                    ],
                    "visibleIf": "({Little interest or pleasure in doing things} notempty and {Little interest or pleasure in doing things} != \"Not at all\") || ({Feel down or depressed} notempty and {Feel down or depressed} != \"Not at all\")",
                    "title": "Patient Health Questionnaire-9 (PHQ-9)",
                    "state": "expanded"
                },
                {
                    "type": "panel",
                    "name": "Generalized Anxiety Disorder (GAD-7)",
                    "assessmentSectionAnchor": "Generalized Anxiety Disorder (GAD-7)",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "Over the last two weeks, how often have you been bothered by any of the following problems?1",
                            "thirdLevel": "Over the last two weeks, how often have you been bothered by any of the following problems?1",
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Feeling nervous, anxious or on edge",
                                    "title": "Feeling nervous, anxious or on edge",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority229",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment85",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Not being able to stop or control worrying",
                                    "title": "Not being able to stop or control worrying",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority231",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment86",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Worrying too much about different things",
                                    "title": "Worrying too much about different things",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority233",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment87",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Trouble relaxing",
                                    "title": "Trouble relaxing",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority235",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment88",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Being so restless that it is hard to sit still",
                                    "title": "Being so restless that it is hard to sit still",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority237",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment89",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Becoming easily annoyed or irritable",
                                    "title": "Becoming easily annoyed or irritable",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority239",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment90",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Feeling afraid as if something awful might happen",
                                    "title": "Feeling afraid as if something awful might happen",
                                    "choices": [
                                        "Not at all",
                                        "Several days",
                                        "More than one half of days",
                                        "Nearly every day"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority241",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment91",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ],
                            "title": "Over the last two weeks, how often have you been bothered by any of the following problems?"
                        }
                    ],
                    "title": "Generalized Anxiety Disorder (GAD-7)",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "CAGE Substance Abuse Screening tool",
                    "assessmentSectionAnchor": "CAGE Substance Abuse Screening tool",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "panel",
                            "name": "panel2",
                            "elements": [
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Have you ever felt you should cut down on your drinking (or drug use)?",
                                    "title": "Have you ever felt you should cut down on your drinking (or drug use)?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you concerned about someone in your home using drugs or alcohol?} = \"No\" or {Are you concerned about someone in your home using drugs or alcohol?} empty) or {Have you ever felt you should cut down on your drinking (or drug use)?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority243",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment92",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Have people annoyed you by critizing your drinking (or drug use)?",
                                    "title": "Have people annoyed you by critizing your drinking (or drug use)?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you concerned about someone in your home using drugs or alcohol?} = \"No\" or {Are you concerned about someone in your home using drugs or alcohol?} empty) or {Have people annoyed you by critizing your drinking (or drug use)?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority245",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment93",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Have you ever felt bad or guilty about your drinking (or drug use)?",
                                    "title": "Have you ever felt bad or guilty about your drinking (or drug use)?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you concerned about someone in your home using drugs or alcohol?} = \"No\" or {Are you concerned about someone in your home using drugs or alcohol?} empty) or {Have you ever felt bad or guilty about your drinking (or drug use)?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority247",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment94",
                                    "title": "Comment",
                                    "maxLength": 5000
                                },
                                {
                                    "type": "radiogroup",
                                    "renderAs": "prettycheckbox",
                                    "name": "Have you ever had a drink (or used drugs) first thing in the morning to steady your nerves or get rid of a hangover?",
                                    "title": "Have you ever had a drink (or used drugs) first thing in the morning to steady your nerves or get rid of a hangover?",
                                    "validators": [
                                        {
                                            "type": "expression",
                                            "text": "Please fill in the required field",
                                            "expression": "({Are you concerned about someone in your home using drugs or alcohol?} = \"No\" or {Are you concerned about someone in your home using drugs or alcohol?} empty) or {Have you ever had a drink (or used drugs) first thing in the morning to steady your nerves or get rid of a hangover?} notempty"
                                        }
                                    ],
                                    "choices": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "type": "boolean",
                                    "renderAs": "prettycheckbox",
                                    "title": "Priority",
                                    "titleLocation": "hidden",
                                    "name": "priority249",
                                    "startWithNewLine": false,
                                    "defaultValue": "false",
                                    "htmlClass": "priority-align",
                                    "isPriority": true,
                                    "priorityFlag": true
                                },
                                {
                                    "type": "comment",
                                    "name": "Comment95",
                                    "title": "Comment",
                                    "maxLength": 5000
                                }
                            ]
                        }
                    ],
                    "title": "CAGE Substance Abuse Screening tool",
                    "state": "collapsed"
                }
            ]
        },
        {
            "name": "Engagement",
            "tabKey": 6,
            "elements": [
                {
                    "type": "html",
                    "name": "Collapse/Expand All",
                    "html": "<a class=\"sv-expand-all-sections-btn\" >Expand All</a>\n<a class=\"sv-collapse-all-sections-btn\">Collapse All</a>"
                },
                {
                    "type": "panel",
                    "name": "Patient's disease and motivation",
                    "assessmentSectionAnchor": "Patient's disease and motivation",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Level of understanding of the patient's disease and motivation",
                            "title": "Level of understanding of the patient's disease and motivation",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you understand your current health status?} = \"No\" or {Do you understand your current health status?} empty) or {Level of understanding of the patient's disease and motivation} notempty"
                                }
                            ],
                            "choices": [
                                {
                                    "value": "Stage 1",
                                    "text": "Stage 1: Understanding of disease and how their lifestyle/choices may be impacting the progression of their disease is low; may be in denial."
                                },
                                {
                                    "value": "Stage 2",
                                    "text": "Stage 2:  Understanding of disease and how their lifestyle/choices may be impacting the progression of the disease is not adequate; but they have some basic understanding."
                                },
                                {
                                    "value": "Stage 3",
                                    "text": "Stage 3:  Understanding of disease and how their lifestyle/choices may be impacting the progression of their disease is adequate; they understand their disease and have taken begun to understand their an improve their outcomes by setting goals and making changes."
                                },
                                {
                                    "value": "Stage 4",
                                    "text": "Stage 4:  Patient or caregiver has complete understanding of the disease; actively managing their care and fully engaged in improving their outcomes."
                                }
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority251",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment96",
                            "title": "Comment",
                            "maxLength": 5000
                        }
                    ],
                    "title": "Patient's disease and motivation",
                    "state": "expanded"
                },
                {
                    "type": "panel",
                    "name": "Patient Education",
                    "assessmentSectionAnchor": "Patient Education",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Patient/Caregiver can verbalize an accurate perception of health status; understands treatment plans without prompting; Integrates treatment plans into daily activities",
                            "title": "Patient/Caregiver can verbalize an accurate perception of health status; understands treatment plans without prompting; Integrates treatment plans into daily activities",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you understand your current health status?} = \"No\" or {Do you understand your current health status?} empty) or {Patient/Caregiver can verbalize an accurate perception of health status; understands treatment plans without prompting; Integrates treatment plans into daily activities} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority253",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment97",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Patient understands illness and participates in treatments; patient engaged in illness stabilization: incorporates treatment plans into daily activities",
                            "title": "Patient understands illness and participates in treatments; patient engaged in illness stabilization: incorporates treatment plans into daily activities",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you understand your current health status?} = \"No\" or {Do you understand your current health status?} empty) or {Patient understands illness and participates in treatments; patient engaged in illness stabilization: incorporates treatment plans into daily activities} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority255",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment98",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Patient/Caregiver can verbalize an accurate perception of health status; understands treatment plans with minimal prompting; inconsistently integrates treatment plans into daily activities",
                            "title": "Patient/Caregiver can verbalize an accurate perception of health status; understands treatment plans with minimal prompting; inconsistently integrates treatment plans into daily activities",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you understand your current health status?} = \"No\" or {Do you understand your current health status?} empty) or {Patient/Caregiver can verbalize an accurate perception of health status; understands treatment plans with minimal prompting; inconsistently integrates treatment plans into daily activities} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority257",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment99",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Patient/Caregiver verbalizes accurate perception of health status but does not integrate treatment plans into daily activities, Exhibits or expresses psychological alteration (anxiety, depression) resulting from misinformation or lack of information",
                            "title": "Patient/Caregiver verbalizes accurate perception of health status but does not integrate treatment plans into daily activities, Exhibits or expresses psychological alteration (anxiety, depression) resulting from misinformation or lack of information",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you understand your current health status?} = \"No\" or {Do you understand your current health status?} empty) or {Patient/Caregiver verbalizes accurate perception of health status but does not integrate treatment plans into daily activities, Exhibits or expresses psychological alteration (anxiety, depression) resulting from misinformation or lack of information} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority259",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment66",
                            "title": "Comment",
                            "maxLength": 5000
                        },
                        {
                            "type": "radiogroup",
                            "renderAs": "prettycheckbox",
                            "name": "Verbalizes a deficit in knowledge or skill regarding treatment plan",
                            "title": "Patient/Caregiver expresses an inaccurate perception of health status. Verbalizes a deficit in knowledge or skill regarding treatment plan. Does not correctly perform a desired or prescribed health behavior",
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Please fill in the required field",
                                    "expression": "({Do you understand your current health status?} = \"No\" or {Do you understand your current health status?} empty) or {Verbalizes a deficit in knowledge or skill regarding treatment plan} notempty"
                                }
                            ],
                            "choices": [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority261",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment100",
                            "title": "Comment",
                            "maxLength": 5000
                        }
                    ],
                    "title": "Patient Education",
                    "state": "collapsed"
                },
                {
                    "type": "panel",
                    "name": "Health Literacy",
                    "assessmentSectionAnchor": "Health Literacy",
                    "isExpandable": true,
                    "elements": [
                        {
                            "type": "text",
                            "name": "Consider the \"fifth vital sign\"",
                            "title": "Consider the \"fifth vital sign\"",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority263",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "text",
                            "name": "Consider them having read their prescription bottle",
                            "title": "Consider them having read their prescription bottle",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority264",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "text",
                            "name": "How often do you need help reading the information you receive from your doctor?",
                            "title": "How often do you need help reading the information you receive from your doctor?",
                            "maxLength": 256
                        },
                        {
                            "type": "boolean",
                            "renderAs": "prettycheckbox",
                            "title": "Priority",
                            "titleLocation": "hidden",
                            "name": "priority265",
                            "startWithNewLine": false,
                            "defaultValue": "false",
                            "htmlClass": "priority-align",
                            "isPriority": true,
                            "priorityFlag": true
                        },
                        {
                            "type": "comment",
                            "name": "Comment101",
                            "title": "Comment",
                            "maxLength": 5000
                        }
                    ],
                    "title": "Health Literacy",
                    "state": "collapsed"
                }
            ]
        }
    ],
    "showQuestionNumbers": "off"
}

export const gad7 = {
    "pages": [{
        "name": "page1",
        "elements": [{
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question1",
            "title": "Feeling nervous, anxious, or on edge",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question2",
            "title": "Not being able to stop or control worrying",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question3",
            "title": "Worrying too much about different things",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question4",
            "title": "Trouble relaxing",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question5",
            "title": "Being so restless that it's hard to sit still",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": " Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question6",
            "title": "Becoming easily annoyed or irritable",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question7",
            "title": "Feeling afraid as if something awful might happen",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question8",
            "title": "How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Somewhat difficult"
            }, { "value": "item3", "text": "Very difficult" }, { "value": "item4", "text": "Extremely difficult" }],
            "visibleIf": "({question1} != \"item1\" and {question1} notempty) or ({question2} != \"item1\" and {question2} notempty) or ({question3} != \"item1\" and {question3} notempty) or ({question4} != \"item1\" and {question4} notempty) or ({question5} != \"item1\" and {question5} notempty) or ({question6} != \"item1\" and {question6} notempty) or ({question7} != \"item1\" and {question7} notempty)"
        }],
        "title": "Over the last 2 weeks, how often have you been bothered by any of the following problems?\n"
    }]
}

export const phq9 = {
    "pages": [{
        "name": "page1",
        "elements": [{
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question1",
            "title": "Little interest or pleasure in doing things?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question2",
            "title": "Feeling down, depressed, or hopeless?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question3",
            "title": "Trouble falling or staying asleep, or sleeping too much?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question4",
            "title": "Feeling tired or having little energy?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question5",
            "title": "Poor appetite or overeating?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": " Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question6",
            "title": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question7",
            "title": "Trouble concentrating on things, such as reading the newspaper or watching television?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question8",
            "title": "Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question9",
            "title": "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
            "isRequired": true,
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Several days"
            }, { "value": "item3", "text": "More than half the days" }, {
                "value": "item4",
                "text": "Nearly every day"
            }]
        }, {
            "type": "radiogroup",
            "renderAs": "prettycheckbox",
            "name": "question10",
            "title": "How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
            "choices": [{ "value": "item1", "text": "Not at all" }, {
                "value": "item2",
                "text": "Somewhat difficult"
            }, { "value": "item3", "text": "Very difficult" }, { "value": "item4", "text": "Extremely difficult" }],
            "visibleIf": "({question1} != \"item1\" and {question1} notempty) or ({question2} != \"item1\" and {question2} notempty) or ({question3} != \"item1\" and {question3} notempty) or ({question4} != \"item1\" and {question4} notempty) or ({question5} != \"item1\" and {question5} notempty) or ({question6} != \"item1\" and {question6} notempty) or ({question7} != \"item1\" and {question7} notempty) or ({question8} != \"item1\" and {question8} notempty) or ({question9} != \"item1\" and {question9} notempty)"
        }],
        "title": "Over the last 2 weeks, how often have you been bothered by any of the following problems?\n"
    }]
}

export default { gad7, phq9, comprehensive }