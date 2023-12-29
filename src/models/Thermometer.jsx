import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { temperature } from "./Cylinder.jsx"

export function Thermometer(){
    let x = useRef(null)
    useFrame(()=>{
        x.current.text = String(temperature.toFixed(1))+"°C"
    })
    return(
        <group position ={[-25, 0, -5]}>
            <mesh >
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial color={"#b9aeae"} />
            </mesh>
            <mesh position={[-1, 0, 5.1]}>
                <boxGeometry args={[15, 7, 0.2]} />
                <meshStandardMaterial color={"#5e5e5e"} />
            </mesh>
            <Text ref ={x} position={[-1, -0.5, 5.3]}
                  scale={[3, 3, 3]}
                  color ={"#a91515"}>
                {String(temperature.toFixed(1)) + "°C"}
            </Text>
        </group>
    );
}