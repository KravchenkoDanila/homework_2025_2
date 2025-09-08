'use strict';

QUnit.module('Тестируем функцию filterByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter1 = ['a', 'c']; // 'c' отсутствует
        const keysToFilter2 = ['d', 'c']; // оба ключа отсутствуют

        const result1 = filterByKeys(originalObject, keysToFilter1);
        const result2 = filterByKeys(originalObject, keysToFilter2);

        assert.deepEqual(result1, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
        assert.deepEqual(result2, { }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Работает правильно с пустыми объектами', (assert) => {
        const originalObject = { };
        const keysToFilter = ['a', 'c'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { }, 'Возвращает пустой результат');
    });

    QUnit.test('Работает правильно с пустыми ключами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = []; 
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, b: 2, c: 3 }, 'Возвращает пустой результат');
    });

    QUnit.test('Работает правильно с null', (assert) => {
        const nullObject = null;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const nullKeysToFilter = null;

        const result1 = () => {filterByKeys(nullObject, keysToFilter)};
        const result2 = () => {filterByKeys(originalObject, nullKeysToFilter)};
        const result3 = () => {filterByKeys(nullObject, nullKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче null в оба аргумента');
    });

    QUnit.test('Работает правильно с undefined', (assert) => {
        const undefinedObject = undefined;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const undefinedKeysToFilter = undefined;

        const result1 = () => {filterByKeys(undefinedObject, keysToFilter)};
        const result2 = () => {filterByKeys(originalObject, undefinedKeysToFilter)};
        const result3 = () => {filterByKeys(undefinedObject, undefinedKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче undefined в оба аргумента');
    });

    QUnit.test('Работает правильно со строками вместо объектов', (assert) => {
        const stringObject = "string";
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const stringKeysToFilter = "string";

        const result1 = () => {filterByKeys(stringObject, keysToFilter)};
        const result2 = () => {filterByKeys(originalObject, stringKeysToFilter)};
        const result3 = () => {filterByKeys(stringObject, stringKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строки в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строки в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче строк в оба аргумента');
    });

    QUnit.test('Работает правильно с числами вместо объектов', (assert) => {
        const numberObject = 123;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const numberKeysToFilter = 456;

        const result1 = () => {filterByKeys(numberObject, keysToFilter)};
        const result2 = () => {filterByKeys(originalObject, numberKeysToFilter)};
        const result3 = () => {filterByKeys(numberObject, numberKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче числа в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче числа в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче чисел в оба аргумента');
    });

    QUnit.test('Работает правильно с boolean вместо объектов', (assert) => {
        const booleanObject = true;
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'b'];
        const booleanKeysToFilter = false;

        const result1 = () => {filterByKeys(booleanObject, keysToFilter)};
        const result2 = () => {filterByKeys(originalObject, booleanKeysToFilter)};
        const result3 = () => {filterByKeys(booleanObject, booleanKeysToFilter)};

        assert.throws(result1, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в obj');
        assert.throws(result2, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в keys');
        assert.throws(result3, TypeError, 'Должна выбрасываться ошибка TypeError при передаче boolean в оба аргумента');
    });

});