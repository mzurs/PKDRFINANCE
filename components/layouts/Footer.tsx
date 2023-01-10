import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 border-4 border-indigo-500/100">
    <div className="container mx-auto flex items-center justify-between">
      <p className="text-sm">Copyright © My Application</p>
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
  
  )
}

export default Footer