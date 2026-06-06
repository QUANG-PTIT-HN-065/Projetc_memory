const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const PriorityLevel = {
  low: "low",
  medium: "medium",
  high: "high",
}
exports.PriorityLevel = PriorityLevel;

const connectorConfig = {
  connector: 'example',
  service: 'my-projetc-4c9bb-service',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTodoItem', inputVars);
}
createTodoItemRef.operationName = 'CreateTodoItem';
exports.createTodoItemRef = createTodoItemRef;

exports.createTodoItem = function createTodoItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTodoItemRef(dcInstance, inputVars));
}
;

const updateTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTodoItem', inputVars);
}
updateTodoItemRef.operationName = 'UpdateTodoItem';
exports.updateTodoItemRef = updateTodoItemRef;

exports.updateTodoItem = function updateTodoItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTodoItemRef(dcInstance, inputVars));
}
;

const deleteTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTodoItem', inputVars);
}
deleteTodoItemRef.operationName = 'DeleteTodoItem';
exports.deleteTodoItemRef = deleteTodoItemRef;

exports.deleteTodoItem = function deleteTodoItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteTodoItemRef(dcInstance, inputVars));
}
;

const toggleTodoItemCompletedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ToggleTodoItemCompleted', inputVars);
}
toggleTodoItemCompletedRef.operationName = 'ToggleTodoItemCompleted';
exports.toggleTodoItemCompletedRef = toggleTodoItemCompletedRef;

exports.toggleTodoItemCompleted = function toggleTodoItemCompleted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(toggleTodoItemCompletedRef(dcInstance, inputVars));
}
;

const listTodoItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTodoItems');
}
listTodoItemsRef.operationName = 'ListTodoItems';
exports.listTodoItemsRef = listTodoItemsRef;

exports.listTodoItems = function listTodoItems(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listTodoItemsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getTodoItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodoItem', inputVars);
}
getTodoItemRef.operationName = 'GetTodoItem';
exports.getTodoItemRef = getTodoItemRef;

exports.getTodoItem = function getTodoItem(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTodoItemRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listTodoItemsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTodoItemsByStatus', inputVars);
}
listTodoItemsByStatusRef.operationName = 'ListTodoItemsByStatus';
exports.listTodoItemsByStatusRef = listTodoItemsByStatusRef;

exports.listTodoItemsByStatus = function listTodoItemsByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTodoItemsByStatusRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listTodoItemsByPriorityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTodoItemsByPriority', inputVars);
}
listTodoItemsByPriorityRef.operationName = 'ListTodoItemsByPriority';
exports.listTodoItemsByPriorityRef = listTodoItemsByPriorityRef;

exports.listTodoItemsByPriority = function listTodoItemsByPriority(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTodoItemsByPriorityRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
