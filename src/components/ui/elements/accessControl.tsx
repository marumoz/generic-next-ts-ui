import React from 'react'

type AcProps = {
    userPermissions: [],
    allowedPermissions: [],
    children: string | React.JSX.Element,
    renderNoAccess(): null
}
const AccessControl = (props: AcProps) => {
    const {
        userPermissions = [],
        allowedPermissions = [],
        children,
        renderNoAccess
    } = props;

    const checker = (arr: [], target: []) => target.length > 0 && target.every(v => arr.includes(v))
    const permitted = checker(allowedPermissions, userPermissions)

    if(permitted){
        return children
    }
    renderNoAccess();
    return null;
};

export default AccessControl;
