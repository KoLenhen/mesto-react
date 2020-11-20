import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';



function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [isCardPopupOpen, setCardSPopupState] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData()
      .then((data) => {
        const [profileData, cardsData] = data;
        setCurrentUser(profileData);
        setCards(cardsData);
      })
      .catch((error) => { alert(error) });
  }, []);

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
    setCardSPopupState(!isCardPopupOpen);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setCardSPopupState(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.setProfile(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          alert(err);
        }
      )
  }

  function handleUpdateAvatar(data){
    api.setProfileAvatar(data)
    .then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      },
      (err) => {
        alert(err);
      }
    )
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    },
      (error) => {
        alert(error);
      }
    )
  }

  
  function handleCardDelete (card) {
    api.delCard(card._id)
    .then(() => {
        const newCards = cards.filter((c) => c !== card );
        setCards(newCards);
      },
      (error) => {
        alert(error);
      }
    )
  }

  function handleAddPlaceSubmit (data) {
    api.addCard(data)
    .then((newCard) => {
       setCards([newCard, ...cards]);
       closeAllPopups();
      },
      (error) => {
        alert(error);
      }
    )
  }


  return (
    <CurrentUserContext.Provider value={currentUser} >
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImgClick={handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          cards = {cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
        />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
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
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}>
        </ImagePopup>
    </CurrentUserContext.Provider>
  );
}

export default App;

