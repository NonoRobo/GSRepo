function validateNotNullValue(value, logCategory, logVarName, errors)
{
  if (value == null)
  {
    errors.push("[" + logCategory + "] did not find '" + logVarName + "'.");
    return false;
  }
  return true;
}

// === BOOLEANS ===

function validateBooleanValue(value, logCategory, logVarName, errors)
{
  if (!validateNotNullValue(value, logCategory, logVarName, errors))
    return false;

  if (typeof value !== "boolean")
  {
    errors.push("[" + logCategory + "] did not find '" + logVarName + "' as boolean.");
    return false;
  }

  return true;
}

// === NUMBERS ===

function validateNumberValue(value, logCategory, logVarName, errors)
{
  if (!validateNotNullValue(value, logCategory, logVarName, errors))
    return false;

  if (typeof value !== "number")
  {
    errors.push("[" + logCategory + "] did not find '" + logVarName + "' as number.");
    return false;
  }

  return true;
}

function validateIntegerValue(value, logCategory, logVarName, errors)
{
  if (!validateNumberValue(value, logCategory, logVarName, errors))
    return false;

  if (!Number.isInteger(value))
  {
    errors.push("[" + logCategory + "] did not find '" + logVarName + "' as integer.");
    return false;
  }

  return true;
}

// === STRINGS ===

function validateStringValue(value, logCategory, logVarName, errors)
{
  if (!validateNotNullValue(value, logCategory, logVarName, errors))
    return false;

  if (typeof value !== "string")
  {
    errors.push("[" + logCategory + "] did not find '" + logVarName + "' as string.");
    return false;
  }

  return true;
}

function validateNonEmptyStringValue(value, logCategory, logVarName, errors)
{
  if (!validateStringValue(value, logCategory, logVarName, errors))
    return false;

  if (value.trim() === "")
  {
    errors.push("[" + logCategory + "] did not find '" + logVarName + "' as non-empty string.");
    return false;
  }
  
  return true;
}