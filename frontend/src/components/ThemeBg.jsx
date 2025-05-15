import { useStyle } from "../context/StyleContext";

export default function ThemeBg({ path = ".." }) {
    const { updateSharedString, sharedString } = useStyle();

    const handleClick = (e) => {
        // console.log(sharedString);
        updateSharedString(e);
        // console.log(sharedString);
    };

    const colorsBg = [
        "rgb(33, 95, 4)",
        "indigo",
        "rgb(7, 15, 14)",
        "rgb(29, 87, 211)",
        "rgb(140, 53, 197)",
        "rgb(6, 201, 168)",
        "rgb(236, 236, 236)",
        "rgb(207, 226, 223)",
        "rgb(6, 201, 168)",
        "rgb(6, 201, 168)",
        "rgb(221, 95, 22)",
        "rgb(104, 184, 80)",
        "rgb(63, 163, 194)",
        "rgb(204, 134, 54)",
    ];
    return (
        <div className="flex flex-wrap justify-center  max-w-[360px] mx-auto">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                <button
                    key={i}
                    className="transition-transform duration-300 ease-in-out hover:scale-110 p-1"
                    onClick={() => handleClick(i)}
                >
                    <div
                        className={`w-8 h-8 rounded-full object-cover  border-2 border-transparent hover:border-blue-400 `}
                        style={{ backgroundColor: `${colorsBg[i]}` }}
                    ></div>
                </button>
            ))}
        </div>
    );
}
