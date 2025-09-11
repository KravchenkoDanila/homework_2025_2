/**
 * Функция, фильтрует объект по указанным ключам
 * @param {Object} obj - исходный объект
 * @param {Array<string>} keys - массив ключей для фильтрации
 * @returns {Object} новый объект с отфильтрованными ключами
 * 
 * @example
 * // returns { name: 'John', age: 30 }
 * filterObjectByKeys({ name: 'John', age: 30, city: 'NYC' }, ['name', 'age']);
 * 
 * @example
 * // returns { user: { name: 'John' } }
 * filterObjectByKeys({ user: { name: 'John' }, id: 1 }, ['user']);
 * 
 * @throws {TypeError} если obj не является объектом
 */
const filterObjectByKeys = function (obj, keys = []) {
    // Проверяем, что obj является объектом
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj) || typeof obj === 'function') {
        throw new TypeError('Первый параметр должен быть объектом');
    }
    
    // Дополнительная проверка: исключаем объекты-обертки
    if (obj.constructor !== Object) {
        throw new TypeError('Первый параметр должен быть обычным объектом, а не объектом-оберткой');
    }
    
    // Проверяем, что keys является массивом
    if (!Array.isArray(keys)) {
        throw new TypeError('Второй параметр должен быть массивом');
    }
    
    // Если пустой массив - возвращаем весь объект
    if (keys.length === 0) {
        return { ...obj };
    }
    
    const result = {};
    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // Проверяем, что ключ существует в объекте
        if (Object.hasOwn(obj, key)) {
            result[key] = obj[key];
        }
    }
    
    return result;
};