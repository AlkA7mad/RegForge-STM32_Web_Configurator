// Dropdown.tsx

import styles from "./Dropdown.module.scss";

interface DropdownProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
