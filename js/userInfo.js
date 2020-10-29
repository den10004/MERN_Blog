class UserInfo {
 
    constructor(nameElement, jobElement, avatarElement, api) {
       
        this._nameElem = nameElement;
        this._jobElem = jobElement;
        this.avatarElem = avatarElement;
        this._job = '';
        this._name = '';
        /**
         * Можно лучше:
         * Неиспользуемое свойство, лучше удалить.
         */
        this.api = api;
     
    }

    setUserInfo = (newName, newJob) => {
        this._name = newName;
        this._job = newJob;


    }

    updateUserInfo = () => {
        this._nameElem.textContent = this._name;
        this._jobElem.textContent = this._job;


    }

    getUserInfo = () => {
        return {
            name: this._name,
            job: this._job,
           
        };
    }
    updatePhoto(link) {
        this.avatarElem.style.backgroundImage = `url(${link})`;
    }
}



