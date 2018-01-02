# Iterate Promise

> Iterate Promise is an npm package used for synchronizing async loop calls based on 'deasync' blocking mechanism by calling Node.js event loop.

### Problem

While looping through an iterable set, a problem arises when we wish to perform an async task on each item of the set and also perform a task in same sequential order with the response received.

### Solution

Iterate promise offers a simple and easy solution for this problem.

+ `forEach` function

    ~~~~
    forEach(iterableSet, onEach, afterEach)
    ~~~~
    + `iterableSet` - A data structure that can be iterated.
    + `onEach` - Work to perform on each loop iteration _(must return a promise)_ 
        + The function will have a single position variable which the iterate-promise package will return (current position of the loop).
        + The function must return a new Promise with `resolve` having no params and `reject` with the error object (see example).
    + `afterEach` - Work to perform after each loop async code successfully executes.
         + The function will have a single position variable which the iterate-promise package will return (current position of the loop).

    ##### Example -
    > Using ES6 syntax
    
    ~~~~
    let iPromise = require('iterate-promise');

    iPromise.forEach(array, (position) => { //forEach function
        return new Promise(
            function (resolve, reject) {
            
                request({                   //async call
                    uri: array[position],
                    method: "GET"
                    
                }, (error, result, body) => {
                                            //response from async call
                    if (error) {
                        reject(error);
                    } else {
                        newArray.push(JSON.parse(body));
                        resolve();
                    }
                    
                });
            }
        );
        
    }, (position) => {                   //afterEach function
    
        console.log(position);
        
    }).then(() => {                     //after the complete loop successfully executes
    
        console.log("Done");        
        
    }).catch((errorObject) => {         //if it fails (Read below)
    
        console.log(errorObject.position);
        console.log(errorObject.error);
        
    });
    ~~~~

    + If an iteration inside the loop fails the whole function will be rejected.
    + Inside the catch , an errorObject will be returned which will be a json object containing two keys
        + position - position at which the loop fails
        + error - the error returned by the async function

### Versions
+ `v1.0.1` 

    Initial release - containing the basic `forEach` function only.

### Upcoming (v1.1.0)
+ A new `forEach` _function_ which will continue working even if a single iteration fails.

### Special Thanks
+ [Deasync](https://www.npmjs.com/package/deasync)
+ [Promise](https://www.npmjs.com/package/promise)

### Contact
+ Twitter - @dawnimpulse

### License (ISC)

~~~~
ISC Licence

Copyright 2018 Saksham (DawnImpulse)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
OR PERFORMANCE OF THIS SOFTWARE.
~~~~
