import './App.css'
import { useEffect, useState, useRef } from 'react'
import ColorPicker from './component/ColorPicker'
import  {AiFillCloseCircle,AiFillEdit} from "react-icons/ai"
import InputRange from './component/InputRange'
function App() {

  const [layerCurrent,setLayerCurrent] = useState({
    "id":1,
    "right": 0,
    "down" : 0,
    "spread" :3,
    "blur" : 5,
    "opacity" :20,
    "color":{
      'r':0,
      'g':0,
      'b':0,
      'a':0.2 
    },
    "inset" :false
  })
  const [layer,setLayer] = useState([{
    "id":1,
    "right": 0,
    "down" : 0,
    "spread" :3,
    "blur" : 5,
    "opacity" :20,
    "color":{
      'r':0,
      'g':0,
      'b':0,
      'a':0.2 
    },
    "inset" : false
  }])
  
  const handleInput = (value, name) => {
    const v = {}
    v[name] = value
    console.log(v);
    {name == "opacity" ?   setLayerCurrent({...layerCurrent,"opacity" :value, color:{...color, a: value/100} }) : setLayerCurrent({...layerCurrent, ...v,color:{...color}})}
    {name == "opacity" ?  setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, ...v,color:{...color, a: value/100} }: item)) : setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, ...v}: item))}
}
  console.log(layer);
  const handleOpacity = (value) => {
    setLayerCurrent({...layerCurrent,"opacity" :value, color:{...color, a: value/100} })
    setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, color:{...color, a: value/100}}: item))
  }

  const handleAddLayer = () => {
    const lastItem = layer[layer.length - 1]
    const index = lastItem.id + 1
    console.log(index);
    setLayer(
      [...layer,
        {...layerCurrent,
          "id" :index
        }
      ]
    )
  }

  const handleRemove = (index) => {
    const layer1 = [...layer]
    layer1.splice(index,1)
    setLayer(layer1)
  }
  const handleEdit = (id) => {
    const item = layer.find(item => item.id == id)
    setLayerCurrent(item)
    console.log(layerCurrent);
  }
  const handeInset = (e) => {
    setLayerCurrent({
      ...layerCurrent,
      "inset" : e.target.checked
    })
    setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, "inset" : e.target.checked}: item))
  }


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
  const handleBackgroundColor = (e) => {
    setBackgroundColor (e.rgb)
  }
  const handleColor = (e) => {
    setColor(e.rgb)
  }

  const handleSetShawdow = (e) => {
    setLayerCurrent({
      ...layerCurrent,
      "color":{
        ...e.rgb
      }
    })
    setLayer(layer.map(item => item.id === layerCurrent.id ? layerCurrent : item))
  }
  const getBoxShadow = () =>
    layer.map(item=>
      `${item.right}px ${item.down}px ${item.blur}px ${item.spread}px rgba(${item.color.r},${item.color.g},${item.color. b },${item.color.a})${item.inset ? "inset" : ""}`
    )

  return (
    <div className="app d-flex align-items-center">
      <div className="container">
        <div className="d-grid">
          <div className="control">
            <h1>Box-Shadow CSS Generator</h1>
            <InputRange
              min = {-50}
              max={50} 
              handleInput={(value,e) => handleInput(value,"right")} 
              label={"Shift right"}
              initial = {layerCurrent.right}
            />
            <InputRange
              min = {-50}
              max={50} 
              handleInput={(value) => handleInput(value,'down')} 
              label={"Shift down"}
              initial = {layerCurrent.down}
            />
            <InputRange
              min = {0}
              max={100} 
              handleInput={(value) => handleInput(value,"spread")} 
              label={"Spread"}
              initial = {layerCurrent.spread}
            />
            <InputRange
              min = {0}
              max={100} 
              handleInput={(value) => handleInput(value,"blur")} 
              label={"Blur"}
              initial = {layerCurrent.blur}
            />
            <InputRange
              min = {0}
              max={100} 
              handleInput={(value) => handleInput(value,"opacity")} 
              label={"Opacity"}
              initial = {layerCurrent.opacity}
            />

            <div className="mt-3">
              <input type="checkBox" id='inset' onChange={(e) => handeInset(e)}/>
              <label htmlFor="inset">Inset</label>
            </div>
            <div className="mt-3">
              <ColorPicker 
                color={layerCurrent.color}
                handleColorPicker={handleSetShawdow}
              />
            </div>
            <div className='mt-3'>
              <button className='btn btn-light mb-3' onClick={handleAddLayer}>Add Layer</button>
              <ul> 
                {
                  layer.map((item,index) => {
                    return(
                      <li 
                        key={item.id} 
                        className={`${item.id==layerCurrent.id ? 'layer-slice' : 'layer'} d-flex justify-content-between`}>
                          <span> {item.inset == true ? "inset" : ""} {` ${item.right}px ${item.down}px ${item.blur}px ${item.spread}px rgba(${item.color.r}, ${item.color.g}, ${ item.color.b }, ${item.color.a }) `}</span>
                          <div>
                            <button className='me-3'>
                              <AiFillEdit onClick ={() => handleEdit(item.id)}/>  
                            </button>
                            <button disabled= {layer.length == 1 ? "true" : "false"}>
                              <AiFillCloseCircle  onClick={() => handleRemove(index)}/>
                            </button>
                          </div>
                      </li>
                    )
                  })
                }

              </ul>
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
              <div className='box-preview' style={{
                "boxShadow": `${getBoxShadow()}`,
                "backgroundColor":`rgba(${color.r }, ${color.g }, ${ color.b }, ${color.a })`
            }}>

              </div>
            </div>
          </div>
          <div className="css-code">
            <h6>CSS code</h6>
              {
                layer.map((item)=>{
                  return(
                    <span key={item.id}>
                      {item.inset == true ? "inset" : ""} {`rgba(${item.color.r}, ${item.color.g}, ${ item.color.b }, ${item.color.a }) ${item.right}px ${item.down}px ${item.blur}px ${item.spread}px,`}
                    </span>
                  )
                })
              }
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
