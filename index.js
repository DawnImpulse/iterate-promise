/*ISC License

Copyright 2018, Saksham (DawnImpulse)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
OR PERFORMANCE OF THIS SOFTWARE.*/

const loop = require('./handlers/loop');

/*
*	Make the system sleep until each loop is performed and the resulting @afterEach is executed.
*	Will make the system sleep for short burst of time checking a predefined variable to move to next iteration.
*
* 	@param iterableSet - A data structure that can be iterated
*   @param onEach - Work to perform on each loop iteration
*   @param afterEach - Work to perform after onEach is finished successfully
*
*   @return - A promise of resolved and rejected(if any) values.
*   		  The function will reject if any iteration fails , will be notified with the position
*   		  The resolved function will be with no parameters & rejected will contain position and error
*/
module.exports.forEach = (iterableSet, onEach, afterEach) => {
    return loop.forEach(iterableSet, onEach, afterEach);
};

/*
*	Make the system sleep until each loop is performed and the resulting @afterEach is executed.
*   The function worn't reject/exit even if an error occurs on single locations, @onEachError is used to handle
*   error on individual item.
*	Will make the system sleep for short burst of time checking a predefined variable to move to next iteration.
*
* 	@param iterableSet - A data structure that can be iterated
*   @param onEach - Work to perform on each loop iteration
*   @param onEachError - Work to perform if there is an error in single loop iteration
*   @param afterEach - Work to perform after onEach is finished successfully
*
*   @return - A promise of resolved and rejected(if any) values.
*   		  The function will reject if any iteration fails , will be notified with the position
*   		  The resolved function will be with no parameters & rejected will contain position and error
*/
module.exports.forEachWorking = (iterableSet, onEach, onEachError, afterEach) => {
    return loop.forEachWorking(iterableSet, onEach, onEachError, afterEach);
};