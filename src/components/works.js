import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import CardTrabajos from "./cardTrabajos";
import axios from "axios";

const Works = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [work, setWork] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit =  (data) => {creatework(data) }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function creatework(data) {
    data.imagenes = data.imagenes.split(',');
    await axios.post("http://localhost:3001/work/",data)
  }

  async function getworks() {
   let dataWorks = await axios.get("http://localhost:3001/works/")
   setWork(dataWorks.data)
  }

  useEffect(()=>{
    getworks()
  },[])
  return (
    <>
      <div className="flex flex-col p-6 ">
        <div className="text-center">
          <p className="text-6xl">Trabajos</p>
        </div>
        <div>
          <div className="flex justify-center my-3">
            <button
              onClick={() => openModal()}
              className="bg-blue-500 text-white px-2 pb-px rounded text-2xl hover:bg-blue-400 active:bg-blue-600 "
            >
              Crear trabajo
            </button>
          </div>
          <div className="flex flex-row w-full flex-wrap justify-center">
            {
                
                work?.map((element,index) => <CardTrabajos key={index} imagen={element.photos} description={element.description} titulo={element.title} fecha={new Date(element.date * 1000).toLocaleDateString()}/>)
            }
            

          </div>
        </div>
      </div>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    Crear trabajo   
                  </Dialog.Title>
                  <div className="mt-2">
                    
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <label for="">Imagenes</label>
                    <textarea placeholder="link, link, link" className="shadow" {...register("imagenes")} rows="" cols=""></textarea>
                    
                      <label for="">Titulo</label>
                      <input placeholder="nombre" className="shadow"
                        {...register("titulo", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                      <label for="">Descripcion</label>
                      <textarea className="shadow" {...register("descripcion")} rows="" cols=""></textarea>
                      <button type="submit"> Enviar</button>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Works;
