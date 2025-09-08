import { Card, CardContent } from "./ui/card";
// Importamos algunos iconos para los botones de vista
import { Camera, Maximize, Rotate3D, View } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// Componente ColorToggle (sin cambios)
const ColorToggle = ({ colorClassName, colorName, selectedColor, setSelectedColor }: { 
    colorClassName: string;
    colorName: string;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}) => {
    const isSelected = selectedColor === colorName;

    return (
        <button
            type="button"
            aria-label={`Seleccionar color ${colorName}`}
            aria-pressed={isSelected}
            onClick={() => setSelectedColor(colorName)}
            // Clases condicionales para el estado "seleccionado"
            className={`rounded-full p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white ${isSelected ? 'bg-white/20 ring-2 ring-white' : 'hover:bg-white/10'}`}
        >
            {/* El círculo de color */}
            <div className={`rounded-full w-8 h-8 ${colorClassName}`} />
        </button>
    );
};

// Definimos los tipos para las props, añadiendo el nuevo manejador de vistas
type PanelProps = {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    onViewChange: (view: number) => void;
}

export default function Panel({ selectedColor, setSelectedColor, onViewChange }: PanelProps) {

    return (
        <>
            {/* Panel de Vistas a la Izquierda (Absoluto) */}
            <div className="absolute bottom-56 sm:left-8 md:left-12 z-20 pointer-events-auto md:bottom-16 pl-4 sm:pl-0">
                <Card className="w-auto bg-black/75 backdrop-blur-sm border-gray-700">
                    <CardContent className="p-2">
                        <div className="flex flex-col items-center gap-3">
                            <button onClick={() => {onViewChange(2); onViewChange(1)}} aria-label="Cambiar a vista 1" className="p-3 rounded-full text-white bg-gray-800/80 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"><Camera className="w-5 h-5"/></button>
                            <button onClick={() => {onViewChange(1); onViewChange(2)}} aria-label="Cambiar a vista 2" className="p-3 rounded-full text-white bg-gray-800/80 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"><Maximize className="w-5 h-5"/></button>
                            <button onClick={() => {onViewChange(1); onViewChange(3)}} aria-label="Cambiar a vista 3" className="p-3 rounded-full text-white bg-gray-800/80 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"><View className="w-5 h-5"/></button>
                            <button onClick={() => {onViewChange(1); onViewChange(4)}} aria-label="Activar rotación" className="p-3 rounded-full text-white bg-gray-800/80 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"><Rotate3D className="w-5 h-5"/></button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Panel de Colores en el Centro (Absoluto) */}
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-center pointer-events-none px-4 sm:px-10">
                {/* Añadimos min-w-0 para permitir que la tarjeta se encoja en un contenedor flex */}
                <Card className="z-20 w-full min-w-0 max-w-xs sm:max-w-sm md:max-w-md bg-black/75 backdrop-blur-sm mb-16 pointer-events-auto border-gray-700">
                    <CardContent className="p-2">
                        {/* 1. El ScrollArea actúa como el "viewport" o ventana */}
                        <ScrollArea className="w-full whitespace-nowrap rounded-md">
                            {/* 2. El div interior contiene TODOS los elementos en una sola línea */}
                            <div className="flex w-max space-x-4 p-4">
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
                                <ColorToggle 
                                    colorClassName="bg-purple-400" 
                                    colorName="morado" 
                                    selectedColor={selectedColor} 
                                    setSelectedColor={setSelectedColor}
                                />
                                <ColorToggle 
                                    colorClassName="bg-orange-400" 
                                    colorName="naranja" 
                                    selectedColor={selectedColor} 
                                    setSelectedColor={setSelectedColor}
                                />
                                <ColorToggle 
                                    colorClassName="bg-cyan-400" 
                                    colorName="cian" 
                                    selectedColor={selectedColor} 
                                    setSelectedColor={setSelectedColor}
                                />
                                <ColorToggle 
                                    colorClassName="bg-red-500" 
                                    colorName="rojo" 
                                    selectedColor={selectedColor} 
                                    setSelectedColor={setSelectedColor}
                                />
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

