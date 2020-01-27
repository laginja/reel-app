// Stack class 
class History {

    MAX_ITEMS = 5
    // Array is used to implement stack 
    constructor(obj) {
        if (obj)
            this.items = obj.items
        else
            this.items = [];
    }

    // add element to the array
    enqueue(element) {
        // check if element exists
        if (this.checkIfExists(element))
            // remove that element
            this.remove(element)
        // push element into the items 
        this.items.push(element);
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

    // check if element exists in array
    checkIfExists(element) {
        return this.items.includes(element);
    }

    // remove element from the array
    remove(element) {
        const index = this.items.indexOf(element);
        if (index !== -1)
            this.items.splice(index, 1)
    }

    // isEmpty function 
    isEmpty() {
        // return true if stack is empty 
        return this.items.length === 0;
    }

    reverse() {
        return this.items.reverse();
    }

    // printStack function 
    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

export default History;