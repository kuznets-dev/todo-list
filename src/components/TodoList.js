import List from '@material-ui/core/List';
import TodoItem from './TodoItem';

function TodoList({ todos, removeTodo, toggleTodo, changeNameTodo }) {
    return (
        <List>
            {todos.map(todo => 
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                    changeNameTodo={changeNameTodo}
                />)
            }
        </List>
    )
}

export default TodoList;