function make_nav() {
    var nav = document.getElementById('nav');

    nav.innerHTML = '\
<ul>\
    <li id="nav_c"><a href="../c/c_index.html">C 언어</a>\
        <ul id="nav_c_list" class="nav_child_first"><li><a href="../c/c_variable.html">변수</a></li>\
            <li><a href="../c/c_operator.html">연산자</a></li>\
            <li><a href="../c/c_datatype.html">자료형</a></li>\
            <li><a href="../c/c_conditional.html">조건문</a></li>\
            <li><a href="../c/c_loop.html">반복문</a></li>\
        </ul>\
    </li>\
    <li id="nav_web"><a href="../web/web.html">웹</a>\
        <ul id="nav_web_list" class="nav_child_first"><li id="nav_html"><a href="../web/html/html_index.html">HTML</a>\
            <ul id="nav_html_list" class="nav_child_second"><li><a href="../web/html/html_semantic_element.html">의미론적 태그</a></li>\
                <li><a href="../web/html/html_basic_tag.html">기본 태그</a></li>\
                <li><a href="../web/html/html_lists.html">목록</a></li>\
                <li><a href="../web/html/html_tables.html">표</a></li>\
                <li><a href="../web/html/html_forms.html">입력양식</a></li>\
            </ul>\
            </li>\
            <li id="nav_css"><a href="../web/css/css_index.html">CSS</a>\
                <ul id="nav_css_list" class="nav_child_second"><li><a href="../web/css/css_insert.html">CSS 추가하기</a></li></ul>\
            </li>\
            <li id="nav_js"><a href="../web/javascript/js_index.html">JavaScript</a>\
            </li>\
        </ul>\
    </li>\
    <li id="nav_coder"><a href="html_coder/html_coder.html">HTML 코더</a></li>\
    <li id="nav_coder"><a href="../html_color/html_color_picker.html">HTML 색상</a></li>\
</ul>';
}