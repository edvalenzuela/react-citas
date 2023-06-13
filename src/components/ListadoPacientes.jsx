import { Paciente, CardMessage } from './';

export const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {
  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>
      
      {
        pacientes.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>
          {
            pacientes.map(item => (
              <Paciente 
                key={item.id} 
                item={item}
                setPaciente={setPaciente}
                eliminarPaciente={eliminarPaciente}
              />))
          }
        </>)
        : (<CardMessage className='bg-green-900'><p>No hay pacientes</p></CardMessage>)
      }
    </div>
  )
}