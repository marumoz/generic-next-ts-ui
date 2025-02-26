"use client"

import { PhoneNumberUtil } from 'google-libphonenumber';

interface ValidationProps {
    input: string
    type: string
    error: string
    min?: number
    max?: number
    expression?: string
}
const fastValidation = ( props: ValidationProps ) => {
    const { input, min, max, error: errorMessage, type: validatorName, expression: customExpression } = props;

	// const Validator = require("fastest-validator"); 
	// const v         = new Validator();
    const phoneUtil = PhoneNumberUtil.getInstance();

	interface Response {
		isValid: boolean
		message?: string
	}

	// let schema = {}
	// let checkSchema = false
	let oldLength
	let newLength
	let response: Response = {
		isValid: false,
		message: errorMessage || ""
	}
	
	switch ( validatorName ) {
		// case "acceptedFileType":{
			
		// }
		// 	break;
		case "customExpression":{
			
			response = {
				isValid :false,
				message : ""
			}

			try {
				if(customExpression){
					const mGExp = new RegExp(customExpression)
					response = {
						isValid : mGExp.test(input),
						message : ""
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
			break;
		case "isAlphaNumericStatement":
			
			oldLength= input.length
			newLength = input.replace(/[^a-zA-Z0-9 ,.:;]/g,'').length
			
			if ( oldLength === newLength ) {
				response.isValid = true
			}else{
				response.isValid = false
			}
			break;
		case "isAlphaNumericText":
			
			oldLength= input.length
			newLength = input.replace(/[^a-zA-Z0-9]/g,'').length
			
			if ( oldLength === newLength ) {
				response.isValid = true
			}else{
				response.isValid = false
			}
			break;
		case "isFdAmount":
			if ( parseInt(input, 10) >= Number(min) ) {
				response.isValid = true				
			}else {
				response.isValid = false
			}
			break;
		case "isPaybillAmount":
			if ( parseInt(input, 10) <= 150000 && parseInt(input, 10) >= 10 ) {
				response.isValid = true				
			}else {
				response.isValid = false
			}
			break;

		case "isDiasporaAmount":
			if ( parseInt(input, 10) <= 1000000 && parseInt(input, 10) >= 200 ) {
				response.isValid = true				
			}else {
				response.isValid = false
			}
			break;

		case "isValidCardNumber":
			
			oldLength= input.length
			newLength = input.replace(/[^0-9]/g,'').length
			
			if ( oldLength === newLength  && oldLength === 16 ) {
				response.isValid = true
			}else{
				response.isValid = false
			}

			break;
		case "isValidCardExpiry":
            const parts = input.split ( "/" )

			if ( parts.length === 2 ) {
				const d     = new Date()
				const year  = d.getFullYear().toString().slice(2)
				const month = d.getMonth() + 1

				// current year validation
				if ( 
					input.length       === 5   && 
					parts[0].length    === 2   && 
					parts[1].length    === 2   &&
					parseInt(parts[0], 10) < 13 &&  // months
					parseInt(parts[0], 10) > 0  &&  // months 
					parseInt(parts[1], 10) < 100 && // year
					parseInt(parts[1], 10) > -1     // year 
				){
					// same year, month has to be greater
					if ( parseInt(parts[1], 10) === parseInt(year, 10) && parseInt(parts[0], 10)  < Number(month) ){
                        response.isValid = false
					}else if ( parseInt(parts[1], 10) > parseInt(year, 10) ){
						response.isValid = true
					}else {
                        response.isValid = false
					}
					
				}
			}else {
				response.isValid = false		
			}

			break;
		case "isValidCvv":
			oldLength= input.length
			newLength = input.replace(/[^0-9]/g,'').length
			
			if ( oldLength === newLength  && oldLength === 3 ) {
				response.isValid = true
			}else{
				response.isValid = false
			}
			break;

		case "isInternationalPhoneNumber":
			
			oldLength= input.length
			newLength = input.replace(/[^0-9]/g,'').length
			
			if ( 
				oldLength === newLength && oldLength === 12  && input.startsWith("2")  
			) {
				response.isValid = true
			}else {
				response.isValid = false
			}
			break
		case "isDiasporaPhoneNumber":{
			try {
                response.isValid = phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(input));
            } catch (error) {
                console.error(error)
                response.isValid = false;
            }
		}break
		case "isStatement" :
            try {
                const dataLength = input.length
                response = {
                    isValid : /[^A-Za-z\s]+$/.test(input.toString().trim())
                }
                if (max && dataLength > Number(max)) {
                    response = {
                        isValid : false,
                        message : `Exceeds length ${max}`
                    }
                }
            }catch ( e ) {
                console.error(e)
                response = {
                    isValid : false
                }
            }
			break;
		
		// case "isBillAmount":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : 5,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
        //     response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
		// 	break
		// case "isAmount":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : min || 1,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
		// 	response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
		// 	break
		// case "isNumberWithin":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : min || 1,
		// 			max     : max || 1,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
		// 	response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
		// 	break
		// case "isLockSavingsAmount":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : 5000,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
		// 	response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
		// 	break

		// case "isFtAmount":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : 100,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
		// 	response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
		// 	break
		// case "isPesalinkAmount":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : 100,
		// 			max     : 999999,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
		// 	response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
		// 	break
		case "isText":
			const oldInp = input.replace(/[^A-Za-z ]/g, '')
			if(input === oldInp && input.length > 1){
				response.isValid = true
			}else{
				response.isValid = false
			}
			// if (/^[A-Za-z]+$/i.test(input)) {
			// 	response = {
			// 		isValid :true
			// 	}
			// }
			// else {
			// 	response = {
			// 		isValid :false
			// 	}
			// }
			break;
		// case "isAirtimeAmount":
		// 	schema = {
		// 		input: {
		// 			type    : 'number',
		// 			positive: true,
		// 			min     : 10,
		// 			convert: true
		// 		}
		// 	}

		// 	checkSchema = v.validate ( { input }, schema )
			
		// 	response.isValid = typeof checkSchema === 'boolean' ? checkSchema : false
			
		// 	break
		case "isKraPin":
			if ( input.length > 0 ) {
				const startsWithLetter = input[0].match(/[a-zA-Z]/i) && input[0].length === 1 || false
				const endsWithLetter   = input[input.length-1].match(/[a-zA-Z]/i) && input[input.length-1].length === 1 || false
				const contains9Digits  = input.replace( /[^0-9]/g,'').length === 9
				const contains2Letters = input.replace( /[^a-z]/gi,'').length === 2

				if ( startsWithLetter && endsWithLetter && contains9Digits && contains2Letters && input.length === 11 ){
					response.isValid = true
				}else{
                    response.isValid = false
				}
			}
			else {
				response.isValid = false
			}
			break
		case "isIdNumber":

			oldLength= input.length
			newLength = input.replace(/[^0-9]/g,'').length
			
			if ( oldLength === newLength && oldLength >= 6  ) {
				response.isValid = true
			}else {
				response.isValid = false
			}
			break;
		case "isPhoneNumber":{
			try {
                response.isValid = phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(input));
            } catch (error) {
                console.error(error)
                response.isValid = false;
            }
		}break;
		case "isCbAccountNumber":
			oldLength= input.length
			newLength = input.replace(/[^0-9]/g,'').length
			
			if ( oldLength === newLength && oldLength > 8 && oldLength < 20 ) {
				response.isValid = true
			}else {
				response.isValid = false
			}

			break;
		case "isWithinNumericRange":
			if (input.length >= Number(min) && input.length <= Number(max) ) {
				response.isValid = true
			}else {
				response = {
					isValid :false,
					message : errorMessage
				}
			}
			break;
		case "isNumber":

			oldLength = input.length
			newLength = input.replace(/[^0-9]/g,'').length
			
			if ( oldLength === newLength && oldLength > 0 ) {
				response.isValid = true
			}else {
				response.isValid = false
			}

			break;
		case "is6Digits":
				
				if ( input.length === 6  ) {
					response.isValid = true
				}else {
                    response.isValid = false
				}
	
				
				break;
		case "isEmail":
			const re = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			const isEmail = re.test(input)
			
				response = {
					isValid: isEmail,
					message : ""
				}
			break;
		case "isAny":
			response.isValid = true
			break;

		case "isNotEmpty":
			if (input.trim() !== "" && min && input.trim().length >= Number(min)) {
				response.isValid = true
			}else if (input.trim() !== "" && !min) {
				response.isValid = true
			}else {
				response.isValid = false
			}			
			break;
		default:
            response.isValid = true
			break; 
	}

	return response
}

export default fastValidation