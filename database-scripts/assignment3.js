const client = require('./config.js');
const prompt = require('prompt-sync')();

// Once the client connects, call the main function
client.connect(() => {
	main();
});

async function main() {	
	// get the information about all the students and print it to the console
	console.log('GET ALL STUDENTS...');
	await getAllStudents();

	// Ask the user for information about a new student and add it to the database
	//note: the spread operator (ie. ...) takes the values from the array and passes it to the function
	console.log('ADDING A STUDENT...');
	const studentInfo = getStudentInfoInput();
	await addStudent(...studentInfo);
	
	// Ask the user for information to update a students email and then update the student's email
	console.log('UPDATING AN EMAIL...');
	const emailUpdateInfo = getUpdateEmailInput();
	await updateStudentEmail(...emailUpdateInfo);
	
	// Ask the user for the student id to delete and then delete the student
	console.log('DELETING A STUDENT...');
	const studentIdForDelete = getStudentIdToDelete();
	await deleteStudent(studentIdForDelete);

	// ends the client connection; If this is not desired, comment out this line
	client.end();
}

// Ask the user for infomration about the student they want to add to the database
// returns an array with the first name, last name, email and enrollment date of the new student
function getStudentInfoInput() {
	const first_name = prompt("What is the first name of the student? ");
	const last_name = prompt("What is the last name of the student? ");
	const email = prompt("What is the email of the student? ");
	const enrollment_date = prompt("What is the enrollement date of the student? ");

	return [
		first_name,
		last_name,
		email,
		enrollment_date
	]
}

// Ask the user for a new email and the student id for the email they want to update
// returns an array with the student_id and the new email
function getUpdateEmailInput() {
	const student_id = prompt("What is the id of the student whose email you want to modify? ");
	const email = prompt("What is the new email of the student? ");

	return [
		student_id,
		email,
	]
}

// Ask user for a student id for the student that should be deleted
// returns the student id given by the user
function getStudentIdToDelete() {
	const student_id = prompt("What student do you want to delete? ");
	return student_id;
}

// Query for all the students, parse the result and print the values to the console
async function getAllStudents() {
	try {
		const result = await client.query('SELECT * FROM students;');

		console.log('student_id\tfirst_name\tlast_name\temail\t\t\t\tenrollment_date');
		for (let row of result.rows) {
			console.log(`${row.student_id}\t\t${row.first_name}\t\t${row.last_name}\t\t${row.email}\t\t${row.enrollment_date}`);
		}
		console.log();
	} catch(error) {
		console.log(`ERROR: ${error.message}\n`);
		return;
	}
}

// Adds the students to the database
// Note: we are using paramatrized queries to prevent SQL injection
async function addStudent(first_name, last_name, email, enrollment_date) {
	const insertStatement = `
		INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
		($1, $2, $3, $4);
	`;
	const values = [first_name, last_name, email, enrollment_date];

	try {
		await client.query(insertStatement, values);
		console.log(`SUCCESS: ${first_name} ${last_name} has been added to the database\n`);
	} catch(error) {
		console.log(`ERROR: ${error.message}\n`);
		return;
	}
}

// Updates the email of the student with the ID specified
// Note: we are using paramatrized queries to prevent SQL injection
async function updateStudentEmail(student_id, new_email) {
	const updateStatement = `
		UPDATE students
		SET email = $1
		WHERE student_id = $2;
	`;

	try {
		await client.query(updateStatement, [new_email, student_id]);
		console.log(`SUCCESS: Student #${student_id} has had their email updated to ${new_email}\n`);
	} catch(error) {
		console.log(`ERROR: ${error.message}\n`);
		return;
	}
}

// Deletes the student with the ID specified
// Note: we are using paramatrized queries to prevent SQL injection
async function deleteStudent(student_id) {
	const deleteStatement = `
		DELETE FROM students
		WHERE student_id = $1;
	`;

	try {
		await client.query(deleteStatement, [student_id]);
		console.log(`SUCCESS: Student #${student_id} has been deleted\n`);
	} catch(error) {
		console.log(`ERROR: ${error.message}\n`);
		return;
	}
}
