(function () {

    const wrapperCard = document.querySelector('.places-list');
    const popupEditProfile = document.querySelector('#popup-edit-profile');
    const buttonEdit = document.querySelector('#buttonEdit');
    const popupNewPlace = document.querySelector('#popup-new-place');
    const userInfoButton = document.querySelector('.user-info__button');
    const popupImage = document.querySelector('.popup_images');
    const submit = document.getElementById('submit');
    const form = document.forms.editProfile;
    const editProfileButton = document.querySelector('.popup__button');
    const formNew = document.forms.new;
    const popupImg = document.querySelector('.popup__image');
    const nameInput = popupEditProfile.querySelector('[name=nameEdit]');
    const jobInput = popupEditProfile.querySelector('[name=jobEdit]');
    const nameEditProfile = document.querySelector('.user-info__name');
    const jobEditProfile = document.querySelector('.user-info__job');
    const UserPhoto = document.querySelector('.user-info__photo');
    const popup = new Popup(popupEditProfile);
    const newPlace = new Popup(popupNewPlace);
    const imgPopup = new Popup(popupImage);
    const cardNewList = new CardList(wrapperCard, createNewCard);
    const userInfo = new UserInfo(nameEditProfile, jobEditProfile, UserPhoto);
    const cardValidatorNew = new FormValidator(formNew);
    const cardValidator = new FormValidator(form);

    const config = {
        //url: 'https://praktikum.tk/cohort11',
        url: 'https://nomoreparties.co/cohort11',
        headers: {
            authorization: 'fa413a84-8c29-4495-8107-154a81070681',
            'Content-Type': 'application/json',
        }
    };


    const api = new Api(config);


    function createNewCard(name, link) {
        return new Card(name, link, openImg);
    }

    function openImg(url) {
        popupImg.src = url;
        imgPopup.open();
    }

    userInfoButton.addEventListener('click', function () {
        cardValidatorNew.clearErrors();

        formNew.reset();
        newPlace.open();
        cardValidatorNew.buttonState(editProfileButton, false)
    })


    const addNewCard = () => {//добавление карточки
        const inputName = document.querySelector('#first');
        const inputLink = document.querySelector('#second');
        event.preventDefault();
        cardNewList.addCard(inputName.value, inputLink.value);
        newPlace.close();
    };

    formNew.addEventListener('submit', addNewCard) 
    buttonEdit.addEventListener('click', function () { //редактирование профиля
        popup.open();
        cardValidator.buttonState(submit, true)
        cardValidator.clearErrors();
        const getUserInfo = userInfo.getUserInfo();
        nameInput.value = getUserInfo.name;
        jobInput.value = getUserInfo.job;

    })

    userInfo.setUserInfo(nameEditProfile.textContent, jobEditProfile.textContent);
    cardValidatorNew.setEvent()
    cardValidator.setEvent()

    api
        .getServerUser()
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
            userInfo.updateUserInfo();
            userInfo.updatePhoto(res.avatar)

        })
        .catch((err) => {
            console.log(err)
        })
    /**
     * 9-ый спринт, 2-я итерация.
     * Можно лучше:
     * Применяйте одинаковое форматировование.
     */
    api.getServerCards().then(res => {
        cardNewList.render(res)
    })
        .catch(err => {
            console.log(`Ошибка ${err} при добавлении карточки`)
        })

    const updateProfileForm = () => {
        /**
         * Можно лучше:
         * Вместо глобального объекта event используйте объект event, доступный как параметр функции updateProfileForm
         */
        event.preventDefault();
        api.changeUserUpdate(nameInput.value, jobInput.value)
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about);
                userInfo.updateUserInfo();

                popup.close();

            })
            .catch(err => {
                console.log(`Ошибка ${err} при обновлении формы`)
            })

    }
    form.addEventListener('submit', updateProfileForm)
})();

/**
 * Привет! В целом, у вас получилась хорошая работа, выполнены обязательные задания, функционал работает без
 * очевидных багов, но есть некоторые замечания по организации кода.
 *
 * Что понравилось:
 *  - Корректная работа с асинхронным кодом (then, response.ok, response.json).
 *  - В конец цепочки промисов добавлен catch для обработки возможных ошибок сервера.
 *
 */