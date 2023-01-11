const Footer = () => {
    return (
      <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-900 text-white  ">
        <div className="container mx-auto flex items-center justify-between px-4 h-full">
          <p className="text-sm">Copyright © PKDR Finance</p>
          <div className="flex">
            <a href="#" className="px-3 py-2 rounded-full text-gray-500 hover:text-white">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="px-3 py-2 rounded-full text-gray-500 hover:text-white">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="px-3 py-2 rounded-full text-gray-500 hover:text-white">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  