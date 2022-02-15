$(document).ready(function () {
    // Make Head
    $('head').prepend('\
<meta charset="utf-8">\
<meta name="viewport" content="width=device-width, initial-scale=1.0">\
<meta name="keywords" content="programming, 프로그래밍, game, unity">\
<meta name="description" content="게임 프로그래밍">\
<link rel="stylesheet" href="/dev/old/reset.css">\
<link rel="stylesheet" href="/dev/old/layout.css">\
<link rel="stylesheet" href="/dev/old/main_nav.css">\
<link rel="stylesheet" href="/dev/old/main.css">\
<link rel="stylesheet" href="/dev/old/scroll.css">\
<title>32 Laboratory</title>');


    // Make Navigation
    $('section:first').prepend('\
<nav id="nav">\
    <ul>\
        <li id="nav_c"><a href="/dev/old/c/c_index.html">C 언어</a>\
            <ul id="nav_c_list" class="nav_child_first">\
                <li><a href="/dev/old/c/c_variable.html">변수</a></li>\
                <li><a href="/dev/old/c/c_operator.html">연산자</a></li>\
                <li><a href="/dev/old/c/c_datatype.html">자료형</a></li>\
                <li><a href="/dev/old/c/c_conditional.html">조건문</a></li>\
                <li><a href="/dev/old/c/c_loop.html">반복문</a></li>\
            </ul>\
        </li>\
        <li id="nav_web"><a href="/dev/old/web/web.html">웹</a>\
            <ul id="nav_web_list" class="nav_child_first">\
                <li id="nav_html"><a href="/dev/old/web/html/html_index.html">HTML</a>\
                    <ul id="nav_html_list" class="nav_child_second">\
                        <li><a href="/dev/old/web/html/html_semantic_element.html">의미론적 태그</a></li>\
                        <li><a href="/dev/old/web/html/html_basic_tag.html">기본 태그</a></li>\
                        <li><a href="/dev/old/web/html/html_lists.html">목록</a></li>\
                        <li><a href="/dev/old/web/html/html_tables.html">표</a></li>\
                        <li><a href="/dev/old/web/html/html_forms.html">입력양식</a></li>\
                    </ul>\
                </li>\
                <li id="nav_css"><a href="/dev/old/web/css/css_index.html">CSS</a>\
                    <ul id="nav_css_list" class="nav_child_second"><li><a href="/dev/old/web/css/css_insert.html">CSS 추가하기</a></li></ul>\
                </li>\
                <li id="nav_js"><a href="/dev/old/web/javascript/js_index.html">JavaScript</a>\
                </li>\
            </ul>\
        </li>\
        <li id="nav_coder"><a href="/dev/old/html_coder/html_coder.html">HTML 코더</a></li>\
        <li id="nav_coder"><a href="/dev/old/html_color/html_color_picker.html">HTML 색상</a></li>\
        <li id="nav_game"><a href="/dev/old/game/game.html">게임</a>\
            <ul id="nav_game_list" class="nav_child_first">\
                <li><a href="/dev/old/game/gomoku/gomoku.html">오목</a></li>\
                <li><a href="https://sammy310.github.io/develop/trian/trian.html" target="_blank">삼각 지뢰찾기</a></li>\
            </ul>\
        </li>\
        <li id="nav_develop"><a href="/dev/old/develop/develop.html">계발</a>\
            <ul id="nav_develop_list" class="nav_child_first">\
                <li><a href="/dev/old/develop/minus/minus.html">마이너스</a></li>\
                <li><a href="/dev/old/develop/trian/trian.html">Trian</a></li>\
                <li><a href="/dev/old/develop/eight_queens_problem/eight_queens_problem.html">8 퀸 문제</a></li>\
                <li><a href="/dev/old/develop/slime/slime.html">슬라임</a></li>\
            </ul>\
        </li>\
    </ul>\
</nav>');


    // Navigation Event
    $('#nav_c').hover(function () {
        $('#nav_c_list').css('display', 'block');
    }, function () {
        $('#nav_c_list').css('display', 'none');
    });

    $('#nav_web').hover(function () {
        $('#nav_web_list').css('display', 'block');
    }, function () {
        $('#nav_web_list').css('display', 'none');
    });

    $('#nav_html').hover(function () {
        $('#nav_html_list').css('display', 'block');
    }, function () {
        $('#nav_html_list').css('display', 'none');
    });

    $('#nav_css').hover(function () {
        $('#nav_css_list').css('display', 'block');
    }, function () {
        $('#nav_css_list').css('display', 'none');
    });

    $('#nav_game').hover(function () {
        $('#nav_game_list').css('display', 'block');
    }, function () {
        $('#nav_game_list').css('display', 'none');
    });

    $('#nav_develop').hover(function () {
        $('#nav_develop_list').css('display', 'block');
    }, function () {
        $('#nav_develop_list').css('display', 'none');
    });
});
