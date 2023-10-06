import "./modal.css";

// ... Restante do código ...

interface InputProps {
    label: string;
    type: string;
    name: string;
    errors?: any;
    setValue: any; // Altere este tipo de acordo com o React Hook Form
  }
  
  export function Input({
    label,
    type,
    name,
    errors,
    setValue,
  }: InputProps) {
    const handleChange = (e:any) => {
      let value = e.target.value;
  
      // Se o tipo for "number", convertemos para float
      if (type === 'number') {
        value = parseFloat(value);
      }
  
      setValue(name, value);
    };
  
    return (
      <div>
        <label>{label}</label>
        <input
          name={name}
          type={type}
          onChange={handleChange}
        />
        {errors && <span className="error-message">{errors.message}</span>}
      </div>
    );
  }
  