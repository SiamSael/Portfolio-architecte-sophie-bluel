import {api} from "../model/api.js";

export const authentification = {

    form: document.getElementById("authentification"),

    genListener() {
        this.form.addEventListener("submit", this.getDatasForm);
    },

    getDatasForm(event) {
        event.preventDefault();
        authentification.cleanError();
        const data = new FormData(event.target);
        const entries = Object.fromEntries(data.entries());
        api.authentification(entries).then(result => authentification.handleConnection(result));
    },

    handleConnection(result) {
        switch(result.status) {
            case 200: this.formValid(result.content); break;
            case 401: this.formError('Utilisateur non autorisé'); break;
            case 404: this.formError('Utilisateur inconnu'); break;
            default: this.formError('Erreur inconnue');
        }
    },

    formValid(content) {
        api.setToken(content.token);
        document.location.href = 'index.html';
    },

    formError(message) {
        let domError = document.createElement('p');
        domError.classList.add('error');  
        domError.innerText = message;
        this.form.insertBefore(domError, this.form.querySelector('input[type="submit"]'));
    },

    cleanError() {
        let domError = this.form.querySelector('p.error');
        if (domError) {
            domError.remove();
        }
    },

    isConnected() {
        return api.getToken() !== null;
    },

    deconnection() {
        api.deleteToken();
        document.location.href = 'index.html';
    }

}