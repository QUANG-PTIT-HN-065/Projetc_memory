# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListTodoItems*](#listtodoitems)
  - [*GetTodoItem*](#gettodoitem)
  - [*ListTodoItemsByStatus*](#listtodoitemsbystatus)
  - [*ListTodoItemsByPriority*](#listtodoitemsbypriority)
  - [*ListDiaryEntries*](#listdiaryentries)
  - [*GetDiaryEntry*](#getdiaryentry)
  - [*SearchDiaryEntriesByTitle*](#searchdiaryentriesbytitle)
- [**Mutations**](#mutations)
  - [*CreateTodoItem*](#createtodoitem)
  - [*UpdateTodoItem*](#updatetodoitem)
  - [*DeleteTodoItem*](#deletetodoitem)
  - [*ToggleTodoItemCompleted*](#toggletodoitemcompleted)
  - [*CreateDiaryEntry*](#creatediaryentry)
  - [*UpdateDiaryEntry*](#updatediaryentry)
  - [*DeleteDiaryEntry*](#deletediaryentry)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `example`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListTodoItems
You can execute the `ListTodoItems` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListTodoItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListTodoItemsData>): UseDataConnectQueryResult<ListTodoItemsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTodoItems(options?: useDataConnectQueryOptions<ListTodoItemsData>): UseDataConnectQueryResult<ListTodoItemsData, undefined>;
```

### Variables
The `ListTodoItems` Query has no variables.
### Return Type
Recall that calling the `ListTodoItems` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTodoItems` Query is of type `ListTodoItemsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTodoItems`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListTodoItems } from '@dataconnect/generated/react'

export default function ListTodoItemsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTodoItems();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTodoItems(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTodoItems(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTodoItems(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.todoItems);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTodoItem
You can execute the `GetTodoItem` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTodoItem(dc: DataConnect, vars: GetTodoItemVariables, options?: useDataConnectQueryOptions<GetTodoItemData>): UseDataConnectQueryResult<GetTodoItemData, GetTodoItemVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTodoItem(vars: GetTodoItemVariables, options?: useDataConnectQueryOptions<GetTodoItemData>): UseDataConnectQueryResult<GetTodoItemData, GetTodoItemVariables>;
```

### Variables
The `GetTodoItem` Query requires an argument of type `GetTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTodoItemVariables {
  id: TodoItem_Key;
}
```
### Return Type
Recall that calling the `GetTodoItem` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTodoItem` Query is of type `GetTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTodoItem`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTodoItemVariables } from '@dataconnect/generated';
import { useGetTodoItem } from '@dataconnect/generated/react'

export default function GetTodoItemComponent() {
  // The `useGetTodoItem` Query hook requires an argument of type `GetTodoItemVariables`:
  const getTodoItemVars: GetTodoItemVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTodoItem(getTodoItemVars);
  // Variables can be defined inline as well.
  const query = useGetTodoItem({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTodoItem(dataConnect, getTodoItemVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTodoItem(getTodoItemVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTodoItem(dataConnect, getTodoItemVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.todoItem);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTodoItemsByStatus
You can execute the `ListTodoItemsByStatus` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListTodoItemsByStatus(dc: DataConnect, vars: ListTodoItemsByStatusVariables, options?: useDataConnectQueryOptions<ListTodoItemsByStatusData>): UseDataConnectQueryResult<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTodoItemsByStatus(vars: ListTodoItemsByStatusVariables, options?: useDataConnectQueryOptions<ListTodoItemsByStatusData>): UseDataConnectQueryResult<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
```

### Variables
The `ListTodoItemsByStatus` Query requires an argument of type `ListTodoItemsByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTodoItemsByStatusVariables {
  completed: boolean;
}
```
### Return Type
Recall that calling the `ListTodoItemsByStatus` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTodoItemsByStatus` Query is of type `ListTodoItemsByStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTodoItemsByStatus`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTodoItemsByStatusVariables } from '@dataconnect/generated';
import { useListTodoItemsByStatus } from '@dataconnect/generated/react'

export default function ListTodoItemsByStatusComponent() {
  // The `useListTodoItemsByStatus` Query hook requires an argument of type `ListTodoItemsByStatusVariables`:
  const listTodoItemsByStatusVars: ListTodoItemsByStatusVariables = {
    completed: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTodoItemsByStatus(listTodoItemsByStatusVars);
  // Variables can be defined inline as well.
  const query = useListTodoItemsByStatus({ completed: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTodoItemsByStatus(dataConnect, listTodoItemsByStatusVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTodoItemsByStatus(listTodoItemsByStatusVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTodoItemsByStatus(dataConnect, listTodoItemsByStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.todoItems);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTodoItemsByPriority
You can execute the `ListTodoItemsByPriority` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListTodoItemsByPriority(dc: DataConnect, vars: ListTodoItemsByPriorityVariables, options?: useDataConnectQueryOptions<ListTodoItemsByPriorityData>): UseDataConnectQueryResult<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTodoItemsByPriority(vars: ListTodoItemsByPriorityVariables, options?: useDataConnectQueryOptions<ListTodoItemsByPriorityData>): UseDataConnectQueryResult<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
```

### Variables
The `ListTodoItemsByPriority` Query requires an argument of type `ListTodoItemsByPriorityVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTodoItemsByPriorityVariables {
  priority: PriorityLevel;
}
```
### Return Type
Recall that calling the `ListTodoItemsByPriority` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTodoItemsByPriority` Query is of type `ListTodoItemsByPriorityData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTodoItemsByPriority`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTodoItemsByPriorityVariables } from '@dataconnect/generated';
import { useListTodoItemsByPriority } from '@dataconnect/generated/react'

export default function ListTodoItemsByPriorityComponent() {
  // The `useListTodoItemsByPriority` Query hook requires an argument of type `ListTodoItemsByPriorityVariables`:
  const listTodoItemsByPriorityVars: ListTodoItemsByPriorityVariables = {
    priority: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTodoItemsByPriority(listTodoItemsByPriorityVars);
  // Variables can be defined inline as well.
  const query = useListTodoItemsByPriority({ priority: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTodoItemsByPriority(dataConnect, listTodoItemsByPriorityVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTodoItemsByPriority(listTodoItemsByPriorityVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTodoItemsByPriority(dataConnect, listTodoItemsByPriorityVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.todoItems);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListDiaryEntries
You can execute the `ListDiaryEntries` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListDiaryEntries(dc: DataConnect, options?: useDataConnectQueryOptions<ListDiaryEntriesData>): UseDataConnectQueryResult<ListDiaryEntriesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListDiaryEntries(options?: useDataConnectQueryOptions<ListDiaryEntriesData>): UseDataConnectQueryResult<ListDiaryEntriesData, undefined>;
```

### Variables
The `ListDiaryEntries` Query has no variables.
### Return Type
Recall that calling the `ListDiaryEntries` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListDiaryEntries` Query is of type `ListDiaryEntriesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListDiaryEntriesData {
  diaryEntries: ({
    id: UUIDString;
    title: string;
    content: string;
    mood: string;
    image?: string | null;
    caption?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & DiaryEntry_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListDiaryEntries`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListDiaryEntries } from '@dataconnect/generated/react'

export default function ListDiaryEntriesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListDiaryEntries();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListDiaryEntries(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListDiaryEntries(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListDiaryEntries(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.diaryEntries);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDiaryEntry
You can execute the `GetDiaryEntry` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetDiaryEntry(dc: DataConnect, vars: GetDiaryEntryVariables, options?: useDataConnectQueryOptions<GetDiaryEntryData>): UseDataConnectQueryResult<GetDiaryEntryData, GetDiaryEntryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDiaryEntry(vars: GetDiaryEntryVariables, options?: useDataConnectQueryOptions<GetDiaryEntryData>): UseDataConnectQueryResult<GetDiaryEntryData, GetDiaryEntryVariables>;
```

### Variables
The `GetDiaryEntry` Query requires an argument of type `GetDiaryEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDiaryEntryVariables {
  id: DiaryEntry_Key;
}
```
### Return Type
Recall that calling the `GetDiaryEntry` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDiaryEntry` Query is of type `GetDiaryEntryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetDiaryEntryData {
  diaryEntry?: {
    id: UUIDString;
    title: string;
    content: string;
    mood: string;
    image?: string | null;
    caption?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & DiaryEntry_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDiaryEntry`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetDiaryEntryVariables } from '@dataconnect/generated';
import { useGetDiaryEntry } from '@dataconnect/generated/react'

export default function GetDiaryEntryComponent() {
  // The `useGetDiaryEntry` Query hook requires an argument of type `GetDiaryEntryVariables`:
  const getDiaryEntryVars: GetDiaryEntryVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDiaryEntry(getDiaryEntryVars);
  // Variables can be defined inline as well.
  const query = useGetDiaryEntry({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDiaryEntry(dataConnect, getDiaryEntryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDiaryEntry(getDiaryEntryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDiaryEntry(dataConnect, getDiaryEntryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.diaryEntry);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SearchDiaryEntriesByTitle
You can execute the `SearchDiaryEntriesByTitle` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useSearchDiaryEntriesByTitle(dc: DataConnect, vars: SearchDiaryEntriesByTitleVariables, options?: useDataConnectQueryOptions<SearchDiaryEntriesByTitleData>): UseDataConnectQueryResult<SearchDiaryEntriesByTitleData, SearchDiaryEntriesByTitleVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useSearchDiaryEntriesByTitle(vars: SearchDiaryEntriesByTitleVariables, options?: useDataConnectQueryOptions<SearchDiaryEntriesByTitleData>): UseDataConnectQueryResult<SearchDiaryEntriesByTitleData, SearchDiaryEntriesByTitleVariables>;
```

### Variables
The `SearchDiaryEntriesByTitle` Query requires an argument of type `SearchDiaryEntriesByTitleVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SearchDiaryEntriesByTitleVariables {
  title: string;
}
```
### Return Type
Recall that calling the `SearchDiaryEntriesByTitle` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `SearchDiaryEntriesByTitle` Query is of type `SearchDiaryEntriesByTitleData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SearchDiaryEntriesByTitleData {
  diaryEntries: ({
    id: UUIDString;
    title: string;
    content: string;
    mood: string;
    image?: string | null;
    caption?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & DiaryEntry_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `SearchDiaryEntriesByTitle`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SearchDiaryEntriesByTitleVariables } from '@dataconnect/generated';
import { useSearchDiaryEntriesByTitle } from '@dataconnect/generated/react'

export default function SearchDiaryEntriesByTitleComponent() {
  // The `useSearchDiaryEntriesByTitle` Query hook requires an argument of type `SearchDiaryEntriesByTitleVariables`:
  const searchDiaryEntriesByTitleVars: SearchDiaryEntriesByTitleVariables = {
    title: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useSearchDiaryEntriesByTitle(searchDiaryEntriesByTitleVars);
  // Variables can be defined inline as well.
  const query = useSearchDiaryEntriesByTitle({ title: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useSearchDiaryEntriesByTitle(dataConnect, searchDiaryEntriesByTitleVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useSearchDiaryEntriesByTitle(searchDiaryEntriesByTitleVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useSearchDiaryEntriesByTitle(dataConnect, searchDiaryEntriesByTitleVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.diaryEntries);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateTodoItem
You can execute the `CreateTodoItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTodoItem(options?: useDataConnectMutationOptions<CreateTodoItemData, FirebaseError, CreateTodoItemVariables>): UseDataConnectMutationResult<CreateTodoItemData, CreateTodoItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTodoItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTodoItemData, FirebaseError, CreateTodoItemVariables>): UseDataConnectMutationResult<CreateTodoItemData, CreateTodoItemVariables>;
```

### Variables
The `CreateTodoItem` Mutation requires an argument of type `CreateTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTodoItemVariables {
  text: string;
  completed: boolean;
  priority?: PriorityLevel | null;
  deadline?: TimestampString | null;
}
```
### Return Type
Recall that calling the `CreateTodoItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTodoItem` Mutation is of type `CreateTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTodoItemData {
  todoItem_insert: TodoItem_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTodoItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTodoItemVariables } from '@dataconnect/generated';
import { useCreateTodoItem } from '@dataconnect/generated/react'

export default function CreateTodoItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTodoItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTodoItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTodoItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTodoItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTodoItem` Mutation requires an argument of type `CreateTodoItemVariables`:
  const createTodoItemVars: CreateTodoItemVariables = {
    text: ..., 
    completed: ..., 
    priority: ..., // optional
    deadline: ..., // optional
  };
  mutation.mutate(createTodoItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ text: ..., completed: ..., priority: ..., deadline: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTodoItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.todoItem_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTodoItem
You can execute the `UpdateTodoItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTodoItem(options?: useDataConnectMutationOptions<UpdateTodoItemData, FirebaseError, UpdateTodoItemVariables>): UseDataConnectMutationResult<UpdateTodoItemData, UpdateTodoItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTodoItem(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTodoItemData, FirebaseError, UpdateTodoItemVariables>): UseDataConnectMutationResult<UpdateTodoItemData, UpdateTodoItemVariables>;
```

### Variables
The `UpdateTodoItem` Mutation requires an argument of type `UpdateTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateTodoItemVariables {
  id: TodoItem_Key;
  text?: string | null;
  completed?: boolean | null;
  priority?: PriorityLevel | null;
  deadline?: TimestampString | null;
}
```
### Return Type
Recall that calling the `UpdateTodoItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTodoItem` Mutation is of type `UpdateTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTodoItemData {
  todoItem_update?: TodoItem_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTodoItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTodoItemVariables } from '@dataconnect/generated';
import { useUpdateTodoItem } from '@dataconnect/generated/react'

export default function UpdateTodoItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTodoItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTodoItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTodoItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTodoItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTodoItem` Mutation requires an argument of type `UpdateTodoItemVariables`:
  const updateTodoItemVars: UpdateTodoItemVariables = {
    id: ..., 
    text: ..., // optional
    completed: ..., // optional
    priority: ..., // optional
    deadline: ..., // optional
  };
  mutation.mutate(updateTodoItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., text: ..., completed: ..., priority: ..., deadline: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTodoItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.todoItem_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTodoItem
You can execute the `DeleteTodoItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteTodoItem(options?: useDataConnectMutationOptions<DeleteTodoItemData, FirebaseError, DeleteTodoItemVariables>): UseDataConnectMutationResult<DeleteTodoItemData, DeleteTodoItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteTodoItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTodoItemData, FirebaseError, DeleteTodoItemVariables>): UseDataConnectMutationResult<DeleteTodoItemData, DeleteTodoItemVariables>;
```

### Variables
The `DeleteTodoItem` Mutation requires an argument of type `DeleteTodoItemVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteTodoItemVariables {
  id: TodoItem_Key;
}
```
### Return Type
Recall that calling the `DeleteTodoItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTodoItem` Mutation is of type `DeleteTodoItemData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteTodoItemData {
  todoItem_delete?: TodoItem_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTodoItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTodoItemVariables } from '@dataconnect/generated';
import { useDeleteTodoItem } from '@dataconnect/generated/react'

export default function DeleteTodoItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTodoItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTodoItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTodoItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTodoItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTodoItem` Mutation requires an argument of type `DeleteTodoItemVariables`:
  const deleteTodoItemVars: DeleteTodoItemVariables = {
    id: ..., 
  };
  mutation.mutate(deleteTodoItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTodoItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.todoItem_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ToggleTodoItemCompleted
You can execute the `ToggleTodoItemCompleted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useToggleTodoItemCompleted(options?: useDataConnectMutationOptions<ToggleTodoItemCompletedData, FirebaseError, ToggleTodoItemCompletedVariables>): UseDataConnectMutationResult<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useToggleTodoItemCompleted(dc: DataConnect, options?: useDataConnectMutationOptions<ToggleTodoItemCompletedData, FirebaseError, ToggleTodoItemCompletedVariables>): UseDataConnectMutationResult<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
```

### Variables
The `ToggleTodoItemCompleted` Mutation requires an argument of type `ToggleTodoItemCompletedVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ToggleTodoItemCompletedVariables {
  id: TodoItem_Key;
  completed: boolean;
}
```
### Return Type
Recall that calling the `ToggleTodoItemCompleted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ToggleTodoItemCompleted` Mutation is of type `ToggleTodoItemCompletedData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ToggleTodoItemCompletedData {
  todoItem_update?: TodoItem_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ToggleTodoItemCompleted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ToggleTodoItemCompletedVariables } from '@dataconnect/generated';
import { useToggleTodoItemCompleted } from '@dataconnect/generated/react'

export default function ToggleTodoItemCompletedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useToggleTodoItemCompleted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useToggleTodoItemCompleted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useToggleTodoItemCompleted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useToggleTodoItemCompleted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useToggleTodoItemCompleted` Mutation requires an argument of type `ToggleTodoItemCompletedVariables`:
  const toggleTodoItemCompletedVars: ToggleTodoItemCompletedVariables = {
    id: ..., 
    completed: ..., 
  };
  mutation.mutate(toggleTodoItemCompletedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., completed: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(toggleTodoItemCompletedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.todoItem_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateDiaryEntry
You can execute the `CreateDiaryEntry` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateDiaryEntry(options?: useDataConnectMutationOptions<CreateDiaryEntryData, FirebaseError, CreateDiaryEntryVariables>): UseDataConnectMutationResult<CreateDiaryEntryData, CreateDiaryEntryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateDiaryEntry(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDiaryEntryData, FirebaseError, CreateDiaryEntryVariables>): UseDataConnectMutationResult<CreateDiaryEntryData, CreateDiaryEntryVariables>;
```

### Variables
The `CreateDiaryEntry` Mutation requires an argument of type `CreateDiaryEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateDiaryEntryVariables {
  title: string;
  content: string;
  mood: string;
  image?: string | null;
  caption?: string | null;
  createdAt: TimestampString;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `CreateDiaryEntry` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateDiaryEntry` Mutation is of type `CreateDiaryEntryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateDiaryEntryData {
  diaryEntry_insert: DiaryEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateDiaryEntry`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateDiaryEntryVariables } from '@dataconnect/generated';
import { useCreateDiaryEntry } from '@dataconnect/generated/react'

export default function CreateDiaryEntryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateDiaryEntry();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateDiaryEntry(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateDiaryEntry(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateDiaryEntry(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateDiaryEntry` Mutation requires an argument of type `CreateDiaryEntryVariables`:
  const createDiaryEntryVars: CreateDiaryEntryVariables = {
    title: ..., 
    content: ..., 
    mood: ..., 
    image: ..., // optional
    caption: ..., // optional
    createdAt: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(createDiaryEntryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ title: ..., content: ..., mood: ..., image: ..., caption: ..., createdAt: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createDiaryEntryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.diaryEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateDiaryEntry
You can execute the `UpdateDiaryEntry` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateDiaryEntry(options?: useDataConnectMutationOptions<UpdateDiaryEntryData, FirebaseError, UpdateDiaryEntryVariables>): UseDataConnectMutationResult<UpdateDiaryEntryData, UpdateDiaryEntryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateDiaryEntry(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDiaryEntryData, FirebaseError, UpdateDiaryEntryVariables>): UseDataConnectMutationResult<UpdateDiaryEntryData, UpdateDiaryEntryVariables>;
```

### Variables
The `UpdateDiaryEntry` Mutation requires an argument of type `UpdateDiaryEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateDiaryEntryVariables {
  id: DiaryEntry_Key;
  title?: string | null;
  content?: string | null;
  mood?: string | null;
  image?: string | null;
  caption?: string | null;
  updatedAt?: TimestampString | null;
}
```
### Return Type
Recall that calling the `UpdateDiaryEntry` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateDiaryEntry` Mutation is of type `UpdateDiaryEntryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateDiaryEntryData {
  diaryEntry_update?: DiaryEntry_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateDiaryEntry`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateDiaryEntryVariables } from '@dataconnect/generated';
import { useUpdateDiaryEntry } from '@dataconnect/generated/react'

export default function UpdateDiaryEntryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateDiaryEntry();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateDiaryEntry(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateDiaryEntry(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateDiaryEntry(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateDiaryEntry` Mutation requires an argument of type `UpdateDiaryEntryVariables`:
  const updateDiaryEntryVars: UpdateDiaryEntryVariables = {
    id: ..., 
    title: ..., // optional
    content: ..., // optional
    mood: ..., // optional
    image: ..., // optional
    caption: ..., // optional
    updatedAt: ..., // optional
  };
  mutation.mutate(updateDiaryEntryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., title: ..., content: ..., mood: ..., image: ..., caption: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateDiaryEntryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.diaryEntry_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteDiaryEntry
You can execute the `DeleteDiaryEntry` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteDiaryEntry(options?: useDataConnectMutationOptions<DeleteDiaryEntryData, FirebaseError, DeleteDiaryEntryVariables>): UseDataConnectMutationResult<DeleteDiaryEntryData, DeleteDiaryEntryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteDiaryEntry(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteDiaryEntryData, FirebaseError, DeleteDiaryEntryVariables>): UseDataConnectMutationResult<DeleteDiaryEntryData, DeleteDiaryEntryVariables>;
```

### Variables
The `DeleteDiaryEntry` Mutation requires an argument of type `DeleteDiaryEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteDiaryEntryVariables {
  id: DiaryEntry_Key;
}
```
### Return Type
Recall that calling the `DeleteDiaryEntry` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteDiaryEntry` Mutation is of type `DeleteDiaryEntryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteDiaryEntryData {
  diaryEntry_delete?: DiaryEntry_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteDiaryEntry`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteDiaryEntryVariables } from '@dataconnect/generated';
import { useDeleteDiaryEntry } from '@dataconnect/generated/react'

export default function DeleteDiaryEntryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteDiaryEntry();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteDiaryEntry(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteDiaryEntry(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteDiaryEntry(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteDiaryEntry` Mutation requires an argument of type `DeleteDiaryEntryVariables`:
  const deleteDiaryEntryVars: DeleteDiaryEntryVariables = {
    id: ..., 
  };
  mutation.mutate(deleteDiaryEntryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteDiaryEntryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.diaryEntry_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

