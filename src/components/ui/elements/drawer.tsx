"use client"

import styled   from 'styled-components';

interface ModalProps {
    isOpen: boolean
    toggle(): null
    size: string
    children: string | React.JSX.Element
}
function Modal(props: ModalProps) {
    const { isOpen = false, toggle, size, children } = props;
    const width = size || '280px'

    return (
        <>
        {isOpen ? (
            <>
                <div className="fixed inset-0 z-50">
                    <div className="flex items-center justify-end w-full h-screen py-4 text-center">
                        <div className="fixed inset-0 transition-opacity" onClick={toggle} aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                    {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                        {/* <span tw="hidden sm:inline-block sm:align-middle sm:h-full" aria-hidden="true">&#8203;</span> */}
                        <Container $drawersize = {width}>
                            {children}
                        </Container>
                    </div>
                </div>
            </>
        ) : null}
        </>
    );
}

type ContProps = {
    $drawersize: string
}
const Container = styled.div<ContProps>`
    width: ${p => p.$drawersize};
`;

export default Modal;