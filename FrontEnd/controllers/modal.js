import {api} from "../model/api.js";
import { works } from  "./works.js"

export const modal = {


    openModal() {
        this.cleanModal();
        this.showModal();
    },
    
    cleanModal() {
        let modal = document.querySelector('.modal');
        let overlay = document.querySelector('.overlay');
        if (modal) {
            modal.remove();
        }
        if (overlay ) {
            overlay.remove();
        
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
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        body.appendChild(overlay);
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
        const closeZone = document.querySelector('.overlay');
        closeZone.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        })  
    },

    closeModal() {
        document.querySelector('.modal').classList.add('hidden')
        document.querySelector('.overlay').remove();
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
        buttonAddPhoto.addEventListener('click', (e) => {
            e.preventDefault();
            this.createAddModal(popUp);
        })
        popUp.appendChild(buttonAddPhoto);        
    },

    createButtonDelGalery(popUp) {
        const buttonDelGalery = document.createElement('p');
        buttonDelGalery.classList.add('del-gallery');
        buttonDelGalery.innerText = "Supprimer la galerie";
        popUp.appendChild(buttonDelGalery); 
    },

    createAddModal(popUp) {
        this.createAddTitle(popUp);
        this.createReturnIcon(popUp);
        this.removeGalerry(popUp); 
        this.createForm()
        this.removeButtonDelGalery(popUp)
    },

    createAddTitle(popUp) {
        popUp.querySelector('h3').innerText = "Ajout Photo";        
    },

    createReturnIcon(popUp) {
        const returnIcon = document.createElement('i');
        returnIcon.className = 'fa-solid' + ' fa-arrow-left';
        popUp.appendChild(returnIcon);
        returnIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();;
        })    
    },

    removeGalerry(popUp) {
        const gallery = popUp.querySelector('.gallery-modal'); 
        gallery.remove();        
    },

    createForm() {
        const form = document.createElement('form'); 
        form.setAttribute("id", "addWork");
        form.setAttribute("method", "POST");
        form.setAttribute("enctype", "multipart/form-data");
        const title = document.querySelector('h3');
        title.insertAdjacentElement("afterend", form);  
        this.createInputs(form);
    },

    createInputs(form) {
        this.createPhotoZone(form);
        this.createInputZone(form);
        this.createButtonValidation(form);
    },

    createPhotoZone(form) {
        const photoZone = document.createElement('div');   
        photoZone.classList.add('img-add');
        this.createImgIcon(photoZone);
        this.createInputFile(photoZone);
        this.createTextFormatAllowed(photoZone);
        form.appendChild(photoZone);
    },

    createImgIcon(photoZone) {
        const img = document.createElement('div');
        img.className = 'img-icon';
        const imgIcon = document.createElement('i');
        imgIcon.className = 'fa-solid' + ' fa-image';
        img.appendChild(imgIcon);
        photoZone.appendChild(img);
    },
    
    createInputFile(photoZone) {
        const label = this.createLabel("image", "+ Ajouter photo");
        label.classList.add('add-button');
        photoZone.appendChild(label);
        const inputFile = document.createElement('input')
        inputFile.setAttribute("type", "file");
        inputFile.setAttribute("id", "image");
        inputFile.setAttribute("name", "image");
        inputFile.setAttribute("accept", "image/png, image/jpeg");
        label.appendChild(inputFile);
        this.showSelectedImg(inputFile);
    },

    createLabel(id, text) {
        const label = document.createElement('label');
        label.setAttribute("for", `${id}`);
        label.innerText = `${text}`;
        return label;
    },

    showSelectedImg(inputFile) {
        inputFile.addEventListener('change', e => {
        e.preventDefault();
        const addWork = document.querySelector('#addWork');
        const existingImg = addWork.querySelector('img');
        if (existingImg) {
            existingImg.remove();
        }
        const img = document.createElement('img');
        img.classList.add('image');
        img.setAttribute('id', "img-selected");
        const [picture] = e.target.files;
        img.src = URL.createObjectURL(picture);
        img.addEventListener('click', e => {
            inputFile.click();
        });
        const imgAdd = addWork.querySelector('.img-add');
        imgAdd.classList.add('hidden');
        addWork.insertBefore(img, imgAdd);
        });
    },
        
    createTextFormatAllowed(photoZone) {
        const TextFormatAllowed = document.createElement('p');
        TextFormatAllowed.classList.add('format-allowed');
        TextFormatAllowed.innerText = "jpg, png : 4mo max";
        photoZone.appendChild(TextFormatAllowed);
    },

    createInputZone(form) {
        const inputZone = document.createElement('div');   
        inputZone.classList.add('input-zone');
        inputZone.setAttribute("id", "add-work-form");
        this.createTitleInput(inputZone);
        this.createCategorySelect(inputZone);
        form.appendChild(inputZone);
    },

    createTitleInput(inputZone) {
        const TitleInputLabel = this.createLabel("title", "Titre");
        inputZone.appendChild(TitleInputLabel);
        const TitleInput = document.createElement('input');
        TitleInput.setAttribute("type", "text");
        TitleInput.setAttribute("name", "title");
        TitleInput.setAttribute("id", "title");
        TitleInput.setAttribute("value", "");
        inputZone.appendChild(TitleInput);

    },

    createCategorySelect(inputZone) {
        const categorySelectLabel = this.createLabel("category", "Catégorie");
        inputZone.appendChild(categorySelectLabel);
        const categorySelect = document.createElement('select');
        categorySelect.setAttribute("type", "text");
        categorySelect.setAttribute("name", "category");
        categorySelect.setAttribute("id", "category");
        this.createSelectOption(inputZone, categorySelect);
    },

    createSelectOption(inputZone, categorySelect) {
        const optionDefault = document.createElement('option');
        optionDefault.setAttribute('value', '-1');
        optionDefault.innerText = '';
        categorySelect.appendChild(optionDefault);
        api.getCategories().then(categories => categories.forEach(category => {
            const option = document.createElement('option')
            option.setAttribute('value', category.id);
            option.innerText = `${category.name}`;
            categorySelect.appendChild(option);
        }));
        inputZone.appendChild(categorySelect);
    },

    createButtonValidation(form) {
        this.removeButtonAddPhoto();
        const ButtonValidation = document.createElement('input');
        ButtonValidation.className = 'add-photo';
        ButtonValidation.setAttribute("type", "submit");
        ButtonValidation.setAttribute("value", "Valider");
        form.addEventListener('submit', e => {
            e.preventDefault();
            this.cleanError();
            let areValidsFields = this.areValidsFields(); 
            if (areValidsFields) {
                const formData = new FormData(form);
                works.workAdd(formData);
            }
        })
        form.appendChild(ButtonValidation);
    },

    cleanError() {
        let domErrors = document.querySelectorAll('p.error');
        domErrors.forEach(domError => {
            domError.remove();
        })
        let errorFields = document.querySelectorAll('.error-field');
        errorFields.forEach(errorField => {
            errorField.classList.remove('error-field');
        })
    },

    areValidsFields() {
        let areValidsFields = null;
        let isValidInputFile = this.isValidInputFile();
        let isValidInputTitle = this.isValidInputTitle();
        let isValidInputCategory = this.isValidInputCategory();
        isValidInputFile && isValidInputTitle && isValidInputCategory ? areValidsFields = true : areValidsFields = false;
        return areValidsFields;
    },
    
    isValidInputFile() {
        let isValidInputFile = true;
        const inputFile = document.getElementById('image');
        let inputFileValue = inputFile.value;
        if (inputFileValue.length <= 0) {
            this.formError('Fichier requis');
            isValidInputFile = false;
        } else {
            let fileSize = Math.floor(inputFile.files[0].size / Math.pow(1024, 2) * 100) / 100; // Mega Octet (Mo)
            if (fileSize <= 0.0 && fileSize > 4.0) {
                this.formError('Fichier de taille incorrect');
                isValidInputFile = false;
            }
            var reg = new RegExp("[.]+", "g"); //expression regulière on parse à chaque "."
            var tabNomFich = inputFileValue.split(reg); // on fait le split dans un tableau
            var extension = tabNomFich[tabNomFich.length - 1]; //extension (dern element du tab)
            if (extension != 'jpg' && extension != 'png') {
                this.formError('Format non autorisé');
                isValidInputFile = false;
            }
        }
        return isValidInputFile;
    },
    
    isValidInputTitle() {
        let isValidInputTitle = true;
        const inputTitle = document.getElementById('title');
        let inputTitleValue = inputTitle.value;
        if (inputTitleValue.trim().length <= 0) {
            this.formError('Titre requis');
            this.errorField(inputTitle);
            isValidInputTitle = false;
        };
        if (typeof inputTitleValue.trim() != 'string') {
            this.formError('Valeur non autorisée');
            this.errorField(inputTitle);
            isValidInputTitle = false;
        };
        if (inputTitleValue.trim() == ' ') {
            this.formError('Valeur non autorisée');
            this.errorField(inputTitle);
            isValidInputTitle = false;
        };
        return isValidInputTitle;
    },

    isValidInputCategory() {
        let isValidInputCategory = true;
        const inputCategory = document.getElementById('category');
        let inputCategoryValue = parseInt(inputCategory.value, 10);
        if (inputCategoryValue <= 0) {
            this.formError('Catégorie requise');
            this.errorField(inputCategory);
            isValidInputCategory = false;
        };
        if (inputCategoryValue > 3 ) {
            this.formError('Valeur non autorisée');
            this.errorField(inputCategory);
            isValidInputCategory = false;
        };
        if (typeof inputCategoryValue !== 'number' ) {
            this.formError('Valeur inconnue');
            this.errorField(inputCategory);
            isValidInputCategory = false;
        };
        return isValidInputCategory;
    },

    formError(errorMessage) {
        let domError = document.createElement('p');
        domError.classList.add('error');  
        domError.innerText = errorMessage;
        const buttonSubmit = document.querySelector('.add-photo')
        buttonSubmit.insertAdjacentElement('beforebegin', domError);
    },

    formValid() {
        return false;
    },

    errorField(field) {
        field.classList.add('error-field');
    },

    removeButtonAddPhoto() {
        const buttonAddPhoto = document.querySelector('.add-photo');
        buttonAddPhoto.remove();
    },

    removeButtonDelGalery(popUp) {
        const ButtonDelGalery = popUp.querySelector('.del-gallery');
        ButtonDelGalery.remove();
    },
}