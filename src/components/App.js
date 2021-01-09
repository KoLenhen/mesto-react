import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isCardPopupOpen, setCardSPopupState] = useState(false);
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [isUserSaving, setIsUserSaving] = useState(false);
  const [isCardDeleting, setIsCardDeleting] = useState(false);
  const [isPlaceAdding, setIsPlaceAdding] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDel, setCardToDel] = useState({});

  useEffect(() => {
    setIsCardsLoading(true);
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsCardsLoading(false);
      });
  }, []);

  useEffect(() => {
    api.getInitialProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => { alert(error) });
  }, []);

  // popup closing by ESC
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);
  
// popup closing by overlay
  function handleClick(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

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
    setIsDelCardPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    setIsUserSaving(true);
    api.setProfile(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsUserSaving(false);
      });
  }

  function handleUpdateAvatar(data) {
    api.setProfileAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((error) => { alert(error) });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => { alert(error) });
  }

  function handleAddPlaceSubmit(data) {
    setIsPlaceAdding(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsPlaceAdding(false);
      });
  }

  function handleCardDeleteReq(card) {
    setCardToDel(card);
    setIsDelCardPopupOpen(!isDelCardPopupOpen);
  }

  function handleCardDelete(event) {
    event.preventDefault();
    setIsCardDeleting(true);
    api.delCard(cardToDel._id)
      .then(() => {
        const newCards = cards.filter((c) => c !== cardToDel);
        setCards(newCards);
        setIsDelCardPopupOpen(false);
      })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsCardDeleting(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onImgClick={handleCardClick}
        isCardsLoading={isCardsLoading}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteReq}
        cards={cards}
      />
      <Footer />
      {
        isEditProfilePopupOpen && <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onClick={handleClick}
          isUserSaving={isUserSaving}
        />
      }
      {
        isEditAvatarPopupOpen && <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClick={handleClick}
        />
      }
      {
        isAddPlacePopupOpen && <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onClick={handleClick}
          isPlaceAdding={isPlaceAdding}
        />
      }
      {
        isDelCardPopupOpen && <DeleteCardPopup
          isOpen={isDelCardPopupOpen}
          onClose={closeAllPopups}
          handleSubmit={handleCardDelete}
          onClick={handleClick}
          isCardDeleting={isCardDeleting}
        />
      }
      {
        isCardPopupOpen && <ImagePopup
          name="edit"
          card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}
          onClick={handleClick}
        />
      }
    </CurrentUserContext.Provider>
  );
}

export default App;

