import axios from "axios";
import Colaider from "../colaider";

const Contacto = ({peticion,getcontac,contac}) => {

    async function deletContac(id) {
        let datacontac = await axios.delete(`${peticion}/contactos/${id}`)
        if(datacontac.data){
            getcontac()
            alert("Eliminado")
        }
        
    }
    
    async function actualizar(id,estado) {
        let datacontac = await axios.patch(`${peticion}/contactos/${id}`,{status:estado})
    
    }

    


    return ( <div className="px-6 pt-6">
        <div className="text-center mb-5">
          <p className="text-6xl">Contactos</p>
        </div>
      {contac?.map((elemet)=><Colaider actualizar={actualizar} deletContac={deletContac} fecha={elemet.date} nombre={elemet.nombre} mensaje={elemet.mensaje} id={elemet.id} leido={elemet.leido} correo={elemet.correo} asunto={elemet.asunto} />)  
      }
    </div> );
}
 
export default Contacto;