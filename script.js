/* =========================================
   CARTIVA SHOPPING LIST
   JAVASCRIPT
========================================= */


/* =========================================
   DEFAULT PREFERENCES
========================================= */

const defaultPreferences = {

    theme: "cartiva",

    fontSize: "medium",

    notifications: true,

    reminders: false,

    reminderTime: "18:00",

    reminderFrequency: "daily",

    currency: "PHP",

    budget: 0,

    defaultCategory: "Grocery",

    showPrices: true,

    confirmDelete: true

};


/* =========================================
   LOAD SHOPPING LISTS
========================================= */

let shoppingLists =
    JSON.parse(
        localStorage.getItem("cartivaShoppingLists")
    ) || [];


/* =========================================
   LOAD PREFERENCES
========================================= */

function loadPreferences() {

    let savedPreferences = {};

    try {

        savedPreferences =
            JSON.parse(
                localStorage.getItem(
                    "cartivaPreferences"
                )
            ) || {};

    } catch (error) {

        savedPreferences = {};

    }


    /*
       Compatibility with older Cartiva versions
    */

    if (
        Object.keys(savedPreferences).length === 0
    ) {

        const oldTheme =
            localStorage.getItem("cartivaTheme");

        const oldNotifications =
            localStorage.getItem(
                "cartivaNotifications"
            );

        const oldDarkMode =
            localStorage.getItem(
                "cartivaDarkMode"
            );


        if (oldTheme) {

            savedPreferences.theme =
                oldTheme;

        }


        if (oldNotifications !== null) {

            savedPreferences.notifications =
                oldNotifications !== "false";

        }


        if (
            oldDarkMode === "true" &&
            !savedPreferences.theme
        ) {

            savedPreferences.theme =
                "cartiva";

        }

    }


    return {
        ...defaultPreferences,
        ...savedPreferences
    };

}


let preferences = loadPreferences();


/* =========================================
   DOM ELEMENTS
========================================= */

const splashScreen =
    document.getElementById("splashScreen");

const app =
    document.getElementById("app");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const menuButton =
    document.getElementById("menuButton");

const closeSidebar =
    document.getElementById("closeSidebar");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");

const navItems =
    document.querySelectorAll(".nav-item");

const pages =
    document.querySelectorAll(".page");


/* =========================================
   SETTINGS ELEMENTS
========================================= */

const themeSelect =
    document.getElementById("themeSelect");

const fontSizeSelect =
    document.getElementById("fontSizeSelect");

const notificationToggle =
    document.getElementById(
        "notificationToggle"
    );

const reminderToggle =
    document.getElementById(
        "reminderToggle"
    );

const reminderTime =
    document.getElementById(
        "reminderTime"
    );

const reminderFrequency =
    document.getElementById(
        "reminderFrequency"
    );

const currencySelect =
    document.getElementById(
        "currencySelect"
    );

const budgetInput =
    document.getElementById(
        "budgetInput"
    );

const defaultCategory =
    document.getElementById(
        "defaultCategory"
    );

const showPricesToggle =
    document.getElementById(
        "showPricesToggle"
    );

const budgetDisplay =
    document.getElementById(
        "budgetDisplay"
    );

const currentCurrencyInfo =
    document.getElementById(
        "currentCurrencyInfo"
    );


/* =========================================
   DATA ELEMENTS
========================================= */

const totalLists =
    document.getElementById(
        "totalLists"
    );

const totalItems =
    document.getElementById(
        "totalItems"
    );

const totalCompleted =
    document.getElementById(
        "totalCompleted"
    );

const shoppingListContainer =
    document.getElementById(
        "shoppingListContainer"
    );

const shoppingPageContainer =
    document.getElementById(
        "shoppingPageContainer"
    );

const completedContainer =
    document.getElementById(
        "completedContainer"
    );


/* =========================================
   BUTTONS
========================================= */

const homeAddButton =
    document.getElementById(
        "homeAddButton"
    );

const shoppingAddButton =
    document.getElementById(
        "shoppingAddButton"
    );

const floatingAddButton =
    document.getElementById(
        "floatingAddButton"
    );

const clearCompletedButton =
    document.getElementById(
        "clearCompletedButton"
    );

const clearAllButton =
    document.getElementById(
        "clearAllButton"
    );

const exportButton =
    document.getElementById(
        "exportButton"
    );

const importButton =
    document.getElementById(
        "importButton"
    );

const importFile =
    document.getElementById(
        "importFile"
    );


/* =========================================
   LIST MODAL
========================================= */

const listModal =
    document.getElementById(
        "listModal"
    );

const createListForm =
    document.getElementById(
        "createListForm"
    );

const listName =
    document.getElementById(
        "listName"
    );

const closeListModal =
    document.getElementById(
        "closeListModal"
    );

const cancelListButton =
    document.getElementById(
        "cancelListButton"
    );


/* =========================================
   DETAILS MODAL
========================================= */

const detailsModal =
    document.getElementById(
        "detailsModal"
    );

const detailsContent =
    document.getElementById(
        "detailsContent"
    );

const closeDetailsModal =
    document.getElementById(
        "closeDetailsModal"
    );


/* =========================================
   ITEM MODAL
========================================= */

const itemModal =
    document.getElementById(
        "itemModal"
    );

const modalItemForm =
    document.getElementById(
        "modalItemForm"
    );

const modalListId =
    document.getElementById(
        "modalListId"
    );

const modalItemName =
    document.getElementById(
        "modalItemName"
    );

const modalQuantity =
    document.getElementById(
        "modalQuantity"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalPrice =
    document.getElementById(
        "modalPrice"
    );

const modalNotes =
    document.getElementById(
        "modalNotes"
    );

const closeItemModal =
    document.getElementById(
        "closeItemModal"
    );


/* =========================================
   INFO MODAL
========================================= */

const infoModal =
    document.getElementById(
        "infoModal"
    );

const infoModalContent =
    document.getElementById(
        "infoModalContent"
    );

const closeInfoModal =
    document.getElementById(
        "closeInfoModal"
    );


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById(
        "toast"
    );

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

let toastTimeout;


/* =========================================
   PAGE INFORMATION
========================================= */

const pageInformation = {

    home: {

        title: "My Shopping Lists",

        subtitle:
            "Organize your shopping with Cartiva"

    },

    shopping: {

        title: "Shopping Lists",

        subtitle:
            "Manage all of your shopping lists"

    },

    completed: {

        title: "Completed Items",

        subtitle:
            "Items you have already purchased"

    },

    settings: {

        title: "Settings",

        subtitle:
            "Personalize your Cartiva experience"

    }

};


/* =========================================
   SAVE SHOPPING LISTS
========================================= */

function saveShoppingLists() {

    localStorage.setItem(
        "cartivaShoppingLists",
        JSON.stringify(shoppingLists)
    );

}


/* =========================================
   SAVE PREFERENCES
========================================= */

function savePreferences() {

    localStorage.setItem(
        "cartivaPreferences",
        JSON.stringify(preferences)
    );


    /*
       Save individual keys too.
       This keeps compatibility with
       previous Cartiva versions.
    */

    localStorage.setItem(
        "cartivaTheme",
        preferences.theme
    );

    localStorage.setItem(
        "cartivaFontSize",
        preferences.fontSize
    );

    localStorage.setItem(
        "cartivaNotifications",
        String(preferences.notifications)
    );

    localStorage.setItem(
        "cartivaReminders",
        String(preferences.reminders)
    );

    localStorage.setItem(
        "cartivaReminderTime",
        preferences.reminderTime
    );

    localStorage.setItem(
        "cartivaReminderFrequency",
        preferences.reminderFrequency
    );

    localStorage.setItem(
        "cartivaCurrency",
        preferences.currency
    );

    localStorage.setItem(
        "cartivaBudget",
        String(preferences.budget)
    );

    localStorage.setItem(
        "cartivaDefaultCategory",
        preferences.defaultCategory
    );

    localStorage.setItem(
        "cartivaShowPrices",
        String(preferences.showPrices)
    );

    localStorage.setItem(
        "cartivaConfirmDelete",
        String(preferences.confirmDelete)
    );

}


/* =========================================
   APPLY PREFERENCES
========================================= */

function applyPreferences() {

    document.body.dataset.theme =
        preferences.theme;

    document.body.dataset.fontSize =
        preferences.fontSize;


    if (themeSelect) {

        themeSelect.value =
            preferences.theme;

    }


    if (fontSizeSelect) {

        fontSizeSelect.value =
            preferences.fontSize;

    }


    if (notificationToggle) {

        notificationToggle.checked =
            preferences.notifications;

    }


    if (reminderToggle) {

        reminderToggle.checked =
            preferences.reminders;

    }


    if (reminderTime) {

        reminderTime.value =
            preferences.reminderTime;

    }


    if (reminderFrequency) {

        reminderFrequency.value =
            preferences.reminderFrequency;

    }


    if (currencySelect) {

        currencySelect.value =
            preferences.currency;

    }


    if (budgetInput) {

        budgetInput.value =
            preferences.budget || "";

    }


    if (defaultCategory) {

        defaultCategory.value =
            preferences.defaultCategory;

    }


    if (showPricesToggle) {

        showPricesToggle.checked =
            preferences.showPrices;

    }


    updateBudgetDisplay();

    updateCurrencyInfo();

}


/* =========================================
   FONT SIZE
========================================= */

function applyFontSize() {

    const sizes = {

        small: 0.9,

        medium: 1,

        large: 1.1,

        "extra-large": 1.2

    };


    document.documentElement.style
        .setProperty(
            "--font-scale",
            sizes[preferences.fontSize] || 1
        );

}


/* =========================================
   FORMAT PRICE
========================================= */

const currencySettings = {

    PHP: {

        locale: "en-PH",

        code: "PHP",

        name: "Philippine Peso",

        symbol: "₱"

    },

    USD: {

        locale: "en-US",

        code: "USD",

        name: "US Dollar",

        symbol: "$"

    },

    EUR: {

        locale: "de-DE",

        code: "EUR",

        name: "Euro",

        symbol: "€"

    },

    JPY: {

        locale: "ja-JP",

        code: "JPY",

        name: "Japanese Yen",

        symbol: "¥"

    },

    GBP: {

        locale: "en-GB",

        code: "GBP",

        name: "British Pound",

        symbol: "£"

    }

};


function formatPrice(value) {

    const amount =
        Number(value) || 0;

    const currency =
        currencySettings[
            preferences.currency
        ] || currencySettings.PHP;


    try {

        return new Intl.NumberFormat(
            currency.locale,
            {
                style: "currency",
                currency: currency.code
            }
        ).format(amount);

    } catch (error) {

        return (
            currency.symbol +
            amount.toFixed(2)
        );

    }

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


/* =========================================
   GET ITEM TOTAL
========================================= */

function getItemTotal(item) {

    const quantity =
        Number(item.quantity) || 1;

    const price =
        Number(item.price) || 0;

    return quantity * price;

}


/* =========================================
   GET ALL ITEMS
========================================= */

function getAllItems() {

    return shoppingLists.flatMap(
        list => list.items || []
    );

}


/* =========================================
   GET TOTAL SPENDING
========================================= */

function getTotalSpending() {

    return getAllItems().reduce(
        (total, item) => {

            return total +
                getItemTotal(item);

        },
        0
    );

}


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics() {

    const allItems =
        getAllItems();

    const purchased =
        allItems.filter(
            item => item.completed
        );


    totalLists.textContent =
        shoppingLists.length;

    totalItems.textContent =
        allItems.length;

    totalCompleted.textContent =
        purchased.length;

    updateBudgetDisplay();

}


/* =========================================
   BUDGET DISPLAY
========================================= */

function updateBudgetDisplay() {

    if (!budgetDisplay) {
        return;
    }


    const budget =
        Number(preferences.budget) || 0;

    const spending =
        getTotalSpending();


    if (budget <= 0) {

        budgetDisplay.className =
            "budget-display";

        budgetDisplay.innerHTML = `
            <strong>No budget set</strong>
            <span>
                Add a budget to track your shopping spending.
            </span>
        `;

        return;

    }


    const percentage =
        Math.min(
            (spending / budget) * 100,
            100
        );


    let status = "Budget remaining";

    if (spending >= budget) {

        status =
            "⚠️ You have reached your budget.";

    } else if (percentage >= 80) {

        status =
            "⚠️ You are close to your budget.";

    }


    budgetDisplay.className =
        "budget-display " +
        (
            spending >= budget
                ? "budget-danger"
                : percentage >= 80
                    ? "budget-warning"
                    : "budget-safe"
        );


    budgetDisplay.innerHTML = `

        <div class="budget-top">

            <strong>
                ${formatPrice(spending)}
                /
                ${formatPrice(budget)}
            </strong>

            <span>
                ${Math.round(percentage)}%
            </span>

        </div>

        <div class="budget-progress">

            <span style="width:${percentage}%"></span>

        </div>

        <small>
            ${status}
        </small>

    `;

}


/* =========================================
   UPDATE CURRENCY INFORMATION
========================================= */

function updateCurrencyInfo() {

    if (!currentCurrencyInfo) {
        return;
    }


    const currency =
        currencySettings[
            preferences.currency
        ] || currencySettings.PHP;


    currentCurrencyInfo.textContent =
        `${currency.name} (${currency.symbol})`;

}


/* =========================================
   SHOW TOAST
========================================= */

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =========================================
   NAVIGATION
========================================= */

function navigateTo(page) {

    if (!pageInformation[page]) {
        return;
    }


    pages.forEach(section => {

        section.classList.remove(
            "active-page"
        );

    });


    const selectedPage =
        document.getElementById(
            page + "Page"
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    navItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.dataset.page === page
        ) {

            item.classList.add("active");

        }

    });


    pageTitle.textContent =
        pageInformation[page].title;

    pageSubtitle.textContent =
        pageInformation[page].subtitle;


    if (page === "home") {

        renderHome();

    }


    if (page === "shopping") {

        renderShoppingPage();

    }


    if (page === "completed") {

        renderCompleted();

    }


    closeSidebarMenu();

}


/* =========================================
   NAVIGATION EVENTS
========================================= */

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            navigateTo(
                item.dataset.page
            );

        }
    );

});


/* =========================================
   SIDEBAR
========================================= */

function openSidebarMenu() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

}


function closeSidebarMenu() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

}


menuButton.addEventListener(
    "click",
    openSidebarMenu
);


closeSidebar.addEventListener(
    "click",
    closeSidebarMenu
);


sidebarOverlay.addEventListener(
    "click",
    closeSidebarMenu
);


/* =========================================
   CREATE LIST MODAL
========================================= */

function openCreateListModal() {

    listModal.classList.add("show");

    setTimeout(() => {

        listName.focus();

    }, 100);

}


function closeCreateListModal() {

    listModal.classList.remove("show");

    createListForm.reset();

}


homeAddButton.addEventListener(
    "click",
    openCreateListModal
);


shoppingAddButton.addEventListener(
    "click",
    openCreateListModal
);


floatingAddButton.addEventListener(
    "click",
    openCreateListModal
);


closeListModal.addEventListener(
    "click",
    closeCreateListModal
);


cancelListButton.addEventListener(
    "click",
    closeCreateListModal
);


/* =========================================
   CREATE LIST
========================================= */

createListForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            listName.value.trim();


        if (!name) {

            showToast(
                "Please enter a list name."
            );

            return;

        }


        const newList = {

            id: Date.now(),

            name: name,

            createdAt:
                new Date().toLocaleDateString(),

            items: []

        };


        shoppingLists.unshift(
            newList
        );


        saveShoppingLists();

        updateStatistics();

        renderHome();

        renderShoppingPage();


        closeCreateListModal();


        showToast(
            `"${name}" created successfully!`
        );

    }
);


/* =========================================
   RENDER HOME
========================================= */

function renderHome() {

    updateStatistics();


    if (
        shoppingLists.length === 0
    ) {

        shoppingListContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>No shopping lists yet</h3>

                <p>
                    Create your first shopping list
                    to get started.
                </p>

                <button
                    class="primary-button"
                    id="emptyCreateList">
                    + Create Shopping List
                </button>

            </div>

        `;


        const emptyCreateList =
            document.getElementById(
                "emptyCreateList"
            );


        if (emptyCreateList) {

            emptyCreateList.addEventListener(
                "click",
                openCreateListModal
            );

        }


        return;

    }


    shoppingListContainer.innerHTML =
        shoppingLists
            .map(createListCard)
            .join("");


    attachListCardEvents(
        shoppingListContainer
    );

}


/* =========================================
   RENDER SHOPPING PAGE
========================================= */

function renderShoppingPage() {

    if (
        shoppingLists.length === 0
    ) {

        shoppingPageContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🛍️
                </div>

                <h3>Your shopping lists are empty</h3>

                <p>
                    Create a list to start organizing
                    your shopping.
                </p>

                <button
                    class="primary-button"
                    id="emptyShoppingCreate">
                    + New Shopping List
                </button>

            </div>

        `;


        const button =
            document.getElementById(
                "emptyShoppingCreate"
            );


        if (button) {

            button.addEventListener(
                "click",
                openCreateListModal
            );

        }


        return;

    }


    shoppingPageContainer.innerHTML =
        shoppingLists
            .map(createListCard)
            .join("");


    attachListCardEvents(
        shoppingPageContainer
    );

}


/* =========================================
   CREATE LIST CARD
========================================= */

function createListCard(list) {

    const items =
        list.items || [];

    const completed =
        items.filter(
            item => item.completed
        ).length;


    const total =
        items.length;


    const percentage =
        total > 0
            ? Math.round(
                (completed / total) * 100
            )
            : 0;


    return `

        <div
            class="shopping-card"
            data-list-id="${list.id}">

            <div class="card-top">

                <div class="list-card-icon">
                    🛒
                </div>

                <button
                    class="card-delete"
                    data-action="delete-list"
                    title="Delete list">
                    ×
                </button>

            </div>


            <h3>
                ${escapeHTML(list.name)}
            </h3>


            <p class="created-date">
                Created ${escapeHTML(list.createdAt)}
            </p>


            <div class="list-progress">

                <div class="progress-info">

                    <span>
                        ${completed} of ${total}
                        purchased
                    </span>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>

                <div class="progress-bar">

                    <span
                        style="width:${percentage}%">
                    </span>

                </div>

            </div>


            <div class="card-bottom">

                <span class="item-count">
                    ${total}
                    ${total === 1 ? "item" : "items"}
                </span>


                <button
                    class="view-button"
                    data-action="view-list">
                    Open List →
                </button>

            </div>

        </div>

    `;

}


/* =========================================
   LIST CARD EVENTS
========================================= */

function attachListCardEvents(container) {

    const cards =
        container.querySelectorAll(
            ".shopping-card"
        );


    cards.forEach(card => {

        const listId =
            card.dataset.listId;


        const viewButton =
            card.querySelector(
                '[data-action="view-list"]'
            );


        const deleteButton =
            card.querySelector(
                '[data-action="delete-list"]'
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                () => {

                    viewList(listId);

                }
            );

        }


        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    deleteList(listId);

                }
            );

        }

    });

}


/* =========================================
   VIEW LIST
========================================= */

function viewList(listId) {

    const list =
        findList(listId);


    if (!list) {
        return;
    }


    const items =
        list.items || [];


    const completed =
        items.filter(
            item => item.completed
        ).length;


    const totalCost =
        items.reduce(
            (total, item) => {

                return total +
                    getItemTotal(item);

            },
            0
        );


    detailsContent.innerHTML = `

        <div class="details-header">

            <div class="details-icon">
                🛒
            </div>

            <div>

                <h2>
                    ${escapeHTML(list.name)}
                </h2>

                <p>
                    ${items.length}
                    ${items.length === 1 ? "item" : "items"}
                </p>

            </div>

        </div>


        <div class="details-summary">

            <div>
                <span>Items</span>
                <strong>${items.length}</strong>
            </div>

            <div>
                <span>Purchased</span>
                <strong>${completed}</strong>
            </div>

            ${
                preferences.showPrices
                    ? `
                        <div>
                            <span>Total</span>
                            <strong>
                                ${formatPrice(totalCost)}
                            </strong>
                        </div>
                    `
                    : ""
            }

        </div>


        <div class="details-actions">

            <button
                class="primary-button"
                id="detailsAddItem">
                + Add Item
            </button>

        </div>


        <div class="item-list">

            ${
                items.length === 0
                    ? `
                        <div class="empty-items">
                            <div>📦</div>

                            <h3>No items yet</h3>

                            <p>
                                Add something to this
                                shopping list.
                            </p>
                        </div>
                    `
                    : items
                        .map(
                            item =>
                                createItemHTML(
                                    item,
                                    list.id
                                )
                        )
                        .join("")
            }

        </div>

    `;


    detailsModal.classList.add("show");


    const addItemButton =
        document.getElementById(
            "detailsAddItem"
        );


    if (addItemButton) {

        addItemButton.addEventListener(
            "click",
            () => {

                openItemModal(list.id);

            }
        );

    }


    attachItemEvents();

}


/* =========================================
   CREATE ITEM HTML
========================================= */

function createItemHTML(item, listId) {

    const total =
        getItemTotal(item);


    return `

        <div
            class="item-row ${
                item.completed
                    ? "completed-item"
                    : ""
            }"
            data-item-id="${item.id}">

            <button
                class="item-check ${
                    item.completed
                        ? "checked"
                        : ""
                }"
                data-action="toggle-item">

                ${
                    item.completed
                        ? "✓"
                        : ""
                }

            </button>


            <div class="item-information">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>

                    ${item.quantity} ×
                    ${escapeHTML(item.category)}

                    ${
                        item.notes
                            ? " • " +
                              escapeHTML(
                                  item.notes
                              )
                            : ""
                    }

                </span>

            </div>


            ${
                preferences.showPrices
                    ? `
                        <div class="item-price">

                            ${formatPrice(total)}

                        </div>
                    `
                    : ""
            }


            <button
                class="item-delete"
                data-action="delete-item"
                title="Delete item">

                ×

            </button>

        </div>

    `;

}


/* =========================================
   ATTACH ITEM EVENTS
========================================= */

function attachItemEvents() {

    const itemRows =
        detailsContent.querySelectorAll(
            ".item-row"
        );


    itemRows.forEach(row => {

        const itemId =
            row.dataset.itemId;


        const check =
            row.querySelector(
                '[data-action="toggle-item"]'
            );


        const deleteButton =
            row.querySelector(
                '[data-action="delete-item"]'
            );


        if (check) {

            check.addEventListener(
                "click",
                () => {

                    toggleItem(itemId);

                }
            );

        }


        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                () => {

                    deleteItem(itemId);

                }
            );

        }

    });

}


/* =========================================
   FIND LIST
========================================= */

function findList(listId) {

    return shoppingLists.find(
        list =>
            String(list.id) ===
            String(listId)
    );

}


/* =========================================
   FIND ITEM
========================================= */

function findItem(itemId) {

    for (const list of shoppingLists) {

        const item =
            (list.items || []).find(
                item =>
                    String(item.id) ===
                    String(itemId)
            );


        if (item) {

            return {
                item,
                list
            };

        }

    }


    return null;

}


/* =========================================
   OPEN ITEM MODAL
========================================= */

function openItemModal(listId) {

    const list =
        findList(listId);


    if (!list) {
        return;
    }


    modalListId.value =
        listId;

    modalItemName.value =
        "";

    modalQuantity.value =
        1;

    modalCategory.value =
        preferences.defaultCategory;

    modalPrice.value =
        "";

    modalNotes.value =
        "";


    itemModal.classList.add(
        "show"
    );


    setTimeout(() => {

        modalItemName.focus();

    }, 100);

}


/* =========================================
   CLOSE ITEM MODAL
========================================= */

function closeItemModalWindow() {

    itemModal.classList.remove(
        "show"
    );

    modalItemForm.reset();

}


/* =========================================
   ADD ITEM
========================================= */

modalItemForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const listId =
            modalListId.value;


        const list =
            findList(listId);


        if (!list) {

            showToast(
                "Shopping list not found."
            );

            return;

        }


        const name =
            modalItemName.value.trim();


        if (!name) {

            showToast(
                "Please enter an item name."
            );

            return;

        }


        const item = {

            id: Date.now(),

            name: name,

            quantity:
                Math.max(
                    1,
                    Number(
                        modalQuantity.value
                    ) || 1
                ),

            category:
                modalCategory.value,

            price:
                Math.max(
                    0,
                    Number(
                        modalPrice.value
                    ) || 0
                ),

            notes:
                modalNotes.value.trim(),

            completed: false,

            createdAt:
                new Date().toISOString()

        };


        if (!Array.isArray(list.items)) {

            list.items = [];

        }


        list.items.push(item);


        saveShoppingLists();

        updateStatistics();

        renderHome();

        renderShoppingPage();


        closeItemModalWindow();


        viewList(list.id);


        showToast(
            `"${name}" added to the list.`
        );

    }
);


/* =========================================
   TOGGLE ITEM
========================================= */

function toggleItem(itemId) {

    const result =
        findItem(itemId);


    if (!result) {
        return;
    }


    result.item.completed =
        !result.item.completed;


    saveShoppingLists();

    updateStatistics();

    renderHome();

    renderShoppingPage();

    renderCompleted();


    viewList(
        result.list.id
    );


    showToast(
        result.item.completed
            ? "Item marked as purchased."
            : "Item marked as not purchased."
    );

}


/* =========================================
   DELETE ITEM
========================================= */

function deleteItem(itemId) {

    const result =
        findItem(itemId);


    if (!result) {
        return;
    }


    if (
        preferences.confirmDelete &&
        !confirm(
            `Delete "${result.item.name}"?`
        )
    ) {

        return;

    }


    result.list.items =
        result.list.items.filter(
            item =>
                String(item.id) !==
                String(itemId)
        );


    saveShoppingLists();

    updateStatistics();

    renderHome();

    renderShoppingPage();

    renderCompleted();


    viewList(
        result.list.id
    );


    showToast(
        "Item deleted."
    );

}


/* =========================================
   DELETE LIST
========================================= */

function deleteList(listId) {

    const list =
        findList(listId);


    if (!list) {
        return;
    }


    if (
        preferences.confirmDelete &&
        !confirm(
            `Delete "${list.name}" and all of its items?`
        )
    ) {

        return;

    }


    shoppingLists =
        shoppingLists.filter(
            item =>
                String(item.id) !==
                String(listId)
        );


    saveShoppingLists();

    updateStatistics();

    renderHome();

    renderShoppingPage();


    showToast(
        "Shopping list deleted."
    );

}


/* =========================================
   COMPLETED PAGE
========================================= */

function renderCompleted() {

    const completedItems = [];


    shoppingLists.forEach(list => {

        (list.items || [])
            .forEach(item => {

                if (item.completed) {

                    completedItems.push({
                        item,
                        list
                    });

                }

            });

    });


    if (
        completedItems.length === 0
    ) {

        completedContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <h3>No completed items</h3>

                <p>
                    Purchased items will appear here.
                </p>

            </div>

        `;

        return;

    }


    completedContainer.innerHTML =
        completedItems
            .map(
                ({ item, list }) => `

                    <div class="completed-card">

                        <div class="completed-check">
                            ✓
                        </div>

                        <div class="completed-information">

                            <strong>
                                ${escapeHTML(item.name)}
                            </strong>

                            <span>
                                ${escapeHTML(list.name)}
                                •
                                Quantity: ${item.quantity}
                            </span>

                        </div>

                        ${
                            preferences.showPrices
                                ? `
                                    <strong class="completed-price">
                                        ${formatPrice(
                                            getItemTotal(item)
                                        )}
                                    </strong>
                                `
                                : ""
                        }

                    </div>

                `
            )
            .join("");

}


/* =========================================
   CLEAR COMPLETED
========================================= */

clearCompletedButton.addEventListener(
    "click",
    () => {

        const hasCompleted =
            getAllItems().some(
                item => item.completed
            );


        if (!hasCompleted) {

            showToast(
                "There are no completed items."
            );

            return;

        }


        if (
            preferences.confirmDelete &&
            !confirm(
                "Remove all completed items?"
            )
        ) {

            return;

        }


        shoppingLists.forEach(list => {

            list.items =
                (list.items || [])
                    .filter(
                        item =>
                            !item.completed
                    );

        });


        saveShoppingLists();

        updateStatistics();

        renderHome();

        renderShoppingPage();

        renderCompleted();


        showToast(
            "Completed items cleared."
        );

    }
);


/* =========================================
   CLEAR ALL SHOPPING DATA
========================================= */

clearAllButton.addEventListener(
    "click",
    () => {

        if (
            !confirm(
                "This will permanently delete all shopping lists and items. Continue?"
            )
        ) {

            return;

        }


        shoppingLists = [];


        saveShoppingLists();

        updateStatistics();

        renderHome();

        renderShoppingPage();

        renderCompleted();


        showToast(
            "All shopping data has been cleared."
        );

    }
);


/* =========================================
   SETTINGS: THEME
========================================= */

themeSelect.addEventListener(
    "change",
    () => {

        preferences.theme =
            themeSelect.value;

        savePreferences();

        applyPreferences();

        showToast(
            "Theme saved."
        );

    }
);


/* =========================================
   THEME QUICK BUTTONS
========================================= */

document
    .querySelectorAll(
        ".theme-option"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.themePreview;


                preferences.theme =
                    theme;


                savePreferences();

                applyPreferences();


                showToast(
                    "Theme saved."
                );

            }
        );

    });


/* =========================================
   SETTINGS: FONT SIZE
========================================= */

fontSizeSelect.addEventListener(
    "change",
    () => {

        preferences.fontSize =
            fontSizeSelect.value;

        savePreferences();

        applyPreferences();

        applyFontSize();


        showToast(
            "Font size saved."
        );

    }
);


/* =========================================
   SETTINGS: NOTIFICATIONS
========================================= */

notificationToggle.addEventListener(
    "change",
    async () => {

        preferences.notifications =
            notificationToggle.checked;


        if (
            preferences.notifications &&
            "Notification" in window
        ) {

            try {

                if (
                    Notification.permission ===
                    "default"
                ) {

                    await Notification.requestPermission();

                }

            } catch (error) {

                console.log(
                    "Notification permission unavailable."
                );

            }

        }


        savePreferences();


        showToast(
            preferences.notifications
                ? "Notifications enabled."
                : "Notifications disabled."
        );

    }
);


/* =========================================
   SETTINGS: REMINDERS
========================================= */

reminderToggle.addEventListener(
    "change",
    () => {

        preferences.reminders =
            reminderToggle.checked;


        savePreferences();


        showToast(
            preferences.reminders
                ? "Shopping reminders enabled."
                : "Shopping reminders disabled."
        );

    }
);


/* =========================================
   REMINDER TIME
========================================= */

reminderTime.addEventListener(
    "change",
    () => {

        preferences.reminderTime =
            reminderTime.value;

        savePreferences();

        showToast(
            "Reminder time saved."
        );

    }
);


/* =========================================
   REMINDER FREQUENCY
========================================= */

reminderFrequency.addEventListener(
    "change",
    () => {

        preferences.reminderFrequency =
            reminderFrequency.value;

        savePreferences();

        showToast(
            "Reminder frequency saved."
        );

    }
);


/* =========================================
   SETTINGS: CURRENCY
========================================= */

currencySelect.addEventListener(
    "change",
    () => {

        preferences.currency =
            currencySelect.value;

        savePreferences();

        updateCurrencyInfo();

        updateBudgetDisplay();

        renderHome();

        renderShoppingPage();

        renderCompleted();


        if (
            detailsModal.classList.contains(
                "show"
            )
        ) {

            const currentList =
                detailsContent
                    .querySelector(
                        "[data-current-list]"
                    );

        }


        showToast(
            "Currency saved."
        );

    }
);


/* =========================================
   SETTINGS: BUDGET
========================================= */

budgetInput.addEventListener(
    "input",
    () => {

        let value =
            Number(
                budgetInput.value
            );


        if (isNaN(value) || value < 0) {

            value = 0;

        }


        preferences.budget =
            value;


        savePreferences();

        updateBudgetDisplay();

    }
);


/* =========================================
   SETTINGS: DEFAULT CATEGORY
========================================= */

defaultCategory.addEventListener(
    "change",
    () => {

        preferences.defaultCategory =
            defaultCategory.value;

        savePreferences();


        showToast(
            "Default category saved."
        );

    }
);


/* =========================================
   SETTINGS: SHOW PRICES
========================================= */

showPricesToggle.addEventListener(
    "change",
    () => {

        preferences.showPrices =
            showPricesToggle.checked;

        savePreferences();

        renderHome();

        renderShoppingPage();

        renderCompleted();


        showToast(
            preferences.showPrices
                ? "Prices are now visible."
                : "Prices are now hidden."
        );

    }
);







/* =========================================
   NORMALIZE IMPORTED LIST
========================================= */

function normalizeList(list, listIndex) {

    const normalizedItems =
        Array.isArray(list.items)
            ? list.items.map(
                (item, itemIndex) => ({

                    id:
                        item.id ??
                        Date.now() +
                        itemIndex,

                    name:
                        String(
                            item.name ||
                            "Unnamed Item"
                        ),

                    quantity:
                        Math.max(
                            1,
                            Number(
                                item.quantity
                            ) || 1
                        ),

                    category:
                        item.category ||
                        "Other",

                    price:
                        Math.max(
                            0,
                            Number(
                                item.price
                            ) || 0
                        ),

                    notes:
                        String(
                            item.notes || ""
                        ),

                    completed:
                        Boolean(
                            item.completed
                        ),

                    createdAt:
                        item.createdAt ||
                        new Date().toISOString()

                })
            )
            : [];


    return {

        id:
            list.id ??
            Date.now() +
            listIndex,

        name:
            String(
                list.name ||
                "Imported List"
            ),

        createdAt:
            list.createdAt ||
            new Date().toLocaleDateString(),

        items:
            normalizedItems

    };

}


/* =========================================
   HELP CONTENT
========================================= */

const helpContent = {

    howToUse: {

        title:
            "How to Use Cartiva",

        content: `

            <div class="help-content">

                <h3>🛒 Create a Shopping List</h3>

                <p>
                    Click <strong>+ New List</strong>
                    from the Home page or Shopping Lists page.
                    Enter a name and press Create.
                </p>


                <h3>📦 Add Items</h3>

                <p>
                    Open one of your shopping lists and
                    press <strong>+ Add Item</strong>.
                    Enter the item name, quantity, category,
                    price, and optional notes.
                </p>


                <h3>✓ Mark Items as Purchased</h3>

                <p>
                    Press the circle beside an item to
                    mark it as purchased.
                </p>


                <h3>🗑 Delete Items</h3>

                <p>
                    Use the × button beside an item
                    to remove it.
                </p>

            </div>

        `

    },


    tips: {

        title:
            "Shopping Tips",

        content: `

            <div class="help-content">

                <h3>💡 Organize by Category</h3>

                <p>
                    Use Grocery, Household, Personal,
                    Electronics, and Other to keep your
                    items organized.
                </p>


                <h3>💰 Track Your Budget</h3>

                <p>
                    Set a shopping budget in Settings
                    to monitor your expected spending.
                </p>


                <h3>📝 Add Notes</h3>

                <p>
                    Use item notes for brands, sizes,
                    colors, or other details.
                </p>


                <h3>📤 Backup Your Data</h3>

                <p>
                    Export your Cartiva data regularly
                    so you have a backup copy.
                </p>

            </div>

        `

    },


    privacy: {

        title:
            "Privacy & Data",

        content: `

            <div class="help-content">

                <h3>🔒 Your Data</h3>

                <p>
                    In this version of Cartiva,
                    your shopping lists and preferences
                    are stored locally in your browser
                    using localStorage.
                </p>


                <h3>🌐 No External Server</h3>

                <p>
                    Cartiva does not require an external
                    database or server to store your
                    shopping-list information.
                </p>


                <h3>💾 Clearing Browser Data</h3>

                <p>
                    Clearing your browser's local storage
                    may remove your Cartiva data.
                    Use Export Data to create a backup.
                </p>

            </div>

        `

    }

};


/* =========================================
   OPEN INFO MODAL
========================================= */

function openInfoModal(
    title,
    content
) {

    infoModalContent.innerHTML = `

        <h2>${title}</h2>

        ${content}

    `;


    infoModal.classList.add(
        "show"
    );

}


/* =========================================
   HELP BUTTONS
========================================= */

document
    .getElementById(
        "howToUseButton"
    )
    .addEventListener(
        "click",
        () => {

            openInfoModal(
                helpContent.howToUse.title,
                helpContent.howToUse.content
            );

        }
    );


document
    .getElementById(
        "tipsButton"
    )
    .addEventListener(
        "click",
        () => {

            openInfoModal(
                helpContent.tips.title,
                helpContent.tips.content
            );

        }
    );


document
    .getElementById(
        "privacyButton"
    )
    .addEventListener(
        "click",
        () => {

            openInfoModal(
                helpContent.privacy.title,
                helpContent.privacy.content
            );

        }
    );


/* =========================================
   CLOSE MODALS
========================================= */

closeDetailsModal.addEventListener(
    "click",
    () => {

        detailsModal.classList.remove(
            "show"
        );

    }
);


closeItemModal.addEventListener(
    "click",
    closeItemModalWindow
);


closeInfoModal.addEventListener(
    "click",
    () => {

        infoModal.classList.remove(
            "show"
        );

    }
);


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

[
    listModal,
    detailsModal,
    itemModal,
    infoModal
].forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            listModal.classList.remove(
                "show"
            );

            detailsModal.classList.remove(
                "show"
            );

            itemModal.classList.remove(
                "show"
            );

            infoModal.classList.remove(
                "show"
            );

            closeSidebarMenu();

        }

    }
);


/* =========================================
   SHOPPING REMINDER
========================================= */

function getReminderStorageKey() {

    const now =
        new Date();


    if (
        preferences.reminderFrequency ===
        "weekly"
    ) {

        const start =
            new Date(
                now.getFullYear(),
                0,
                1
            );


        const week =
            Math.ceil(
                (
                    (
                        (
                            now - start
                        ) /
                        86400000
                    ) +
                    start.getDay() +
                    1
                ) / 7
            );


        return (
            "cartivaReminder-" +
            now.getFullYear() +
            "-week-" +
            week
        );

    }


    return (
        "cartivaReminder-" +
        now.toISOString().slice(0, 10)
    );

}


/* =========================================
   CHECK REMINDER
========================================= */

function checkReminder() {

    if (!preferences.reminders) {
        return;
    }


    const now =
        new Date();


    const currentTime =
        now.toTimeString()
            .slice(0, 5);


    if (
        currentTime !==
        preferences.reminderTime
    ) {

        return;

    }


    /*
       Weekly reminders appear on Monday.
    */

    if (
        preferences.reminderFrequency ===
        "weekly" &&
        now.getDay() !== 1
    ) {

        return;

    }


    const reminderKey =
        getReminderStorageKey();


    if (
        localStorage.getItem(
            "cartivaLastReminder"
        ) === reminderKey
    ) {

        return;

    }


    localStorage.setItem(
        "cartivaLastReminder",
        reminderKey
    );


    const message =
        "Don't forget to check your Cartiva shopping list! 🛒";


    /*
       Browser notification
    */

    if (
        preferences.notifications &&
        "Notification" in window &&
        Notification.permission ===
            "granted"
    ) {

        try {

            new Notification(
                "Cartiva Shopping Reminder",
                {
                    body: message,
                    icon: ""
                }
            );

        } catch (error) {

            showToast(message);

        }

    } else {

        showToast(message);

    }

}


/* =========================================
   REMINDER CHECK
========================================= */

setInterval(
    checkReminder,
    30000
);


/* =========================================
   INITIALIZE APPLICATION
========================================= */

function initializeCartiva() {

    applyPreferences();

    applyFontSize();

    updateStatistics();

    renderHome();

    renderShoppingPage();

    renderCompleted();


    /*
       Default page
    */

    navigateTo("home");


    /*
       Start splash screen
    */

    setTimeout(
        () => {

            splashScreen.classList.add(
                "hidden"
            );

            app.classList.remove(
                "hidden"
            );

        },
        1000
    );

}


/* =========================================
   START CARTIVA
========================================= */

initializeCartiva();


/* =========================================
   DEBUG / GLOBAL ACCESS
========================================= */

window.Cartiva = {

    shoppingLists,

    preferences,

    exportData:
        exportCartivaData,

    openCreateListModal,

    navigateTo

};