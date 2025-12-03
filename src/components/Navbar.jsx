export default function NavBar() {
  return (
    <nav className="bg-gray-900 shadow-lg p-6 flex flex-col items-center">
      
      {/* Title */}
      <div
        className="text-5xl font-bold"
        style={{
          fontFamily: "'Creepster', cursive",
          color: "#ffffff",
          letterSpacing: "2px",
          textShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 12px rgba(255,255,255,0.3)"
        }}
      >
        Ghost Stories
      </div>

      {/* Spacing */}
      <div className="h-4"></div>

      {/* Links */}
      <div
  style={{
    display: "flex",
    gap: "12px", // adjust the spacing
    fontSize: "1.125rem", // same as text-lg
    fontWeight: 600,
    color: "#d1d5db", // same as text-gray-300
  }}
>
  <a href="/" style={{ textDecoration: "none", transition: "color 0.3s" }} 
     onMouseOver={e => (e.currentTarget.style.color = "#ffffff")}
     onMouseOut={e => (e.currentTarget.style.color = "#d1d5db")}>
    Home
  </a>
  <a href="/add-post" style={{ textDecoration: "none", transition: "color 0.3s" }}
     onMouseOver={e => (e.currentTarget.style.color = "#ffffff")}
     onMouseOut={e => (e.currentTarget.style.color = "#d1d5db")}>
    Add your own story
  </a>
</div>

    </nav>
  );
}
