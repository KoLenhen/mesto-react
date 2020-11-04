import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

  function handleEditAvatarClick() {
    setEditAvatarPopupState(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupState(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setSelectedCard('');
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onImgClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        btnText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="text" id="name-input" name="name" placeholder="Имя" className="popup__text popup__text_type_name"
            required minLength="2" maxLength="40" />
          <span id="name-input-error" className="popup__text-error">Проверьте правильность ввода</span>
          <input type="text" id="role-input" name="about" placeholder="Деятельность"
            className="popup__text popup__text_type_role" required minLength="2" maxLength="200" />
          <span id="role-input-error" className="popup__text-error">Проверьте правильность ввода</span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        btnText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="text" id="location-name-input" name="locationName" placeholder="Название" required minLength="1"
            maxLength="30" className="popup__text popup__text_type_location-name" />
          <span id="location-name-input-error" className="popup__text-error">Проверьте правильность ввода</span>
          <input type="url" id="location-ref-input" name="locationRef" placeholder="Ссылка на картинку" required
            className="popup__text popup__text_type_ref" />
          <span id="location-ref-input-error" className="popup__text-error">Проверьте правильность ввода</span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="renew"
        title="Обновить аватар"
        btnText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="url" id="avatar-ref-input" name="avatar" placeholder="Ссылка на новый аватар" required
            className="popup__text popup__text_type_ref" />
          <span id="avatar-ref-input-error" className="popup__text-error">Проверьте правильность ввода</span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверенны?"
        btnText="Да"
        onClose={closeAllPopups}
      >
        <>
          <input type="url" id="avatar-ref-input" name="avatar" placeholder="Ссылка на новый аватар" required
            className="popup__text popup__text_type_ref" />
          <span id="avatar-ref-input-error" className="popup__text-error">Проверьте правильность ввода</span>
        </>
      </PopupWithForm>

      <ImagePopup
        name="edit"
        card={selectedCard}
        onClose={closeAllPopups}>
      </ImagePopup>
    </>
  );
}

export default App;

