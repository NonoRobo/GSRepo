function validateNotNullValue(value, logCategory, logVarName)
{
  if (value == null)
  {
    throw new Error("[" + logCategory + "] did not find '" + logVarName + "'.");
  }
}

// === BOOLEANS ===

function validateBooleanValue(value, logCategory, logVarName)
{
  validateNotNullValue(value, logCategory, logVarName);
  if (typeof value !== "boolean")
  {
    throw new Error("[" + logCategory + "] did not find '" + logVarName + "' as boolean.");
  }
}

// === NUMBERS ===

function validateNumberValue(value, logCategory, logVarName)
{
  validateNotNullValue(value, logCategory, logVarName);
  if (typeof value !== "number")
  {
    throw new Error("[" + logCategory + "] did not find '" + logVarName + "' as number.");
  }
}

function validateIntegerValue(value, logCategory, logVarName)
{
  validateNumberValue(value, logCategory, logVarName);
  if (!Number.isInteger(value))
  {
    throw new Error("[" + logCategory + "] did not find '" + logVarName + "' as integer.");
  }
}

// === STRINGS ===

function validateStringValue(value, logCategory, logVarName)
{
  validateNotNullValue(value, logCategory, logVarName);
  if (typeof value !== "string")
  {
    throw new Error("[" + logCategory + "] did not find '" + logVarName + "' as string.");
  }
}

function validateNonEmptyStringValue(value, logCategory, logVarName)
{
  validateStringValue(value, logCategory, logVarName);
  if (value.trim() === "")
  {
    throw new Error("[" + logCategory + "] did not find '" + logVarName + "' as non-empty string.");
  }
}