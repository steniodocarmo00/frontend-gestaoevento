// Card.tsx
import "./card.css";
import { useState } from "react";
import { useEventDelete } from "../../hooks/useEventDelete";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditModal } from "../modal/editModal";

interface CardProps {
  name: string;
  date: string;
  local: string;
  price: number;
  image: string;
  eventId?: number;
}

export function Card({ name, date, local, price, image, eventId }: CardProps) {
  const { deleteEventById } = useEventDelete();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (eventId) {
      deleteEventById(eventId);
    } else {
      console.error("Event id is undefined.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="card-container">
      <div className="card">
        <img src={image} alt={name} />
        <h3>{date}</h3>
        <h2>{name}</h2>
        <p>{local}</p>
        <p>R$ {price}</p>
        <div className="button-container">
          <button onClick={handleDelete} className="delete-button">
            <FontAwesomeIcon icon={faTrash} style={{fontSize: '15px'}}/>
          </button>
          <button onClick={handleEdit} className="update-button">
            <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '15px'}}/>
          </button>
        </div>
        {isEditing && (
          <EditModal
            eventId={eventId || 0}
            closeModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
