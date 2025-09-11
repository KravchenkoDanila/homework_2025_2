'use strict';

/**
 * Тестируем функцию filterObjectByKeys
 * @param {Function} test - функция тестирования
 */
QUnit.module('Тестируем функцию filterObjectByKeys', (test) => {
    /**
     * Работает правильно с простыми объектами
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    /**
     * Работает правильно с вложенными объектами
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    /**
     * Работает правильно отсутствующими ключами
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter1 = ['a', 'c']; // 'c' отсутствует
        const keysToFilter2 = ['d', 'c']; // оба ключа отсутствуют

        const result1 = () => {filterObjectByKeys(originalObject, keysToFilter1)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(originalObject, keysToFilter2)}; // @param {Function} - функция для вызова

        assert.deepEqual(result1, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
        assert.deepEqual(result2, { }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    /**
     * Работает правильно с пустыми объектами
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с пустыми объектами', (assert) => {
        const originalObject = { };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { }, 'Возвращает пустой результат');
    });

    /**
     * Работает правильно с пустыми ключами
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с пустыми ключами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = []; 
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, b: 2, c: 3 }, 'Возвращает копию всего объекта');
    });

    /**
     * Работает правильно с null
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с null', (assert) => {
        const nullObject = null;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const nullKeysToFilter = null;

        const result1 = () => {filterObjectByKeys(nullObject, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(originalObject, nullKeysToFilter)}; // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(nullObject, nullKeysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в оба аргумента');
    });

    /**
     * Работает правильно с undefined
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с undefined', (assert) => {
        const undefinedObject = undefined;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const undefinedKeysToFilter = undefined;

        const result1 = () => {filterObjectByKeys(undefinedObject, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = filterObjectByKeys(originalObject, undefinedKeysToFilter); // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(undefinedObject, undefinedKeysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в obj');
        assert.deepEqual(result2, { a: 1, b: 2, c: 3 }, 'Должен возвращаться оригинальный объект при передаче undefined в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в оба аргумента');
    });

    /**
     * Работает правильно со строками вместо объектов
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно со строками вместо объектов', (assert) => {
        const stringObject = "string";
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const stringKeysToFilter = "string";

        const result1 = () => {filterObjectByKeys(stringObject, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(originalObject, stringKeysToFilter)}; // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(stringObject, stringKeysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строки в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строки в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строк в оба аргумента');
    });

    /**
     * Работает правильно с числами вместо объектов
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с числами вместо объектов', (assert) => {
        const numberObject = 123;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const numberKeysToFilter = 456;

        const result1 = () => {filterObjectByKeys(numberObject, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(originalObject, numberKeysToFilter)}; // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(numberObject, numberKeysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче числа в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче числа в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче чисел в оба аргумента');
    });

    /**
     * Работает правильно с boolean вместо объектов
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с boolean вместо объектов', (assert) => {
        const booleanObject = true;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const booleanKeysToFilter = false;

        const result1 = () => {filterObjectByKeys(booleanObject, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(originalObject, booleanKeysToFilter)}; // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(booleanObject, booleanKeysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в оба аргумента');
    });

    /**
     * Работает правильно с массивами вместо объектов
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с массивами вместо объектов', (assert) => {
        const arrayObject = [1, 2, 3];
        const keysToFilter = ['a', 'b'];

        const result1 = () => {filterObjectByKeys(arrayObject, keysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче массива в obj');
    });

    /**
     * Работает правильно с функциями вместо объектов
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с функциями вместо объектов', (assert) => {
        const functionObject = function() {};
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const functionKeysToFilter = function() {};

        const result1 = () => {filterObjectByKeys(functionObject, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(originalObject, functionKeysToFilter)}; // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(functionObject, functionKeysToFilter)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче функции в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче функции в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче функций в оба аргумента');
    });

    /**
     * Работает правильно с объектами-обертками
     * @param {Assert} assert - объект для Assertions
     */
    QUnit.test('Работает правильно с объектами-обертками', (assert) => {
        const stringWrapper = new String('test');
        const numberWrapper = new Number(42);
        const booleanWrapper = new Boolean(true);
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];

        const result1 = () => {filterObjectByKeys(stringWrapper, keysToFilter)}; // @param {Function} - функция для вызова
        const result2 = () => {filterObjectByKeys(numberWrapper, keysToFilter)}; // @param {Function} - функция для вызова
        const result3 = () => {filterObjectByKeys(booleanWrapper, keysToFilter)}; // @param {Function} - функция для вызова
        const result4 = () => {filterObjectByKeys(originalObject, stringWrapper)}; // @param {Function} - функция для вызова
        const result5 = () => {filterObjectByKeys(originalObject, numberWrapper)}; // @param {Function} - функция для вызова
        const result6 = () => {filterObjectByKeys(originalObject, booleanWrapper)}; // @param {Function} - функция для вызова

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче String wrapper в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Number wrapper в obj');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Boolean wrapper в obj');
        assert.throws(result4, TypeError, 'Должна выбрасываться ошибка TypeError при передаче String wrapper в keys');
        assert.throws(result5, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Number wrapper в keys');
        assert.throws(result6, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Boolean wrapper в keys');
    });

});