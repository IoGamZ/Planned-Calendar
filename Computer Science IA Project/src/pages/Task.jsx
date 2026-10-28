import {} from 

Tasks = [
    { task_id: 1, title: "example task", description: "example description", due_date: "2026-10-27", completion: 0.66, task_duration: "0" },
    { task_id: 2, title: "example task", description: "example description", due_date: "2026-10-27", completion: 0.56, task_duration: "2" },
    { task_id: 2, title: "example task", description: "example description", due_date: "2026-10-27", completion: 0.16, task_duration: "3" },
];

let jsonObject = JSON.stringify(Tasks);

// Save the data as a file.
const file = DriveApp.createFile("sample.txt", jsonObject); 
const fileId = file.getId();
console.log(fileId)

// Retrieve the data from the file.
const text = DriveApp.getFileById(fileId).getBlob().getDataAsString(); 
const array = JSON.parse(text);
console.log(array)
