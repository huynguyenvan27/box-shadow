import './App.css'
import {useState,useEffect} from 'react'
import ColorPicker from './component/ColorPicker'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import  {AiFillCloseCircle,AiFillEdit} from "react-icons/ai"
import InputRange from './component/InputRange'
function App() {

  const [layerCurrent,setLayerCurrent] = useState({
    id:1,
    right: 0,
    down : 0,
    spread :3,
    blur : 5,
    opacity :20,
    color:{
      r:0,
      g:0,
      b:0,
      a:0.2 
    },
    inset :false
  })
  const [layer,setLayer] = useState([{
    id:1,
    right: 0,
    down : 0,
    spread :3,
    blur : 5,
    opacity :20,
    color:{
      r:0,
      g:0,
      b:0,
      a:0.2 
    },
    inset : false
  }])
  
  useEffect(()=>{
    if(layer.length == 1){
      setLayerCurrent(layer[0])
    }
  },[layer])

  const handleInput = (value, name) => {
    const v = {}
    v[name] = value
    console.log(v);
    {name == "opacity" ?   setLayerCurrent({...layerCurrent,"opacity" :value, color:{...color, a: value/100} }) : setLayerCurrent({...layerCurrent, ...v,color:{...color}})}
    {name == "opacity" ?  setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, ...v,color:{...color, a: value/100} }: item)) : setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, ...v}: item))}
}

  const handleAddLayer = () => {
    let i = 0;
    layer.map(item => item.id > i ? i = item.id : i)
    const index = i + 1
    console.log(index);
    setLayer(
      [...layer,
        {...layerCurrent,
          id :index
        }
      ]
    )
  }

  const handleRemove = (id) => {
    const index = layer.findIndex(item => item.id == id)
    const layer1 = [...layer]
    layer1.splice(index,1)
    setLayer(layer1)
  }
  const handleEdit = (id) => {
    const item = layer.find(item => item.id == id)
    setLayerCurrent(item)
  }
  const handeInset = (e) => {
    setLayerCurrent({
      ...layerCurrent,
      inset : e.target.checked
    })
    setLayer(layer.map(item => item.id === layerCurrent.id ? {...item, inset : e.target.checked}: item))
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
      color:{
        ...e.rgb
      }
    })
    setLayer(layer.map(item => item.id === layerCurrent.id ? layerCurrent : item))
  }

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let list = Array.from(layer);
    let [reorderedItem] = list.splice(e.source.index, 1);
    list.splice(e.destination.index, 0, reorderedItem);
    setLayer(list);
  };

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
              <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable-1">
              {(provider) => (
              <ul {...provider.droppableProps}  ref={provider.innerRef}> 
                {
                  layer.map((item,index) => (
                      <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provider,snapshot) => {
                         const style = {
                          backgroundColor: snapshot.isDragging ? 'blue' : 'white',
                          ...provider.draggableProps.style,
                        }
                        const styleCurrent = {
                          backgroundColor: 'mediumturquoise',
                          ...provider.draggableProps.style,
                        }
                        return (
                        <li 
                        {...provider.draggableProps} 
                        ref={provider.innerRef} 
                        style={item.id==layerCurrent.id ? styleCurrent :style }
                        {...provider.dragHandleProps}
                        className="layer d-flex justify-content-between">
                          <span> {item.inset == true ? "inset" : ""} {` ${item.right}px ${item.down}px ${item.blur}px ${item.spread}px rgba(${item.color.r}, ${item.color.g}, ${ item.color.b }, ${item.color.a }) `}</span>
                          <div>
                            <button className='me-3'>
                              <AiFillEdit onClick ={() => handleEdit(item.id)}/>  
                            </button>
                            <button disabled= {layer.length == 1 ? "true" : ""} onClick={() => handleRemove(item.id)}>
                              <AiFillCloseCircle />
                            </button>
                          </div>
                      </li>)
                      }
                      }
                    </Draggable>
                    
                    )
                  )
                }
                 {provider.placeholder}
              </ul>
              )}
              </Droppable>
              </DragDropContext>
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
