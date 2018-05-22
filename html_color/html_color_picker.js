function html_color_picker() {
    var red = document.getElementById('color_red'),
        green = document.getElementById('color_green'),
        blue = document.getElementById('color_blue'),
        total = { color : document.getElementById('color_total_color'),  text : document.getElementById('color_total_text') },
        color_val = { red : 255, green : 255, blue : 255 },
        total_obj = { rgb : 'rgb(255, 255, 255)', hex : '#FFFFFF' };
    
    function set_total() {
        total_obj.rgb = 'rgb(' + color_val.red + ', ' + color_val.green + ', ' + color_val.blue + ')';
        total_obj.hex = '#';
        for (x in color_val) {
            if (Number(color_val[x]) < 16) {
                total_obj.hex += '0';
            }
            total_obj.hex += Number(color_val[x]).toString(16).toUpperCase();
        }
        
        total.color.style.backgroundColor = total_obj.rgb;
        total.text.childNodes[1].innerHTML = 'RGB : ' + total_obj.rgb;
        total.text.childNodes[3].innerHTML = 'HEX : ' + total_obj.hex;
    }

    red.addEventListener('input', function (event) {
        color_val.red = red.value;
        document.getElementById('color_red_text').innerHTML = 'R : ' + color_val.red;
        document.getElementById('color_red_color').style.backgroundColor = 'rgb(' + color_val.red + ', 0, 0)';
        set_total();
    });
    
    green.addEventListener('input', function (event) {
        color_val.green = green.value;
        document.getElementById('color_green_text').innerHTML = 'G : ' + color_val.green;
        document.getElementById('color_green_color').style.backgroundColor = 'rgb(0, ' + color_val.green + ', 0)';
        set_total();
    });
    
    blue.addEventListener('input', function (event) {
        color_val.blue = blue.value;
        document.getElementById('color_blue_text').innerHTML = 'B : ' + color_val.blue;
        document.getElementById('color_blue_color').style.backgroundColor = 'rgb(0, 0, ' + color_val.blue + ')';
        set_total();
    });
}