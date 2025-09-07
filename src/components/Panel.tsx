import ColorToggle from "./ColorToggle";
import { Card, CardContent } from "./ui/card";

type PanelProps = {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

export default function Panel( { selectedColor, setSelectedColor }: PanelProps ) {

    return (
        // 1. Añadimos pointer-events-none para que este div no bloquee los clics al Canvas
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-center pointer-events-none">
            
            {/* 2. Añadimos pointer-events-auto para que la tarjeta SÍ sea interactiva */}
            <Card className="z-20 w-1/2 bg-background backdrop-blur-sm mb-12 pointer-events-auto">
                <CardContent className="p-4 w-full">
                    <div className=" gap-10 w-full flex">
                        <ColorToggle
                            colorClassName="bg-pink-400" 
                            colorName="rosa" 
                            selectedColor={selectedColor} 
                            setSelectedColor={setSelectedColor}
                        />
                        <ColorToggle 
                            colorClassName="bg-blue-400" 
                            colorName="azul" 
                            selectedColor={selectedColor} 
                            setSelectedColor={setSelectedColor}
                        />
                        <ColorToggle 
                            colorClassName="bg-green-400" 
                            colorName="verde" 
                            selectedColor={selectedColor} 
                            setSelectedColor={setSelectedColor}
                        />
                        <ColorToggle 
                            colorClassName="bg-yellow-400" 
                            colorName="amarillo" 
                            selectedColor={selectedColor} 
                            setSelectedColor={setSelectedColor}
                        />
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
