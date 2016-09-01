var Todo=React.createClass({

   render: function()
   {

   	const todo =this.props.todo;
	  if(todo.get('isDone')) {
	    return <strike>{todo.get('text')}</strike>;
	  } else {
	    return <span>{todo.get('text')}</span>;
	  }

   }

}) 
  




var TodoList=React.createClass({
	render: function()
	{
		const  todos  = this.props.todos;
		  return (
		    <div className='todo'>
		      <input type='text' placeholder='Add todo' />
		      <ul className='todo__list'>
		        {todos.map(t => (
		          <li key={t.get('id')} className='todo__item'>
		            <Todo todo={t} />
		          </li>
		        ))}
		      </ul>
		    </div>
        );


	}

})


//-------------------------------------------------------------------action
const uid = () => Math.random().toString(34).slice(2);

function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: uid(),
      isDone: false,
      text: text
    }
  };
}


function toggleTodo(id) {
  return {
    type: 'TOGGLE_TODO',
    payload: id
  }
}
  

//-------------------------------------------------------------------reducer
const init = Immutable.List([]);
var reducer=function(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
       return todos.push(Map(action.payload));
    case 'TOGGLE_TODO':
      return todos.map(t => {
		    if(t.get('id') === action.payload) {
		      return t.update('isDone', isDone => !isDone);
		    } else {
		      return t;
		    }
		  });
    default:
      return todos;
  }
}
























const dummyTodos =Immutable.List( [

  Immutable.Map({ id: 0, isDone: true,  text: 'make components' }),
  Immutable.Map({ id: 1, isDone: false, text: 'design actions' }),
  Immutable.Map({ id: 2, isDone: false, text: 'implement reducer' }),
  Immutable.Map({ id: 3, isDone: false, text: 'connect components' })
]);


const store=ReactRedux.createStore(reducer);

  ReactDOM.render(
  <TodoList todos={dummyTodos} />,
  document.getElementById('app')
);

  //https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/