export default function AuthInput({
  icon: Icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) {
  const handleFocus = (e) => {
    e.target.style.borderColor = "rgba(6,182,212,.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,.12)";
    e.target.style.background = "rgba(255,255,255,.07)";

    const icon = e.target.parentElement.querySelector(".auth-input-icon");

    if (icon) {
      icon.style.color = "#06B6D4";
    }
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,.08)";
    e.target.style.boxShadow = "none";
    e.target.style.background = "rgba(255,255,255,.04)";

    const icon = e.target.parentElement.querySelector(".auth-input-icon");

    if (icon) {
      icon.style.color = "rgba(255,255,255,.28)";
    }
  };

  return (
    <>
      <style>{`
        .auth-input::placeholder{
          color:rgba(255,255,255,.28);
        }
      `}</style>

      <div className="relative">
        {/* Icon */}

        <div
          className="auth-input-icon"
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,.28)",
            pointerEvents: "none",
            transition: "color .2s ease",
            zIndex: 5,
          }}
        >
          <Icon size={16} />
        </div>

        <input
          className="auth-input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "0.75rem",

            color: "#fff",

            paddingLeft: "42px",
            paddingRight: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",

            fontSize: "14px",
            lineHeight: 1.4,

            outline: "none",

            transition:
              "border-color .2s ease, box-shadow .2s ease, background .2s ease",
          }}
        />
      </div>
    </>
  );
}
