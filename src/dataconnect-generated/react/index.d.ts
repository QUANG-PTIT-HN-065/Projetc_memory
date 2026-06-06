import { CreateTodoItemData, CreateTodoItemVariables, UpdateTodoItemData, UpdateTodoItemVariables, DeleteTodoItemData, DeleteTodoItemVariables, ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables, ListTodoItemsData, GetTodoItemData, GetTodoItemVariables, ListTodoItemsByStatusData, ListTodoItemsByStatusVariables, ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
// import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateTodoItem(options?: useDataConnectMutationOptions<CreateTodoItemData, FirebaseError, CreateTodoItemVariables>): UseDataConnectMutationResult<CreateTodoItemData, CreateTodoItemVariables>;
export function useCreateTodoItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTodoItemData, FirebaseError, CreateTodoItemVariables>): UseDataConnectMutationResult<CreateTodoItemData, CreateTodoItemVariables>;

export function useUpdateTodoItem(options?: useDataConnectMutationOptions<UpdateTodoItemData, FirebaseError, UpdateTodoItemVariables>): UseDataConnectMutationResult<UpdateTodoItemData, UpdateTodoItemVariables>;
export function useUpdateTodoItem(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTodoItemData, FirebaseError, UpdateTodoItemVariables>): UseDataConnectMutationResult<UpdateTodoItemData, UpdateTodoItemVariables>;

export function useDeleteTodoItem(options?: useDataConnectMutationOptions<DeleteTodoItemData, FirebaseError, DeleteTodoItemVariables>): UseDataConnectMutationResult<DeleteTodoItemData, DeleteTodoItemVariables>;
export function useDeleteTodoItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTodoItemData, FirebaseError, DeleteTodoItemVariables>): UseDataConnectMutationResult<DeleteTodoItemData, DeleteTodoItemVariables>;

export function useToggleTodoItemCompleted(options?: useDataConnectMutationOptions<ToggleTodoItemCompletedData, FirebaseError, ToggleTodoItemCompletedVariables>): UseDataConnectMutationResult<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;
export function useToggleTodoItemCompleted(dc: DataConnect, options?: useDataConnectMutationOptions<ToggleTodoItemCompletedData, FirebaseError, ToggleTodoItemCompletedVariables>): UseDataConnectMutationResult<ToggleTodoItemCompletedData, ToggleTodoItemCompletedVariables>;

export function useListTodoItems(options?: useDataConnectQueryOptions<ListTodoItemsData>): UseDataConnectQueryResult<ListTodoItemsData, undefined>;
export function useListTodoItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListTodoItemsData>): UseDataConnectQueryResult<ListTodoItemsData, undefined>;

export function useGetTodoItem(vars: GetTodoItemVariables, options?: useDataConnectQueryOptions<GetTodoItemData>): UseDataConnectQueryResult<GetTodoItemData, GetTodoItemVariables>;
export function useGetTodoItem(dc: DataConnect, vars: GetTodoItemVariables, options?: useDataConnectQueryOptions<GetTodoItemData>): UseDataConnectQueryResult<GetTodoItemData, GetTodoItemVariables>;

export function useListTodoItemsByStatus(vars: ListTodoItemsByStatusVariables, options?: useDataConnectQueryOptions<ListTodoItemsByStatusData>): UseDataConnectQueryResult<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;
export function useListTodoItemsByStatus(dc: DataConnect, vars: ListTodoItemsByStatusVariables, options?: useDataConnectQueryOptions<ListTodoItemsByStatusData>): UseDataConnectQueryResult<ListTodoItemsByStatusData, ListTodoItemsByStatusVariables>;

export function useListTodoItemsByPriority(vars: ListTodoItemsByPriorityVariables, options?: useDataConnectQueryOptions<ListTodoItemsByPriorityData>): UseDataConnectQueryResult<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
export function useListTodoItemsByPriority(dc: DataConnect, vars: ListTodoItemsByPriorityVariables, options?: useDataConnectQueryOptions<ListTodoItemsByPriorityData>): UseDataConnectQueryResult<ListTodoItemsByPriorityData, ListTodoItemsByPriorityVariables>;
