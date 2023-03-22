import React from "react";
import "../pages/index.css";
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [ selectedCard, setSelectedCard] = React.useState({name: "" , link: ""})


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card) 
  }

  function closePopup() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({name: "" , link: ""})
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closePopup} />
      <PopupWithForm
        name="popup-profile"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closePopup}
      >
        <div className="popup__field">
          <input
            type="text"
            className="popup__input"
            name="name"
            id="popup-name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className="popup__span popup-name-error"
            id="popup-name-error-span"
          ></span>
        </div>
        <div className="popup__field">
          <input
            type="text"
            className="popup__input"
            name="about"
            id="popup-about"
            minLength="2"
            maxLength="200"
            placeholder="О Себе"
            required
          />
          <span
            className="popup__span popup-about-error"
            id="popup-about-error-span"
          ></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="popup_place"
        title="Новое место"
        textButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closePopup}
      >
        <div className="popup__field">
          <input
            type="text"
            className="popup__input"
            placeholder="Название"
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__span name-error" id="popup-name-error"></span>
        </div>
        <div className="popup__field">
          <input
            type="url"
            className="popup__input"
            placeholder="Ссылка на картинку"
            name="link"
            id="link"
            required
          />
          <span className="popup__span link-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="save-avatar"
        title="Обновить аватар"
        textButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closePopup}
      >
        <div className="popup__field">
          <input
            type="url"
            className="popup__input"
            placeholder="Ссылка на картинку"
            name="link"
            id="link-avatar"
            required
          />
          <span className="popup__span link-avatar-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?" textButton="Да" />
    </>
  );
}

export default App;
