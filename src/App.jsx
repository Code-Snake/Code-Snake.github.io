import { useState, useRef } from 'react'
import {Canvas} from "@react-three/fiber";
import './App.css'
import {Gas_cylinder} from "./models/Gas_cylinder.jsx";
import {Thermometer} from "./models/Thermometer.jsx"
import {Cylinder} from "./models/Cylinder.jsx";
import {Manometr} from "./models/Manometr.jsx";

let gas = [
    [2.0156, 20.78625, 29.10075, "#ffffff", "H2"],
    [32, 20.78625, 29.10075, "#ff8040", "O2"],
    [28.01, 20.78625, 29.10075, "#00c400", "CO"],
    [28.016, 20.78625, 29.10075, "#5c59e1", "N2"],
    [4.003, 12.47175, 20.78625, "#624ca2", "He"] ]


function App() {
    const height_input = useRef(null)
    const gas1_percent = useRef(null)
    const gas2_percent = useRef(null)

    let [gas_percent, setGas_percent] = useState(0)
    let [press_height, setPress_height] = useState(5)
    let [gas1, setGas1] = useState(0)
    let [gas2, setGas2] = useState(0)
    let [speed, setSpeed] = useState(1)
  return (
      //Move Down/Up, GetP is from Porshen, setSpeed refresh input module
      <div className="App">
          <Canvas
              camera={{
                  fov: 70,
                  position: [0, 20, 35]
              }}
          >
              <ambientLight intensity={0.4} position={[0, 30, 60]}/>
              <directionalLight intensity={1} position={[0, 30, 60]} />
              <Cylinder speed={speed} height={press_height} gas1={gas[gas1]} gas2={gas[gas2]} gas_percent={gas_percent}/>
              <Gas_cylinder pos = {[25, 2, -15]} color = {gas[gas1][3]} text ={gas[gas1][4]} />
              <Gas_cylinder pos = {[35, 2, -5]} color = {gas[gas2][3]} text ={gas[gas2][4]} />
              <Thermometer />
              <Manometr />
              <mesh position ={[0, -10, 0]} >
                  <boxGeometry args={[100, 1, 100]} />
                  <meshStandardMaterial color="grey" />
              </mesh>
          </Canvas>

          {/*SideBar where user set custom properties*/}
          <div className="sidebar">
              <div>
                  <label>Выберите высоту (см):</label>
                  <input ref = {height_input} defaultValue={5} type={"number"}/>
                  <button onClick={()=>{
                      let a = Number(height_input.current.value)
                      if (a < 1) {
                          a = 1
                      }
                      if (a > 20) {
                          a = 20
                      }
                      height_input.current.value = a;
                      setPress_height(a)
                  }}>Задать</button>
              </div>
              <div>
                  <label>Выберите газ для баллона 1:</label>
                  <select onChange={(e) => {
                      setGas1(e.target.value)
                  }}>
                      <option value={0}>H2</option>
                      <option value={1}>O2</option>
                      <option value={2}>CO</option>
                      <option value={3}>N2</option>
                      <option value={4}>He</option>
                  </select>
              </div>
              <div>
                  <label>Выберите газ для баллона 2:</label>
                  <select onChange={(e) => {
                      setGas2(e.target.value)
                  }}>
                      <option value={0}>H2</option>
                      <option value={1}>O2</option>
                      <option value={2}>CO</option>
                      <option value={3}>N2</option>
                      <option value={4}>He</option>
                  </select>
              </div>
              <div className="inputer">

                  <label>{"Первого газа в смеси (%): "}</label>
                  <input className="input_gas" value={gas_percent} type={"number"} onChange ={(e)=> {
                      let a = Number(e.target.value)
                      if (a < 0){
                          a = 0
                      }
                      if (a > 100){
                          a = 100
                      }
                      setGas_percent(a);
                  }}/>
                  <input min={0} max={100} ref ={gas1_percent} value={gas_percent} type={"range"} onChange ={(e)=> {
                      setGas_percent(Number(e.target.value));
                  }}/>
              </div>
              <div className="inputer">

                  <label>{"Второго газа в смеси (%): "}</label>
                  <input className="input_gas" value={100-gas_percent} type={"number"} onChange ={(e)=> {
                      if (e.target.value < 0){
                          setGas_percent(100 - Math.abs(Number(e.target.value)) % 100);
                      }
                      else {
                          setGas_percent(100 - Number(e.target.value) % 100);
                      }
                  }}/>
                  <input min={0} max={100} ref ={gas2_percent} value={100-gas_percent} type={"range"} onChange ={(e)=> {
                      setGas_percent(100 - Number(e.target.value));
                  }}/>
              </div>
              <div className="inputer">

                  <label>{"Скорость"}</label>
                  <input className="input_gas" value={speed} type={"number"} step={0.01}
                         onChange ={(e)=> {
                              let a = Number(e.target.value)
                              if (a < 0){ a = 0}
                              if (a > 1){ a = 1 }
                              setSpeed(a)
                         }}
                  />
                  <input min={0} max={100} value={speed*100} type={"range"}
                      onChange ={(e)=> {
                      setSpeed(Number(e.target.value)/100);
                      }}
                  />
              </div>
          </div>
      </div>
  )
}

export default App
