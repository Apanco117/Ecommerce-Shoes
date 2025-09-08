import { Canvas } from "@react-three/fiber"
import ShowRoom from "./three/ShowRoom"
import * as THREE from "three"

// Definimos los tipos para las props que vamos a recibir, incluyendo la vista
type HomeProps = {
  setSelectedObject: (object: THREE.Mesh | null) => void;
  selectedObject: THREE.Mesh | null;
  selectedColor: string;
  currentView: number; // Nueva prop para la vista de la cámara
}

// Este componente ahora actúa como un intermediario, pasando todas las props hacia ShowRoom
export default function Home({ setSelectedObject, selectedObject, selectedColor, currentView }: HomeProps) {
    return (
       <Canvas shadows camera={{ position: [0, 1, 3], fov: 50 }}>
            {/* <axesHelper args={[5]}/> */}
            <ShowRoom 
              setSelectedObject={setSelectedObject}
              selectedObject={selectedObject}
              selectedColor={selectedColor}
              view={currentView} // Pasamos el estado de la vista al componente ShowRoom
            />
       </Canvas>
    )
}

