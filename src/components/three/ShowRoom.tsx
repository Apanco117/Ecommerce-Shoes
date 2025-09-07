import * as TRHEE from "three";
//import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
//import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Luces from "./Luces";
            

export default function ShowRoom() {

    //const obj = useLoader(OBJLoader, "./models/custom.obj");
    //const fbx = useLoader(FBXLoader, "./models/custom.fbx");
    const cameraControlsRef = useRef<CameraControls>(null!);
    const { raycaster } = useThree();
    const [isRotate,setRotate ] = useState<boolean>(false);
    window.addEventListener("keydown", (e)=> {
        switch( e.key ){
            case "1":
                if ( cameraControlsRef == null ) return;
                setRotate(false)
                //. Hacer que mire a un lugar
                cameraControlsRef.current.setLookAt(
                    -2, //. x
                    0, //. y
                    2, //. z
                    0,
                    0,
                    0,
                    true
                );
                break;
            case "2":
                if ( cameraControlsRef == null ) return;
                setRotate(false)
                //. Hacer que mire a un lugar
                cameraControlsRef.current.setLookAt(
                    0, //. x
                    3, //. y
                    0, //. z
                    0,
                    0,
                    0,
                    true
                );
                break;
            case "3":
                if ( cameraControlsRef == null ) return;
                setRotate(false)
                //. Hacer que mire a un lugar
                cameraControlsRef.current.setLookAt(
                    1, //. x
                    1, //. y
                    1, //. z
                    0,
                    0,
                    0,
                    true
                );
                break;
            case "5":
                
                setRotate(!isRotate);
                break;
        }
    })

    useEffect( () => {
        const rightShoe = gltf.scene.children[0];
        const leftShoe = gltf.scene.children[1];

        rightShoe.rotation.y = TRHEE.MathUtils.degToRad(10);
        leftShoe.rotation.y = TRHEE.MathUtils.degToRad(335);
        leftShoe.rotation.z = TRHEE.MathUtils.degToRad(-30);

        leftShoe.position.x = - 0.25;
        leftShoe.position.z = 0.37;
        leftShoe.position.y = 0.44;

        // Sombra
        gltf.scene.children.forEach( ( shoes ) => {
            shoes.children.forEach( mesh => mesh.castShadow = true )
        } )

    } )

    useEffect( ()=>{
        if ( isRotate ) cameraControlsRef.current.setTarget(0,0,0, true)
    },[isRotate] )

    const angle = useRef(0);
    let Distancia : number = 1.2
    useFrame( ()=> {

        


        if ( isRotate ){
            let transition : boolean
            if ( angle.current < 2 ) transition = true;
            else transition = false;

            cameraControlsRef.current.setLookAt(
                // --- Parámetros de la POSICIÓN de la cámara ---
                Distancia * Math.sin(angle.current), // Posición X de la cámara
                1,                                   // Posición Y de la cámara
                Distancia * Math.cos(angle.current), // Posición Z de la cámara

                // --- Parámetros del TARGET (hacia dónde mirar) ---
                0, 0, 0,                             // Mirar al centro (X, Y, Z)

                // --- Habilitar transición ---
                transition                                 
            );
            angle.current += 0.01;
        }
    } )
    const gltf = useLoader(GLTFLoader, "./models/custom.glb");
    console.log("gltf: ", gltf)

    

    const shoesClick = () => {
        //console.log("click xd")
        //. Devuelve un arreglo de los objetos que intersptarron con el vector normal del puntero
        const intersect = raycaster.intersectObjects( gltf.scene.children, true )
        console.log("intersec: ", intersect)

        if ( intersect.length > 0 ){
            setRotate(false);
            //. Obtener el primer objeto que se intercepto por el vector
            const firstObject = intersect[0].object as TRHEE.Mesh ;
            //. Obtener la malla del primer objeto
            const firstMaterial = firstObject.material as TRHEE.MeshStandardMaterial;
            //. Clonar la malla para ahorrar memoria, ( mallas con mismo material )
            const cloneMaterial = firstMaterial.clone();
            //console.log(firstObject.name);
            firstObject.material = cloneMaterial;
            const material = firstObject.material as TRHEE.MeshStandardMaterial;
            material.color = new TRHEE.Color("red");

            cameraControlsRef.current.fitToBox(
                firstObject,
                true
            );

            

        }

    }

    
    return (
        <>
            
            <Luces/>
            
            
            <CameraControls
                ref = {cameraControlsRef}
                minDistance={0.65}     //. Distancia maxima a la cual se puede acercar
                maxDistance={24}    //. Distancia maxima a la que s epeude alejar
                enabled={true}
                // infinityDolly={true}
                //dollyToCursor={true} //. Aplicar zoom hacia el cursor
            />

            {/* <mesh
                castShadow
                receiveShadow
                scale={5}
                position={[0, -0.51, 0]}
            >
                <cylinderGeometry
                    args={[
                        0.4,
                        0.2,
                        0.2,
                        30
                    ]}
                >
                    
                </cylinderGeometry>
                <meshStandardMaterial/>
            </mesh> */}

            <primitive object={gltf.scene} onClick={shoesClick} />

            <ContactShadows
                position={[0,0,0]}
                scale={5}
                color={"#000000"}
                resolution={512}
                opacity={0.8}
                blur={0.5}

            />

            {/* <mesh rotation={
                    [
                        TRHEE.MathUtils.degToRad(45), 
                        TRHEE.MathUtils.degToRad(45), 
                        0
                    ]
                } 
                position={[
                    0,
                    0,
                    0
                ]}    
            >
                <boxGeometry/>
                <meshStandardMaterial color={"red"}/>
            </mesh> */}
        </>
    )
}
