/**
 * Created by sross on 4/5/2016.
 */
var inputData = []; //comes from input - split into arr
//option: make a letter observable object,
//split the string into new letter
//-use ko.utils.arrayMap
//could set an id, so never more letters than max id
//what if it just checks if it's in there and steals it?
//then on delete, pushes it back in...
//use a computed to see if it's in the letter bank?

var Letter = function(char) {
    this.character = ko.observable(char);
    this.charCode = char.charCodeAt();
    this.unmatched = true;
};

var viewModel = {
    self: this,

    letters: ko.observableArray(),
    composition: ko.observable(),


//behaviors can use push and remove to mirror letters
    processInput: function(alphaNumString) {
       
        
        var charArr = alphaNumString.split("");

        for (var i = 0; i < alphaNumString.length; i++) {
            var letter = new Letter(alphaNumString[i]);
            this.letters.push(letter);
        }
/*        viewModel.letters = ko.utils.arrayMap(charArr, function(char) {
            var letter = new Letter(char);
            return letter;
        });*/
        this.lazyShuffle();
    },

    lazyShuffle: function () {
        this.letters.sort(function(k) {
            return k.charCode;
        })
    },

    handleKeystroke: function(k) {
        var newCharCode = k.keyCode;
        if (newCharCode !== 32 || newCharCode !== 8 || newCharCode !== 46) {

            viewModel.compareToBank();

        }


    },

    compareToBank: function() {
        //var composition = util.getEl("new-term").value;
        var letterBank = this.letters();
        for (var i = 0; i < this.letters().length; i++) {
            letterBank[i].unmatched = true;
        }

        var tempComposition = this.composition();
        for (var i = 0; i < this.composition().length; i++) {
            var temp = this.composition()[i].toUpperCase();
            for (var j = 0; j < letterBank.length; j++) {
                console.log("temp: "+temp+". array item: "+letterBank[j])
                if (temp === letterBank[j].character() && letterBank[j].unmatched === true) {
                    console.log("I found it!");
                    letterBank[j].unmatched = false;
                    break;
                } else {
                    var newString = viewModel.composition().replace(temp,'');
                    viewModel.composition(newString);
                }

            }

        }


    }
    
}

ko.applyBindings(viewModel);

