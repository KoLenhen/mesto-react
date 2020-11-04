import api from '../utils/api';
import React from 'react';
import Card from './Card';

function Main(props) {

  const [profileName, setProfileName] = React.useState('');
  const [profileRole, setProfileRole] = React.useState('');
  const [profileAvatar, setProfileAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData()
      .then((data) => {
        const [profileData, cardsData] = data;
        setProfileName(profileData.name);
        setProfileRole(profileData.about);
        setProfileAvatar(profileData.avatar);
        setCards(cardsData);
      })
      .catch((error) => { alert(error) });
  });

  return (
    <main className="content">
      <section className="profile" id="profile">
        <div className="profile__overlay">
          <img src={profileAvatar} alt="Аватар пользователя" className="profile__avatar" />
          <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
            &#128393;
              </button>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{profileName}</h1>
            <p className="profile__role">{profileRole}</p>
          </div>
          <button className="profile__edit-info" onClick={props.onEditProfile}>
            &#128393;
              </button>
        </div>
        <button className="profile__add" onClick={props.onAddPlace}>
          &#65291;
            </button>
      </section>
      <section className="locations">
        {cards.map(card => 
          <Card
            key = {card._id}
            card = {card}
            onImgClick = {props.onImgClick}
          />
        )}
      </section>
    </main>
  );
}

export default Main;