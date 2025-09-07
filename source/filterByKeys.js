/**
 * Функция, фильтрует объект по указанным ключам
 * @param {Object} obj - исходный объект
 * @param {Array<string>} keys - массив ключей для фильтрации
 * @returns {Object} новый объект с отфильтрованными ключами
 * 
 * @example
 * // returns { name: 'John', age: 30 }
 * filterByKeys({ name: 'John', age: 30, city: 'NYC' }, ['name', 'age']);
 * 
 * @example
 * // returns { user: { name: 'John' } }
 * filterByKeys({ user: { name: 'John' }, id: 1 }, ['user']);
 * 
 * @throws {TypeError} если obj не является объектом
 */
const filterByKeys = function (obj, keys) {
    // Проверяем, что obj является объектом
    if (obj === null || obj === undefined || typeof obj !== 'object') {
        throw new TypeError('Первый параметр должен быть объектом');
    }
    
    // Проверяем, что keys является массивом
    if (keys === null || keys === undefined || !Array.isArray(keys)) {
        throw new TypeError('Второй параметр должен быть массивом');
    }
    
    const result = {};
    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // Проверяем, что ключ существует в объекте
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }
    
    return result;
};