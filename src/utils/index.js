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

export {
    normalizeString,
    redirectTo
}