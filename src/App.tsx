import { useState } from "react";
import "./App.css";
import { Card } from "./components/card/card";
import { useEventData } from "./hooks/useEventData";
import { Modal } from "./components/modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const { data } = useEventData(); //data da api
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev); //abre o modal entre true e false
  };

  return (
    <div className="container">
      <div className="container-grid">
        <h1>Gestão de Eventos</h1>
        <div className="card-grid">
          {data?.map((eventData) => ( //rendereiza eventos como um card
            <Card
              key={eventData.id}
              image={eventData.image}
              date={eventData.date}
              name={eventData.title}
              local={eventData.local}
              price={eventData.price}
              eventId={eventData.id}
            />
          ))}
          {isModalOpen && <Modal closeModal={handleOpenModal} />} //renderiza o modal se isOpenModal for true
          <button onClick={handleOpenModal} className="container-button">
          <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
