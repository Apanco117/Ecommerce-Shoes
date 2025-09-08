import * as TRHEE from "three";
import { useFrame, useLoader, type ThreeEvent } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 1. Importamos el DRACOLoader
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Luces from "./Luces";

// Prop types from the parent component, ahora incluye la vista
type ShowRoomProps = {
  setSelectedObject: (object: TRHEE.Mesh | null) => void;
  selectedObject: TRHEE.Mesh | null;
  selectedColor: string;
  view: number; // Prop para recibir la vista desde el panel
}

// Mapa de colores actualizado con 4 nuevas opciones
const colorMap: { [key: string]: string } = {
  rosa: "#f472b6",
  azul: "#60a5fa",
  verde: "#4ade80",
  amarillo: "#facc15",
  morado: "#c084fc",
  naranja: "#fb923c",
  cian: "#22d3ee",
  rojo: "#ef4444",
};

export default function ShowRoom({ setSelectedObject, selectedObject, selectedColor, view }: ShowRoomProps) {
  const cameraControlsRef = useRef<CameraControls>(null!);
  
  // Modificamos la llamada a useLoader para configurar Draco
  const gltf = useLoader(GLTFLoader, "/models/custom-optimized.glb", loader => {
    const dracoLoader = new DRACOLoader();
    // Esta ruta es crucial. Le dice a three.js dónde encontrar los archivos de descompresión.
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  // State to control the automatic rotation
  const [isRotate, setRotate] = useState<boolean>(true); // Start rotating by default
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
  // --- useEffect para reaccionar a los clics del Panel de Vistas ---
  useEffect(() => {
    if (!cameraControlsRef.current || view === 0) return; // No hacer nada si es la vista por defecto

    const changeView = (viewNumber: number) => {
      setRotate(false);
      switch (viewNumber) {
        case 1:
          cameraControlsRef.current?.setLookAt(-2, 0, 2, 0, 0, 0, true);
          break;
        case 2:
          cameraControlsRef.current?.setLookAt(0, 3, 0, 0, 0, 0, true);
          break;
        case 3:
          cameraControlsRef.current?.setLookAt(1, 1, 1, 0, 0, 0, true);
          break;
        case 4:
          if (!isRotate) {
             angle.current = 0; 
          }
          setRotate((prev) => !prev);
          break;
      }
    };
    
    changeView(view);
  }, [view]); // Este efecto se ejecuta cada vez que la prop 'view' cambia

  // --- Event Listeners for Keyboard Controls ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cameraControlsRef.current) return;
      setRotate(false);
      switch (e.key) {
        case "1":
          cameraControlsRef.current.setLookAt(-2, 0, 2, 0, 0, 0, true);
          break;
        case "2":
          cameraControlsRef.current.setLookAt(0, 3, 0, 0, 0, 0, true);
          break;
        case "3":
          cameraControlsRef.current.setLookAt(1, 1, 1, 0, 0, 0, true);
          break;
        case "5":
          if (!isRotate) {
             angle.current = 0; 
          }
          setRotate((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRotate]);

  // --- Initial setup for the 3D model ---
  useEffect(() => {
    if (!gltf) return;
    gltf.scene.traverse((child) => {
        if (child instanceof TRHEE.Mesh) {
            child.castShadow = true;
        }
    });
  }, [gltf]);


  // --- Logic for automatic rotation ---
  const angle = useRef(0);
  const Distancia = 1.7;
  useFrame(() => {
    if (isRotate && cameraControlsRef.current) {
        const transition = angle.current < 2;
        cameraControlsRef.current.setLookAt(
            Distancia * Math.sin(angle.current),
            1.5,
            Distancia * Math.cos(angle.current),
            0, 0, 0,
            transition
        );
        angle.current += 0.01;
    }
  });

  // --- Logic to apply color when selected from the panel ---
  useEffect(() => {
    if (selectedObject) {
      const hexColor = colorMap[selectedColor];
      if (hexColor) { // Check if the color exists in the map
        const material = selectedObject.material as TRHEE.MeshStandardMaterial;
        if (!material.userData.isCloned) {
          const clonedMaterial = material.clone();
          clonedMaterial.userData.isCloned = true;
          selectedObject.material = clonedMaterial;
          (clonedMaterial as TRHEE.MeshStandardMaterial).color.set(hexColor);
        } else {
          material.color.set(hexColor);
        }
      }
    }
  }, [selectedColor, selectedObject]);

  // --- Click handler for selecting an object ---
  const shoesClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setRotate(false);
    const clickedObject = event.object as TRHEE.Mesh;
    setSelectedObject(clickedObject);
    if (cameraControlsRef.current) {
      cameraControlsRef.current.fitToBox(clickedObject, true);
    }
  }

  return (
    <>
      <Luces />
      <CameraControls
        ref={cameraControlsRef}
        minDistance={0.65}
        maxDistance={24}
        onStart={() => setRotate(false)}
      />
      <primitive object={gltf.scene} onClick={shoesClick} />
      <ContactShadows
        position={[0, 0, 0]}
        scale={5}
        color={"#000000"}
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}

