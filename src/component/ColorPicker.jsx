import React from 'react'
import { useState } from 'react'
import {SketchPicker}  from 'react-color'
import reactCSS from 'reactcss'
export default function ColorPicker({color,handleColorPicker}) {
  const [display,setDisplay] = useState(false)
  const handleClick = () => {
    setDisplay(!display)
  }
  const handleClose = () => {
    setDisplay(!display)
  }

  const styles = reactCSS({
    'default': {
      color: {
        width: '40px',
        height: '20px',
        borderRadius: '2px',
        background: `rgba(${color?.r }, ${color?.g }, ${ color?.b }, ${color?.a })`,
      },
      swatch: {
        padding: '3px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });
  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <span className='d-block' style={ styles.color }>
        </span>
      </div>
      <div>
        { display? <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose}/>
          <SketchPicker
            color = {color}
            onChange = {handleColorPicker}
          />
        </div>
        : null
        }
      </div>
    </div>
  )
}
