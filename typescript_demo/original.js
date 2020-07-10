const addTwoNumbers = (a, b) => a + b;

console.log(addTwoNumbers(1, 1));
console.log(addTwoNumbers('1', 1));
console.log(addTwoNumbers({}, 'eliot'));

// JavaScript can be kind of terrible sometimes.
/*
2
11
[object Object]eliot
 */

// The reason this is bad isn't specific to JS. The issue is something called "dynamic types". What this means is that any value in javascript is only available to us through references for the most part, and that any reference in javascript can in fact be any TYPE.

let a;

a = 'Eliot';
a = 9;
a = {};

// Dynamic types kind of inevitably lead to problems

// For most JS developers the words of anger for dynamic typing systems are:

// Cannot x of undefined.

// Older/More Academic languages use something called a "static type" system. And what this means is two things:

// 1. All variables must have a SPECIFIC TYPE.
// 2. Code will not "compile" if it does not meet the rules of the types being used.
