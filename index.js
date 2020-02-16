$(document).ready(function () {

    var url = window.location.pathname;
    var pathname = url.substr(url.lastIndexOf('/') + 1);

    if (pathname == "thankyou.html") {
        $("#home").hover(function () {
            $("#left").css("right", "120px");
            $("#left").css("opacity", ".75");
            $("#home").css("opacity", ".75");
        }, function () {
            $("#left").css("right", "110px");
            $("#left").css("opacity", 1);
            $("#home").css("opacity", 1);
        });
        return;
    } else if (pathname == "index.html") {

        const footerChangePosition = window.innerHeight - $("#closingImage").height() - $("header").height();

        checkLandingHeight();
        checkLandingVisibility();

        var stickyPoint;
        var landingText;
        var landingAnimationState = 0;
        var containerTranslateAmount;

        function setStickyPoint() {
            setTimeout(function () {
                stickyPoint = $(".container")[0].getBoundingClientRect().top - $(".see")[0].getBoundingClientRect().bottom + 33;
            }, 1000)
        }

        window.addEventListener("load", setStickyPoint);
        window.addEventListener("resize", setStickyPoint);

        window.addEventListener("scroll", checkLandingVisibility);
        window.addEventListener("resize", checkLandingVisibility);

        function checkLandingHeight() {
            if (window.innerHeight >= $("#uploadLandingImage").height()) {
                $("#landing").css("height", $("#uploadLandingImage").height() - 180);
                $("#uploadShade").css("height", $("#uploadLandingImage").height() - 100);
            } else if (window.innerHeight >= $("#landingImage").height()) {
                $("#landing").css("height", $("#landingImage").height() - 180);
            }
        };

        function checkLandingVisibility() {
            if ($(document).scrollTop() >= $("#landing").height() + 100) {
                $("#landing").css("visibility", "hidden");
            } else {
                $("#landing").css("visibility", "visible");
            }
        }

        landingText = "Welcome to AI 4 SEO!<br>Use our AI-driven tool to boost your ranking.";

        checkActionVisibility();
        checkActionPosition();
        checkArcPosition();

        var animationState = 0;
        var highlightAnimationState = 0;
        var status = true;

        window.addEventListener("scroll", checkActionVisibility);
        window.addEventListener("scroll", checkActionPosition);
        window.addEventListener("scroll", checkArcPosition);
        window.addEventListener("resize", checkActionVisibility);
        window.addEventListener("resize", checkActionPosition);
        window.addEventListener("resize", checkArcPosition);

        function checkActionPosition() {
            $(".action").css("height", $("#closingImage").height() - 100 + "px");
            if ($(".container")[0].getBoundingClientRect().bottom - 100 <= footerChangePosition) {
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
                $(".container").css("transform", "");
                $(".container").css("margin-top", containerTranslateAmount + "px");
                $("footer").css("height", window.innerHeight - $("#closingImage").height() - $("header").height() + "px");
            } else {
                $(".action").css("visibility", "hidden");
                $(".container").css("transform", "translateY(" + containerTranslateAmount + "px)");
                $(".container").css("margin-top", 0);
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

        function removeArc() {
            $(".arcDevices").remove();
            $(".arcService").remove();
            $(".arcTool").remove();
        }

        function removeInterface() {
            $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
            setTimeout(function () {
                $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
            }, 100)
            setTimeout(function () {
                $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
            }, 200)
            setTimeout(function () {
                $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
            }, 300)
        }

        function hideInterface() {
            setTimeout(function () {
                $(".bars").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".stacks").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".cylinders").css({ "opacity": 0, "transform": "scale(0.5)" });
                $(".pie").css({ "opacity": 0, "transform": "scale(0.5)" });
            }, 300)
        }

        function checkArcPosition() {
            if ($(".functionalities")[0].getBoundingClientRect().top < 100 && $(".functionality:nth-child(4)")[0].getBoundingClientRect().top + 100 + $(".functionality:nth-child(1) .text").height() + 196 > window.innerHeight) {
                animationState = getHighlightAnimationState();
                if (animationState == 1 && status == true) {
                    hideInterface();
                    $(".arcService").remove();
                    $(".arcTool").remove();
                    $(".functionality:nth-child(1) .text").after("<img class='arcTool' style='transform:scale(1.5)' src='ToolHighlighted.svg'>");
                    setTimeout(function () {
                        $(".arcTool").css("transform", "scale(1)");
                    }, 300)
                    $(".functionality:nth-child(1) .text").after("<img class='arcService' src='Service.svg'>");
                } else if (animationState == 2 && status == true) {
                    hideInterface();
                    $(".arcService").remove();
                    $(".functionality:nth-child(1) .text").after("<img class='arcService' style='transform:scale(1.5)' src='ServiceHighlighted.svg'>");
                    setTimeout(function () {
                        $(".arcService").css("transform", "scale(1)");
                    }, 300)
                } else if (animationState == 3 && status == true) {
                    hideInterface();
                    removeArc();
                    $(".functionality:nth-child(1) .text").after("<img class='arcService' style='opacity:0' src='ServiceHighlightedAnimation.svg'>");
                    setTimeout(function () {
                        $(".arcService").css("opacity", "1");
                    }, 10)
                    $(".functionality:nth-child(1) .text").after("<img class='arcTool' src='ToolHighlighted.svg'>");
                    $(".functionality:nth-child(1) .text").after("<img class='arcDevices' src='Devices.svg'>");
                } else if (animationState == 4 && status == true) {
                    hideInterface();
                    removeArc();
                    $(".functionality:nth-child(1) .text").after("<img class='arcDevices' style='transform:scale(1.5)' src='DevicesHighlighted.svg'>");
                    $(".functionality:nth-child(1) .text").after("<img class='arcService' src='Service.svg'>");
                    $(".functionality:nth-child(1) .text").after("<img class='arcTool' src='Tool.svg'>");
                    removeInterface();
                    setTimeout(function () {
                        $(".arcDevices").css("transform", "scale(1)");
                    }, 300)
                } else if (animationState == 5 && status == true) {
                    removeArc();
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
                    removeInterface();
                    setTimeout(function () {
                        $(".arcDevices").css("opacity", 0);
                        $(".arcService").css("opacity", 0);
                        $(".arcTool").css("opacity", 0);
                    }, 300)
                    setTimeout(function () {
                        removeArc();
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
                $(".arcDevices").css("right", 394 + "px");
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
                $(".lineBottom").remove();
                $(".lineLeft").remove();
                $(".lineRight").remove();
                hideInterface();
                removeArc();
                positionArc()
                $(".deviceAnimation").hide();
                $(".arcDevices").css("position", "absulte");
                $(".arcDevices").css("top", "350px");
                $(".arcDevices").css("right", 394 + "px");
                $(".arcDevices").css("margin-left", 0);
                $(".arcDevices").css("margin-top", 0);
                $(".arcService").css("position", "absolute");
                $(".arcService").css("top", "455px");
                $(".arcService").css("right", 94 + "px");
                $(".arcService").css("margin-top", 0);
            }
        }

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
            window.addEventListener("resize", checkSpeedLimits);
            checkSpeedLimits();
        }, 100)

        $(".see").click(function () {
            animatedHowScroll();
        })

        $("li a").first().click(function () {
            howScroll();
        });

        window.addEventListener("scroll", toggleButton);
        window.addEventListener("scroll", resetAnimation);
        window.addEventListener("scroll", toggleHero);
        window.addEventListener("scroll", changeShade);
        window.addEventListener("resize", toggleButton);
        window.addEventListener("resize", resetAnimation);
        window.addEventListener("resize", toggleHero);
        window.addEventListener("resize", changeShade);
        window.addEventListener("resize", checkLandingHeight);


        function toggleButton() {
            if ($(window).scrollTop() > 0) {
                $(".see").prop("disabled", true);
                $(".see").css("opacity", 0);
                $(".see").css("pointer-events", "none");
            } else {
                $(".see").prop("disabled", false);
                $(".see").css("opacity", 1);
                $(".see").css("pointer-events", "all");
            }
        }

        function changeShade() {
            if (landingAnimationState == 1 || $(".container")[0].getBoundingClientRect().top < $("header").height() && $(".container")[0].getBoundingClientRect().bottom - 1 > $("header").height()) {
                $("header").css("box-shadow", "0px 20px 50px -20px #000000");
            } else {
                $("header").css("box-shadow", "0px 20px 50px -20px #ffffff");
            }
        }

        function resetAnimation() {
            if (landingAnimationState == 1 && $(".container")[0].getBoundingClientRect().top < $("header").height()) {
                landingAnimationState = 0;

                $(".container").css("box-shadow", "0px -20px 50px 20px #ffffff, 0 20px 50px -20px #ffffff");
                $(".see").css("color", "#ffffff");
                $(".see").removeAttr("id");
                $("#landingImage").css("filter", "brightness(.5)");
                $("#uploadShade").css("filter", "brightness(1.5)");
                $("h1, #landing p").css("color", "white");
                $("h1, #landing p").css("text-shadow", "none");
                $("#landing p").html(landingText).animate({ "opacity": 1, "font-size": "2em" }, 1);
                $("#landing p").css({ "text-transform": "none", "font-family": "'Roboto', sans-serif", "font-weight": "300" });
            }
        }

        function toggleHero() {
            if ($(window).scrollTop() >= stickyPoint) {
                containerTranslateAmount = 0 - stickyPoint;
                $(".container").removeAttr("data-scroll-speed");
                changeSpeed();
            } else {
                $(".container").attr("data-scroll-speed", "1");
                changeSpeed();
            }
        }

        function animatedHowScroll() {

            var scrollTop = $("#hero")[0].getBoundingClientRect().top - $(".see")[0].getBoundingClientRect().bottom + 66;

            $('html,body').animate({ scrollTop: scrollTop },
                Math.abs(window.scrollY - $("#hero").offset().top) * 1);

            setTimeout(function () {
                var top = window.innerHeight - $("#hero").height() + 16;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }, 1000)
        }

        function howScroll() {
            var top;
            if ($(window).scrollTop() > stickyPoint) {
                top = $("#hero")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - window.innerHeight + $("header").height() + 176 + $("#hero").height();
            } else {
                top = $("#hero")[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - window.innerHeight + $("header").height() + 176 + $("#hero").height() + $(".see")[0].getBoundingClientRect().top - $(".container")[0].getBoundingClientRect().top;
            }
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }

        $(".see").on({
            mouseenter: function (e) {
                if (landingAnimationState == 1) {
                    return;
                }
                else {
                    landingAnimationState = 1;
                    $("header").css("box-shadow", "0px 20px 50px -20px #000000");
                    $(".container").css("box-shadow", "0px -30px 50px -5px #000000");
                    $("#landingImage").css("filter", "brightness(1.5) blur(5px)");
                    $("#uploadShade").css("filter", "brightness(7)");
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
                if (landingAnimationState == 0) {
                    return;
                }
                else {
                    landingAnimationState = 0;
                    $("header").css("box-shadow", "0px 20px 50px -20px #ffffff");
                    $(".container").css("box-shadow", "0px -20px 50px 20px #ffffff, 0 20px 50px -20px #ffffff");
                    $("#landingImage").css("filter", "brightness(.5)");
                    $("#uploadShade").css("filter", "brightness(1.5)");
                    $("h1, #landing p").css("color", "white");
                    $("h1, #landing p").css("text-shadow", "none");
                    $("#landing p").animate({ 'opacity': 0 }, 500, function () {
                        $(this).html(landingText).animate({ "opacity": 1, "font-size": "2em" }, 200);
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
    } else {

        $(window).keydown(function (e) {
            if (e.which != 9 | $("#website").is(":focus")) {
                return;
            } else {
                e.preventDefault();
                $("#website").focus();
            }
        });

        $(window).keydown(function (e) {
            if (e.which == 13 && $("#website").is(":focus") && $("#website")[0].getBoundingClientRect().top <= 100) {
                e.preventDefault();
            } else {
                return;
            }
        });

        landingText = "Use AI4SEO<br>for free until your ranking improves.";

        $("#url").on("submit", function (event) {

            if ($("#website").valid()) {

                gtag('event', 'Klicks auf Senden', {
                    'event_category': 'User',
                    'event_label': '' + $("#url input").val()
                });

                event.preventDefault();

                if ($(".container").length > 0) {
                    $(".container").remove();
                }

                $("#landing").after("<div class='container'><section class='dashboard'><div class='gauge'><div class='gauge-a'></div><div class='gauge-b'></div><div class='gauge-c'></div><div class='gauge-data'><h1 id='percent'>0%</h1>Your SEO Score</div></div></section></div>");
                var top = $(".container")[0].getBoundingClientRect().bottom + 100 - window.innerHeight;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });

                $(function () {

                    var val = 0;
                    var decrease = 0;
                    var incraese = 0;
                    var load = 0;

                    var percent = 100;

                    var limit = Math.floor(Math.random() * 34) + 60;

                    var turn = limit * 1.8 / 360;

                    var values = [];
                    var metrics = [];

                    var rankingString = " / 10<br>";
                    var ranking = (limit / 10 - (Math.floor(Math.random() * 10)) / 10).toFixed(1);

                    values.push(rankingString);
                    metrics.push(ranking);

                    var possImprString = "<br>";
                    var possImpr = (10 - limit / 10 + limit / 100 - 1).toFixed(1);

                    values.push(possImprString);
                    metrics.push(possImpr);

                    var predTimeString = " days<br>";
                    var predTime = Math.round(limit / 1.5);

                    values.push(predTimeString);
                    metrics.push(predTime);

                    var probString = "%<br>";
                    var prob = Math.round(limit / ((limit - 10) / 83) * 100) / 100;

                    values.push(probString);
                    metrics.push(prob);

                    var priceString = "€";
                    var price = Math.round(limit * Math.floor((10 - Math.floor(limit / 10)) / Math.round(limit / 1.5) * Math.round(limit / ((limit - 10) / 83) * 100) / 100) / 1.5);

                    values.push(priceString);
                    metrics.push(price);

                    var rank;
                    var ranknum = 0;
                    var impr;
                    var imprnum = 0;
                    var time;
                    var timenum = 0;
                    var probperc;
                    var probpercnum = 0;
                    var pricing;
                    var pricingnum = 0;

                    $(".gauge").after("<h2 class='fadeheadline'>SEO Dashboard for " + $("#website").val() + "</h2>");

                    setTimeout(function () {
                        $(".fadeheadline").css("opacity", 1);
                        $(".fadeheadline").css("transform", "scale(1.0)");
                    }, 900);

                    $(".gauge").after("<p class='percentage'>0</p><p class='percentsign'>% optimizable</p>");

                    load = setInterval(function () {
                        if (percent > 100 - limit) {
                            percent -= 1;
                            $('.percentage').text(percent);
                        }
                    }, 20)

                    $(".gauge-c").css("transform", "rotate(" + turn + "turn)");
                    clearInterval(decrease);
                    increase = setInterval(function () {
                        if (val < limit) {
                            val += 1;
                            $('#percent').text(val + "%");
                        }
                    }, 20)

                    $(".gauge-data, .gauge-data h1").css("color", "rgba(255, 255, 255, 1)");

                    $(".gauge").before("<h2 class='scoreHeading'>Score</h2>");
                    $(".gauge").before("<h2 class='metricHeading'>Metrics</h2>");
                    $(".gauge").before("<h2 class='objectiveHeading'>SEO Objectives</h2>");

                    $(".gauge").after("<p class='improvement'>Your Ranking:<br>Predicted Possible Improvement:<br>Predicted Time until Reward:<br>Probability for Improvement:<br>Resulting Price (considering above metrics):<br></p><p class='percentsign'>% optimizable</p>");

                    $(".gauge").after("<div class='metrics'><p class='ranking'></p><p class='possImpr'></p><p class='predTime'></p><p class='prob'></p><p class='price'></p></div>");

                    function loadNumbers() {

                        var stop1 = parseInt(metrics[0]);
                        var suffix1 = values[0];
                        rank = setInterval(function () {
                            if (ranknum < stop1) {
                                ranknum += 0.1;
                                $('.ranking').html((ranknum).toFixed(1) + suffix1);
                            }
                        }, 20)

                        var stop2 = parseInt(metrics[1]);
                        var suffix2 = values[1];
                        impr = setInterval(function () {
                            if (imprnum < stop2) {
                                imprnum += 0.1;
                                $('.possImpr').html((imprnum).toFixed(1) + suffix2);
                            }
                        }, 100)

                        var stop3 = metrics[2];
                        var suffix3 = values[2];
                        time = setInterval(function () {
                            if (timenum < stop3) {
                                timenum += 1;
                                $('.predTime').html((timenum).toFixed(0) + suffix3);
                            }
                        }, 30)

                        var stop4 = metrics[3];
                        var suffix4 = values[3];
                        probperc = setInterval(function () {
                            if (probpercnum < stop4) {
                                probpercnum += 1;
                                $('.prob').html((probpercnum).toFixed(2) + suffix4);
                            }
                        }, 19)

                        var stop5 = metrics[4];
                        var suffix5 = values[4];
                        pricing = setInterval(function () {
                            if (pricingnum < stop5) {
                                pricingnum += 1;
                                $('.price').html((pricingnum).toFixed(2) + suffix5);
                            }
                        }, 10)
                    }
                    loadNumbers();

                    function loadObjectives() {

                        var objectives = [];

                        var alternativeText = "Alternative Texts for Images";
                        var canonicalTags = "Canonical Tags";
                        var openGraph = "Open Graph Tags";
                        var pageSpeed = "Page Performance";
                        var responsiveDesign = "Responsive Design";
                        var backlinks = "Backlinks";
                        var compressImage = "Image Compression";
                        var minimizeJavasScript = "Javascript Minification";
                        var minifyHtml = "HTML Minification";
                        var minifyCSS = "CSS Minification";
                        var createErrorPage = "404 Error Page";
                        var internalNofollow = "Internal Nofollow Links";
                        var robotTxt = "Robot.txt Creation";
                        var siteMap = "Sitemap.xml Creation";

                        objectives.push(alternativeText);
                        objectives.push(canonicalTags);
                        objectives.push(openGraph);
                        objectives.push(pageSpeed);
                        objectives.push(responsiveDesign);
                        objectives.push(backlinks);
                        objectives.push(compressImage);
                        objectives.push(minimizeJavasScript);
                        objectives.push(minifyHtml);
                        objectives.push(minifyCSS);
                        objectives.push(createErrorPage);
                        objectives.push(internalNofollow);
                        objectives.push(robotTxt);
                        objectives.push(siteMap);

                        $(".gauge").after("<ul class='objectives'><li class='objectiveOne'></li><li class='objectiveTwo'></li><li class='objectiveThree'></li><li class='objectiveFour'></li><li class='objectiveFive'></li><li class='more'>and many more...</li></ul>");

                        var random = Math.floor(Math.random() * objectives.length);

                        $(".objectiveOne").html(objectives[random]);
                        objectives.splice(random, 1);
                        random = Math.floor(Math.random() * objectives.length);

                        $(".objectiveTwo").html(objectives[random]);
                        objectives.splice(random, 1);
                        random = Math.floor(Math.random() * objectives.length);

                        $(".objectiveThree").html(objectives[random]);
                        objectives.splice(random, 1);
                        random = Math.floor(Math.random() * objectives.length);

                        $(".objectiveFour").html(objectives[random]);
                        objectives.splice(random, 1);
                        random = Math.floor(Math.random() * objectives.length);

                        $(".objectiveFive").html(objectives[random]);

                        setTimeout(function () {
                            $(".objectiveOne").css("opacity", 1);
                        }, 600);

                        setTimeout(function () {
                            $(".objectiveTwo").css("opacity", 1);
                        }, 900);

                        setTimeout(function () {
                            $(".objectiveThree").css("opacity", 1);
                        }, 1200);

                        setTimeout(function () {
                            $(".objectiveFour").css("opacity", 1);
                        }, 1500);

                        setTimeout(function () {
                            $(".objectiveFive").css("opacity", 1);
                        }, 1800);

                        setTimeout(function () {
                            $(".more").css("opacity", 1);
                        }, 2100);
                    }
                    loadObjectives();

                    $(".gauge").after("<button id='optimize'>Start Optimization</button>");

                    setTimeout(function () {
                        $("#optimize").css("opacity", 1);
                        $("#optimize").css("transform", "scale(1.0)");
                    }, 2500);

                    $("#optimize").click(function () {
                        $("#optimize").css("pointer-events", "none");
                        $("#optimize").css("opacity", 0);
                        $("#optimize").attr("disabled", true);
                        $(".gauge").after("<form method='GET' action='./thankyou.html' name='download' id='download' validate><div id='mail' class='group'><input placeholder='Leave email for download' type='email' id='email' required><span class='highlight'></span><span class='bar'></span></div><input id='linkreq' type='submit' value='GET DOWNLOAD LINK'></form>");

                        setTimeout(function () {
                            $("#email").css("opacity", 1);
                            $("#email").css("transform", "scale(1.0)");
                            $("#linkreq").css("opacity", 1);
                            $("#linkreq").css("transform", "scale(1.0)");
                        }, 200);
                    });
                })
            }
        })

        $("#url input").on("blur", function () {
            if ($("label.error").length) {
                $("#url label").css("top", "-20px");
                $("#url label").css("font-size", "14px");
                $("label.error").css("top", "50px");
                $("label.error").css("font-size", "12px");
            }
        })

        $("#url").validate({
            focusInvalid: false,
            invalidHandler: function (form, validator) {

                if (!validator.numberOfInvalids())
                    return;

                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top - 300
                }, 1500);

            }
        });
    }
})