import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handlSubmit = data => {
    this.addTodo(data);
  };

  addTodo = text => {
    const todo = { id: nanoid(), text };
    this.setState(({ todos }) => ({ todos: [...todos, todo] }));
  };

  removeTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handlSubmit} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                id={todo.id}
                text={todo.text}
                index={index + 1}
                onClick={this.removeTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
