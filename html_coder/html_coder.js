function encoding(str) {
    var new_str = str;
    new_str = new_str.replace(/&/g, "&amp;amp;");
    new_str = new_str.replace(/</g, "&amp;lt;");
    new_str = new_str.replace(/>/g, "&amp;gt;");
    return new_str;
}

function html_encoding() {
    var v = document.getElementById("html_encoder"),
        v_b = document.getElementById("html_encoder_button"),
        v_r = document.getElementById("html_encoder_result");
    
    v_b.addEventListener('click', function (event) {
        v_r.innerHTML = encoding(v.value);
        v_r.style.display = "block";
    });
}

function html_decoding() {
    var v = document.getElementById("html_decoder"),
        v_b = document.getElementById("html_decoder_button"),
        v_r = document.getElementById("html_decoder_result");
    
    v_b.addEventListener('click', function (event) {
        v_r.innerHTML = v.value;
        v_r.style.display = "block";
    });
}