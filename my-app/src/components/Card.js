import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.dataCard);
  }

  return (
    <li className="element__content">
      <button className="element__delete"></button>
      <img
        className="element__image"
        src={props.dataCard.link}
        alt={props.dataCard.name}
        onClick={handleClick}
      />
      <div className="element__text">
        <h2 className="element__title">{props.dataCard.name}</h2>
        <div className="element__like-container">
          <button className="element__like"></button>
          <p className="element__like-quantity">{props.dataCard.likes.length}</p>
          <p></p>
        </div>
      </div>
    </li>
  );
}

export default Card;
