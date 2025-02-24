const Footer = () => {
  return (
    <footer className="w-full h-auto bg-purple-400 text-slate-100 py-4 mt-3 md:mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Telif hakkı */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Ebre.com. Tüm hakları saklıdır.</p>

        {/* Sosyal medya bağlantıları */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Facebook</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
