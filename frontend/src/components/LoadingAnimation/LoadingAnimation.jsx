import { useEffect, useState } from "react";

export default function DotsLoadingAnimation() {
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % 3);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center space-x-2">
            {[0, 1, 2].map((dot) => (
                <div
                    key={dot}
                    className={`w-4 h-4 transition-colors duration-300 ${
                        dot === activeDot ? "bg-red-300" : "bg-purple-600"
                    }`}
                />
            ))}
        </div>
    );
}
