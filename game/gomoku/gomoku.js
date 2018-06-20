// Make Gomoku Board
$(document).ready(function () {
    var board_width, cell_width;
    
    for (i=0; i<14; i++) {
        $('#board_border').append("<tr></tr>");
        for (j=1; j<=14; j++) {
            $('#board_border tr:last').append("<td></td>");
        }
    }
    
    for (i=0; i<15; i++) {
        $('#gomoku_board').append("<div class='board_row'></div>");
        for (j=0; j<15; j++) {
            $('.board_row:last').append("<div class='board_data' id='" + (i*15 + j) + "'></div>");
        }
    }
    
    if ($(window).width() < $(window).height()) {
        board_width = $(window).width();
    }
    else {
        board_width = $(window).height();
    }
    
    board_width *= 0.7;
    cell_width = board_width / 15;
    
    $('#gomoku').width(board_width + cell_width);
    $('#gomoku').height(board_width + cell_width);
    $('#gomoku').css('top', '3rem');
    $('#gomoku').css('left', ($('article:first').width() - board_width) / 2);
    $('#gomoku_board').css('top', -board_width);
    $('#gomoku_board').css('left', -(cell_width * 0.5));
    
    $('#board_border td').each(function(index, item) {
        $(item).width(cell_width);
        $(item).height(cell_width);
    });
    
    $('.board_data').each(function(index, item) {
        $(item).width(cell_width + 1);
        $(item).height(cell_width + 1);
    });
    
    
    // Ready
    var turn = 0,
        result = '',
        game_end = 0,
        player = ['Black', 'White'],
        gomoku_board = [];
    
    for(i=0; i<15*15; i++) {
        gomoku_board[i] = 0;
    }
    
    $('#gomoku_message').html(player[turn] + ' Turn');
    
    // Event
    $(window).resize(function() {
        if ($(window).width() < $(window).height()) {
            board_width = $(window).width();
        } else {
            board_width = $(window).height();
        }

        board_width *= 0.7;
        cell_width = board_width / 15;

        $('#gomoku').width(board_width + cell_width);
        $('#gomoku').height(board_width + cell_width);
        $('#gomoku').css('top', '3rem');
        $('#gomoku').css('left', ($('article:first').width() - board_width) / 2);
        $('#gomoku_board').css('top', -board_width);
        $('#gomoku_board').css('left', -(cell_width * 0.5));

        $('#board_border td').each(function (index, item) {
            $(item).width(cell_width);
            $(item).height(cell_width);
        });

        $('.board_data').each(function (index, item) {
            if($(this).hasClass(player[0]) || $(this).hasClass(player[1])) {
                $(item).width(cell_width - 1);
                $(item).height(cell_width - 1);
            }
            else {
                $(item).width(cell_width + 1);
                $(item).height(cell_width + 1);
            }
        });
    });
    
    $('.board_data').hover(function() {
        if(game_end == 1) {
            return;
        }
        
        if($(this).hasClass(player[0]) || $(this).hasClass(player[1])) {
            $(this).css('background-color', '#DDDDDD');
        }
        else {
            if(turn == 0) {
                $(this).css('background-color', '#303030');
            }
            else {
                $(this).css('background-color', '#F0F0F0');
            }
        }
    }, function() {
        if(game_end == 1) {
            return;
        }
        
        $(this).css('background-color', '');
    });
    
    $('.board_data').click(function() {
        if(game_end == 1) {
            return;
        }
        
        if($(this).hasClass(player[0]) || $(this).hasClass(player[1])) {
            return;
        }
        
        $(this).addClass(player[turn]);
        $(this).width($(this).width() - 2);
        $(this).height($(this).height() - 2);
        gomoku_board[$(this).attr('id')] = turn + 1;
        
        result = gomoku_check(gomoku_board);
        
        if(result != 'no') {
            $('#gomoku_message').html(result + ' WIN!!');
            $('#gomoku_message').css('color', 'tomato');
            game_end = 1;
            return;
        }
        
        
        if(turn == 0) {
            turn = 1;
            $('#board_border td').css('background-color', '#E0E0E0')
        }
        else {
            turn = 0;
            $('#board_border td').css('background-color', '#A0A0A0')
        }
        $('#gomoku_message').html(player[turn] + ' Turn');
    });
});

function gomoku_check(board_arr) {
    var b_str = board_arr.join([separator = '']),
        sub_str1 = '',
        sub_str2 = '',
        sub_str = [],
        re1 = /11111/,
        re2 = /22222/;
    

    for (i = 0; i < 15; i++) {
        sub_str1 = b_str.substr(i * 15, 15);
        for (j = 0; j < 15; j++) {
            sub_str2 += board_arr[j * 15 + i];
        }
        
        if (sub_str1.match(re1) || sub_str2.match(re1)) {
            return 'Black';
        }
        else if (sub_str1.match(re2) || sub_str2.match(re2)) {
            return 'White';
        }
    }
    
    for(i=4; i<15; i++) {
        sub_str.push('');
        for(j=0; j<i+1; j++) {
            sub_str[sub_str.length - 1] += board_arr[j*15 + i - j];
        }
    }
    for(i=5; i<15; i++) {
        sub_str[sub_str.length] = '';
        for(j=0; j<i; j++) {
            sub_str[sub_str.length - 1] += board_arr[(15 - i + j)*15 + (15 - j - 1)];
        }
    }
    for(i=4; i<15; i++) {
        sub_str[sub_str.length] = '';
        for(j=0; j<i+1; j++) {
            sub_str[sub_str.length - 1] += board_arr[(15 - i + j)*15 + j];
        }
    }
    for(i=5; i<15; i++) {
        sub_str[sub_str.length] = '';
        for(j=0; j<i; j++) {
            sub_str[sub_str.length - 1] += board_arr[j*15 + (15 - i + j)];
        }
    }
    
    for(i=0; i<sub_str.length; i++) {
        if (sub_str[i].match(re1) || sub_str[i].match(re1)) {
            return 'Black';
        }
        else if (sub_str[i].match(re2) || sub_str[i].match(re2)) {
            return 'White';
        }
    }
    
    return 'no';
}