import axios from "axios";
import { useEffect, useState } from "react";
import RichEditor from "./Editor";

const About = () => {
    const [quienesomosSend, setQuienesomos] = useState();
    const [misionSend, setMision] = useState();
    const [visionSend, setVision] = useState();
    const [getData, setData] = useState(null);

    async function work() {
        const response = await axios.get("http://localhost:3001/about/").catch(()=>alert("Error al cargar los datos"))
      setData(response.data[0]);
      }
    
      async function sendAbout() {
        const response = await axios.post("http://localhost:3001/about/",{quienesomos:quienesomosSend, mision:misionSend, vision:visionSend}).catch(()=>alert("Error al actualizar"))
        alert("datos actualizados")
      }

    useEffect(  () => {
        work()
      
    }, [])
    

    return ( <div className=" p-6  flex flex-col ">
        <div className="text-center">
            <p className="text-6xl">Sobre nosotros</p>
        </div>
        
        {

            getData!=null?<>
            <div>
        Quienes Somos
        <div >
        <RichEditor defaultDesc={getData.quienesomos}  setTextHtml={setQuienesomos}/>
        </div>
        </div>

        <div>
        Misión
        <div >
        <RichEditor defaultDesc={getData.mision}  setTextHtml={setMision}/>
        </div>
        </div>

        <div>
        Visión
        <div >
        <RichEditor defaultDesc={getData.vision} setTextHtml={setVision}/>
        </div>
        </div>
        <div className="flex justify-center my-3">
            <button onClick={()=>sendAbout()} className="bg-green-500 text-white px-2 rounded text-2xl hover:bg-green-400 active:bg-green-600 " >Guardar</button>
        </div></>:"cargando data..."
        }
    </div> );
}
 
export default About;