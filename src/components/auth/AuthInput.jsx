export default function AuthInput({
  icon: Icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  focusColor = "cyan",
}) {
  const ringColor =
    focusColor === "cyan"
      ? "focus:ring-cyan-500/50 focus:border-cyan-500"
      : "focus:ring-purple-500/50 focus:border-purple-500";

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className={`block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl bg-slate-950/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${ringColor}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
