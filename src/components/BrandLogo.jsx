import { Stethoscope } from "lucide-react";

export function BrandLogo({ showText = true, className = "", textClassName = "" }) {
  return (
    <div className={`flex items-center gap-3 font-bold text-slate-800 ${className}`}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
        <Stethoscope size={24} />
      </span>
      {showText && <span className={`text-xl tracking-tight sm:text-2xl ${textClassName}`}>MediCabinet</span>}
    </div>
  );
}