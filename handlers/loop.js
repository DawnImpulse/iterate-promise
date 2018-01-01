/*ISC License

Copyright 2018, Saksham (DawnImpulse)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
OR PERFORMANCE OF THIS SOFTWARE.*/

const Promise = require('promise');

//handler - forEach of an iterable set
module.exports.forEach = (iterableSet, onEach, afterEach) => {
    let position = 0; //current position in loop
    let wait = false; //used for waiting for a response inside onEach
    let isRejected = false; //whether anything is rejected
    let rejectedError; //the rejected error

    //returning a promise
    return new Promise(
        function (resolve, reject) {
            //looping the iterableSet
            for (let i = 0; i < iterableSet.length; i++) {
                onEach(position).then(() => {
                    wait = true;
                }).catch((error) => {
                    wait = true;
                    isRejected = true;
                    rejectedError = error;
                });

                //using deasync for blocking mechanism via event loop
                require('deasync').loopWhile(function () {
                    return !wait
                });

                //if a onEach is rejected , reject the whole function
                if (isRejected) {
                    //creating an errorObject with the error as well as the current position
                    let errorObject = {
                        error: rejectedError,
                        position: position
                    };
                    reject(errorObject); //rejecting the function
                } else {
                    wait = false;
                    afterEach(position++); //implementing after onEach in performed successfully
                }
            }
            resolve(); //if all goes well resolve
        }
    );
};