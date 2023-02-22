import { Dialog, Transition } from "@headlessui/react";
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import CardSlider from "../cardSlider";

const Carrucel = ({peticion}) => {
    const [slider, setSlider] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();
  const onSubmit =  (data) => {creatework(data) }

  async function creatework(data) {
    await axios.post(`${peticion}/slider/`,data)
    closeModal()
    getImg()
  }

    async function getImg() {
        setSlider(null)
        let datasliders = await axios.get(`${peticion}/sliders/`)
        console.log(datasliders.data);
        setSlider(datasliders.data)
       }
    
       async function deletImg(id) {
        setSlider(null)
        let datasliders = await axios.delete(`${peticion}/slider/${id}`)
        getImg()
       }


       async function updateImg(id,data) {
        setSlider(null)
        let datasliders = await axios.patch(`${peticion}/slider/${id}`,data)
        getImg()
       }



       function closeModal() {
        setIsOpen(false);
      }
    
      function openModal() {
        setIsOpen(true);
      }

       useEffect(() => {
        getImg()
       }, [])
       
    return ( <>
    <div className="flex flex-col p-6">
    <div className="text-center">
          <p className="text-6xl">Carrucel</p>
        </div>
        <div className="flex justify-center my-3">
            <button
              onClick={() => openModal()}
              className="bg-blue-500 text-white px-2 pb-px rounded text-2xl hover:bg-blue-400 active:bg-blue-600 "
            >
              agregar slider
            </button>
          </div>
        <div className="flex justify-center flex-wrap">
            {
                slider?.map((element) => <CardSlider updateImg={updateImg} deletImg={deletImg} id={element.id} imagen={element.imagen} title={element.title} description={element.description}/> )
            }
            
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
                <Dialog.Panel className="w-[300px] max-h-[550px] md:w-[600px] lg:w-[600px] md:max-h-[600px] lg:max-h-[600px] overflow-y-auto  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    <label for="">Imagen</label>
                    <input placeholder="link imagen" className="shadow" {...register("imagen")} />
                    
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
    </> );
}
 
export default Carrucel;