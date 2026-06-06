# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListTodoItems*](#listtodoitems)
  - [*GetTodoItem*](#gettodoitem)
  - [*ListTodoItemsByStatus*](#listtodoitemsbystatus)
  - [*ListTodoItemsByPriority*](#listtodoitemsbypriority)
- [**Mutations**](#mutations)
  - [*CreateTodoItem*](#createtodoitem)
  - [*UpdateTodoItem*](#updatetodoitem)
  - [*DeleteTodoItem*](#deletetodoitem)
  - [*ToggleTodoItemCompleted*](#toggletodoitemcompleted)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListTodoItems
You can execute the `ListTodoItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTodoItems(options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsData, undefined>;

interface ListTodoItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTodoItemsData, undefined>;
}
export const listTodoItemsRef: ListTodoItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTodoItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsData, undefined>;

interface ListTodoItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListTodoItemsData, undefined>;
}
export const listTodoItemsRef: ListTodoItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTodoItemsRef:
```typescript
const name = listTodoItemsRef.operationName;
console.log(name);
```

### Variables
The `ListTodoItems` query has no variables.
### Return Type
Recall that executing the `ListTodoItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTodoItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTodoItemsData {
  todoItems: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key)[];
}
```
### Using `ListTodoItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTodoItems } from '@dataconnect/generated';


// Call the `listTodoItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTodoItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTodoItems(dataConnect);

console.log(data.todoItems);

// Or, you can use the `Promise` API.
listTodoItems().then((response) => {
  const data = response.data;
  console.log(data.todoItems);
});
```

### Using `ListTodoItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTodoItemsRef } from '@dataconnect/generated';


// Call the `listTodoItemsRef()` function to get a reference to the query.
const ref = listTodoItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTodoItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.todoItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItems);
});
```

## GetTodoItem
You can execute the `GetTodoItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTodoItem(vars: GetTodoItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTodoItemData, GetTodoItemVariables>;

interface GetTodoItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodoItemVariables): QueryRef<GetTodoItemData, GetTodoItemVariables>;
}
export const getTodoItemRef: GetTodoItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTodoItem(dc: DataConnect, vars: GetTodoItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTodoItemData, GetTodoItemVariables>;

interface GetTodoItemRef {
  ...
  (dc: DataConnect, vars: GetTodoItemVariables): QueryRef<GetTodoItemData, GetTodoItemVariables>;
}
export const getTodoItemRef: GetTodoItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTodoItemRef:
```typescript
const name = getTodoItemRef.operationName;
console.log(name);
```

### Variables
The `GetTodoItem` query requires an argument of type `GetTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTodoItemVariables {
  id: TodoItem_Key;
}
```
### Return Type
Recall that executing the `GetTodoItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTodoItemData {
  todoItem?: {
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key;
}
```
### Using `GetTodoItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTodoItem, GetTodoItemVariables } from '@dataconnect/generated';

// The `GetTodoItem` query requires an argument of type `GetTodoItemVariables`:
const getTodoItemVars: GetTodoItemVariables = {
  id: ..., 
};

// Call the `getTodoItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTodoItem(getTodoItemVars);
// Variables can be defined inline as well.
const { data } = await getTodoItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTodoItem(dataConnect, getTodoItemVars);

console.log(data.todoItem);

// Or, you can use the `Promise` API.
getTodoItem(getTodoItemVars).then((response) => {
  const data = response.data;
  console.log(data.todoItem);
});
```

### Using `GetTodoItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTodoItemRef, GetTodoItemVariables } from '@dataconnect/generated';

// The `GetTodoItem` query requires an argument of type `GetTodoItemVariables`:
const getTodoItemVars: GetTodoItemVariables = {
  id: ..., 
};

// Call the `getTodoItemRef()` function to get a reference to the query.
const ref = getTodoItemRef(getTodoItemVars);
// Variables can be defined inline as well.
const ref = getTodoItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTodoItemRef(dataConnect, getTodoItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.todoItem);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItem);
});
```

## ListTodoItemsByStatus
You can execute the `ListTodoItemsByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTodoItemsByStatus(vars: ListTodoItemsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;

interface ListTodoItemsByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTodoItemsByStatusVariables): QueryRef<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
}
export const listTodoItemsByStatusRef: ListTodoItemsByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTodoItemsByStatus(dc: DataConnect, vars: ListTodoItemsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;

interface ListTodoItemsByStatusRef {
  ...
  (dc: DataConnect, vars: ListTodoItemsByStatusVariables): QueryRef<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
}
export const listTodoItemsByStatusRef: ListTodoItemsByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTodoItemsByStatusRef:
```typescript
const name = listTodoItemsByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListTodoItemsByStatus` query requires an argument of type `ListTodoItemsByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTodoItemsByStatusVariables {
  completed: boolean;
}
```
### Return Type
Recall that executing the `ListTodoItemsByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTodoItemsByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTodoItemsByStatusData {
  todoItems: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key)[];
}
```
### Using `ListTodoItemsByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTodoItemsByStatus, ListTodoItemsByStatusVariables } from '@dataconnect/generated';

// The `ListTodoItemsByStatus` query requires an argument of type `ListTodoItemsByStatusVariables`:
const listTodoItemsByStatusVars: ListTodoItemsByStatusVariables = {
  completed: ..., 
};

// Call the `listTodoItemsByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTodoItemsByStatus(listTodoItemsByStatusVars);
// Variables can be defined inline as well.
const { data } = await listTodoItemsByStatus({ completed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTodoItemsByStatus(dataConnect, listTodoItemsByStatusVars);

console.log(data.todoItems);

// Or, you can use the `Promise` API.
listTodoItemsByStatus(listTodoItemsByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.todoItems);
});
```

### Using `ListTodoItemsByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTodoItemsByStatusRef, ListTodoItemsByStatusVariables } from '@dataconnect/generated';

// The `ListTodoItemsByStatus` query requires an argument of type `ListTodoItemsByStatusVariables`:
const listTodoItemsByStatusVars: ListTodoItemsByStatusVariables = {
  completed: ..., 
};

// Call the `listTodoItemsByStatusRef()` function to get a reference to the query.
const ref = listTodoItemsByStatusRef(listTodoItemsByStatusVars);
// Variables can be defined inline as well.
const ref = listTodoItemsByStatusRef({ completed: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTodoItemsByStatusRef(dataConnect, listTodoItemsByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.todoItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItems);
});
```

## ListTodoItemsByPriority
You can execute the `ListTodoItemsByPriority` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTodoItemsByPriority(vars: ListTodoItemsByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;

interface ListTodoItemsByPriorityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTodoItemsByPriorityVariables): QueryRef<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
}
export const listTodoItemsByPriorityRef: ListTodoItemsByPriorityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTodoItemsByPriority(dc: DataConnect, vars: ListTodoItemsByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;

interface ListTodoItemsByPriorityRef {
  ...
  (dc: DataConnect, vars: ListTodoItemsByPriorityVariables): QueryRef<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
}
export const listTodoItemsByPriorityRef: ListTodoItemsByPriorityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTodoItemsByPriorityRef:
```typescript
const name = listTodoItemsByPriorityRef.operationName;
console.log(name);
```

### Variables
The `ListTodoItemsByPriority` query requires an argument of type `ListTodoItemsByPriorityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTodoItemsByPriorityVariables {
  priority: PriorityLevel;
}
```
### Return Type
Recall that executing the `ListTodoItemsByPriority` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTodoItemsByPriorityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTodoItemsByPriorityData {
  todoItems: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key)[];
}
```
### Using `ListTodoItemsByPriority`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTodoItemsByPriority, ListTodoItemsByPriorityVariables } from '@dataconnect/generated';

// The `ListTodoItemsByPriority` query requires an argument of type `ListTodoItemsByPriorityVariables`:
const listTodoItemsByPriorityVars: ListTodoItemsByPriorityVariables = {
  priority: ..., 
};

// Call the `listTodoItemsByPriority()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTodoItemsByPriority(listTodoItemsByPriorityVars);
// Variables can be defined inline as well.
const { data } = await listTodoItemsByPriority({ priority: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTodoItemsByPriority(dataConnect, listTodoItemsByPriorityVars);

console.log(data.todoItems);

// Or, you can use the `Promise` API.
listTodoItemsByPriority(listTodoItemsByPriorityVars).then((response) => {
  const data = response.data;
  console.log(data.todoItems);
});
```

### Using `ListTodoItemsByPriority`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTodoItemsByPriorityRef, ListTodoItemsByPriorityVariables } from '@dataconnect/generated';

// The `ListTodoItemsByPriority` query requires an argument of type `ListTodoItemsByPriorityVariables`:
const listTodoItemsByPriorityVars: ListTodoItemsByPriorityVariables = {
  priority: ..., 
};

// Call the `listTodoItemsByPriorityRef()` function to get a reference to the query.
const ref = listTodoItemsByPriorityRef(listTodoItemsByPriorityVars);
// Variables can be defined inline as well.
const ref = listTodoItemsByPriorityRef({ priority: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTodoItemsByPriorityRef(dataConnect, listTodoItemsByPriorityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.todoItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItems);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateTodoItem
You can execute the `CreateTodoItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTodoItem(vars: CreateTodoItemVariables): MutationPromise<CreateTodoItemData, CreateTodoItemVariables>;

interface CreateTodoItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTodoItemVariables): MutationRef<CreateTodoItemData, CreateTodoItemVariables>;
}
export const createTodoItemRef: CreateTodoItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTodoItem(dc: DataConnect, vars: CreateTodoItemVariables): MutationPromise<CreateTodoItemData, CreateTodoItemVariables>;

interface CreateTodoItemRef {
  ...
  (dc: DataConnect, vars: CreateTodoItemVariables): MutationRef<CreateTodoItemData, CreateTodoItemVariables>;
}
export const createTodoItemRef: CreateTodoItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTodoItemRef:
```typescript
const name = createTodoItemRef.operationName;
console.log(name);
```

### Variables
The `CreateTodoItem` mutation requires an argument of type `CreateTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTodoItemVariables {
  text: string;
  completed: boolean;
  priority?: PriorityLevel | null;
  deadline?: TimestampString | null;
}
```
### Return Type
Recall that executing the `CreateTodoItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTodoItemData {
  todoItem_insert: TodoItem_Key;
}
```
### Using `CreateTodoItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTodoItem, CreateTodoItemVariables } from '@dataconnect/generated';

// The `CreateTodoItem` mutation requires an argument of type `CreateTodoItemVariables`:
const createTodoItemVars: CreateTodoItemVariables = {
  text: ..., 
  completed: ..., 
  priority: ..., // optional
  deadline: ..., // optional
};

// Call the `createTodoItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTodoItem(createTodoItemVars);
// Variables can be defined inline as well.
const { data } = await createTodoItem({ text: ..., completed: ..., priority: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTodoItem(dataConnect, createTodoItemVars);

console.log(data.todoItem_insert);

// Or, you can use the `Promise` API.
createTodoItem(createTodoItemVars).then((response) => {
  const data = response.data;
  console.log(data.todoItem_insert);
});
```

### Using `CreateTodoItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTodoItemRef, CreateTodoItemVariables } from '@dataconnect/generated';

// The `CreateTodoItem` mutation requires an argument of type `CreateTodoItemVariables`:
const createTodoItemVars: CreateTodoItemVariables = {
  text: ..., 
  completed: ..., 
  priority: ..., // optional
  deadline: ..., // optional
};

// Call the `createTodoItemRef()` function to get a reference to the mutation.
const ref = createTodoItemRef(createTodoItemVars);
// Variables can be defined inline as well.
const ref = createTodoItemRef({ text: ..., completed: ..., priority: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTodoItemRef(dataConnect, createTodoItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todoItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItem_insert);
});
```

## UpdateTodoItem
You can execute the `UpdateTodoItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTodoItem(vars: UpdateTodoItemVariables): MutationPromise<UpdateTodoItemData, UpdateTodoItemVariables>;

interface UpdateTodoItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTodoItemVariables): MutationRef<UpdateTodoItemData, UpdateTodoItemVariables>;
}
export const updateTodoItemRef: UpdateTodoItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTodoItem(dc: DataConnect, vars: UpdateTodoItemVariables): MutationPromise<UpdateTodoItemData, UpdateTodoItemVariables>;

interface UpdateTodoItemRef {
  ...
  (dc: DataConnect, vars: UpdateTodoItemVariables): MutationRef<UpdateTodoItemData, UpdateTodoItemVariables>;
}
export const updateTodoItemRef: UpdateTodoItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTodoItemRef:
```typescript
const name = updateTodoItemRef.operationName;
console.log(name);
```

### Variables
The `UpdateTodoItem` mutation requires an argument of type `UpdateTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTodoItemVariables {
  id: TodoItem_Key;
  text?: string | null;
  completed?: boolean | null;
  priority?: PriorityLevel | null;
  deadline?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateTodoItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTodoItemData {
  todoItem_update?: TodoItem_Key | null;
}
```
### Using `UpdateTodoItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTodoItem, UpdateTodoItemVariables } from '@dataconnect/generated';

// The `UpdateTodoItem` mutation requires an argument of type `UpdateTodoItemVariables`:
const updateTodoItemVars: UpdateTodoItemVariables = {
  id: ..., 
  text: ..., // optional
  completed: ..., // optional
  priority: ..., // optional
  deadline: ..., // optional
};

// Call the `updateTodoItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTodoItem(updateTodoItemVars);
// Variables can be defined inline as well.
const { data } = await updateTodoItem({ id: ..., text: ..., completed: ..., priority: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTodoItem(dataConnect, updateTodoItemVars);

console.log(data.todoItem_update);

// Or, you can use the `Promise` API.
updateTodoItem(updateTodoItemVars).then((response) => {
  const data = response.data;
  console.log(data.todoItem_update);
});
```

### Using `UpdateTodoItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTodoItemRef, UpdateTodoItemVariables } from '@dataconnect/generated';

// The `UpdateTodoItem` mutation requires an argument of type `UpdateTodoItemVariables`:
const updateTodoItemVars: UpdateTodoItemVariables = {
  id: ..., 
  text: ..., // optional
  completed: ..., // optional
  priority: ..., // optional
  deadline: ..., // optional
};

// Call the `updateTodoItemRef()` function to get a reference to the mutation.
const ref = updateTodoItemRef(updateTodoItemVars);
// Variables can be defined inline as well.
const ref = updateTodoItemRef({ id: ..., text: ..., completed: ..., priority: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTodoItemRef(dataConnect, updateTodoItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todoItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItem_update);
});
```

## DeleteTodoItem
You can execute the `DeleteTodoItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTodoItem(vars: DeleteTodoItemVariables): MutationPromise<DeleteTodoItemData, DeleteTodoItemVariables>;

interface DeleteTodoItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTodoItemVariables): MutationRef<DeleteTodoItemData, DeleteTodoItemVariables>;
}
export const deleteTodoItemRef: DeleteTodoItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTodoItem(dc: DataConnect, vars: DeleteTodoItemVariables): MutationPromise<DeleteTodoItemData, DeleteTodoItemVariables>;

interface DeleteTodoItemRef {
  ...
  (dc: DataConnect, vars: DeleteTodoItemVariables): MutationRef<DeleteTodoItemData, DeleteTodoItemVariables>;
}
export const deleteTodoItemRef: DeleteTodoItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTodoItemRef:
```typescript
const name = deleteTodoItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteTodoItem` mutation requires an argument of type `DeleteTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTodoItemVariables {
  id: TodoItem_Key;
}
```
### Return Type
Recall that executing the `DeleteTodoItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTodoItemData {
  todoItem_delete?: TodoItem_Key | null;
}
```
### Using `DeleteTodoItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTodoItem, DeleteTodoItemVariables } from '@dataconnect/generated';

// The `DeleteTodoItem` mutation requires an argument of type `DeleteTodoItemVariables`:
const deleteTodoItemVars: DeleteTodoItemVariables = {
  id: ..., 
};

// Call the `deleteTodoItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTodoItem(deleteTodoItemVars);
// Variables can be defined inline as well.
const { data } = await deleteTodoItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTodoItem(dataConnect, deleteTodoItemVars);

console.log(data.todoItem_delete);

// Or, you can use the `Promise` API.
deleteTodoItem(deleteTodoItemVars).then((response) => {
  const data = response.data;
  console.log(data.todoItem_delete);
});
```

### Using `DeleteTodoItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTodoItemRef, DeleteTodoItemVariables } from '@dataconnect/generated';

// The `DeleteTodoItem` mutation requires an argument of type `DeleteTodoItemVariables`:
const deleteTodoItemVars: DeleteTodoItemVariables = {
  id: ..., 
};

// Call the `deleteTodoItemRef()` function to get a reference to the mutation.
const ref = deleteTodoItemRef(deleteTodoItemVars);
// Variables can be defined inline as well.
const ref = deleteTodoItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTodoItemRef(dataConnect, deleteTodoItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todoItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItem_delete);
});
```

## ToggleTodoItemCompleted
You can execute the `ToggleTodoItemCompleted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
toggleTodoItemCompleted(vars: ToggleTodoItemCompletedVariables): MutationPromise<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;

interface ToggleTodoItemCompletedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ToggleTodoItemCompletedVariables): MutationRef<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
}
export const toggleTodoItemCompletedRef: ToggleTodoItemCompletedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
toggleTodoItemCompleted(dc: DataConnect, vars: ToggleTodoItemCompletedVariables): MutationPromise<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;

interface ToggleTodoItemCompletedRef {
  ...
  (dc: DataConnect, vars: ToggleTodoItemCompletedVariables): MutationRef<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
}
export const toggleTodoItemCompletedRef: ToggleTodoItemCompletedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the toggleTodoItemCompletedRef:
```typescript
const name = toggleTodoItemCompletedRef.operationName;
console.log(name);
```

### Variables
The `ToggleTodoItemCompleted` mutation requires an argument of type `ToggleTodoItemCompletedVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ToggleTodoItemCompletedVariables {
  id: TodoItem_Key;
  completed: boolean;
}
```
### Return Type
Recall that executing the `ToggleTodoItemCompleted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ToggleTodoItemCompletedData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ToggleTodoItemCompletedData {
  todoItem_update?: TodoItem_Key | null;
}
```
### Using `ToggleTodoItemCompleted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, toggleTodoItemCompleted, ToggleTodoItemCompletedVariables } from '@dataconnect/generated';

// The `ToggleTodoItemCompleted` mutation requires an argument of type `ToggleTodoItemCompletedVariables`:
const toggleTodoItemCompletedVars: ToggleTodoItemCompletedVariables = {
  id: ..., 
  completed: ..., 
};

// Call the `toggleTodoItemCompleted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await toggleTodoItemCompleted(toggleTodoItemCompletedVars);
// Variables can be defined inline as well.
const { data } = await toggleTodoItemCompleted({ id: ..., completed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await toggleTodoItemCompleted(dataConnect, toggleTodoItemCompletedVars);

console.log(data.todoItem_update);

// Or, you can use the `Promise` API.
toggleTodoItemCompleted(toggleTodoItemCompletedVars).then((response) => {
  const data = response.data;
  console.log(data.todoItem_update);
});
```

### Using `ToggleTodoItemCompleted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, toggleTodoItemCompletedRef, ToggleTodoItemCompletedVariables } from '@dataconnect/generated';

// The `ToggleTodoItemCompleted` mutation requires an argument of type `ToggleTodoItemCompletedVariables`:
const toggleTodoItemCompletedVars: ToggleTodoItemCompletedVariables = {
  id: ..., 
  completed: ..., 
};

// Call the `toggleTodoItemCompletedRef()` function to get a reference to the mutation.
const ref = toggleTodoItemCompletedRef(toggleTodoItemCompletedVars);
// Variables can be defined inline as well.
const ref = toggleTodoItemCompletedRef({ id: ..., completed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = toggleTodoItemCompletedRef(dataConnect, toggleTodoItemCompletedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todoItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todoItem_update);
});
```

