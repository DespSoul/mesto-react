import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import {
  buttonEditPopupProfile,
  profileForm,
  buttonOpenPopupPlace,
  popupFormSaveAvatar,
  formSaveNewPlace,
  avatarProfile,
  validationConfig,
} from "../utils/const.js";
import "../pages/index.css";
let userId;

const formValidatorPlace = new FormValidator(
  validationConfig,
  formSaveNewPlace
);
const formValidatorProfile = new FormValidator(validationConfig, profileForm);
const formValidatorAvatar = new FormValidator(
  validationConfig,
  popupFormSaveAvatar
);

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

const cardsSection = new Section({ renderer: createCard }, ".element");

const api = new Api({
  utl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "f7de5b33-38c0-4e63-aff7-9e2d9d442f71",
    "Content-Type": "application/json",
  },
});

const popupConfirmDeleteCard = new PopupDeleteCard(
  ".popup-delete-card",
  async (id, card) => {
    api
      .deleteCard(id)
      .then(() => {
        card.remove();
        popupConfirmDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupConfirmDeleteCard.setEventListeners();

const popupAvatar = new PopupWithForm(".popup-save-avatar", async (data) => {
  return api
    .editAvatar({ avatar: data.link })
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.resetButtonText();
    });
});

popupAvatar.setEventListeners();

const popupFormProfile = new PopupWithForm("#popup-profile", async (data) => {
  return api
    .editProfile(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.resetButtonText();
    });
});

popupFormProfile.setEventListeners();

const popupFormPlace = new PopupWithForm("#popup-place", async (data) => {
  return api
    .addNewCard(data)
    .then((data) => {
      cardsSection.addItem(createCard(data));
      popupFormPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormPlace.resetButtonText();
    });
});

popupFormPlace.setEventListeners();

avatarProfile.addEventListener("click", () => {
  popupAvatar.open();
  formValidatorAvatar.resetValidation();
});

const popupImageOpen = new PopupWithImage("#popup-image");
popupImageOpen.setEventListeners();

buttonEditPopupProfile.addEventListener("click", () => {
  popupFormProfile.open();
  popupFormProfile.setInputsValues(userInfo.getUserInfo());
  formValidatorProfile.resetValidation();
});

buttonOpenPopupPlace.addEventListener("click", () => {
  popupFormPlace.open();
  formValidatorPlace.resetValidation();
});

function createCard(data) {
  const newCard = new Card(
    data,
    ".element-template",
    (link, name) => {
      popupImageOpen.open(link, name);
    },
    (data, card) => {
      popupConfirmDeleteCard.openPopupDelete(data._id, card);
    },
    userId,
    (isLiked, id) => {
      if (isLiked) {
        api
          .deleteLike(id)
          .then((data) => {
            newCard.setLikeButtonInactive(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((data) => {
            newCard.setLikeButtonActive(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );

  return newCard.createElement();
}

Promise.all([api.getUsers(), api.getInitialCards()])
  .then(([usersData, cards]) => {
    userId = usersData._id;
    userInfo.setUserInfo(usersData);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();
