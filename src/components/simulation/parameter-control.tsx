"use client";
import { useState } from "react";
import { parameterControls, type Parameters } from "@/lib/simulation/model";
export function ParameterControl({
  control,
  value,
  onChange,
}: {
  control: (typeof parameterControls)[number];
  value: number;
  onChange: (key: keyof Parameters, value: number) => void;
}) {
  const [edit, setEdit] = useState({ value, draft: String(value) });
  if (edit.value !== value) setEdit({ value, draft: String(value) });
  function type(raw: string) {
    const next = raw.trim() === "" ? NaN : Number(raw);
    if (Number.isFinite(next) && next >= control.min && next <= control.max) {
      setEdit({ value: next, draft: raw });
      onChange(control.key, next);
    } else setEdit({ value, draft: raw });
  }
  function commit() {
    const parsed = edit.draft.trim() === "" ? value : Number(edit.draft);
    const next = Number.isFinite(parsed)
      ? Math.min(control.max, Math.max(control.min, parsed))
      : value;
    setEdit({ value: next, draft: String(next) });
    onChange(control.key, next);
  }
  return (
    <div className="parameter" id={"parameter-" + control.key}>
      <label htmlFor={control.key + "-number"}>
        {control.label}
        <span>{control.unit}</span>
      </label>
      <div className="parameter-inputs">
        <input
          aria-label={control.label + " slider"}
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={(event) =>
            onChange(control.key, Number(event.target.value))
          }
        />
        <input
          id={control.key + "-number"}
          type="number"
          min={control.min}
          max={control.max}
          step="any"
          value={edit.draft}
          onChange={(event) => type(event.target.value)}
          onBlur={commit}
          aria-describedby={control.key + "-help"}
        />
      </div>
      <details>
        <summary>Parameter explanation</summary>
        <p id={control.key + "-help"} className="text-xs">
          {control.description}
        </p>
      </details>
    </div>
  );
}
