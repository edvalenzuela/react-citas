export const CardMessage = ({children, style={}, className= ''}) => {
  return (
    <div 
      style={style} 
      className={`${className} text-center text-white p-3 uppercase font-bold mb-3 rounded-md`}>
      {children}
    </div>
  )
}
