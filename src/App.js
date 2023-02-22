import axios from 'axios';
import { useEffect, useState } from 'react';
import About from './components/view/about';
import Carrucel from './components/view/carrucel';
import Contacto from './components/view/contacto';
import Login from './components/view/login';
import Works from './components/view/works';

function App() {
  //acticiones de vistas
  const [trabajos, setTrabajos] = useState(false)
  const [nosotros, setNosotros] = useState(false)
  const [slider, setSlider] = useState(false)
  const [activeContacto, setActiveContacto] = useState(true)
  const [iniciado, setIniciado] = useState(false)

  const [peticion, setPeticion] = useState("https://www.apiuno.gruporefugio.cl")//
  //seteo de datos
  const [work, setWork] = useState(null);
  const [contac, setcontac] = useState(null);
  
  
  //activadores
  function ActivarTrabajos() {
    setTrabajos(true)
    setNosotros(false)
    setSlider(false)
    setActiveContacto(false)
  }
  function ActivarNosotros() {
    
    setNosotros(true)
    setTrabajos(false)
    setSlider(false)
    setActiveContacto(false)
  }

  function ActivarSlider() {
    setSlider(true)
    setNosotros(false)
    setTrabajos(false)
    setActiveContacto(false)
  }
  function ActivarContactos() {
    setActiveContacto(true)
    setSlider(false)
    setNosotros(false)
    setTrabajos(false)
  }
  //*********************
  //obtener datos
  async function getworks() {
    setWork(null)
    let dataWorks = await axios.get(`${peticion}/works/`)
    setWork(dataWorks.data)
   }
   async function getcontac() {
    setcontac(null)
    let datacontac = await axios.get(`${peticion}/contactos/`)
    setcontac(datacontac.data)

   }

   useEffect(()=>{
    getcontac()
    getworks()
  },[])

  return (
    <>
    {
      iniciado===false?<Login setIniciado={setIniciado} />:
      <>
      <nav className="fixed z-50 flex w-full justify-center px-2 py-2 bg-slate-500 ">
          <div className="">
            
            <div className=' '>
              <ul className="flex flex-row">

                  <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span onClick={()=> ActivarContactos()} className="ml-2 cursor-pointer">contactos</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    
                  >
                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span onClick={()=> ActivarSlider()} className="ml-2 cursor-pointer">Slider</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    
                  >
                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span onClick={()=> ActivarTrabajos()} className="ml-2 cursor-pointer">trabajos</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    
                  >
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span onClick={()=>ActivarNosotros()} className="ml-2 cursor-pointer">sobre nosotros</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='h-8'>
          
        </div>
        {
          activeContacto&&<Contacto peticion={peticion} getcontac={getcontac} contac={contac}/>
        }
        {
          slider?<Carrucel peticion={peticion}/>:""
        }
        
        {
          trabajos?<Works work={work} getworks={getworks} peticion={peticion}/>:""
        }
        {
          nosotros?<About peticion={peticion}/>:""
        }
      </>
    }
    </>
  );
}

export default App;
