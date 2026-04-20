
interface DropdownProps {
    label: string;
    options: {label: string; value: string }[],
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string; 
}

function Dropdown ({ label, options, value, onChange }: DropdownProps) {

    return(
        <>
        </>
    )
}

export default Dropdown;