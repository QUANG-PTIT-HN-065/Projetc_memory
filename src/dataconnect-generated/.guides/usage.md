# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateTodoItem, useUpdateTodoItem, useDeleteTodoItem, useToggleTodoItemCompleted, useListTodoItems, useGetTodoItem, useListTodoItemsByStatus, useListTodoItemsByPriority } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateTodoItem(createTodoItemVars);

const { data, isPending, isSuccess, isError, error } = useUpdateTodoItem(updateTodoItemVars);

const { data, isPending, isSuccess, isError, error } = useDeleteTodoItem(deleteTodoItemVars);

const { data, isPending, isSuccess, isError, error } = useToggleTodoItemCompleted(toggleTodoItemCompletedVars);

const { data, isPending, isSuccess, isError, error } = useListTodoItems();

const { data, isPending, isSuccess, isError, error } = useGetTodoItem(getTodoItemVars);

const { data, isPending, isSuccess, isError, error } = useListTodoItemsByStatus(listTodoItemsByStatusVars);

const { data, isPending, isSuccess, isError, error } = useListTodoItemsByPriority(listTodoItemsByPriorityVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createTodoItem, updateTodoItem, deleteTodoItem, toggleTodoItemCompleted, listTodoItems, getTodoItem, listTodoItemsByStatus, listTodoItemsByPriority } from '@dataconnect/generated';


// Operation CreateTodoItem:  For variables, look at type CreateTodoItemVars in ../index.d.ts
const { data } = await CreateTodoItem(dataConnect, createTodoItemVars);

// Operation UpdateTodoItem:  For variables, look at type UpdateTodoItemVars in ../index.d.ts
const { data } = await UpdateTodoItem(dataConnect, updateTodoItemVars);

// Operation DeleteTodoItem:  For variables, look at type DeleteTodoItemVars in ../index.d.ts
const { data } = await DeleteTodoItem(dataConnect, deleteTodoItemVars);

// Operation ToggleTodoItemCompleted:  For variables, look at type ToggleTodoItemCompletedVars in ../index.d.ts
const { data } = await ToggleTodoItemCompleted(dataConnect, toggleTodoItemCompletedVars);

// Operation ListTodoItems: 
const { data } = await ListTodoItems(dataConnect);

// Operation GetTodoItem:  For variables, look at type GetTodoItemVars in ../index.d.ts
const { data } = await GetTodoItem(dataConnect, getTodoItemVars);

// Operation ListTodoItemsByStatus:  For variables, look at type ListTodoItemsByStatusVars in ../index.d.ts
const { data } = await ListTodoItemsByStatus(dataConnect, listTodoItemsByStatusVars);

// Operation ListTodoItemsByPriority:  For variables, look at type ListTodoItemsByPriorityVars in ../index.d.ts
const { data } = await ListTodoItemsByPriority(dataConnect, listTodoItemsByPriorityVars);


```