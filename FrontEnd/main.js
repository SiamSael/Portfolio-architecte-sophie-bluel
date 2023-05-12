import { categories } from "./controllers/categories.js";
import { works } from  "./controllers/works.js"
import { administrator } from  "./controllers/administrator.js"

document.addEventListener('DOMContentLoaded', () => {
    works.showWorks();
    categories.showCategories();
    administrator.init();
})

