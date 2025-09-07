import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";


export default function Luces() {
    // Debuguear luces
    const miLuzRef1 = useRef<THREE.PointLight>(null);
    const miLuzRef2 = useRef<THREE.PointLight>(null);
    const miLuzRef3 = useRef<THREE.PointLight>(null);
    const miLuzRef4 = useRef<THREE.PointLight>(null);
    // @ts-ignore
    useHelper(miLuzRef1, THREE.PointLightHelper, 0.1, "red");
    // @ts-ignore
    useHelper(miLuzRef2, THREE.PointLightHelper, 0.1, "blue");
    // @ts-ignore
    useHelper(miLuzRef3, THREE.PointLightHelper, 0.1, "green");
    // @ts-ignore
    useHelper(miLuzRef4, THREE.PointLightHelper, 0.1, "yellow");

    return (
        <>
            <directionalLight 
                //castShadow 
                position={[3, 3, 3]} />
            <pointLight
                //castShadow
                ref={miLuzRef1}
                position={[1,1.5,1]}
                intensity={2}
            />
            <pointLight
                //castShadow
                ref={miLuzRef2}
                position={[-1,1.5,1]}
                intensity={2}
            />
            <pointLight
                //castShadow
                ref={miLuzRef3}
                position={[-1,1.5,-1]}
                intensity={2}
            />
            <pointLight
                //castShadow
                ref={miLuzRef4}
                position={[1,1.5,-1]}
                intensity={2}
            />
        </>
    )
}
