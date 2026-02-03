function addData(payload)
{
  let errors = [];

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("SoH");
  if (!sheet)
  {
    throw new Error("Sheet 'SoH' not found");
  }

  const lastRowIdx = sheet.getLastRow();
  const insertRowIdx = lastRowIdx + 1;

  const playerInfo = parsePlayerInfo(payload, insertRowIdx, errors);
  const dateInfo = parseDateInfo(payload, errors);
  const doorsInfo = parseDoorsInfo(payload, errors);
  const ganonInfo = parseGanonInfo(payload, errors);
  const dungeonInfo = parseDungeonInfo(payload, errors);
  const insanityInfo = parseInsanityInfo(payload, errors);
  const poolInfo = parsePoolInfo(payload, errors);
  const shopInfo = parseShopInfo(payload, errors);
  const extraInfo = parseExtraInfo(payload, errors);
  const qolInfo = parseQolInfo(payload, errors);

  if (errors.length > 0) 
  {
    throw new Error(JSON.stringify(errors));
  }

  const allData =
  [
    playerInfo,
    dateInfo,
    doorsInfo,
    ganonInfo,
    dungeonInfo,
    insanityInfo,
    poolInfo,
    shopInfo,
    extraInfo,
    qolInfo
  ];
  sheet.appendRow(allData.flat());

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parsePlayerInfo(payload, rowIdx, errors)
{
  const logCategory = "PLAYER";

  let validationOk = true;
  validationOk &= validateNonEmptyStringValue(payload.joueur, logCategory, "joueur", errors)
  validationOk &= validateNonEmptyStringValue(payload.goal, logCategory, "goal", errors);
  validationOk &= validateIntegerValue(payload.triforcePieces, logCategory, "triforcePieces", errors);
  validationOk &= validateIntegerValue(payload.triforcePercent, logCategory, "triforcePercent", errors);
  validationOk &= validateNonEmptyStringValue(payload.accessibility, logCategory, "accessibility", errors);
  validationOk &= validateIntegerValue(payload.progressionBalancing, logCategory, "progressionBalancing", errors);

  if (!validationOk)
    return [];

  return [
    payload.joueur.trim(),
    payload.goal.trim(),
    payload.triforcePieces, payload.triforcePercent / 100,
    "=$C" + rowIdx + "*$D" + rowIdx,
    payload.accessibility,
    payload.progressionBalancing
  ];
}

function parseDateInfo(payload)
{
  let debut = "";
  let fin = "";
  let status = "En cours";

  try
  {
    validateNotNullValue(payload.dateDebut, "DATE", "dateDebut");
    debut = payload.dateDebut;
  } catch (err)
  {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    debut = Utilities.formatDate(new Date(), sheet.getSpreadsheetTimeZone(), "dd/MM/yyyy");
  }

  try
  {
    validateNotNullValue(payload.dateFin, "DATE", "dateFin");
    fin = payload.dateFin;
    status = "DONE";
  } catch (err)
  {
  }
  
  try
  {
    validateNonEmptyStringValue(payload.succes, "DATE", "succes");
    status = payload.succes;
  } catch (err)
  {
  }

  return [
    debut,
    fin,
    status
  ];
}

function parseDoorsInfo(payload, errors)
{
  const logCategory = "DOORS";

  let validationOk = true;
  validationOk &= validateNonEmptyStringValue(payload.kokiriForest, logCategory, "kokiriForest", errors);
  validationOk &= validateNonEmptyStringValue(payload.dekuTree, logCategory, "dekuTree", errors);
  validationOk &= validateNonEmptyStringValue(payload.kakarikoGate, logCategory, "kakarikoGate", errors);
  validationOk &= validateNonEmptyStringValue(payload.doorOfTime, logCategory, "doorOfTime", errors);
  validationOk &= validateNonEmptyStringValue(payload.sleepingWaterfall, logCategory, "sleepingWaterfall", errors);
  validationOk &= validateNonEmptyStringValue(payload.zoraFountain, logCategory, "zoraFountain", errors);
  validationOk &= validateNonEmptyStringValue(payload.jabuJabuMouth, logCategory, "jabuJabuMouth", errors);
  validationOk &= validateNonEmptyStringValue(payload.overworldDoors, logCategory, "overworldDoors", errors);

  if (!validationOk)
    return [];

  return [
    payload.kokiriForest.trim(),
    payload.dekuTree.trim(),
    payload.kakarikoGate.trim(),
    payload.doorOfTime.trim(),
    payload.sleepingWaterfall.trim(),
    payload.zoraFountain.trim(),
    payload.jabuJabuMouth.trim(),
    payload.overworldDoors.trim()
  ];
}

function parseGanonInfo(payload, errors)
{
  const logCategory = "GANON";

  let validationOk = true;
  validationOk &= validateNonEmptyStringValue(payload.startAge, logCategory, "startAge", errors);
  validationOk &= validateNonEmptyStringValue(payload.rainbowBridgeCondition, logCategory, "rainbowBridgeCondition", errors);
  validationOk &= validateIntegerValue(payload.rainbowBridgeValue, logCategory, "rainbowBridgeValue", errors);
  validationOk &= validateNonEmptyStringValue(payload.ganonTrials, logCategory, "ganonTrials", errors);
  validationOk &= validateNonEmptyStringValue(payload.ganonBossKeyCondition, logCategory, "ganonBossKeyCondition", errors);
  validationOk &= validateIntegerValue(payload.ganonBossKeyValue, logCategory, "ganonBossKeyValue", errors);

  if (!validationOk)
    return [];

  return [
    payload.startAge.trim(),
    payload.rainbowBridgeCondition.trim(),
    payload.rainbowBridgeValue,
    payload.ganonTrials.trim(),
    payload.ganonBossKeyCondition.trim(),
    payload.ganonBossKeyValue
  ];
}

function parseDungeonInfo(payload, errors)
{
  const logCategory = "DUNGEON";

  let validationOk = true;
  validationOk &= validateNonEmptyStringValue(payload.mapsAndCompasses, logCategory, "mapsAndCompasses", errors);
  validationOk &= validateBooleanValue(payload.bottomOfTheWellKeyrings, logCategory, "bottomOfTheWellKeyrings", errors);
  validationOk &= validateBooleanValue(payload.forestTempleKeyrings, logCategory, "forestTempleKeyrings", errors);
  validationOk &= validateBooleanValue(payload.fireTempleKeyrings, logCategory, "fireTempleKeyrings", errors);
  validationOk &= validateBooleanValue(payload.waterTempleKeyrings, logCategory, "waterTempleKeyrings", errors);
  validationOk &= validateBooleanValue(payload.shadowTempleKeyrings, logCategory, "shadowTempleKeyrings", errors);
  validationOk &= validateBooleanValue(payload.spiritTempleKeyrings, logCategory, "spiritTempleKeyrings", errors);
  validationOk &= validateBooleanValue(payload.gerudoFortressKeyrings, logCategory, "gerudoFortressKeyrings", errors);
  validationOk &= validateNonEmptyStringValue(payload.fortressCarpenters, logCategory, "fortressCarpenters", errors);
  validationOk &= validateBooleanValue(payload.gerudoTrainingGroundsKeyrings, logCategory, "gerudoTrainingGroundsKeyrings", errors);
  validationOk &= validateBooleanValue(payload.ganonsCastleKeyrings, logCategory, "ganonsCastleKeyrings", errors);

  if (!validationOk)
    return [];

  return [
    payload.mapsAndCompasses.trim(),
    payload.bottomOfTheWellKeyrings,
    payload.forestTempleKeyrings,
    payload.fireTempleKeyrings,
    payload.waterTempleKeyrings,
    payload.shadowTempleKeyrings,
    payload.spiritTempleKeyrings,
    payload.gerudoFortressKeyrings,
    payload.fortressCarpenters.trim(),
    payload.gerudoTrainingGroundsKeyrings,
    payload.ganonsCastleKeyrings
  ];
}

function parseInsanityInfo(payload, errors)
{
  const logCategory = "SANITY";

  let validationOk = true;
  validationOk &= validateNonEmptyStringValue(payload.masterSwordSanity, logCategory, "masterSwordSanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.kokiriSwordSanity, logCategory, "kokiriSwordSanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.tokensanity, logCategory, "tokensanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.freestandingsanity, logCategory, "freestandingsanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.potsanity, logCategory, "potsanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.cratesanity, logCategory, "cratesanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.grasssanity, logCategory, "grasssanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.fishsanity, logCategory, "fishsanity", errors);
  validationOk &= validateBooleanValue(payload.beehivesanity, logCategory, "beehivesanity", errors);
  validationOk &= validateBooleanValue(payload.cowsanity, logCategory, "cowsanity", errors);
  validationOk &= validateBooleanValue(payload.treesanity, logCategory, "treesanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.bossSoulSanity, logCategory, "bossSoulSanity", errors);
  validationOk &= validateBooleanValue(payload.frogsanity, logCategory, "frogsanity", errors);
  validationOk &= validateNonEmptyStringValue(payload.ocarinasanity, logCategory, "ocarinasanity", errors);
  validationOk &= validateBooleanValue(payload.ocarinaButtonSanity, logCategory, "ocarinaButtonSanity", errors);
  validationOk &= validateBooleanValue(payload.fairysanityFountains, logCategory, "fairysanityFountains", errors);
  validationOk &= validateBooleanValue(payload.fairysanityStones, logCategory, "fairysanityStones", errors);
  validationOk &= validateBooleanValue(payload.fairysanityBeans, logCategory, "fairysanityBeans", errors);
  validationOk &= validateBooleanValue(payload.fairysanitySongs, logCategory, "fairysanitySongs", errors);

  if (!validationOk)
    return [];
  
  return [
    payload.masterSwordSanity.trim(),
    payload.kokiriSwordSanity.trim(),
    payload.tokensanity.trim(),
    payload.freestandingsanity.trim(),
    payload.potsanity.trim(),
    payload.cratesanity.trim(),
    payload.grasssanity.trim(),
    payload.fishsanity.trim(),
    payload.beehivesanity,
    payload.cowsanity,
    payload.treesanity,
    payload.bossSoulSanity.trim(),
    payload.frogsanity,
    payload.ocarinasanity.trim(),
    payload.ocarinaButtonSanity,
    payload.fairysanityFountains,
    payload.fairysanityStones,
    payload.fairysanityBeans,
    payload.fairysanitySongs
  ];
}

function parsePoolInfo(payload, errors)
{
  const logCategory = "POOL";

  let validationOk = true;
  validationOk &= validateNonEmptyStringValue(payload.poolBalancing, logCategory, "poolBalancing", errors);
  validationOk &= validateNonEmptyStringValue(payload.childWallet, logCategory, "childWallet", errors);
  validationOk &= validateNonEmptyStringValue(payload.tycoonWallet, logCategory, "tycoonWallet", errors);
  validationOk &= validateNonEmptyStringValue(payload.bronzeScale, logCategory, "bronzeScale", errors);
  validationOk &= validateNonEmptyStringValue(payload.stickBag, logCategory, "stickBag", errors);
  validationOk &= validateNonEmptyStringValue(payload.nutBag, logCategory, "nutBag", errors);
  validationOk &= validateNonEmptyStringValue(payload.bombchuBag, logCategory, "bombchuBag", errors);
  validationOk &= validateNonEmptyStringValue(payload.weirdEgg, logCategory, "weirdEgg", errors);
  validationOk &= validateNonEmptyStringValue(payload.adultTrade, logCategory, "adultTrade", errors);
  validationOk &= validateNonEmptyStringValue(payload.gerudoCard, logCategory, "gerudoCard", errors);
  validationOk &= validateNonEmptyStringValue(payload.fishingPole, logCategory, "fishingPole", errors);
  validationOk &= validateNonEmptyStringValue(payload.skeletonKey, logCategory, "skeletonKey", errors);
  validationOk &= validateNonEmptyStringValue(payload.rocsFeather, logCategory, "rocsFeather", errors);
  validationOk &= validateNonEmptyStringValue(payload.dungeonRewards, logCategory, "dungeonRewards", errors);

  if (!validationOk)
    return [];

  return [
    payload.poolBalancing.trim(),
    payload.childWallet.trim(),
    payload.tycoonWallet.trim(),
    payload.bronzeScale.trim(),
    payload.stickBag.trim(),
    payload.nutBag.trim(),
    payload.bombchuBag.trim(),
    payload.weirdEgg.trim(),
    payload.adultTrade.trim(),
    payload.gerudoCard.trim(),
    payload.fishingPole.trim(),
    payload.skeletonKey.trim(),
    payload.rocsFeather.trim(),
    payload.dungeonRewards.trim(),
  ];
}

function parseShopInfo(payload, errors)
{
  const logCategory = "SHOP";

  let validationOk = true;
  validationOk &= validateBooleanValue(payload.shuffleShops, logCategory, "shuffleShops", errors);
  validationOk &= validateIntegerValue(payload.shuffleShopsItems, logCategory, "shuffleShopsItems", errors);
  validationOk &= validateBooleanValue(payload.shuffleScrubs, logCategory, "shuffleScrubs", errors);
  validationOk &= validateNonEmptyStringValue(payload.shuffleMerchants, logCategory, "shuffleMerchants", errors);

  if (!validationOk)
    return [];

  return [
    payload.shuffleShops,
    payload.shuffleShopsItems,
    payload.shuffleScrubs,
    payload.shuffleMerchants.trim(),
  ];
}

function parseExtraInfo(payload, errors)
{
  const logCategory = "EXTRA";
  
  let validationOk = true;
  validationOk &= validateBooleanValue(payload.token100, logCategory, "token100", errors);
  validationOk &= validateBooleanValue(payload.skipChildZelda, logCategory, "skipChildZelda", errors);
  validationOk &= validateBooleanValue(payload.skipEponaRace, logCategory, "skipEponaRace", errors);
  validationOk &= validateIntegerValue(payload.iceTrapsCount, logCategory, "iceTrapsCount", errors);
  validationOk &= validateIntegerValue(payload.iceTrapsPercent, logCategory, "iceTrapsPercent", errors);

  if (!validationOk)
    return [];

  return [
    payload.token100,
    payload.skipChildZelda,
    payload.skipEponaRace,
    payload.iceTrapsCount,
    payload.iceTrapsPercent,
  ];
}

function parseQolInfo(payload, errors)
{
  const logCategory = "QOL";
  
  let validationOk = true;
  validationOk &= validateBooleanValue(payload.fullWallets, logCategory, "fullWallets", errors);
  validationOk &= validateNonEmptyStringValue(payload.infiniteUpgrades, logCategory, "infiniteUpgrades", errors);

  if (!validationOk)
    return [];

  return [
    payload.fullWallets,
    payload.infiniteUpgrades.trim(),
  ];
}