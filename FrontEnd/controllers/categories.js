import {api} from "../model/api.js";


export const categories = {
    
    showCategories() {
        api.getCategories().then(categories => this.genDomCategories(categories));
    },

    genDomCategories(categories) {
        this.genDomCategory({name: 'Tous', id: -1});
        categories.forEach(category => this.genDomCategory(category));
    },

    genDomCategory(category) {
        document.querySelector('.buttons').appendChild(this.genDomCategoryLabel(category.name, category.id));
    }, 

    genDomCategoryLabel(name, id) {
        const input = this.genDomCategoryinput(id);
        const label = document.createElement("label");
        label.classList.add('button');
        label.appendChild(input);
        label.append(name);
        return label;
    },

    genDomCategoryinput(id) {
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        input.dataset.categoryid = id;
        if (id == -1) {
            input.checked = true;
        }
        this.genEventListener(input);
        return input;
    },

    genEventListener(input) {
        input.addEventListener("click", (e) => {
            if (this.isDefaultInput(input)) {
                this.uncheckAllInputs();
            }
            this.defaultInput().checked = !this.hasInputChecked();
            this.showAllWorks();
            if (!this.defaultInput().checked) {
                this.hideUnselectedCategories();
            }
        });            
    },

    isDefaultInput(input) {
        return input.dataset.categoryid == -1;
    },

    uncheckAllInputs() {
        this.inputsChecked().forEach(input => input.checked = false);
    },

    inputsChecked() {
        return document.querySelectorAll('input[data-categoryid]:checked:not([data-categoryid="-1"])');
    },

    defaultInput() {
        return document.querySelector('input[data-categoryid="-1"]');
    },

    hasInputChecked() {
        return this.inputsChecked().length > 0
    },

    showAllWorks() {
        const allWorks = document.querySelectorAll('figure[data-categoryid].work-hidden');
        allWorks.forEach(work => this.showWork(work));
    },

    showWork(work) {
        work.classList.remove('work-hidden');
    },   

    hideUnselectedCategories() {
        const inputsNotChecked = this.inputsNotChecked();
        inputsNotChecked.forEach(inputNotChecked => this.hideWorks(inputNotChecked.dataset.categoryid));
    },   

    inputsNotChecked() {
        return document.querySelectorAll('input[data-categoryid]:not(:checked):not([data-categoryid="-1"])');
    },

    hideWorks(categoryId) {
        const works = document.querySelectorAll('figure[data-categoryid="' + categoryId + '"]');
        works.forEach(work => work.classList.add('work-hidden'));    
    },
}