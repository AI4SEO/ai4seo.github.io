$(document).ready(function () {

    checkContainerTranslation();
    checkActionVisibility();
    checkActionPosition();
    checkArcPosition();

    var scrolltop = sessionStorage.scrollTop;

    if (sessionStorage.scrollTop != "undefined") {
        $(window).scrollTop(sessionStorage.scrollTop);
    }

    $(window).scroll(function () {
        sessionStorage.scrollTop = $(this).scrollTop();
    });

    $("container").on("transitionend", function () {
        $(this).style.transform = '';
    }, false);

    $(".action").css("height", $("#closingImage").height() - 100 + "px");

    var changeSpeedPoint = 0;
    var animationState = 0;
    var clickScroll = 0;
    var initial = true;
    var footerChangePosition = window.innerHeight - $("#closingImage").height() - $("header").height();
    var containerTranslateAmount;
    var highlightAnimationState = 0;
    var animationState = 0;
    var status = true;

    $.fn.moveIt = function () {
        var $window = $(window);
        var instances = [];

        $(this).each(function () {
            instances.push(new moveItItem($(this)));
        });

        window.onscroll = function () {

            scrollTop = $window.scrollTop();
            instances.forEach(function (inst) {
                inst.update(scrollTop);
            });
        }
    }

    var moveItItem = function (el) {
        this.el = $(el);
        this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function (scrollTop) {
        this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
    };

    window.addEventListener("scroll", checkActionVisibility);
    window.addEventListener("scroll", checkActionPosition);
    window.addEventListener("scroll", checkArcPosition);

    function checkContainerTranslation() {
        if (scrolltop > $(document).height() / 2) {
            $(".container").css("transform", "");
        }
    }

    function checkActionPosition() {
        if ($(".container")[0].getBoundingClientRect().bottom - 100 < footerChangePosition) {
            $(".container").css("margin-bottom", 0);
            $(".action").css("position", "relative");
            $(".action").css("z-index", "0");
            $("#closingImage").css("position", "absolute");
        } else {
            $(".container").css("margin-bottom", $("#closingImage").height() + "px");
            $(".action").css("position", "fixed");
            $(".action").css("z-index", "-1");
            $("#closingImage").css("position", "fixed");
        }
    }

    function checkActionVisibility() {
        if ($(document).scrollTop() >= $(document).height() / 2) {
            $(".action").css("visibility", "visible");
            $(".container").css("margin-bottom", $("#closingImage").height() + "px");
            $("footer").css("height", window.innerHeight - $("#closingImage").height() - $("header").height() + "px");
        } else {
            $(".action").css("visibility", "hidden");
        }
    }

    function positionArc() {
        if ($(".functionality:nth-child(4)")[0].getBoundingClientRect().top + 100 + $(".functionality:nth-child(1) .text").height() + 196 > window.innerHeight) {
            $(".functionality:nth-child(1) .text").after("<img class='arcService' src='Service.svg'>");
            $(".functionality:nth-child(1) .text").after("<img class='arcTool' src='Tool.svg'>");
            $(".functionality:nth-child(1) .text").after("<img class='arcDevices' src='Devices.svg'>");
            $(".functionality:nth-child(1) .text").after("<div class='lineBottom'></div>");
            $(".functionality:nth-child(1) .text").after("<div class='lineLeft'></div>");
            $(".functionality:nth-child(1) .text").after("<div class='lineRight'></div>");
        } else {
            $(".functionality:nth-child(4) .text").after("<div class='lineBottom'></div>");
            $(".functionality:nth-child(4) .text").after("<div class='lineLeft'></div>");
            $(".functionality:nth-child(4) .text").after("<div class='lineRight'></div>");
            $(".functionality:nth-child(4) .text").after("<img class='arcService' src='ServiceHighlightedAnimation.svg'>");
            $(".functionality:nth-child(4) .text").after("<img class='arcDevices' src='DevicesHighlightedEnd.svg'>");
            $(".functionality:nth-child(4) .text").after("<img class='arcTool' src='ToolHighlighted.svg'>");
        }
    }

    function getHighlightAnimationState() {
        var now = highlightAnimationState;

        if ($(".functionality:nth-child(4)")[0].getBoundingClientRect().top > window.innerHeight && $(".functionality:nth-child(2)")[0].getBoundingClientRect().bottom - $(".functionality:nth-child(2)").height() / 2 + 100 >= window.innerHeight) {
            highlightAnimationState = 1;
        } else if ($(".functionality:nth-child(2)")[0].getBoundingClientRect().bottom - $(".functionality:nth-child(2)").height() / 2 + 100 < window.innerHeight && $(".functionality:nth-child(2)")[0].getBoundingClientRect().bottom >= window.innerHeight) {
            highlightAnimationState = 2;
        } else if ($(".functionality:nth-child(2)")[0].getBoundingClientRect().bottom < window.innerHeight && $(".functionality:nth-child(3)")[0].getBoundingClientRect().bottom - $(".functionality:nth-child(3)").height() / 2 + 100 >= window.innerHeight) {
            highlightAnimationState = 3;
        } else if ($(".functionality:nth-child(3)")[0].getBoundingClientRect().bottom - $(".functionality:nth-child(3)").height() / 2 + 100 < window.innerHeight && $(".functionality:nth-child(3)")[0].getBoundingClientRect().bottom >= window.innerHeight) {
            highlightAnimationState = 4;
        } else if ($(".functionality:nth-child(3)")[0].getBoundingClientRect().bottom < window.innerHeight && $(".functionality:nth-child(4)")[0].getBoundingClientRect().bottom - $(".functionality:nth-child(4)").height() / 2 + 100 >= window.innerHeight) {
            highlightAnimationState = 5;
        } else if ($(".functionality:nth-child(4)")[0].getBoundingClientRect().bottom - $(".functionality:nth-child(4)").height() / 2 + 100 < window.innerHeight) {
            highlightAnimationState = 6;
        }

        if (now == highlightAnimationState) {
            status = false;
        } else {
            status = true;
        }

        return highlightAnimationState;
    }

    function checkArcPosition() {
        if ($(".functionalities")[0].getBoundingClientRect().top < 100 && $(".functionality:nth-child(4)")[0].getBoundingClientRect().top + 100 + $(".functionality:nth-child(1) .text").height() + 196 > window.innerHeight) {
            animationState = getHighlightAnimationState();
            if (animationState == 1 && status == true) {
                $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".arcService").remove();
                $(".arcTool").remove();
                $(".functionality:nth-child(1) .text").after("<img class='arcTool' style='transform:scale(1.5)' src='ToolHighlighted.svg'>");
                setTimeout(function () {
                    $(".arcTool").css("transform", "scale(1)");
                }, 300)
                $(".functionality:nth-child(1) .text").after("<img class='arcService' src='Service.svg'>");
            } else if (animationState == 2 && status == true) {
                $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".arcService").remove();
                $(".functionality:nth-child(1) .text").after("<img class='arcService' style='transform:scale(1.5)' src='ServiceHighlighted.svg'>");
                setTimeout(function () {
                    $(".arcService").css("transform", "scale(1)");
                }, 300)
            } else if (animationState == 3 && status == true) {
                $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".arcTool").remove();
                $(".arcDevices").remove();
                $(".arcService").remove();
                $(".functionality:nth-child(1) .text").after("<img class='arcService' style='opacity:0' src='ServiceHighlightedAnimation.svg'>");
                setTimeout(function () {
                    $(".arcService").css("opacity", "1");
                }, 10)
                $(".functionality:nth-child(1) .text").after("<img class='arcTool' src='ToolHighlighted.svg'>");
                $(".functionality:nth-child(1) .text").after("<img class='arcDevices' src='Devices.svg'>");
            } else if (animationState == 4 && status == true) {
                $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".arcTool").remove();
                $(".arcService").remove();
                $(".arcDevices").remove();
                $(".functionality:nth-child(1) .text").after("<img class='arcDevices' style='transform:scale(1.5)' src='DevicesHighlighted.svg'>");
                $(".functionality:nth-child(1) .text").after("<img class='arcService' src='Service.svg'>");
                $(".functionality:nth-child(1) .text").after("<img class='arcTool' src='Tool.svg'>");
                setTimeout(function () {
                    $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
                }, 100)
                setTimeout(function () {
                    $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
                }, 200)
                setTimeout(function () {
                    $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
                    $(".arcDevices").css("transform", "scale(1)");
                }, 300)
                setTimeout(function () {
                }, 600)
            } else if (animationState == 5 && status == true) {
                $(".arcTool").remove();
                $(".arcService").remove();
                $(".arcDevices").remove();
                $(".functionality:nth-child(1) .text").after("<img class='arcDevices' style='opacity:0' src='DevicesHighlighted.svg'>");
                $(".functionality:nth-child(1) .text").after("<img class='arcService' style='opacity:0' src='Service.svg'>");
                $(".functionality:nth-child(1) .text").after("<img class='arcTool' style='opacity:0' src='Tool.svg'>");
                $(".arcDevices").css("opacity", "1");
                $(".arcService").css("opacity", "1");
                $(".arcTool").css("opacity", "1");
                setTimeout(function () {
                    $(".pie").css({ "opacity": 1, "transform": "scale(1)" });
                }, 300)
                setTimeout(function () {
                    $(".cylinders").css({ "opacity": 1, "transform": "scale(1)" });
                }, 400)
                setTimeout(function () {
                    $(".stacks").css({ "opacity": 1, "transform": "scale(1)" });
                }, 500)
                setTimeout(function () {
                    $(".bars").css({ "opacity": 1, "transform": "scale(1)" });
                }, 600)
            } else if (animationState == 6 && status == true) {
                if ($(".arcTool").attr("src") == "ToolHighlighted.svg" && $(".arcService").attr("src") == "ServiceHighlightedAnimation.svg" && $(".arcDevices").attr("src") == "DevicesHighlightedEnd.svg") {
                    return;
                }
                $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
                setTimeout(function () {
                    $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
                }, 100)
                setTimeout(function () {
                    $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
                }, 200)
                setTimeout(function () {
                    $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
                    $(".arcDevices").css("opacity", 0);
                    $(".arcService").css("opacity", 0);
                    $(".arcTool").css("opacity", 0);
                }, 300)
                setTimeout(function () {
                    $(".arcTool").remove();
                    $(".arcService").remove();
                    $(".arcDevices").remove();
                    $(".functionality:nth-child(1) .text").after("<img class='arcDevices' style='opacity:0' src='DevicesHighlightedEnd.svg'>");
                    $(".functionality:nth-child(1) .text").after("<img class='arcService' style='opacity:0' src='ServiceHighlightedAnimation.svg'>");
                    $(".functionality:nth-child(1) .text").after("<img class='arcTool' style='opacity:0' src='ToolHighlighted.svg'>");
                    $(".arcDevices").css("opacity", "1");
                    $(".arcService").css("opacity", "1");
                    $(".arcTool").css("opacity", "1");
                }, 600)
            }
            $(".container").css("transform", "");
            $(".container").css("margin-top", containerTranslateAmount + "px");
            var marginLeft = $(".text").width() + 170;
            $(".deviceAnimation").show();
            $(".lineBottom").css("position", "fixed");
            $(".lineBottom").css("top", "578px");
            $(".lineBottom").css("margin-top", "0");
            $(".lineLeft").css("position", "fixed");
            $(".lineLeft").css("top", "500px");
            $(".lineLeft").css("margin-top", "0");
            $(".lineRight").css("position", "fixed");
            $(".lineRight").css("top", "510px");
            $(".lineRight").css("margin-top", "0");
            $(".arcDevices").css("position", "fixed");
            $(".arcDevices").css("top", "450px");
            $(".arcDevices").css("margin-left", marginLeft + "px");
            $(".arcDevices").css("margin-top", "0");
            $(".arcService").css("position", "fixed");
            $(".arcService").css("top", "555px");
            $(".arcService").css("right", 94 + "px");
            $(".arcService").css("margin-top", "0");
            $(".arcTool").css("position", "fixed");
            $(".arcTool").css("top", "390px");
            $(".arcTool").css("right", 248 + "px");
            $(".arcTool").css("margin-top", "0");
        } else {
            highlightAnimationState = 0;
            $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
            $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
            $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
            $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
            $(".lineBottom").remove();
            $(".lineLeft").remove();
            $(".lineRight").remove();
            $(".arcDevices").remove();
            $(".arcService").remove();
            $(".arcTool").remove();
            positionArc()
            $(".deviceAnimation").hide();
            $(".arcDevices").css("position", "relative");
            $(".arcDevices").css("top", "0");
            $(".arcDevices").css("margin-left", "100px");
            $(".arcDevices").css("margin-top", "350px");
            $(".arcService").css("position", "relative");
            $(".arcService").css("top", "0");
            $(".arcService").css("margin-left", "200px");
            $(".arcService").css("margin-top", "455px");
        }
    }

    function checkSpeedLimits() {
        if ($(window).scrollTop() == 0 && $(".container")[0].getBoundingClientRect().bottom > 0) {
            $(".container").attr("data-scroll-speed", 1);
            changeSpeed();
        } else {
            $(".container").attr("data-scroll-speed", 20);
        }
    }

    // Initialization
    function changeSpeed() {
        $('[data-scroll-speed]').moveIt();
    }
    setTimeout(function () {
        window.addEventListener("scroll", checkSpeedLimits);
        checkSpeedLimits();
    }, 100)

    /* changeSpeed(); */

    $(".see").click(function () {

        animatedHowScroll();
    })

    $("li a").first().click(function () {

        howScroll();
    });

    $("li a").eq(1).click(function () {

        productScroll();
    });

    window.addEventListener("scroll", removeButton);
    window.addEventListener("scroll", addButton);
    window.addEventListener("scroll", resetAnimation);
    window.addEventListener("scroll", stickHero);
    window.addEventListener("scroll", releaseHero);
    window.addEventListener("scroll", changeShadeNoAnimation);


    function removeButton() {

        if ($(window).scrollTop() > 0 && clickScroll == 0) {
            $(".see").prop("disabled", true);
            $(".see").animate({ opacity: 0 }, 500)
            window.removeEventListener("scroll", removeButton);
            window.addEventListener("scroll", addButton);

        }
    }

    function addButton() {

        if ($(window).scrollTop() == 0 && clickScroll == 0) {
            $(".see").prop("disabled", false);
            $(".see").animate({ opacity: 1 }, 500)
            window.removeEventListener("scroll", addButton);
            window.addEventListener("scroll", removeButton);
        }
    }

    function changeShadeNoAnimation() {
        if ($("#hero")[0].getBoundingClientRect().top >= $("header").height() && animationState == 0) {
            $("header").css("box-shadow", "0px 20px 50px -20px #ffffff");
        } else if ($(".technologyStack")[0].getBoundingClientRect().bottom - 1 <= $("header").height()) {
            $("header").css("box-shadow", "0px 20px 50px -20px #ffffff");
        } else {
            $("header").css("box-shadow", "0px 20px 50px -20px #000000");
        }
    }

    function changeShade() {
        if ($("#hero")[0].getBoundingClientRect().top >= $("header").height()) {
            $("header").css("box-shadow", "0px 20px 50px -20px #ffffff");
            window.removeEventListener("scroll", changeShade);
        }
    }

    function resetAnimation() {
        if (animationState == 1 && clickScroll == 0 && $(".container")[0].getBoundingClientRect().top < $("header").height()) {
            animationState = 0;
            clickScroll = 0;

            $(".container").css("box-shadow", "0px -20px 50px 20px #ffffff, 0 20px 50px -20px #ffffff");
            $(".see").css("color", "#ffffff");
            $(".see").removeAttr("id");
            $("#landingImage").css("filter", "brightness(.5)");
            $("h1, #landing p").css("color", "white");
            $("h1, #landing p").css("text-shadow", "none");
            $("#landing p").html("Welcome to AI 4 SEO!<br>Use our AI-driven tool to boost your ranking.").animate({ "opacity": 1, "font-size": "2em" }, 1);
            $("#landing p").css({ "text-transform": "none", "font-family": "'Roboto', sans-serif", "font-weight": "300" });

            window.addEventListener("scroll", changeShade);
        }
    }

    function stickHero() {
        if ($("#hero")[0].getBoundingClientRect().top - $(".start")[0].getBoundingClientRect().bottom + 30 <= 0) {
            containerTranslateAmount = parseInt($(".container").css('transform').split(',')[5]);
            $(".container").removeAttr("data-scroll-speed");

            changeSpeedPoint = $(".see")[0].getBoundingClientRect().top;

            changeSpeed();

            window.removeEventListener("scroll", stickHero);
            window.addEventListener("scroll", releaseHero);
        }
    }

    function releaseHero() {

        if ($(".start")[0].getBoundingClientRect().top >= changeSpeedPoint && changeSpeedPoint != 0) {

            $(".container").attr("data-scroll-speed", "1");

            changeSpeed();
            window.addEventListener("scroll", stickHero);
            window.removeEventListener("scroll", releaseHero);
        }
    }

    function animatedHowScroll() {

        clickScroll = 1;

        var scrollTop = $("#hero")[0].getBoundingClientRect().top - $(".see")[0].getBoundingClientRect().bottom + 58;

        $('html,body').animate({ scrollTop: scrollTop },
            Math.abs(window.scrollY - $("#hero").offset().top) * 1);
        $(".see").prop("disabled", true);
        $(".see").animate({ opacity: 0 }, 500)

        setTimeout(function () {
            var top = window.innerHeight - $("#hero").height() + 16;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
            animationState = 0;
            clickScroll = 0;
            $("#landingImage").css("filter", "brightness(.5)");
            $("h1, #landing p").css("color", "white");
            $("h1, #landing p").css("text-shadow", "none");
            $("#landing p").animate({ 'opacity': 0 }, 500, function () {
                $(this).html("Welcome to AI 4 SEO!<br>Use our AI-driven tool to boost your ranking.").animate({ "opacity": 1, "font-size": "2em" }, 200);
                $(this).css({ "text-transform": "none", "font-family": "'Roboto', sans-serif", "font-weight": "300" });
            });
            $(this).prop("disabled", true);
            $(".see").removeAttr("id");
            setTimeout(function () {
                $(".see").prop("disabled", false);
            }, 600)
        }, 1000)
    }

    function howScroll() {
        var top;
        if ($(window).scrollTop() > changeSpeedPoint) {
            top = $("#hero")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - window.innerHeight + $("header").height() + 176 + $("#hero").height();
        } else {
            top = $("#hero")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - window.innerHeight + $("header").height() + 176 + $("#hero").height() + $(".see")[0].getBoundingClientRect().top - $(".container")[0].getBoundingClientRect().top;
        }
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }

    function productScroll() {
        var top;
        if ($(window).scrollTop() > changeSpeedPoint) {
            top = $(".product")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top + 105;

        } else if (initial) {
            top = $(".product")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top + 45 + $(".see")[0].getBoundingClientRect().top - $(".container")[0].getBoundingClientRect().top;
            initial = false;
        } else {
            top = $(".product")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top + 120 + $(".see")[0].getBoundingClientRect().top - $(".container")[0].getBoundingClientRect().top;
        }
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }

    $(".see").on({
        mouseenter: function (e) {
            if (animationState == 1 | clickScroll == 1) {
                return;
            }
            else {
                animationState = 1;
                $(".container").css("box-shadow", "0px -30px 50px -5px #000000");
                $("header").css("box-shadow", "0px 20px 50px -20px #000000");
                $("#landingImage").css("filter", "brightness(1.5) blur(5px)");
                $("h1, #landing p").css({ "color": "#0BB1D3", "text-shadow": "1px 1px 1px rgba(11,117,211,1),1px 2px 1px rgba(11,117,211,1),1px 3px 1px rgba(11,117,211,1),1px 4px 1px rgba(11,117,211,1),1px 5px 1px rgba(11,117,211,1),1px 6px 1px rgba(11,117,211,1),1px 7px 1px rgba(11,117,211,1),1px 8px 1px rgba(11,117,211,1),1px 9px 1px rgba(11,117,211,1),1px 10px 1px rgba(11,117,211,1),1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)" });
                $("#landing p").animate({ 'opacity': 0 }, 100, function () {
                    $(this).html("Get Enlightened!").animate({ "opacity": 1, "font-size": "6em" }, 600);
                    $(this).css({ "text-transform": "uppercase", "font-family": "Orbitron", "font-weight": "bold" });
                });
                $(".see").css("color", "#0BB1D3");
                $(this).prop("disabled", true);
                $(".see").attr("id", "see");
                setTimeout(function () {
                    $(".see").prop("disabled", false);
                }, 600)
            }
        },
        mouseleave: function (e) {
            if (animationState == 0 | clickScroll == 1) {
                return;
            }
            else {
                animationState = 0;
                $(".container").css("box-shadow", "0px -20px 50px 20px #ffffff, 0 20px 50px -20px #ffffff");
                $("header").css("box-shadow", "0px 20px 50px -20px #ffffff");
                $("#landingImage").css("filter", "brightness(.5)");
                $("h1, #landing p").css("color", "white");
                $("h1, #landing p").css("text-shadow", "none");
                $("#landing p").animate({ 'opacity': 0 }, 500, function () {
                    $(this).html("Welcome to AI 4 SEO!<br>Use our AI-driven tool to boost your ranking.").animate({ "opacity": 1, "font-size": "2em" }, 200);
                    $(this).css({ "text-transform": "none", "font-family": "'Roboto', sans-serif", "font-weight": "300" });
                });
                $(".see").css("color", "#ffffff");
                $(this).prop("disabled", true);
                $(".see").removeAttr("id");
                setTimeout(function () {
                    $(".see").prop("disabled", false);
                }, 600)
            }
        }
    })
})