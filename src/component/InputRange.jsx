import React, { useEffect,useState } from 'react'

export default function InputRange({label,min,max,handleInput,initial}) {
  const [inputValue,setInputValue] = useState(0)
  useEffect(() => {
    setInputValue(initial)
  },[initial])

  const handleChange = (e) => {
    setInputValue(e.target.value)
    handleInput(e.target.value)
  }
  return (
        <div className='mt-3'>
          <label className='d-block' htmlFor={label}>{label}</label>
          <input type="range" 
          min={min} max={max} 
          defaultValue={initial} 
          onInput={handleChange} 
          id={label} />
        </div>
  )
}
