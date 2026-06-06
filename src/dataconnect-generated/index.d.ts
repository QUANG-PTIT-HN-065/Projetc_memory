import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum PriorityLevel {
  low = "low",
  medium = "medium",
  high = "high",
};



export interface CreateTodoItemData {
  [x: string]: string;
  todoItem_insert: TodoItem_Key;
}

export interface CreateTodoItemVariables {
  text: string;
  completed: boolean;
  priority?: PriorityLevel | null;
  deadline?: TimestampString | null;
}

export interface DeleteTodoItemData {
  todoItem_delete?: TodoItem_Key | null;
}

export interface DeleteTodoItemVariables {
  id: TodoItem_Key;
}

export interface GetTodoItemData {
  todoItem?: {
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key;
}

export interface GetTodoItemVariables {
  id: TodoItem_Key;
}

export interface ListTodoItemsByPriorityData {
  todoItems: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key)[];
}

export interface ListTodoItemsByPriorityVariables {
  priority: PriorityLevel;
}

export interface ListTodoItemsByStatusData {
  todoItems: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key)[];
}

export interface ListTodoItemsByStatusVariables {
  completed: boolean;
}

export interface ListTodoItemsData {
  todoItems: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    priority?: PriorityLevel | null;
    deadline?: TimestampString | null;
  } & TodoItem_Key)[];
}

export interface TodoItem_Key {
  id: UUIDString;
  __typename?: 'TodoItem_Key';
}

export interface ToggleTodoItemCompletedData {
  todoItem_update?: TodoItem_Key | null;
}

export interface ToggleTodoItemCompletedVariables {
  id: TodoItem_Key;
  completed: boolean;
}

export interface UpdateTodoItemData {
  todoItem_update?: TodoItem_Key | null;
}

export interface UpdateTodoItemVariables {
  id: TodoItem_Key;
  text?: string | null;
  completed?: boolean | null;
  priority?: PriorityLevel | null;
  deadline?: TimestampString | null;
}

interface CreateTodoItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTodoItemVariables): MutationRef<CreateTodoItemData, CreateTodoItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTodoItemVariables): MutationRef<CreateTodoItemData, CreateTodoItemVariables>;
  operationName: string;
}
export const createTodoItemRef: CreateTodoItemRef;

export function createTodoItem(vars: CreateTodoItemVariables): MutationPromise<CreateTodoItemData, CreateTodoItemVariables>;
export function createTodoItem(dc: DataConnect, vars: CreateTodoItemVariables): MutationPromise<CreateTodoItemData, CreateTodoItemVariables>;

interface UpdateTodoItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTodoItemVariables): MutationRef<UpdateTodoItemData, UpdateTodoItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTodoItemVariables): MutationRef<UpdateTodoItemData, UpdateTodoItemVariables>;
  operationName: string;
}
export const updateTodoItemRef: UpdateTodoItemRef;

export function updateTodoItem(vars: UpdateTodoItemVariables): MutationPromise<UpdateTodoItemData, UpdateTodoItemVariables>;
export function updateTodoItem(dc: DataConnect, vars: UpdateTodoItemVariables): MutationPromise<UpdateTodoItemData, UpdateTodoItemVariables>;

interface DeleteTodoItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTodoItemVariables): MutationRef<DeleteTodoItemData, DeleteTodoItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTodoItemVariables): MutationRef<DeleteTodoItemData, DeleteTodoItemVariables>;
  operationName: string;
}
export const deleteTodoItemRef: DeleteTodoItemRef;

export function deleteTodoItem(vars: DeleteTodoItemVariables): MutationPromise<DeleteTodoItemData, DeleteTodoItemVariables>;
export function deleteTodoItem(dc: DataConnect, vars: DeleteTodoItemVariables): MutationPromise<DeleteTodoItemData, DeleteTodoItemVariables>;

interface ToggleTodoItemCompletedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ToggleTodoItemCompletedVariables): MutationRef<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ToggleTodoItemCompletedVariables): MutationRef<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
  operationName: string;
}
export const toggleTodoItemCompletedRef: ToggleTodoItemCompletedRef;

export function toggleTodoItemCompleted(vars: ToggleTodoItemCompletedVariables): MutationPromise<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
export function toggleTodoItemCompleted(dc: DataConnect, vars: ToggleTodoItemCompletedVariables): MutationPromise<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;

interface ListTodoItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTodoItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTodoItemsData, undefined>;
  operationName: string;
}
export const listTodoItemsRef: ListTodoItemsRef;

export function listTodoItems(options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsData, undefined>;
export function listTodoItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsData, undefined>;

interface GetTodoItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodoItemVariables): QueryRef<GetTodoItemData, GetTodoItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTodoItemVariables): QueryRef<GetTodoItemData, GetTodoItemVariables>;
  operationName: string;
}
export const getTodoItemRef: GetTodoItemRef;

export function getTodoItem(vars: GetTodoItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTodoItemData, GetTodoItemVariables>;
export function getTodoItem(dc: DataConnect, vars: GetTodoItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTodoItemData, GetTodoItemVariables>;

interface ListTodoItemsByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTodoItemsByStatusVariables): QueryRef<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTodoItemsByStatusVariables): QueryRef<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
  operationName: string;
}
export const listTodoItemsByStatusRef: ListTodoItemsByStatusRef;

export function listTodoItemsByStatus(vars: ListTodoItemsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
export function listTodoItemsByStatus(dc: DataConnect, vars: ListTodoItemsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;

interface ListTodoItemsByPriorityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTodoItemsByPriorityVariables): QueryRef<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTodoItemsByPriorityVariables): QueryRef<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
  operationName: string;
}
export const listTodoItemsByPriorityRef: ListTodoItemsByPriorityRef;

export function listTodoItemsByPriority(vars: ListTodoItemsByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
export function listTodoItemsByPriority(dc: DataConnect, vars: ListTodoItemsByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;

