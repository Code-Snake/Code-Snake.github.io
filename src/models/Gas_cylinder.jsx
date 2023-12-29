import modelPath from "./gas_cylinder.glb"
import {Text, useGLTF} from "@react-three/drei";
import {useRef} from "react";

export function Gas_cylinder(args){
    let x = useRef(null)
    const {nodes} = useGLTF(modelPath);
    //rotation={[ Math.PI, 0, 0]}
    return (
        <group position={args.pos}>
            <mesh
                rotation={[ 0, 0, 0]}
                  geometry = {nodes.Cylinder.geometry}
                  scale = {[6, 6, 6]}
            >
                <meshStandardMaterial
                    metalness = {0.7}
                    roughness = {0.6}
                    depthTest = {true}
                    depthWrite = {true}
                    color = {args.color} />
                <Text ref ={x}
                      rotation={[0, -Math.PI/6.3, 0]}
                      position={[-0.5, 0, 0.9]}
                      scale={[0.5, 0.5, 1]}
                      color ={args.color}>
                    {args.text}
                </Text>
            </mesh>
        </group>
    );
}

