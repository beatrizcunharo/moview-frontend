const normalizeString = (str) => {
    return str
        .replace(/-/g, ' ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
}

const redirectTo = (website) => {
    window.location.href = website
}

const setUserData = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user))
}

const getUserData = () => {
    return JSON.parse(sessionStorage.getItem('user')) || {};
}

const removeUserData = () => {
    sessionStorage.removeItem('user')
}

const isEmptyObject = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return false
    }
    return Object.keys(obj).length === 0
}

export {
    normalizeString,
    redirectTo,
    setUserData,
    getUserData,
    removeUserData,
    isEmptyObject
}