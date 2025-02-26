const wizard = [
    {
        "stepName"                         : "ACCOUNT CHECK",
        "stepTitle"                        : "Let's get started with the registration. Please provide the below details:",
        "stepType"                         : "form",
        "formConfig"                       : {
			"hideFormTitle"                : true,
			"formId"                       : "accountCheck",
            "focusColor"                   : "#00b1ac",
            "variant"                      : "toplabel",
            "sections"                     : [
                {
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "text",
							"id"           : "accountNumber",							
							"digitsOnly"   : true,
                            "label"        : "Enter your Account Number",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isNumber",
                                    "error": "Enter a valid Account Number"
                                }
							]
                        }
                    ]
                },
                {
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "phone",
							"id"           : "phoneNumber",
                            "label"        : "Enter your Phone Number",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isInternationalPhoneNumber",
									"error": "Invalid Phone Number"
                                }
							]
                        }
                    ]
                },
                {
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "select",
							"id"           : "documentType",
                            "label"        : "Select ID type",
                            "helperText"   : "",
                            "optionsList"  : [
                                {
                                    "id"   : 1,
                                    "label" : "National ID",
                                    "value" : "National ID"
                                },
                                {
                                    "id"   : 2,
                                    "label" : "Passport",
                                    "value" : "Passport"
                                },
                                {
                                    "id"   : 3,
                                    "label" : "Military ID",
                                    "value" : "Military ID"
                                },
                                {
                                    "id"   : 4,
                                    "label" : "AlienID",
                                    "value" : "AlienID"
                                }
							],
							"style" : {
                                "medium"      : true
							}
						},
						{
							"type"         : "text",
							"id"           : "idNumber",
                            "label"        : "Enter your ID Number",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isNotEmpty",
                                    "min"  : 5,
                                    "error": "Invalid ID Number"
                                },
                                {
                                    "type" : "isWithinNumericRange",
                                    "min"  : 5,
                                    "max"  : 10,
                                    "error": "Enter a valid ID Number",
                                    
                                }
							],
                            "style"          : {
                                "medium"      : true,
                                "mdRight": true
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        "stepName"                        : "Account Details",
        "stepTitle"                        : "By continuing, you confirm that the personal information provided is correct",
        "stepType"                         : "form",
        "formConfig"                       : {
			"hideFormTitle"                :true,	
			"formId"                       : "accountDetails",
            "focusColor"                   : "#00b1ac",
            "variant"                      : "toplabel",
            "sections"                     : [
                {
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "text",
							"id"           : "accountNumber",
							"disabled"     : true,
							"label"        : "Account Number",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isNumber",
                                    "error": "Account Number is Invalid"
                                }
							],
							"style":{
								"medium": true
							}
						},
						{
							"type"         : "text",
							"id"           : "idNumber",
							"disabled"     : true,
                            "label"        : "ID/Passport Number",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isNumber",
                                    "error": "ID Number is invalid"
                                }
							],
							"style":{
								"medium": true,
								"mdRight": true
							}
                        }
                    ]
				},
				{
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "text",
							"id"           : "accountName",
							"disabled"     : true,
                            "label"        : "Account Name",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isText",
                                    "error": "Account Name is invalid"
                                }
                            ],
							"style":{
								"medium": false
							}
						}
                    ]
				},
				{
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "email",
							"id"           : "email",
							"disabled"     : true,
                            "label"        : "Email",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isEmail",
                                    "error": "Email is invalid"
                                }
                            ]
                        }
                    ]
				},
				{
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "text",
							"id"           : "kraPIN",
							"disabled"     : true,
                            "label"        : "KRA PIN",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isKraPin",
                                    "error": "Enter a Valid KRA PIN"
                                }
                            ]
						}
                    ]
				},
				{
                    "groupTitle"           : "",
                    "display"              : "row",
                    "elements"             : [
                        {
							"type"         : "text",
							"id"           : "kraPINUpdated",
                            "label"        : "Confirm KRA PIN",
                            "helperText"   : "",
                            "validation"   : [
                                {
                                    "type" : "isKraPin",
                                    "error": "Enter a valid KRA PIN"
                                }
                            ]
						}
                    ]
				}
            ]
        }
    },
    {
        "stepName"                        : "Limit Setting",
        "stepTitle"                        : "Please set your transaction limits",
        "stepType"                         : "form",
        "formConfig"                       : {	
			"hideFormTitle"                : true,
			"formId"                       : "limitSetting",
            "focusColor"                   : "#00b1ac",
            "variant"                      : "toplabel",
            "sections"                     : [
				{
					"groupTitle"           : "",
					"display"              : "row",
					"elements"             : [
						{
							"type"         : "text",
							"id"           : "perTransactionLimit",
							"label"        : "Per Transaction Limit",
							"helperText"   : "",
							"validation"   : [
								{
									"type" : "isAmount",
									"error": "Invalid Per Transaction limit"
								}
							]
						}
						
					]
				},
				{
					"groupTitle"           : "",
					"display"              : "row",
					"elements"             : [
						{
							"type"         : "text",
							"id"           : "dailyLimit",
							"label"        : "Daily Transaction Limit",
							"helperText"   : "",
							"validation"   : [
								{
									"type" : "isAmount",
									"error": "Invalid daily limit"
								}
							]
						}
						
					]
				}								
			]
        }
    },
    {
        "stepName"                         : "Confirmation",
        "stepTitle"                        : "Confirm Registration",
		"stepType"                         : "summary",
		"heading"                          : "",
		"subHeading"                       : "Hey there, <br>You are about to register on the <b>Faulu Online Banking platform</b>. To proceed, click on the Register button below",
		"actionButtonLabel"                : "Register",
		"hideDetails"                      : true,
    }
]

export default wizard