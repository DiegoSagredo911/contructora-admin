import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineMailOpen, HiOutlineMail,HiOutlineTrash } from "react-icons/hi";
const Colaider = ({ nombre, fecha,mensaje,id, leido,correo, asunto,deletContac,actualizar  }) => {
  const [colaider, setColaider] = useState(false);
  const [estatusLeido, setEstatusLeido] = useState(0);

  function activeColaider() {

    if (colaider === true) {
      setColaider(false);
    } else {
      setColaider(true);
    }
  }


  function detectedDate(date) {
    let minutes = new Date(date).getMinutes()
    if (minutes<10) {
        minutes = "0"+minutes
    }
    if (new Date(date).toDateString() === new Date().toDateString()) {
      return `${new Date(date).getHours() + ":" + minutes}`;
    } else {
      return new Date(date).toLocaleDateString();
    }
  }

  useEffect(() => {
    if (leido) {
        setEstatusLeido(1)
    }
    
  }, [])
  

  

  return (
    <div className="bg-gray-200 mb-2 rounded-2xl">
      <div   className="flex justify-between items-center h-12 px-3 ">
        <div onClick={() => {
              activeColaider();
              actualizar(id,0);
              setEstatusLeido(1);
            }} className="flex items-center cursor-pointer">
          <span 
          >
            {!colaider ? (
              <MdKeyboardArrowRight className="text-2xl" />
            ) : (
              <MdKeyboardArrowDown className="text-2xl" />
            )}
          </span>
          <div>
          <h1 className={!estatusLeido?"font-bold":""}>{asunto ? asunto : "N/A"}</h1>

          </div>

        </div>

        <div className="flex flex-row items-center">
        <div className={!estatusLeido?"font-bold":""}>{fecha ? detectedDate(fecha) : "N/A"}</div>
        
            <div onClick={()=>{actualizar(id,estatusLeido); estatusLeido==1?setEstatusLeido(0):setEstatusLeido(1)}} className="flex items-center text-xl ml-1 cursor-pointer">
                {estatusLeido?<HiOutlineMailOpen/>:<HiOutlineMail/>}
            </div>
            <div onClick={()=>deletContac(id)} className="flex items-center text-xl ml-1 cursor-pointer">
                <HiOutlineTrash/>
            </div>
        </div>
        
      </div>
      {colaider&&<div className="px-3 pb-2">
        <div className="flex flex-col">
        <h1><span className="text-">Nombre:</span> {nombre ? nombre : "N/A"}</h1>
        <a href={`mailto:${correo}?subject=re:${asunto}&amp;`}>Email: {correo ? correo : "N/A"}</a>
        Mensaje: 
        </div> 
      {mensaje ? mensaje : "N/A"}
      </div>}
    </div>
  );
};

export default Colaider;
