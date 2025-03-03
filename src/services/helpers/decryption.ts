const rsaDecryption = async (props: { secureKeys: string, clientPrivateKey: CryptoKey }) => {
    const { secureKeys, clientPrivateKey } = props;
    const decodedData = window.atob(secureKeys)
    const binaryData = Uint8Array.from(decodedData, (c) => c.charCodeAt(0));

    const decryptedKeys = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
            // hash: "SHA-256",
        },
        clientPrivateKey,
        binaryData
    );
    const decodedKeys = new TextDecoder().decode(decryptedKeys)
    const rawKeys = JSON.parse(decodedKeys)

    return {
        key: rawKeys.secretKey,
        iv: rawKeys.secretIv
    }
};

const hexToBuffer = (hexString: string) => {
    const arrayBuffer = new Uint8Array(hexString.length / 2)

    for (let i = 0; i < hexString.length; i += 2) {
        const byteValue = parseInt(hexString.substring(i, i + 2), 16)
        arrayBuffer[i / 2] = byteValue
    }

    return arrayBuffer
};

const aesDecryption = async (props: { key: string, iv: string, data: string }) => {
    const { key, iv, data } = props;
    const keyBuffer = hexToBuffer(key)
    const ivBuffer = hexToBuffer(iv)
    const encryptedDataBuffer = hexToBuffer(data)

    const decryptionKey = await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'AES-CBC' },
        false, // whether the key is extractable (i.e., can be used in exportKey)
        ['decrypt'] // can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
    const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
            name: 'AES-CBC',
            iv: ivBuffer,
        },
        decryptionKey,
        encryptedDataBuffer
    )

    return new TextDecoder().decode(new Uint8Array(decryptedBuffer))
};

const DecodeData = async (props: { payload: { secureKeys: string, data: string }, clientPrivateKey: CryptoKey }) => {
    const { payload, clientPrivateKey } = props;
    let decrypted;
    try {
        //retrive keys to decrypt data
        const { secureKeys, data } = payload

        let { key, iv } = await rsaDecryption({ secureKeys, clientPrivateKey });

        decrypted = await aesDecryption({ key, iv, data });

        decrypted = JSON.parse(decrypted);
        
        //Nullify and gabage collect the random key and iv
        key = null
        iv = null
    } catch (error) {
        console.error(error)
    }

    return decrypted;
};

export default DecodeData;