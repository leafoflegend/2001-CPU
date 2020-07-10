type AddTwoNumbers = (numOne: number, numTwo: number) => number;
const addTwoNumbers: AddTwoNumbers = (a, b) => a + b;

// TypeScript allows your autocomplete in your IDE to be on steroids.
// console.log(addTwoNumbers(1, 1));

const students: string[] = ['Patricia', 'Yahya', 'Levi', 'Chris'];

interface AttendanceList {
  [studentName: string]: number;
}

const studentAttendance: AttendanceList = students.reduce((classList, student) => {
  return {
    ...classList,
    [student]: 0,
  };
}, {});

class Stonks {
  protected value: number = 0;

  public goUp() {
    ++this.value;
  }

  public readValue() {
    return this.value;
  }
}

// const wallStreet = new Stonks();
//
// wallStreet.goUp();
// console.log(wallStreet.readValue());

class Tesla extends Stonks {
  public tweet() {
    this.value *= Math.ceil(Math.random() * 10);
  }
}

const teslaTicker = new Tesla();

teslaTicker.goUp();
teslaTicker.tweet();
console.log(teslaTicker.readValue());
