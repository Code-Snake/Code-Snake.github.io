import {Text, useGLTF} from "@react-three/drei";
import {useRef} from "react";
import modelPath from "./manom2.glb"
import {useFrame} from "@react-three/fiber";
import {pressure} from "./Cylinder.jsx"

export function Manometr() {
    let x = useRef(null)
    const {nodes, materials} = useGLTF(modelPath);
    useFrame(()=>{
        x.current.text = String(pressure.toFixed(1))+" kPa"
    })
    return (
        <group position ={[-25, 10.5, -5]}>
            <mesh position ={[25, -10, 25]}
                scale ={[10,10,10]}
                geometry = {nodes.MTU16MPA1.geometry}
                material = {materials["MT-3U-16-MPA-1"]}
            >
            </mesh>
            <mesh >
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial color={"#b9aeae"} />
            </mesh>
            <mesh position={[-1, 0, 5.1]}>
                <boxGeometry args={[15, 7, 0.2]} />
                <meshStandardMaterial color={"#5e5e5e"} />
            </mesh>
            <Text ref ={x}
                  position={[-1, -0.5, 5.3]}
                  scale={[3, 3, 3]}
                  color ={"#a91515"}>
                {"0" + " kPa"}
            </Text>
        </group>
    )
}