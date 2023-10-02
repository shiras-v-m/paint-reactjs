import React, { useEffect } from 'react'
import './Menu.css'
const Menu = ({ setLineColor,lineColor, setLineWidth,lineWidth,
  setLineOpacity,setClearScreen,setSaveScreen }) => {
    useEffect(()=>{
        console.log(lineColor,lineWidth);
    })
  return (

      <div className="Menu">
            <label className='brushPreviewTxt' htmlFor="">Brush preview</label>
            <div className="brushPreview">
                <div style={{backgroundColor:`${lineColor}`,width:`${lineWidth}px`,height:`${lineWidth}px`}} className="brushSize"></div>
            </div>
          <label className='brushColorTxt'>Brush Color </label>
          <input className='colorContainer' type="color" onChange={(e) => {
                  setLineColor(e.target.value);
              }}
          />
          <label className='BrushWidthTxt'>Brush Width </label>
          <input
              type="range"
              min="3"
              max="20" value={lineWidth}
              onChange={(e) => {
                  setLineWidth(e.target.value);
              }}
          />
          <label className='brushOpacityTxt'>Brush Opacity</label>
          <input
              type="range"
              min="1"
              max="100"
              onChange={(e) => {
                  setLineOpacity(e.target.value / 100);
              }}
          />
          <button onClick={(e)=>{
            setClearScreen(true)
          }} className='clearScreenBtn'>Clear Screen</button>
          <button  onClick={(e)=>{
            setSaveScreen(true)
          }} className='saveScreenBtn'>Save Image</button>


      </div>
  )
}

export default Menu