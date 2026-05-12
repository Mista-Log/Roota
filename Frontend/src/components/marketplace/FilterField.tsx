import React from 'react';

interface FilterFieldProps {
  label: string;
  value: string;
}

export function FilterField({ label, value }: FilterFieldProps) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <div>{value}</div>
    </label>
  );
}
