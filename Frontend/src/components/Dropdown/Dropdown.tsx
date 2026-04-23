// Dropdown.tsx

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
        <label>{label}</label>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
            { options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </>
    )
}

export default Dropdown;