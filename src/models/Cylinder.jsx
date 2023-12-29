import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import modelPath from "./cylinder.glb";
import porshenPath from "./porshen.glb";
import gasPath from "./GASNEW.glb";
import {lerp} from "three/src/math/MathUtils.js";

export let temperature = 22
export let pressure = 22
export function Cylinder(args) {
    const cyl = useGLTF(modelPath).nodes.Cylinder;
    const gas = useGLTF(gasPath).nodes.Cylinder;
    const porshen = useGLTF(porshenPath).nodes.Cylinder.geometry;
    const porshen001 = useGLTF(porshenPath).nodes.Cylinder001.geometry;

    const x = useRef(null);
    const y1 = useRef(null);
    const y2 = useRef(null);
    let speed = args.speed*0.1
    let gas_percent = args.gas_percent
    useFrame(()=>{
        let height = lerp((x.current.position.y), args.height, speed)
        x.current.position.y = height;
        let m1 = ((gas_percent/10)*args.gas1[0]*Math.PI*0.01*(height/100))/22.4;
        let m2 = (((100 - gas_percent)/10)*args.gas2[0]*Math.PI*0.01*(height/100))/22.4;
        let Cv = ((args.gas1[1])*m1 + (args.gas2[1])*m2)/(m1+m2)
        let Cp = ((args.gas1[2])*m1 + (args.gas2[2])*m2)/(m1+m2)
        let gamma = Cp/Cv
        let del = ((5/100)*Math.PI*0.01)/((height/100)*Math.PI*0.01)
        temperature = Math.pow(del, gamma - 1) * 295.15 - 273.15
        pressure = 101325*Math.pow(del, gamma)/1000
        y1.current.scale.y = height
        y2.current.scale.y = height
        y1.current.material.opacity = (gas_percent)/(100*(height + 1))
        y2.current.material.opacity = (100 - gas_percent)/(100*(height+1))
    })
    return (
        <group>
            <group ref = {x}>
                <mesh
                    scale={[9.2,6,9.2]}
                    geometry = {porshen}
                    position = {[0,-3.5,0]}>
                    <meshStandardMaterial color={"#5e5e5e"}/>
                </mesh>
                <mesh
                    scale={[4,3,4]}
                    geometry = {porshen001}
                    position = {[0,-7,0]}>
                    <meshStandardMaterial color={"#5e5e5e"}/>
                </mesh>
            </group>
            <mesh position={[0, 15, 0]}>
                <cylinderGeometry args={[11,11,1]} />
                <meshStandardMaterial
                    color ={"#516693"}
                    depthTest = {true}
                    depthWrite = {true}
                />
            </mesh>
            <mesh
                geometry = {cyl.geometry}
                position ={[0, 0, 0]}
                scale = {[10, 15, 10]}
            >
                <meshBasicMaterial
                    color = {'skyblue'}
                    transparent = {true}
                    opacity = {0.1}
                    depthTest = {true}
                    depthWrite ={false}
                />
            </mesh>
            <mesh ref={y1}
                geometry = {gas.geometry}
                position ={[0, -8, 0]}
                scale = {[11, 0, 11]}>
                <meshBasicMaterial
                    color = {args.gas1[3]}
                    transparent = {true}
                    depthTest = {true}
                    depthWrite ={false}
                    opacity = {(args.gas_percent)/1000}/>
            </mesh>
            <mesh ref={y2}
                rotation={[0, Math.PI / 2, 0]}
                geometry = {gas.geometry}
                position ={[0, -8, 0]}
                scale = {[11, 0, 11]}>
                <meshBasicMaterial
                    color = {args.gas2[3]}
                    transparent = {true}
                    depthTest = {true}
                    depthWrite ={false}
                    opacity = {(100 - args.gas_percent)/1000}/>
            </mesh>
        </group>
    );
}
