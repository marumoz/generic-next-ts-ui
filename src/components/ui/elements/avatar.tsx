"use client"

import styled from 'styled-components';

interface AvatarProps {
    initials: string
    sm?: boolean
    lg?: boolean
    xl?: boolean
}
const Avatar = (props: AvatarProps) => {
    const { initials, sm, lg, xl } = props;
    return (
        <Container avatarname = {initials} className={`flex items-center justify-center overflow-hidden text-center rounded-full shadow-lg cursor-default ${lg ? 'w-16 h-16 text-xl' : ''} ${sm ? 'w-10 h-10 text-xl' : ''} ${xl ? 'w-20 h-20 md:w-24 md:h-24 text-4xl' : ''}`} >
            <span className='font-extrabold uppercase'>{initials}</span>
        </Container>
    )
}

const colors = ['#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#D47500', '#DC2A2A'];

function numberFromText(text: string): number {
    // numberFromText("AA");
    const charCodes = text
      .split('') // => ["A", "A"]
      .map(char => char.charCodeAt(0)) // => [65, 65]
      .join(''); // => "6565"
    return Number(charCodes);
};

interface ContainerProps {
    avatarname: string
}
const Container = styled.div<ContainerProps>`
    background: ${p => colors[numberFromText(p.avatarname) % colors.length]};
`;

export default Avatar;