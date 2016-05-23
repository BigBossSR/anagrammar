var Letter = function(char) {
    this.character = ko.observable(char);
//    this.charCode = char.charCodeAt();
    this.unmatched = ko.observable(true);
};

function ViewModel () {
    var self = this;

    self.letters = ko.observableArray();
    self.composition = ko.observable();
    self.anagramStore = ko.observableArray();

//behaviors can use push and remove to mirror letters
    self.processInput =  function(alphaNumString) {
    //    var charArr = alphaNumString.split("");

        for (var i = 0; i < alphaNumString.length; i++) {
            var letter = new Letter(alphaNumString[i]);
            this.letters.push(letter);
        }

        this.lazyShuffle();
    };

    self.lazyShuffle =  function () {
        this.letters.sort(function(k) {
            return k.charCode;
        })
    };

    self.handleKeystroke =  function(e) {
        var composition = (util.getEl("new-term").value).split(""),
            newComposition = "",
            compared;

        self.resetArray(self.letters());
        composition.forEach( function (typed) {
            if (self.isAlphaNum(typed)) {
                compared = self.compareToBank(typed);
                if (typeof(compared) === "object") {
                    compared.unmatched(false);
                } else {
                    console.log("not observable");
                    return;
                }
            }
            newComposition+=typed;
        });

        util.getEl("new-term").value = newComposition;
    };

    self.resetArray = function(koArr) {
        koArr.forEach(function(letter){
             letter.unmatched(true);
        });
    },

    self.isAlphaNum = function (typed) {
        var pattern = new RegExp("^[a-zA-Z0-9]+$");
        return pattern.test(typed);
    },

    self.compareToBank =  function(typed) {
        var letterBank = self.letters();

        var reduced = letterBank.reduce(function(prevChar, currentChar){
            if ( currentChar.character() === prevChar && currentChar.unmatched() ) {
                return currentChar;
            } else {
                return prevChar;
            }
        }, typed.toUpperCase() );

        return reduced;
    };

    self.storeComposition = function(thing, e) {
        var allMatched = viewModel.letters().every( function(l) { return !(l.unmatched())});
        allMatched ? self.pushToStore() : console.log("nope");
    },

    self.pushToStore = function() {
/*        var underArr = this.anagramStore();
        underArr.push(util.getEl("new-term").value);
        self.composition("");
        this.anagramStore.valueHasMutated();*/

        var original = util.getEl("original-term").value,
            //newEntry = [util.getEl("original-term").value, util.getEl("new-term").value],
            newTerm = util.getEl("new-term").value;
           // pos = hotData.length - 1;

/*        var hasMatch = hotData.forEach( function(subArr, index, array) {
            return subArr[0] === original ? console.log("match at index " + index) : console.log("no match");

        });
        hotData.splice(pos, 0, newEntry);*/
        var hasMatch = function(arr, newTerm) {
            return arr.some(arrVal => arrVal === newTerm);
        }

        if (original in rawData) {
            hasMatch(rawData[original], newTerm) ? console.log("you already have that word") : rawData[original].push(newTerm);
        } else {
            rawData[original] = [newTerm];
            colHeadersData.splice(colHeadersData.length-1, 0, original);
           // colHeadersData.push(original);
        };
        convertToVerticalRows();

        hot1.render();
    }


    
}
var viewModel = new ViewModel();
ko.applyBindings(viewModel);

