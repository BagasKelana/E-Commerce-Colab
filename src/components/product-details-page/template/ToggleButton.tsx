import { LucideProps } from 'lucide-react';

type ToggleButtonProps = {
    textIcon: React.FC<LucideProps>;
    text: string;
    buttonClassName?: string;
    iconClassName?: string;
    textClassName?: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
    textIcon: Icon,
    text,
    buttonClassName,
    iconClassName,
    textClassName
}) => {
    return (
        <button className={buttonClassName}>
            <Icon className={iconClassName} />
            <span className={textClassName}>{text}</span>
        </button>
    );
};

export default ToggleButton;
