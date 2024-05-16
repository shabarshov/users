const hasOnlyAllowedKeys = (object, allowedKeys) => {
  for (const key in object) {
    if (!allowedKeys.includes(key)) {
      return false
    }
  }

  return true
}

const isEmpty = (object) => {
  return Object.keys(object).length === 0
}

const hasEmptyValues = (object) => {
  for (const key in object) {
    if (!object[key]) {
      return true
    }
  }

  return false
}

const hasAllKeys = (object, requiredKeys) => {
  const hasAllKeys = hasOnlyAllowedKeys(object, requiredKeys)
  return hasAllKeys && Object.keys(object).length === requiredKeys.length
}

module.exports = {
  hasOnlyAllowedKeys,
  isEmpty,
  hasEmptyValues,
  hasAllKeys,
}
