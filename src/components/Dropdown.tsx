import React, { useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

interface DropdownProps {
  id: string;
  label: string;
  options: string[] | number[];
  error?: string;
  register: UseFormRegister<any>;
}

const Dropdown: React.FC<DropdownProps> = ({ id, label, options, error, register }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Registration with React Hook Form
  // This properly registers the field with validation
  const { onChange, onBlur, name, ref } = register(id);
  
  const handleOptionClick = (value: string | number) => {
    setSelectedValue(value);
    setIsOpen(false);
    
    // This is the key part - we need to call the onChange function
    // with an event-like object that React Hook Form expects
    onChange({
      target: {
        name: id,
        value: value
      }
    });
  };
  
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-black text-4xl mb-4 w-1/2 text-left">
        {label}
      </label>
      
      {/* Dropdown Button */}
      {/* We add the ref from register here */}
      <div
        id={id}
        ref={ref}
        onClick={toggleDropdown}
        onBlur={onBlur} // Add onBlur event from register
        className="border-4 border-gray-400 bg-white text-gray-400 px-4 py-8 rounded-xl w-full text-4xl cursor-pointer mt-10"
      >
        {selectedValue !== null ? selectedValue : `Selecione ${label.toLowerCase()}`}
      </div>
      
      {/* Hidden input to store the value for the form */}
      <input 
        type="hidden"
        name={name}
        value={selectedValue?.toString() || ""}
      />
      
      {/* Dropdown Options */}
      {isOpen && (
        <div
          className="border-4 border-gray-400 bg-white rounded-xl mt-2 w-full max-h-72 overflow-y-auto z-10 absolute"
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 text-4xl text-black cursor-pointer hover:bg-gray-200"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-4xl mt-2">{error}</p>}
    </div>
  );
};

export default Dropdown;