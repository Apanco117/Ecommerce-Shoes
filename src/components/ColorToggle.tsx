

type ColorToggleType = {
    colorClassName: string;
    colorName: string;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

export default function ColorToggle( { colorClassName, colorName, selectedColor, setSelectedColor }: ColorToggleType) {
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
    )
}
