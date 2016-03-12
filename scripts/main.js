//(function () {
    var domain = "http://localhost:6414/";
    //var domain = "http://guessaguid.apphb.com/";

    function getLeaderBoard() {
        var url = domain + "api/Leaderboard";
        //$('.progress').addClass('waiting');
        var result = {};
        jQuery.ajax({
            url: url,
            data: result,
            type: "GET",
            dataType: "jsonp",
            jsoncallback: "jsonpCallback",
            success: showLeaderBoard,
            error: handleError
        });
    }
    
    function showLeaderBoard(result) {
        var html = "<div class='leaders'>\r\n    <ol>\r\n";
        for(var i = 0; i< result.length; i++) {
            var l = result[i];
            html += "        <li>"
            html += "" + (l.UserName || "(Anonymous)") + ", " + l.NumGuesses + " guesses";
            html += "</li>\r\n"
        }
        html += "    </ol>\r\n</div>";
        
        if (result.length === 0) {
            html = "<h2>No winners yet.</h2>\r\n";
        }
        
        $('.progress').removeClass('waiting');
        $('#leaderboard').html(html);
    }
    
    function sendData(result) {
        var url = domain + "api/Guess";
        $('.progress').addClass('waiting');
        jQuery.ajax({
            url: url,
            data: result,
            type: "GET",
            dataType: "jsonp",
            jsoncallback: "jsonpCallback",
            success: successAction,
            error: handleError
        });
    }

    function successAction(result) {
        
        $('#session_id').val(result.SessionID);
        $('#message').html(result.Message + " (" + result.NumGuesses + ")");
        $('#message').effect("highlight");
        $('.progress').removeClass('waiting');
        jalert(result);
        if (result.Success === false) {
            $('#submit_paragraph').hide();
            //$('#submit_guess').hide();
            //$('#user_area').fadeIn(1500).effect("highlight"); //addClass('and_show')
            $('#winner_area').css('visibility','visible').hide().fadeIn(1500).effect("highlight", {}, 3000);
        }
        $('input[type="submit"]').prop('disabled', false);
    }
    function jsonpCallback(j) {
        //jalert(j, 'jsonP! ');
        $('.progress').removeClass('waiting');
    }

    function handleError(xhr, b, c) {
        $('.progress').removeClass('waiting');
        $('input[type="submit"]').prop('disabled', false);
        jalert(xhr, "Oops. An error occurred. What a shame.");
    }

    function jalert(o, message) {
        message = (message || "");
        alert(message + JSON.stringify(o, null, '    '));
    }
    
    function guess() {
        var result = {};

        result.usersGuess = $('#users_guess').val();
        result.sessionID = $('#session_id').val();
        return result;
    }
    
    $(document).ready(function () {
        $('form').submit(function (e) {
            try {
                $('input[type="submit"]').prop('disabled', true);
                sendData(guess());
            } catch (errs) { 
                jalert(errs, 'Error while posting, sorry.'); 
                $('.progress').removeClass('waiting');
                $('input[type="submit"]').prop('disabled', false);
            }
            e.preventDefault();
            return false;
        });
        
        if ($('#leaderboard').length>0) {
            getLeaderBoard();
        }
        
        
    });
    
//})();
