// Created 04/02/2020
// TESTS FILE FOR SERVER.JS

QUnit.module('DbAbstraction Tests');

QUnit.test('DB: Connection Test', function (assert) {
  let connection;
  connection = initialiseDB(connection);
  assert.notEqual(connection, undefined);
});

QUnit.test('DB: Query Executor Test', function (assert) {
  let query = "CREATE DATABASE test;";
  executeQuery(query, undefined);
  query = "CREATE TABLE testTable (id, title);"
});

QUnit.test('ID Generation: Variance Tests', function (assert) {
  let v1 = generateID(8), v2 = generateID(8), v3 = generateID(8);

  if (v1 === v2 == v3) {
    assert.notOk();
  }
});
