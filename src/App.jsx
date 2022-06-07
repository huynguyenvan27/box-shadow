import './App.css'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import ColorPicker from './component/ColorPicker'
import  {AiFillCloseCircle,AiFillEdit} from "react-icons/ai"
function App() {
  
  const [inset,setInset] = useState(false)

  const [state,setState] = useState({
    "right": 0,
    "down" : 0,
    "spread" :3,
    "blur" : 5,
    "opacity" :20,
  })

  const [shadow,setShawdow] = useState({
    r:0,
    g:0,
    b:0,
    a:0.2
  })
  
  const [layer,setLayer] = useState([{...state,...shadow}])

  const [color,setColor] = useState({
    r:61,
    g:157,
    b:246,
    a:1
  })

  const [backgroundColor,setBackgroundColor] = useState(
    {
      r:255,
      g:255,
      b:255,
      a:1
    }
  )

  const handleSetShawdow = (e) => {
    setShawdow(e.rgb)
  }
  console.log();
  const handleBackgroundColor = (e) => {
    setBackgroundColor (e.rgb)
  }


  const handleColor = (e) => {
    setColor(e.rgb)
  }
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }
  const handleOpacity = (e) => {
    setShawdow({
      ...shadow,
      a:e.target.value/100
    })
  }

  const handleAddLayer = () => {
    setLayer(
      [...layer,
        {...state,...shadow}
      ]
    )
  }
  const handleRemove = (index) => {
    const layer1 = [...layer]
    layer1.splice(index,1)
    setLayer(layer1)
  }
  const handeInset = () => {
    setInset(!inset)
  }

  return (
    <div className="app d-flex align-items-center">
      <div className="container">
        <div className="d-grid">
          <div className="control">
            <h1>Box-Shadow CSS Generator</h1>
            <div className='mt-3'>
              <label className='d-block' htmlFor="sfr">Shift right</label>
              <input type="range" name='right' 
              min={-50} max={50} 
              defaultValue={state.right} 
              onChange={(e) => handleChange(e)} 
              id='sfr' />
            </div>
            <div className='mt-3'>
              <label className='d-block' htmlFor="sfd">Shift down</label>
              <input type="range" name='down' 
              min={-50} max={50} 
              defaultValue={state.down} 
              onChange={(e) => handleChange(e)} 
              id='sfd'  />
            </div>
            <div className='mt-3'>
              <label className='d-block' htmlFor="spread">Spread</label>
              <input type="range" name='spread' 
              defaultValue={state.spread} 
              onChange={(e) => handleChange(e)} 
              id='spread'  />
            </div>
            <div className='mt-3'>
              <label className='d-block' htmlFor="blur">Blur</label>
              <input type="range" name='blur' 
              defaultValue={state.blur} 
              onChange={(e) => handleChange(e)} 
              id='blur'  />
            </div>
            <div className='mt-3'>
              <label className='d-block' htmlFor="opacity">Opacity</label>
              <input type="range"
              name='opacity' 
              defaultValue={state.opacity} 
              onChange={(e) => handleOpacity(e)} id='opacity'  />
            </div>
            <div className="mt-3">
              <input type="checkBox" id='inset' onChange={handeInset}/>
              <label htmlFor="inset">Inset</label>
            </div>
            <div className="mt-3">
              <ColorPicker 
                color={shadow}
                handleColorPicker={handleSetShawdow}
              />
            </div>
            <div className='mt-3'>
              <button className='btn btn-light mb-3' onClick={handleAddLayer}>Add Layer</button>
              <div> 
              <div className='layer d-flex justify-content-between align-middle'>
                          <span>
                            {`${inset ? "inset" : ""} ${state.right}px ${state.down}px ${state.blur}px ${state.spread}px rgba(${shadow.r}, ${shadow.g}, ${ shadow.b }, ${shadow.a }) `}
                          </span>
                          <div>
                            <button className='me-3' disabled><AiFillEdit/></button>
                            <button disabled onClick={() => handleRemove(index)}><AiFillCloseCircle/></button>
                          </div>
                        </div>
                {/* {
                  layer.length >0 ? layer.map((item,index)=>{
                    return(
                      <>
                        <div className='layer d-flex justify-content-between align-middle' key={index}>
                          <span>
                            {`${item.right}px ${item.down}px ${item.blur}px ${item.spread}px rgba(${item.r}, ${item.g}, ${ item.b }, ${item.a }) `}
                          </span>
                          <div>
                            <button className='me-3' ><AiFillEdit/></button>
                            <button onClick={() => handleRemove(index)}><AiFillCloseCircle/></button>
                          </div>
                        </div>
                      </>
                    )
                  })
                  :""
                } */}
              </div>
            </div>
          </div>
          <div className="preview" >
            <div className='preview-header d-flex justify-content-between'>
              <h6 htmlFor="">Preview</h6>
              <div className='me-5'>
                <ColorPicker 
                  color={backgroundColor}
                  handleColorPicker={handleBackgroundColor}
                />
                <ColorPicker 
                  color={color}
                  handleColorPicker={handleColor}
                />
              </div>
            </div>
            <div className='d-flex justify-content-center p-5' style={{"backgroundColor":`rgba(${backgroundColor.r }, ${backgroundColor.g }, ${ backgroundColor.b }, ${backgroundColor.a })`}} >
              <div className='box-preview' style={{"boxShadow": `${state.right}px ${state.down}px ${state.blur}px ${state.spread}px rgba(${shadow.r}, ${shadow.g}, ${ shadow.b }, ${shadow.a })  ${inset ? "inset" : ""}`,
              "backgroundColor":`rgba(${color.r }, ${color.g }, ${ color.b }, ${color.a })`
            }}>

              </div>
            </div>
          </div>
          <div className="css-code">
            <h6>CSS code</h6>
            <span>{`box-shadow : ${inset ? "inset" : ""} rgba(${shadow.r}, ${shadow.g}, ${ shadow.b }, ${shadow.a }) ${state.right}px ${state.down}px ${state.blur}px ${state.spread}px`}</span>
            {/* {
              layer.length >0 ? layer.map((item,index)=>{
                return(
                  <span>
                    {`,rgba(${item.r}, ${item.g}, ${ item.b }, ${item.a }) ${item.right}px ${item.down}px ${item.blur}px ${item.spread}px`}
                  </span>
                )
              })
              :""
            } */}
          </div>
          <div className='template'>
            <h6>Template</h6>

          </div>
        
        </div>
      </div>
    </div>
  )
}

export default App
