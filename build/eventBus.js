const getNextUniqueId = getIdGenerator();
const subscriptions = {};
export function subscribe(eventType, callback) {
    const id = getNextUniqueId();
    if (!subscriptions[eventType])
        subscriptions[eventType] = {};
    subscriptions[eventType][id] = callback;
    return {
        unsubscribe: () => {
            delete subscriptions[eventType][id];
            if (Object.keys(subscriptions[eventType]).length === 0)
                delete subscriptions[eventType];
        },
    };
}
export function publish(eventType, ctx) {
    if (!subscriptions[eventType])
        return;
    Object.keys(subscriptions[eventType]).forEach((key) => {
        const keyNum = Number(key);
        subscriptions[eventType][keyNum](ctx);
    });
}
function getIdGenerator() {
    let lastId = 0;
    return function getNextUniqueId() {
        lastId += 1;
        return lastId;
    };
}
