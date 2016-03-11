

(function () {

//console.log('This would be the main JS file.');
    var domain = "http://localhost:6414/";
   //var domain = "http://guessaguid.apphb.com/";

    
    function sendData(result) {
        var url = domain + "api/Guess";
        jQuery.ajax({
            url: url,
            data: result,
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "jsonpCallback",
            success: successAction,
            error: handleError
        });
    }

    function successAction(result) {
       jalert(result);
    }
    function jsonpCallback(j) {
        jalert(j);
        //window.jQuery('#umg_modal').find('.progress').removeClass('waiting');

        if (j.Success == true) {
            //TODO: close the modal. And show success in a new simple modal.
            //      in order to let the user browse to the result.
            alert('Posted to YouMustGet.It!');
        } else {
            //TODO: show success in the current modal.
            //      in order to let the user browse to the result.
            jalert(j, 'jsonP! ');
        }
    }

    function handleError(xhr, b, c) {
        //window.jQuery('#umg_modal').find('.progress').removeClass('waiting');
        jalert(xhr, "Oops. An error occurred. What a shame.");
    }

    function jalert(o, message) {
        message = (message || "");
        alert(message + JSON.stringify(o, null, '    '));
    }

    
    function guess() {
        var result = {};

        result.usersGuess = window.jQuery('#users_guess').val();
        result.sessionID = window.jQuery('#session_id').val();
        jalert(result);
        return result;
    }
    
    $(document).ready(function () {
        
        window.jQuery('form').submit(function (e) {
            try {
            alert('sending!');
                //TODOO: progress class.
                //window.jQuery(this).find('.progress').addClass('waiting');
                //window.jQuery('#umg_modal #error').hide();
                //result = modalToJson('#umg_modal');
                sendData(guess());

            } catch (errs) { jalert(errs, 'Error while posting, sorry.'); }

            e.preventDefault();
            return false;
        });
    });
    
})();
