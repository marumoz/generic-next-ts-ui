
const generateRandomKey = async () => {
    // Generate a random 256-bit key and a 128-bit IV as Uint8Arrays
    const keyBytes = window.crypto.getRandomValues(new Uint8Array(32)) //32 bytes for AES-256
    const iv = window.crypto.getRandomValues(new Uint8Array(16)) //16 bytes for the IV

    const key = await window.crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: 'AES-CBC'},
        true,
        ['encrypt', 'decrypt']
    );

    return { key, iv };
};

const aesEncryption = async (props: { key: CryptoKey, iv: Uint8Array<ArrayBuffer>, payload: string }) => {
    const { key, iv, payload } = props;

    const encryptedDataBuffer = await window.crypto.subtle.encrypt(
        { 
            name: 'AES-CBC', 
            iv 
        },
        key,
        new TextEncoder().encode(payload)
    );

    return bufferToHex(encryptedDataBuffer);
};

const rsaEncryption = async (props: { serverPublicKey: string, payload: string }) => {
    const { serverPublicKey, payload } = props;
    //Decode public key from server sent as Base64 Encoded
    const publicKey = window.atob(serverPublicKey);
    const pemContent = publicKey.replace(/^-----BEGIN [^-]+-----$/m, '').replace(/^-----END [^-]+-----$/m, '').replace(/\s+/g, '');

    const binaryString = window.atob(pemContent);
    const publicKeyBuffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        publicKeyBuffer[i] = binaryString.charCodeAt(i);
    }

    const extractKey = await window.crypto.subtle.importKey(
        "spki", 
        publicKeyBuffer, 
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        }, 
        false, 
        ["encrypt"]
    );

    const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP'
            // hash: { name: 'SHA-256' } // If you want to use SHA-256 as your hash function for OAEP
        },
        extractKey,
        new TextEncoder().encode(payload)
    );

    return bufferToHex(encryptedBuffer);
};

const bufferToHex = (buffer: ArrayBuffer | Uint8Array<ArrayBuffer>) => {
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('')
};

const EncodeData = async (props: { payload: {}, serverPublicKey: string, clientPublicKey: string }) => {
    const { payload, serverPublicKey, clientPublicKey } = props;

    let encryptedData = {};

    try {
        const { key, iv } = await generateRandomKey();

        const data = await aesEncryption({ key, iv, payload: JSON.stringify(payload) });

        const exportedKey = await window.crypto.subtle.exportKey('raw', key);
        const keyHex = bufferToHex(exportedKey);
        const ivHex = bufferToHex(iv);
        
        const secureKeys = await rsaEncryption({
            serverPublicKey,
            payload: JSON.stringify({
                secretKey: keyHex,
                secretIv: ivHex
            })
        });

        encryptedData = {
            secureKeys,
            data,
            publicKey: clientPublicKey
        }

        //reset keys to null
        // key = null
        // iv = null
        // keyHex = null
        // ivHex = null
    } catch (error) {
        console.error(error)
    }

    return encryptedData;
};

export default EncodeData;