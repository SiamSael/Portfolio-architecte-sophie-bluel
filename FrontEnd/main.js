import { categories } from "./controllers/categories.js";
import { works } from  "./controllers/works.js"

document.addEventListener('DOMContentLoaded', () => {
    works.showWorks();
    categories.showCategories();
})
