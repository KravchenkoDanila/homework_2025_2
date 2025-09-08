'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter1 = ['a', 'c']; // 'c' отсутствует
        const keysToFilter2 = ['d', 'c']; // оба ключа отсутствуют

        const result1 = filterObjectByKeys(originalObject, keysToFilter1);
        const result2 = filterObjectByKeys(originalObject, keysToFilter2);

        assert.deepEqual(result1, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
        assert.deepEqual(result2, { }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Работает правильно с пустыми объектами', (assert) => {
        const originalObject = { };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { }, 'Возвращает пустой результат');
    });

    QUnit.test('Работает правильно с пустыми ключами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = []; 
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, b: 2, c: 3 }, 'Возвращает копию всего объекта');
    });

    QUnit.test('Работает правильно с null', (assert) => {
        const nullObject = null;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const nullKeysToFilter = null;

        const result1 = () => {filterObjectByKeys(nullObject, keysToFilter)};
        const result2 = () => {filterObjectByKeys(originalObject, nullKeysToFilter)};
        const result3 = () => {filterObjectByKeys(nullObject, nullKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в оба аргумента');
    });

    QUnit.test('Работает правильно с undefined', (assert) => {
        const undefinedObject = undefined;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const undefinedKeysToFilter = undefined;

        const result1 = () => {filterObjectByKeys(undefinedObject, keysToFilter)};
        const result2 = filterObjectByKeys(originalObject, undefinedKeysToFilter);
        const result3 = () => {filterObjectByKeys(undefinedObject, undefinedKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в obj');
        assert.deepEqual(result2, { a: 1, b: 2, c: 3 }, 'Должен возвращаться оригинальный объект при передаче undefined в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в оба аргумента');
    });

    QUnit.test('Работает правильно со строками вместо объектов', (assert) => {
        const stringObject = "string";
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const stringKeysToFilter = "string";

        const result1 = () => {filterObjectByKeys(stringObject, keysToFilter)};
        const result2 = () => {filterObjectByKeys(originalObject, stringKeysToFilter)};
        const result3 = () => {filterObjectByKeys(stringObject, stringKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строки в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строки в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строк в оба аргумента');
    });

    QUnit.test('Работает правильно с числами вместо объектов', (assert) => {
        const numberObject = 123;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const numberKeysToFilter = 456;

        const result1 = () => {filterObjectByKeys(numberObject, keysToFilter)};
        const result2 = () => {filterObjectByKeys(originalObject, numberKeysToFilter)};
        const result3 = () => {filterObjectByKeys(numberObject, numberKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче числа в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче числа в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче чисел в оба аргумента');
    });

    QUnit.test('Работает правильно с boolean вместо объектов', (assert) => {
        const booleanObject = true;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const booleanKeysToFilter = false;

        const result1 = () => {filterObjectByKeys(booleanObject, keysToFilter)};
        const result2 = () => {filterObjectByKeys(originalObject, booleanKeysToFilter)};
        const result3 = () => {filterObjectByKeys(booleanObject, booleanKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в оба аргумента');
    });

    QUnit.test('Работает правильно с массивами вместо объектов', (assert) => {
        const arrayObject = [1, 2, 3];
        const keysToFilter = ['a', 'b'];

        const result1 = () => {filterObjectByKeys(arrayObject, keysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче массива в obj');
    });

    QUnit.test('Работает правильно с функциями вместо объектов', (assert) => {
        const functionObject = function() {};
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const functionKeysToFilter = function() {};

        const result1 = () => {filterObjectByKeys(functionObject, keysToFilter)};
        const result2 = () => {filterObjectByKeys(originalObject, functionKeysToFilter)};
        const result3 = () => {filterObjectByKeys(functionObject, functionKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче функции в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче функции в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче функций в оба аргумента');
    });

    QUnit.test('Работает правильно с объектами-обертками', (assert) => {
        const stringWrapper = new String('test');
        const numberWrapper = new Number(42);
        const booleanWrapper = new Boolean(true);
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];

        const result1 = () => {filterObjectByKeys(stringWrapper, keysToFilter)};
        const result2 = () => {filterObjectByKeys(numberWrapper, keysToFilter)};
        const result3 = () => {filterObjectByKeys(booleanWrapper, keysToFilter)};
        const result4 = () => {filterObjectByKeys(originalObject, stringWrapper)};
        const result5 = () => {filterObjectByKeys(originalObject, numberWrapper)};
        const result6 = () => {filterObjectByKeys(originalObject, booleanWrapper)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче String wrapper в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Number wrapper в obj');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Boolean wrapper в obj');
        assert.throws(result4, TypeError, 'Должна выбрасываться ошибка TypeError при передаче String wrapper в keys');
        assert.throws(result5, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Number wrapper в keys');
        assert.throws(result6, TypeError, 'Должна выбрасываться ошибка TypeError при передаче Boolean wrapper в keys');
    });

});