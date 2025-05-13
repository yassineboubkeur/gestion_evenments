import { useStyle } from "../context/StyleContext";

export default function ThemeBg({path =".."}){
    
    
    
        const { updateSharedString, sharedString } = useStyle();
    
    
    const handleClick = (e) => {
        console.log(sharedString);
        updateSharedString(e);
        console.log(sharedString);
    };
    
    return (
        <div className="flex flex-wrap justify-center  max-w-[360px] mx-auto">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13].map((i) => (
          <button
            key={i}
            className="transition-transform duration-300 ease-in-out hover:scale-110 p-1"
            onClick={() => handleClick(i)}
          >
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-blue-400"
              src={`${path}/bg${i}.png`}
              alt={`Background ${i}`}
            />
          </button>
        ))}
      </div>
    )
}