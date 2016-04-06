/**
 * Created by sross on 4/4/2016.
 */




    var util = {
        stripToLetters: function (str) {
            str =  str.replace(/[^a-zA-Z0-9]/g,'');
            return str.toUpperCase();
        },

        getEl: function(str) {
            return document.getElementById(str);
        },

        screenInput: function(k) {
/*            var validChars = util.getEl("remaining-letters").innerHTML;
            validChars = new RegExp(validChars);*/

        }
    }

    var api = {

        populateLetterList: function(){
            viewModel.letters.removeAll();
            viewModel.composition("");
            var entry = util.stripToLetters(util.getEl("original-term").value);
            viewModel.processInput(entry);
    
         

        },

        handleKeystroke: function(k) {

/*            if (k.keyCode !== 68) {
                k.preventDefault();
                k.keyCode = 0;
                return false;
            }*/
            if (k.keyIdentifier === "d") {
                console.log("yes")
            }
            console.log(k);
            console.log(viewModel.composition)

        }
    }


util.getEl("original-term").autofocus;