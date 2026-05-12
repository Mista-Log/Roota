import React from 'react';

interface SkillRowProps {
  name: string;
  level: string;
  value: number;
}

export function SkillRow({ name, level, value }: SkillRowProps) {
  return (
    <div className="skill-row">
      <div className="skill-row__top">
        <strong>{name}</strong>
        <span>{level}</span>
      </div>
      <div className="skill-row__track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
