import * as React from 'react';

interface Props {
    size: 'sm' | 'md' | 'lg';
}

function Logo(props: Props) {
    let size = 80;

    switch (props.size) {
        case 'sm':
            size = 40;
            break;
        case 'md':
            size = 80;
            break;
        case 'lg':
            size = 160;
            break;
    }
    return <img src={'../../../assets/logo.png'} width={size} />;
}

export default Logo;
