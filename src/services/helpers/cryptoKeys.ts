import axios    from 'axios';
import https    from 'https';

import conf 	from '@services/api/config.json';

const urls = conf.paths

const webCryptoApi = async () => {
    // Generate RSA key pair
    const encKeyPairs = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096, 
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: { name: "SHA-256" }
        },
        false,
        [ "encrypt", "decrypt" ]
    );

    //fetch API public key for AES keys encryption
    let serverPublicKey = sessionStorage.getItem('ibpublickey');
    console.log(serverPublicKey)

    if(!serverPublicKey){
        serverPublicKey = await fetchPublicKey();
        sessionStorage.setItem('ibpublickey', serverPublicKey)
    }

    const convertedKey = await window.crypto.subtle.exportKey("jwk", encKeyPairs.publicKey)

    return {
        clientPrivateKey: encKeyPairs.privateKey,
        clientPublicKey: JSON.stringify(convertedKey),
        serverPublicKey
    };
};

const fetchPublicKey = async () => {
    const urlPath = `${conf.api}/${urls['fetch-public-key']}`
    let instance = axios.create()
	instance.defaults.timeout = 20000

    if ( urlPath.startsWith('https') ){
        instance = axios.create({ httpsAgent: new https.Agent({ rejectUnauthorized: false }) })
    }

    let response: { data?: string } = {}
    try {
        response = await instance.post(urlPath)
    } catch (error) {
        console.error(error)
    }

    return response?.data || "public key not found";
}

export default webCryptoApi;