import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const PriorityLevel = {
  low: "low",
  medium: "medium",
  high: "high",
}

export const connectorConfig = {
  connector: 'example',
  service: 'my-projetc-4c9bb-service',
  location: 'asia-southeast1'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const createTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTodoItem', inputVars);
}
createTodoItemRef.operationName = 'CreateTodoItem';

export function createTodoItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTodoItemRef(dcInstance, inputVars));
}

export const updateTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTodoItem', inputVars);
}
updateTodoItemRef.operationName = 'UpdateTodoItem';

export function updateTodoItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTodoItemRef(dcInstance, inputVars));
}

export const deleteTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTodoItem', inputVars);
}
deleteTodoItemRef.operationName = 'DeleteTodoItem';

export function deleteTodoItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteTodoItemRef(dcInstance, inputVars));
}

export const toggleTodoItemCompletedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ToggleTodoItemCompleted', inputVars);
}
toggleTodoItemCompletedRef.operationName = 'ToggleTodoItemCompleted';

export function toggleTodoItemCompleted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(toggleTodoItemCompletedRef(dcInstance, inputVars));
}

export const listTodoItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTodoItems');
}
listTodoItemsRef.operationName = 'ListTodoItems';

export function listTodoItems(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listTodoItemsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodoItem', inputVars);
}
getTodoItemRef.operationName = 'GetTodoItem';

export function getTodoItem(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTodoItemRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listTodoItemsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTodoItemsByStatus', inputVars);
}
listTodoItemsByStatusRef.operationName = 'ListTodoItemsByStatus';

export function listTodoItemsByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTodoItemsByStatusRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listTodoItemsByPriorityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTodoItemsByPriority', inputVars);
}
listTodoItemsByPriorityRef.operationName = 'ListTodoItemsByPriority';

export function listTodoItemsByPriority(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTodoItemsByPriorityRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

