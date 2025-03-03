
import axios, { AxiosHeaders }                from 'axios';
import https                from 'https';
import moment               from 'moment';
import Cookies 		        from 'universal-cookie';

import conf 	            from '@services/api/config.json';
import encryptedData        from '@services/helpers/dataEncryption';
import decrytPayload        from '@services/helpers/decryption';
import generateEncryptionKeys from '@services/helpers/cryptoKeys';

const customTimeout = 180000 // 2.5 minutes

// interface HeaderP {
//     Authorization?: string
//     ['XSRF-TOKEN']?: string
// }
interface FetchServiceProps {
    method: string
    url: string
    data: {}
    headers: AxiosHeaders
    skipAuth?: boolean
}
const fetch = async ( props: FetchServiceProps ) => {
    const { method, url, data, headers, skipAuth } = props;
	// Defaults
	let response: { status: number, data: { message: { secureKeys: string; data: string; } } } = { status: 400, data: { message: {data: '', secureKeys: ''}}}
	let responseData: { message: { secureKeys: string; data: string; } };
	let success      = false
	let statusCode   = 408  //timeout http code
	let postData     = data
	let urlPath      = url
	const headerConfig = headers
    
	//Fetch cookies
	const JwtCookie = new Cookies().get('ib_token')
	const xsrfCookie = new Cookies().get('XSRF-TOKEN')

    //Add Auth header
	if(JwtCookie){
		headerConfig['Authorization'] = `Bearer ${JwtCookie}`
	}
	if(xsrfCookie){
		headerConfig['XSRF-TOKEN'] = xsrfCookie
	}

    //Create URL
	if(!url.startsWith('http')){
		urlPath = `${conf.api}/${url}`
	}

    //Encrypt data
	//generate encryption keys, RSA non-extractable key pairs and random key & iv
	const { clientPublicKey, clientPrivateKey, serverPublicKey } = await generateEncryptionKeys();
	if(!skipAuth){
		postData = { 
            timestamp: moment().format(),
            payload: await encryptedData({ payload: data, serverPublicKey, clientPublicKey })
        }
	}
	
	// Axios Instance
    let instance = axios.create()
    if ( urlPath.startsWith('https') ){
        instance = axios.create({ httpsAgent: new https.Agent({ rejectUnauthorized: false }) })
    }
	instance.defaults.timeout = customTimeout	

	try {
		switch ( method ) {
			case "get":
				try {
					response = await instance.get(`${urlPath}`, postData)
				} catch (error) {
                    console.error(error)
					// response = error.response
				}
				break

			case "post":
				try {
					response = await instance.post(urlPath, postData, { headers: headerConfig })
				} catch (error) {
                    console.error(error)
					// response = error.response
				}
				break
		}
		statusCode   = response.status
		responseData = response.data

		if(statusCode === 200){
			success = true

			if(!skipAuth){
				responseData = await decrytPayload({ payload: responseData.message, clientPrivateKey })
			}
		}
		// clientPublicKey = '';
		// clientPrivateKey = '';
		// serverPublicKey = '';

		return { success, statusCode, responseData }
	}
	catch (e) {
        console.error(e)
		return { 
            success: false, 
            statusCode, 
            error:`API Fetch Error` 
        }
	}
};

export default fetch;