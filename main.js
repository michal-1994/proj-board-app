$(function () {
    function initSortable() {
        let oldList, newList, item;

        $(".sortable-row").sortable({
            cancel: ".unsortable",
        });
        $(".sortable-list")
            .sortable({
                start: function (event, ui) {
                    console.log("start");
                    item = ui.item;
                    newList = oldList = ui.item.parent().parent();
                },
                stop: function (event, ui) {
                    console.log("stop");
                },
                change: function (event, ui) {
                    console.log("change");
                    if (ui.sender) newList = ui.placeholder.parent().parent();
                },
                cancel: ".unsortable",
                connectWith: ".sortable-list",
            })
            .disableSelection();
    }

    initSortable();
});
