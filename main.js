$(function () {
    function updateBoard() {
        initSortable();
        addListeners();
    }

    function initSortable() {
        let oldList, newList, item;

        $(".sortable-row").sortable({
            beforeStop: function (event, ui) {
                if (!ui.placeholder.next().is("li")) {
                    $(".sortable-row").sortable("cancel");
                }
            },
            cancel: ".unsortable",
        });
        $(".sortable-list")
            .sortable({
                start: function (event, ui) {
                    item = ui.item;
                    newList = oldList = ui.item.parent().parent();
                },
                change: function (event, ui) {
                    if (ui.sender) newList = ui.placeholder.parent().parent();
                },
                beforeStop: function (event, ui) {
                    if (!ui.placeholder.next().is("li") || !ui.item.prev().is("li")) {
                        $(".sortable-list").sortable("cancel");
                    }
                },
                cancel: ".unsortable",
                connectWith: ".sortable-list",
            })
            .disableSelection();
    }

    function addListeners() {
        // Add list
        $(".sortable-add-list-button input[type='text']").keypress(function (
            e
        ) {
            if (e.which === 13) {
                const value = $(this).val();

                addList(value);
                $(this).val("");
            }
        });

        $(".sortable-add-list-button button").click(function (e) {
            const input = $(this).siblings()[0];
            const value = $(this).siblings()[0].value;

            addList(value);
            $(input).val("");
        });

        // Remove list
        $(".sortable-list-title button").click(function (e) {
            const list = $(this).parent().parent().parent()[0];
            removeList(list);
        });

        // Add item
        $(".sortable-add-item-button input[type='text']").keypress(function (
            e
        ) {
            if (e.which === 13) {
                const value = $(this).val();

                addItem(value, this);
                $(this).val("");
            }
        });

        $(".sortable-add-item-button button").click(function (e) {
            const input = $(this).siblings()[0];
            const value = $(this).siblings()[0].value;

            addItem(value, input);
            $(input).val("");
        });

        // Remove item
        $(".sortable-list-item button").click(function (e) {
            const item = $(this).parent()[0];
            removeItem(item);
        });

        // Edit input
        $(".sortable-list-item input").click(function (e) {
            $(this).focus();
            this.selectionStart = this.selectionEnd = -1;
        });

        $(".sortable-list-item input").keypress(function (e) {
            if (e.which === 13) {
                $(this).blur();
            }
        });

        // Select text
        $(".sortable-list-item input").dblclick(function (e) {
            $(this).select();
        });
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
                        <input type="text" placeholder="Add item" />
                        <button>
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>
                </ul>
            </li>`;
            $(html).insertBefore(".sortable-row > li.unsortable");
            updateBoard();
        }
    }

    function removeList(list) {
        $(list).remove();
        updateBoard();
    }

    function addItem(value, input) {
        if (value !== "") {
            const html = `<li class="ui-state-default sortable-list-item">
                <input type="text" placeholder="Item" value="${value}" />
                <button>
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </li>`;
            $(html).insertBefore($(input).parent());
            updateBoard();
        }
    }

    function removeItem(item) {
        $(item).remove();
        updateBoard();
    }

    updateBoard();
});
