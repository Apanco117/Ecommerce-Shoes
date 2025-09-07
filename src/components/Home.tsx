import { Canvas } from "@react-three/fiber"
import ShowRoom from "@components/three/ShowRoom"
import * as THREE from "three";


type HomeProps = {
  setSelectedObject: (object: THREE.Mesh | null) => void;
  selectedObject: THREE.Mesh | null;
  selectedColor: string;
}

export default function Home( { setSelectedObject, selectedObject, selectedColor }: HomeProps ) {
    
    return (
        
       <Canvas
        className="bg-white"
            // shadows 
       >
            <axesHelper args={[5]}/>
            {/* <gridHelper/> */}
            <ShowRoom
                setSelectedObject={setSelectedObject}
                selectedObject={selectedObject}
                selectedColor={selectedColor}
            />
        </Canvas>
    )
}
