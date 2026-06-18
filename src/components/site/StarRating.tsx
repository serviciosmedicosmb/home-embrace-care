import { Star } from "lucide-react";

interface Props {
  value: number; // 1..5
  size?: number;
  className?: string;
}

export function StarRating({ value, size = 16, className }: Props) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className ?? ""}`} aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < value ? "fill-amber-400 text-amber-400" : "text-amber-200"}
        />
      ))}
    </div>
  );
}

interface InteractiveProps {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}

export function InteractiveStarRating({ value, onChange, size = 28 }: InteractiveProps) {
  return (
    <div className="inline-flex items-center gap-1" role="radiogroup" aria-label="Calificación">
      {Array.from({ length: 5 }, (_, i) => {
        const v = i + 1;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            aria-label={`${v} estrella${v > 1 ? "s" : ""}`}
            onClick={() => onChange(v)}
            className="rounded p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
          >
            <Star
              width={size}
              height={size}
              className={v <= value ? "fill-amber-400 text-amber-400" : "text-gray-300"}
            />
          </button>
        );
      })}
    </div>
  );
}
