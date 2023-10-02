import { useEffect, useRef, useState } from 'react'

import './App.css'
import Menu from './Menu'

function App() {
  const canvasRef=useRef(null)
  const ctxRef=useRef(null)
  const [isDrawing,setIsDrawing]=useState(false)
  const [lineWidth,setLineWidth]=useState(5)
  const [lineColor,setLineColor]=useState("black")
  const [lineOpacity,setLineOpacity]=useState(0.1);
  const [clearScreen,setClearScreen]=useState(false)
  const [saveScreen,setSaveScreen]=useState(false)
  useEffect(()=>{
    const canvas=canvasRef.current
    const ctx=canvas.getContext("2d")
    canvas.width = 1100
    canvas.height = 590
  },[])

  useEffect(()=>{
    const canvas=canvasRef.current
    const ctx=canvas.getContext("2d")
    ctx.lineCap="round"
    ctx.lineJoin="round"
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current=ctx
    // canvas.width = 900
    // canvas.height = 500
    console.log("value changed");
  },[lineColor,lineOpacity,lineWidth])

  useEffect(()=>{
    console.log(clearScreen);
    console.log("clear screen");
    console.log("window height",window.innerHeight);
    if(clearScreen){
      const canvas=canvasRef.current
      const ctx=canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current=ctx
      setClearScreen(false)
    }
    if(saveScreen){
      saveCanvas()
      setSaveScreen(false)
    }
  },[clearScreen,saveScreen])

  // // draw square
  // const drawSquare=()=>{
  //   ctx.beginPath();
  //   ctx.rect(20, 20, 150, 100);
  //   ctx.stroke();
  // }

  // when drawing start or mouse button down
  const startDrawing=(e)=>{
    console.log("Drawing started");
    console.log(e.nativeEvent.offsetX);
    ctxRef.current.beginPath()
    ctxRef.current.moveTo( //starting of the line
      e.nativeEvent.offsetX+50,
      e.nativeEvent.offsetY
    )
    setIsDrawing(true)
  }

  // when drawing ends or mouse button up
  const endDrawing = ()=>{
    ctxRef.current.closePath() //stop drawing
    setIsDrawing(false)
  }

  const draw=(e)=>{
    if(!isDrawing){
      return
    }
      console.log("Drawing in progress");
      console.log("x,y:",e.nativeEvent.offsetX,
      e.nativeEvent.offsetY);
      ctxRef.current.lineTo(  //end of the line point, if continue drawing then line extend
        e.nativeEvent.offsetX+50,
        e.nativeEvent.offsetY
      )
    ctxRef.current.stroke()
  }
  

  function saveCanvas() {
    const canvas=canvasRef.current
    const ctx=canvas.getContext("2d")
   
    let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
    // const d = canvas.toDataURL('image/png');
    // const w = window.open('about:blank', 'image from canvas');
    // w.document.write("<img src='"+d+"' alt='from canvas'/>");
    console.log('Saved!');
  }
  return (
    <div className='container'>
      <Menu setLineColor={setLineColor}
                    lineColor={lineColor}
                    setLineWidth={setLineWidth}
                    lineWidth={lineWidth}
                    setLineOpacity={setLineOpacity}
                    setClearScreen={setClearScreen} 
                    setSaveScreen={setSaveScreen}/>
      <div style={{width:'100%'}}>
        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing}  onMouseOut={()=>{
          isDrawing && endDrawing()
        }}>
      </canvas>
      </div>

    </div>
  )
}

export default App
