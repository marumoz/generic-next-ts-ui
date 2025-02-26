const camelToSentence = ( text: string ) => {
	text            = text.replace('form-','')
	const result      = text.replace( /([A-Z])/g, " $1" )
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
		
	return finalResult;
};

export default camelToSentence;