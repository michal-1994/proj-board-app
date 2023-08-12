$(function () {
    let oldList, newList, item;

    $(".sortable-row").sortable();
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
            connectWith: ".sortable-list",
        })
        .disableSelection();
});
