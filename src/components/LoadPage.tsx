import { motion } from "framer-motion";

{/* LOGO COM ANIMAÇÃO */ }
export default function LoadPage() {
    return (
        <div className="flex h-[100vh] w-[100vw] items-center justify-center">
        <div className="flex-grow flex items-center justify-center">
        <motion.img
            src="/logo_vertical_verde.png"
            alt="Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0], // Efeito de flutuação
            }}
            transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeatType: "reverse",
            }}
        />
    </div>
    </div>
    );
}