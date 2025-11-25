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
      <div className="space-x-8 text-lg font-semibold text-gray-300">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="/add-post" className="hover:text-white transition">Add your own story</a>
      </div>

    </nav>
  );
}