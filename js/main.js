const btnMenu = document.getElementById("btn_menu");
const Menu = document.getElementById("menu");
btnMenu.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    if (!btn.classList.contains("active_menu") & !Menu.classList.contains("show_menu")) {
        btn.classList.add("active_menu");
        Menu.classList.add("show_menu");
    } else {
        btn.classList.remove("active_menu");
        Menu.classList.remove("show_menu");
    }
});
Menu.addEventListener("click", (e) => {
    if (Menu.classList.contains("show_menu")) {
        Menu.classList.remove("show_menu");
        btnMenu.classList.remove("active_menu");
    }
});