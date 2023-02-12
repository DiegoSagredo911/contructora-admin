import { useState } from 'react';
import logo from './logo.svg';

function App() {
  return (
    <>
    <nav className="fixed z-50 flex w-full justify-center px-2 py-2 bg-slate-500 ">
        <div className="">
          
          <div className=' '>
            <ul className="flex flex-row">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">contactos</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">trabajos</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">sobre nosotros</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='h-8'>
        
      </div>
    </>
  );
}

export default App;
