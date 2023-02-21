import React,{useState}from 'react'
import QRCode from 'react-qr-code'
import "./Qr.scss"
import { Button,Icon,Input } from 'semantic-ui-react';


export function Qr() {
  const [inputValue, setInputValue] = useState("")

  const donwloadQr = () =>{

    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");


      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

  }

  return (
    <div className='Qr'>

<div className='QrImage' >
    <QRCode
    size={400}
    bgColor= '#F4D529' 
    fgColor= "#252A37"
    level='L'
    
    value={inputValue}
    

    id="QRCode"
    />
</div>

    <Input  focus placeholder="Ingresa la URL del taxi" onChange={(e)=>setInputValue(e.target.value)}></Input>
    
      
     
       
      

    <Button animated onClick={donwloadQr} value="Download">
    <Button.Content visible> Descargar </Button.Content>
    <Button.Content hidden>
    <Icon name='download' />
    </Button.Content>
       
      
    </Button>

    </div>
  )
}
