import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { generarID } from '../utils';
import { CardMessage } from './';

export const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const {valuesInput, setValuesInput, handleInputChange, handleReset} = useForm({
      nombre: '',
      propietario: '',
      email: '',
      alta: '',
      sintomas: '',
    })
  const {nombre, propietario, email, alta, sintomas} = valuesInput;
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setValuesInput(paciente)
    }
  }, [paciente])

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // validación del formulario
    if([nombre, propietario, email, alta, sintomas].includes('')){
      setError(true);
      return
    }
    setError(false);

    //objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      alta, 
      sintomas
    }
    if(paciente.id){
      // Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map(item =>{
        if(item.id === paciente.id){
          return objetoPaciente;
        }
        return item;
      })
      setPacientes(pacientesActualizados);
      setPaciente({});

    }else{
      // Nuevo registro
      objetoPaciente.id = generarID(),
      setPacientes([...pacientes, objetoPaciente]);
    }
    //reinciar el form
    handleReset();
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        { error && <CardMessage style={{background: 'peru'}}><p>Todos los campos son obligatorios</p></CardMessage> }
        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input 
            id="mascota"
            type="text" 
            placeholder='Nombre de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={nombre}
            name="nombre"
            onChange={ (e) => handleInputChange(e)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input 
            id="propietario"
            type="text" 
            placeholder='Nombre del propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={propietario}
            name="propietario"
            onChange={ (e) => handleInputChange(e)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>Email</label>
          <input 
            id="email"
            type="email" 
            placeholder='Email contacto propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            name="email"
            value={email}
            onChange={ (e) => handleInputChange(e)} 
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Alta</label>
          <input 
            id="alta"
            type="date" 
            placeholder='dd/mm/aaaa'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            name="alta"
            value={alta}
            onChange={ (e) => handleInputChange(e)} 
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>Síntomas</label>
          <textarea 
            id="sintomas" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            placeholder='Describe los síntomas'
            name="sintomas"
            value={sintomas}
            onChange={ (e) => handleInputChange(e)}  
          />
        </div>

        <input 
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
  )
}
