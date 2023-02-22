import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
const Login = ({setIniciado}) => {
  const [user, setUser] = useState("cristian.oliva")
  const [password, setPasword] = useState("-cristian-")

  function inicioDeSesion(data) {
    if (user===data.user && password===data.password) {
      setIniciado(true)
    }
    else{
      alert("Error")
    }
    
    
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => inicioDeSesion(data);
  const [view, setView] = useState(false)

  function changeView() {
    if (view==true) {
        setView(false)
    }
    else{
        setView(true)
    }
  }

  return (
    <div className="h-screen p-5 flex justify-center items-center">
      <div className="bg-gray-100 rounded-xl w-[400px] ">
        <div className="py-3">
        <div className="flex justify-center">
          <img src="/icono.png" className="w-24" alt="" />
        </div>
        <div>
          <form
            className="flex flex-col flex-nowrap px-20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label for="">Usuario</label>
            <input className="rounded-sm" defaultValue="" {...register("user", { required: true })} />
            <label for="">Contraseña</label>
            <div className="flex flex-row">
            <input type={view?"text":"password"} className="rounded-l-sm w-full" {...register("password", { required: true })} />
            <button onClick={()=>changeView()} className="pl-3 pr-2 bg-gray-300 rounded-r-sm" type="button">{view?<FaRegEye/>:<FaRegEyeSlash/>}</button>
            </div>
            {errors.exampleRequired && <span>Complete los dos campos</span>}

            <div className="text-white flex justify-center pt-4">
            <input className="bg-blue-900 px-6 py-1 rounded-sm" value={"iniciar"} type="submit" />
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
