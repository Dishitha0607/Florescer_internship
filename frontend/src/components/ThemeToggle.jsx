import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.getElement.classList.remove("light", "dark");
    document.getElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button
        className="glass px-5 py-2 rounded-xl font-medium hover:scale-105 transition"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </>
  );
}

export default ThemeToggle;
