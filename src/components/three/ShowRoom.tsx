import * as TRHEE from "three";
import { useFrame, useLoader, type ThreeEvent } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Luces from "./Luces";

// Prop types from the parent component
type ShowRoomProps = {
  setSelectedObject: (object: TRHEE.Mesh | null) => void;
  selectedObject: TRHEE.Mesh | null;
  selectedColor: string;
}

const colorMap: { [key: string]: string } = {
  rosa: "#f472b6",
  azul: "#60a5fa",
  verde: "#4ade80",
  amarillo: "#facc15",
};

export default function ShowRoom({ setSelectedObject, selectedObject, selectedColor }: ShowRoomProps) {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const gltf = useLoader(GLTFLoader, "./models/custom.glb");

  // State to control the automatic rotation
  const [isRotate, setRotate] = useState<boolean>(true); // Start rotating by default

  // --- Event Listeners for Keyboard Controls ---
  // This useEffect correctly handles adding and removing the event listener to avoid memory leaks.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cameraControlsRef.current) return;
      
      switch (e.key) {
        case "1":
          setRotate(false);
          cameraControlsRef.current.setLookAt(-2, 0, 2, 0, 0, 0, true);
          break;
        case "2":
          setRotate(false);
          cameraControlsRef.current.setLookAt(0, 3, 0, 0, 0, 0, true);
          break;
        case "3":
          setRotate(false);
          cameraControlsRef.current.setLookAt(1, 1, 1, 0, 0, 0, true);
          break;
        case "5":
          // When toggling rotation, reset the angle to start from the beginning
          if (!isRotate) {
             angle.current = 0; 
          }
          setRotate((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRotate]); // Re-run effect if isRotate changes, to have the correct value in the closure

  // --- Initial setup for the 3D model ---
  // This useEffect now has a dependency array to run only once when the model is loaded
  useEffect(() => {
    if (!gltf) return;
    // Your previous logic was fine, this is just another way to write it.
    gltf.scene.traverse((child) => {
        if (child instanceof TRHEE.Mesh) {
            child.castShadow = true;
        }
    });
  }, [gltf]);


  // --- Logic for automatic rotation ---
  const angle = useRef(0);
  const Distancia = 1.2;
  useFrame(() => {
    if (isRotate && cameraControlsRef.current) {
        // This logic makes the initial part of the rotation smooth
        const transition = angle.current < 2;
        cameraControlsRef.current.setLookAt(
            Distancia * Math.sin(angle.current),
            1,
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
  }, [selectedColor, selectedObject]);

  // --- Click handler for selecting an object ---
  const shoesClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setRotate(false); // Stop rotation when an object is clicked
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
        // --- ESTE ES EL CAMBIO PRINCIPAL ---
        // El evento onStart se dispara cuando el usuario empieza a interactuar con los controles.
        // Lo usamos para desactivar la rotación automática.
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

