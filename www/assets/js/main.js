// initialize Hoodie
var hoodie  = new Hoodie()

// initial load of all todo items from the global store
hoodie.global.findAll('task').then( function(tasks) {
  tasks.sort( sortByCreatedAt ).forEach( addTask )
})

// when a new todo gets stored, add it to the UI
hoodie.store.on('add:task', addTask)
// when a user signs out, clear the todo list
hoodie.account.on('signout', clearTasks)

// handle creating a new task
$('#taskinput').on('keypress', function(event) {
  if (event.keyCode == 13) { // ENTER
    hoodie.store.add('task', {title: event.target.value}).publish();

    event.target.value = '';
  }
})

function addTask( task ) {
  $('#tasklist').append('<li>'+task.title+'</li>');
}
function clearTasks() {
  $('#tasklist').html('');
}
function sortByCreatedAt(a, b) {
  return a.createdAt > b.createdAt
}
