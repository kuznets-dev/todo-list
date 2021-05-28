import List from '@material-ui/core/List';
import TodoItem from './TodoItem';

function TodoList({ todos, removeTodo, checkTodo, changeTodo }) {
    return (
        <List>
            {todos.map(todo => 
                <TodoItem
                    key={todo.uuid}
                    todo={todo}
                    removeTodo={removeTodo}
                    checkTodo={checkTodo}
                    changeTodo={changeTodo}
                />)
            }
        </List>
    )
}

export default TodoList;