import {api} from "../model/api.js";
import { authentification } from  "./authentification.js"

export const administrator = {

    init() {
        if (authentification.isConnected()) {
            this.displayPanel();
            this.displayLogout();
        } else {
            this.displayLogin();
        }
    },

    displayLogin() {
        const login = document.createElement('li');
        login.innerText = 'login';
        document.getElementById('menu').insertBefore(login, document.getElementById('menu').querySelector('#instagram'));
        login.addEventListener("click", (e) => {
            e.preventDefault();
            document.location.href = 'login.html';
        });
    },

    displayPanel() {
        this.showHeadband();
        this.showModifyIntroButton();
        this.showModifyWorksButton();
        this.hideFilter();
    },

    displayLogout() {
        const logout = document.createElement('li');
        logout.innerText = 'logout';
        document.getElementById('menu').insertBefore(logout, document.getElementById('menu').querySelector('#instagram'));
        logout.addEventListener("click", (e) => {
            e.preventDefault();
            authentification.deconnection();
        });
    },

    showHeadband() {
        this.createHeadband();
        const modifyIcon = this.createModifyIcon();
        this.createInfoModeEdit(modifyIcon);
        this.createPublicationButton();
    },

    createHeadband() {
        const headband = document.createElement('div');
        headband.classList.add('headband');
        document.querySelector('body').insertAdjacentElement("afterbegin", headband);
    },

    createModifyIcon() {
        const modifyIcon =  document.createElement('i');
        modifyIcon.className = 'fa-solid' + ' fa-pen-to-square';
        return modifyIcon;
    },

    createInfoModeEdit(modifyIcon) {
        document.querySelector('.headband').appendChild(modifyIcon);
        const textEdit = document.createElement('p');
        textEdit.innerText = 'Mode édition';
        document.querySelector('.headband').appendChild(textEdit);
    },

    createPublicationButton() {
        const publicationButton = document.createElement('button');
        publicationButton.classList.add('publication-button');
        publicationButton.innerText = "publier les changements";
        document.querySelector('.headband').appendChild(publicationButton);
    },

    showModifyIntroButton() {
        const modifyButton = this.createModifyButton();
        document.getElementById('introduction').querySelector('figure').appendChild(modifyButton);
    },

    showModifyWorksButton() {
        const modifyButton = this.createModifyButton();
        document.getElementById('portfolio').querySelector('h2').appendChild(modifyButton);
    },

    createModifyButton() {
        const modifyIcon = this.createModifyIcon();
        const modifyElement = this.createModifyElement(modifyIcon);
        this.createModifyText(modifyElement); 
        return modifyElement;
    },

    createModifyElement(modifyIcon) {
        const modifyElement = document.createElement('div');
        modifyElement.classList.add('modify');
        modifyElement.appendChild(modifyIcon);
        return modifyElement;
    },

    createModifyText(modifyElement) {
        const modifyText = document.createElement('p');
        modifyText.innerText = 'Modifier';
        modifyElement.appendChild(modifyText);
    },

    hideFilter() {
        document.querySelector('.buttons').classList.add('visibility-hidden');
    },

}