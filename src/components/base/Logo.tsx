import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const img = require('../../../assets/logo.png');
import logo from '../../assets/logo.png';

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
    return <img src={logo} width={size} />;
}

export default Logo;
