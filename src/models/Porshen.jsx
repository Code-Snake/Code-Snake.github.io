import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import modelPath from "./porshen.glb";
import {useGLTF} from "@react-three/drei";
import {lerp} from "three/src/math/MathUtils.js";

//start properties
let position = [0,5,0]

//main function for sphere
export function Porshen(args) {
    const {nodes} = useGLTF(modelPath);
    const x = useRef(null)
    let speed = 0.1 * args.speed
    useFrame(()=>{
        x.current.position.y = lerp((x.current.position.y), args.height, speed)
        //console.log(x.current.position);
    })
    return (
        <group ref = {x} position={position}>
            <mesh
                scale={[9.2,6,9.2]}
                geometry = {nodes.Cylinder.geometry}
                position = {[0,-3.5,0]}>
                <meshStandardMaterial color={"#5e5e5e"}/>
            </mesh>
            <mesh
                scale={[4,3,4]}
                geometry = {nodes.Cylinder001.geometry}
                position = {[0,-7,0]}>
                <meshStandardMaterial color={"#5e5e5e"}/>
            </mesh>
        </group>
    );
}