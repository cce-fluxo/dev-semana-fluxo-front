import { motion } from "framer-motion";

interface ModalPeriodosProps {
  isOpen: boolean;
  onClose: () => void;
  periodoSelecionado: string;
  onSelecionarPeriodo: (periodo: string) => void;
  periodos: number[];
}

const ModalPeriodos: React.FC<ModalPeriodosProps> = ({
  isOpen,
  onClose,
  periodoSelecionado,
  onSelecionarPeriodo,
  periodos,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-4xl"
      >
        <h2 className="text-4xl text-black mb-8">Selecione seu período</h2>
        <div className="max-h-96 overflow-y-auto">
          {periodos.map((periodo) => (
            <button
              key={periodo}
              onClick={() => {
                onSelecionarPeriodo(periodo.toString());
                onClose();
              }}
              className={`w-full text-4xl p-6 text-left rounded-xl mb-4 ${
                periodo.toString() === periodoSelecionado
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {periodo}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-8 text-4xl text-gray-500 hover:text-gray-700"
        >
          Cancelar
        </button>
      </motion.div>
    </div>
  );
};

export default ModalPeriodos;