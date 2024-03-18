# COMP 3005: Assignment 3

### 1. Setting up the Database
1. Clone this repo `git clone https://github.com/mayeen-ayoub/COMP-3005-A3.git`
1. Create a database of your choice using pgAdmin 4.
	- In the top left corner, right click Databases dropdown
	- Hover over Create and then hover over the submenu Database
	- Name the database
	- Click save
1. With the correct database selected, click the query tool in the top left corner (or you can right click on the database and select query tool)
1. Click the open file tool in the panel that just opened and import the `table-initialization.sql` file
1. Run the file to create the students table and insert sample data

### 2. Run the Scripts
1. cd into the `database-scripts` directory (Run `cd database-scripts`)
1. Run `npm init`
1. Modify the `config.js` file to connect to the database accordingly
1. Run `node assignment3.js`
1. If you want to see the changes the scripts made, you can run `SELECT * FROM students;` in pgAdmin 4

### Notes:
- The database connection terminates once all the functions have been executed. If you do not want this functionality comment out `client.end();` from the `main()` function
- All the functions will be run unless you comment them out. Implementing a loop to select them is not required based on the Q&A

### Demo Video: 
Link: [https://youtu.be/CvAMTU1lq6A](https://youtu.be/CvAMTU1lq6A)
