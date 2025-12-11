import { Navigation } from "./Navigation.jsx";

export const Header = () => {
    return (
        <header className="bg-[#1E293B] shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="/src/assets/logo.png"
                        alt="TypeRace Logo"
                        className="w-15 h-15 bounce-animation"
                    />
                    <h1 className="text-xl font-bold text-[#F8FAFC]">TypeRace</h1>
                </div>

                <Navigation />
            </div>
        </header>
    );
};
