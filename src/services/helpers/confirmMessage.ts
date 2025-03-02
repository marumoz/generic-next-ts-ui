const ConfirmationMessages = (transactionType: string) => {
    let cMessage = ''
    const IBLink = process.env.IBLink;

    switch (transactionType) {
        case 'buy-airtime': {
            cMessage = `I topped up my airtime instantly at ${IBLink}. You should try it too.`
        }break;
    
        default:
            cMessage = `My ${transactionType.replace(/-/g, ' ')} transaction at ${IBLink} was instant. You should try it too.`
            break;
    }

    return cMessage;
}

export default ConfirmationMessages;