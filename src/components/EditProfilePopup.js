import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input type="text" id="name-input" value={name || ""} name="name" placeholder="Имя" onChange={handleChangeName} className="popup__text popup__text_type_name"
          required minLength="2" maxLength="40" />
        <span id="name-input-error" className="popup__text-error">Проверьте правильность ввода</span>
        <input type="text" id="role-input" name="about" onChange={handleChangeDescription} placeholder="Деятельность"
          className="popup__text popup__text_type_role" value={description || ""} required minLength="2" maxLength="200" />
        <span id="role-input-error" className="popup__text-error">Проверьте правильность ввода</span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;