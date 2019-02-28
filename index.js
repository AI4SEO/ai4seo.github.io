$(document).ready(function () {

    $("#see").click(function () {
        howScroll();
    })

    $("li a").first().click(function () {
        howScroll();
    });

    $("li a").eq(1).click(function () {
        productScroll();
    });

    function howScroll() {
        $(".how")[0].scrollIntoView({
            behavior: 'smooth'
        });
    }

    function productScroll() {
        $(".product")[0].scrollIntoView({
            behavior: 'smooth'
        });
    }
})