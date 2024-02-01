// Import required modules
const readline = require('readline');

// Function to format date as per the US standard
function formatUSDate(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, at ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric',hour12: true })}`;
  return formattedDate;
}

// Function to process the input string and print the formatted date
function processInput(input) {
  // Check if the input follows the specified format
  const regex = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/;
  const match = input.match(regex);

  if (match) {
    const [, year, month, day, hour, minute, second] = match;
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

    if (!isNaN(date.getTime())) {
      // Date is valid
      const formattedDate = formatUSDate(date);
      console.log(formattedDate);
    } else {
      console.error('Invalid date/time format.');
    }
  } else {
    console.error(`Invalid input format. Please use YYYYMMDDTHHMMSS.`);
  }
}

// Function to run the program in a loop
function runProgram() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a date-time group (YYYYMMDDTHHMMSS): ', (input) => {
    if (typeof input === 'string') {
      processInput(input);
    } else {
      console.error('Invalid input. Please enter a string.');
    }
    rl.close();
  });

  rl.on('close', () => {
    runProgram();
  });
}

// Run the program for the first time
runProgram();