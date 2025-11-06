import React, {useCallback} from 'react';

type Props = {
    onClick: Function;
    children: React.ReactNode;
    type?: 'primary' | 'danger';
};

const Button: React.FC<Props> = (props: Props) => {
    const onClick = useCallback(() => props.onClick, []);
    const style: Record<string, string> = {
        padding: 'var(--space-sm) var(--space-md)',
        border: '1px solid var(--primary)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--primary)',
        cursor: 'pointer',
        color: 'var(--onPrimary)',
    };
    switch(props.type) {
        case 'danger':
            style.color = 'var(--onError)';
            style.border = '1px solid var(--error)';
            style.background = 'var(--error)';
            break;
    }
    return (
        <button
            style={style}
            onClick={onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;