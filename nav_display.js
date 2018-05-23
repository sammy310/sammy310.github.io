function nav_display() {
    var nav_c = document.getElementById('nav_c'),
        nav_web = document.getElementById('nav_web'),
        nav_html = document.getElementById('nav_html'),
        nav_css = document.getElementById('nav_css'),
        nav_js = document.getElementById('nav_js');
    
    nav_c.addEventListener('mouseover', function (event) {
        document.getElementById('nav_c_list').style.display = 'block';
    });
    nav_c.addEventListener('mouseout', function (event) {
        document.getElementById('nav_c_list').style.display = 'none';
    });
    
    nav_web.addEventListener('mouseover', function (event) {
        document.getElementById('nav_web_list').style.display = 'block';
    });
    nav_web.addEventListener('mouseout', function (event) {
        document.getElementById('nav_web_list').style.display = 'none';
    });
    
    nav_html.addEventListener('mouseover', function (event) {
        document.getElementById('nav_html_list').style.display = 'block';
    });
    nav_html.addEventListener('mouseout', function (event) {
        document.getElementById('nav_html_list').style.display = 'none';
    });
    
    nav_css.addEventListener('mouseover', function (event) {
        document.getElementById('nav_css_list').style.display = 'block';
    });
    nav_css.addEventListener('mouseout', function (event) {
        document.getElementById('nav_css_list').style.display = 'none';
    });
}