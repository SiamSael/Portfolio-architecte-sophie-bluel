import {api} from "../model/api.js";
import { works } from  "./works.js"

export const modal = {

    openModal() {
        this.cleanModal();
        this.showModal();
    },
    
    cleanModal() {
        let modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    },

    showModal() {
        this.createModal();
    },

    createModal() {
        const popUp = this.createPopUp();
        this.createCloseIcon(popUp);
        this.createCloseZone();
        this.createTitle(popUp);
        this.createGallery(popUp);
        this.createButtonAddPhoto(popUp);
        this.createButtonDelGalery(popUp);
    },

    createPopUp() {
        const popUp = document.createElement('div');
        popUp.classList.add('modal');
        document.body.append(popUp);
        const body = document.querySelector('body');
        body.classList.add('overlay');
        return popUp;
    },

    createCloseIcon(popUp) {
        const closeIcon = document.createElement('i');
        closeIcon.className = 'fa-solid' + ' fa-xmark';
        popUp.appendChild(closeIcon);
        closeIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        })
    },

    createCloseZone() {
        const closeZone = document.querySelector('.overlay :not(h2 > .modify)');
        console.log(closeZone);
        closeZone.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        })  
    },

    closeModal() {
        console.log('ok');
        document.querySelector('.modal').classList.add('hidden')
        document.querySelector('body').classList.remove('overlay');
    },

    createTitle(popUp) {
        const title = document.createElement('h3');
        title.classList.add('modal-title');
        title.innerText = "Galerie Photo";
        popUp.appendChild(title);
    },

    createGallery(popUp) {
        const gallery = document.createElement('div');   
        gallery.classList.add('gallery-modal');
        popUp.appendChild(gallery)
        works.showWorks();
    },

    createButtonAddPhoto(popUp) {
        const buttonAddPhoto = document.createElement('input');
        buttonAddPhoto.setAttribute("type", "submit");
        buttonAddPhoto.setAttribute("value", "Ajouter une photo");
        buttonAddPhoto.classList.add('add-photo');
        popUp.appendChild(buttonAddPhoto);        
    },

    createButtonDelGalery(popUp) {
        const buttonDelGalery = document.createElement('p');
        buttonDelGalery.classList.add('del-gallery');
        buttonDelGalery.innerText = "Supprimer la galerie";
        popUp.appendChild(buttonDelGalery); 
    },

}