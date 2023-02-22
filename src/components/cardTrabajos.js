import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CardTrabajos = ({imagen,titulo,description,fecha ,id, actualizar, eliminar}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {actualizar(id, data); closeModal();};
  
    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
    
    return ( <>
    <div className="flex p-5 bg-gray-100 text-black w-fit  flex-col shadow m-2 rounded">
                <div className="flex justify-between mb-2">
                    <button onClick={()=>openModal()} className=" rounded-md text-white px-2 bg-green-500 hover:bg-green-400 active:bg-green-600">Actualizar</button>
                    <button onClick={()=>eliminar(id)} className="rounded-md text-white px-2 bg-red-500 hover:bg-red-400 active:bg-red-600">Eliminar</button>
                </div>
              <div className="w-[250px] bg-black">
                {
                    imagen.split(",")?.map((element)=><img src={element} className="h-[200px] w-[250px]" alt="" />)
                }
              </div>
              <div className=" w-[250px]">
                <h1 className="text-3xl">{titulo?titulo:"N/A"} </h1>
                <h2 className="text-xl">{description?description:"N/A"}
                </h2>
              </div>
              <div className="flex justify-end text-gray-400">
                <p>{ fecha?(new Date(fecha).toLocaleDateString()):"N/A"}</p>
              </div>
            </div>
            {
                //modal
            }
            <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[300px] max-h-[550px] md:w-[600px] lg:w-[600px] md:max-h-[600px] lg:max-h-[600px] overflow-y-auto  max-w-md p-6 transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                    <button
                      type="button"
                      className=" justify-center rounded-full border border-transparent bg-blue-100 px-2 "
                      onClick={closeModal}
                    >
                      x
                    </button>
                    </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Actualizar trabajo
                  </Dialog.Title>
                  <div className="mt-2">
                    
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <label for="">Imagenes</label>
                    <textarea defaultValue={imagen} className="shadow" {...register("imagenes")} rows="" cols=""></textarea>
                    
                      <label for="">Titulo</label>
                      <input defaultValue={titulo} className="shadow"
                        {...register("titulo", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                      <label for="">Descripcion</label>
                      <textarea defaultValue={description} className="shadow" {...register("descripcion")} rows="" cols=""></textarea>
                      <button type="submit"> Enviar</button>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </> );
}
 
export default CardTrabajos;