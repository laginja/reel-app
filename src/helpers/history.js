/**
 * Helper class used to store recently viewed auditions so the user can quickly navigate between them
 */
class History {

    MAX_ITEMS = 5; 
    
    constructor(obj) {
        if (obj) {
            this.items = obj.items
        }
        else
            this.items = [];
    }

    // add element to the array
    enqueue(element) {
        this.filterIfExists(element)
        this.items.push(element);
        if (this.items.length > this.MAX_ITEMS) {
            this.dequeue()
        }
    }

    // dequeue function 
    dequeue() {
        // removing element from the queue 
        // returns underflow when called  
        // on empty queue 
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // filter the array - remove element if it already exists
    filterIfExists(element) {
        this.items = this.items.filter(item => {
            return item.id !== element.id;
        })
    }

    // isEmpty function 
    isEmpty() {
        // return true if history is empty 
        return this.items.length === 0;
    }

    // return reversed array for display
    reverse() {
        return this.items.reverse();
    }
}

export default History;