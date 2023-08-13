$(function () {
    function initApp() {
        const board = [];

        initSortable();

        // Add list
        $(".sortable-add-list-button input[type='text']").keypress(function (
            e
        ) {
            if (e.which === 13) {
                const value = $(this).val();

                addList(value);
                board.push({
                    list: value,
                    items: [],
                });
                $(this).val("");
                console.log(board);
            }
        });

        $(".sortable-add-list-button button").click(function (e) {
            const input = $(this).siblings()[0];
            const value = $(this).siblings()[0].value;

            addList(value);
            board.push({
                list: value,
                items: [],
            });
            $(input).val("");
            console.log(board);
        });

        // Remove list

        // Edit list

        // Add item

        // Remove item

        // Edit item

        // Save to localStorage
    }

    function initSortable() {
        let oldList, newList, item;

        $(".sortable-row").sortable({
            cancel: ".unsortable",
        });
        $(".sortable-list")
            .sortable({
                start: function (event, ui) {
                    item = ui.item;
                    newList = oldList = ui.item.parent().parent();
                },
                stop: function (event, ui) {},
                change: function (event, ui) {
                    if (ui.sender) newList = ui.placeholder.parent().parent();
                },
                cancel: ".unsortable",
                connectWith: ".sortable-list",
            })
            .disableSelection();
    }

    function addList(value) {
        if (value !== "") {
            const html = `<li class="ui-state-default">
                <ul class="sortable-list">
                    <div class="sortable-list-title unsortable">
                        <input type="text" placeholder="Title" value="${value}" />
                        <button>
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                    <div class="sortable-add-item-button unsortable">
                        <input type="text" placeholder="Add" />
                        <button>
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>
                </ul>
            </li>`;
            $(html).insertBefore(".sortable-row li:last-child");
        }
    }

    function editList(id) {}

    function removeList(id) {}

    function addItem() {}

    function editItem(id) {}

    function removeItem(id) {}

    initApp();
});
