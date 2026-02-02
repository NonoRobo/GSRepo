function addData(payload)
{
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("SoH");
    if (!sheet)
    {
      throw new Error("Sheet 'SoH' not found");
    }

    const lastRowIdx = sheet.getLastRow();
    const insertRowIdx = lastRowIdx + 1;
  
    const playerInfo = parsePlayerInfo(payload, insertRowIdx);
    const doorsInfo = parseDoorsInfo(payload);
    const ganonInfo = parseGanonInfo(payload);
    const dungeonInfo = parseDungeonInfo(payload);
    const insanityInfo = parseInsanityInfo(payload);
    const poolInfo = parsePoolInfo(payload);
    const shopInfo = parseShopInfo(payload);
    const extraInfo = parseExtraInfo(payload);
    const qolInfo = parseQolInfo(payload);

    const allData =
    [
      playerInfo,
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

function parsePlayerInfo(payload, rowIdx)
{
  const logCategory = "PLAYER";
  validateNonEmptyStringValue(payload.joueur, logCategory, "joueur")
  validateNonEmptyStringValue(payload.goal, logCategory, "goal");
  validateIntegerValue(payload.triforcePieces, logCategory, "triforcePieces");
  validateIntegerValue(payload.triforcePercent, logCategory, "triforcePercent");
  validateNonEmptyStringValue(payload.accessibility, logCategory, "accessibility");
  validateIntegerValue(payload.progressionBalancing, logCategory, "progressionBalancing");

  return [
    payload.joueur.trim(),
    payload.goal.trim(),
    payload.triforcePieces, payload.triforcePercent / 100,
    "=$C" + rowIdx + "*$D" + rowIdx,
    payload.accessibility,
    payload.progressionBalancing
  ];
}

function parseDoorsInfo(payload)
{
  const logCategory = "DOORS";
  validateNonEmptyStringValue(payload.kokiriForest, logCategory, "kokiriForest");
  validateNonEmptyStringValue(payload.dekuTree, logCategory, "dekuTree");
  validateNonEmptyStringValue(payload.kakarikoGate, logCategory, "kakarikoGate");
  validateNonEmptyStringValue(payload.doorOfTime, logCategory, "doorOfTime");
  validateNonEmptyStringValue(payload.sleepingWaterfall, logCategory, "sleepingWaterfall");
  validateNonEmptyStringValue(payload.zoraFountain, logCategory, "zoraFountain");
  validateNonEmptyStringValue(payload.jabuJabuMouth, logCategory, "jabuJabuMouth");
  validateNonEmptyStringValue(payload.overworldDoors, logCategory, "overworldDoors");

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

function parseGanonInfo(payload)
{
  const logCategory = "GANON";
  validateNonEmptyStringValue(payload.startAge, logCategory, "startAge");
  validateNonEmptyStringValue(payload.rainbowBridgeCondition, logCategory, "rainbowBridgeCondition");
  validateIntegerValue(payload.rainbowBridgeValue, logCategory, "rainbowBridgeValue");
  validateNonEmptyStringValue(payload.ganonTrials, logCategory, "ganonTrials");
  validateNonEmptyStringValue(payload.ganonBossKeyCondition, logCategory, "ganonBossKeyCondition");
  validateIntegerValue(payload.ganonBossKeyValue, logCategory, "ganonBossKeyValue");

  return [
    payload.startAge.trim(),
    payload.rainbowBridgeCondition.trim(),
    payload.rainbowBridgeValue,
    payload.ganonTrials.trim(),
    payload.ganonBossKeyCondition.trim(),
    payload.ganonBossKeyValue
  ];
}

function parseDungeonInfo(payload)
{
  const logCategory = "DUNGEON";
  validateNonEmptyStringValue(payload.mapsAndCompasses, logCategory, "mapsAndCompasses");
  validateBooleanValue(payload.bottomOfTheWellKeyrings, logCategory, "bottomOfTheWellKeyrings");
  validateBooleanValue(payload.forestTempleKeyrings, logCategory, "forestTempleKeyrings");
  validateBooleanValue(payload.fireTempleKeyrings, logCategory, "fireTempleKeyrings");
  validateBooleanValue(payload.waterTempleKeyrings, logCategory, "waterTempleKeyrings");
  validateBooleanValue(payload.shadowTempleKeyrings, logCategory, "shadowTempleKeyrings");
  validateBooleanValue(payload.spiritTempleKeyrings, logCategory, "spiritTempleKeyrings");
  validateBooleanValue(payload.gerudoFortressKeyrings, logCategory, "gerudoFortressKeyrings");
  validateNonEmptyStringValue(payload.fortressCarpenters, logCategory, "fortressCarpenters");
  validateBooleanValue(payload.gerudoTrainingGroundsKeyrings, logCategory, "gerudoTrainingGroundsKeyrings");
  validateBooleanValue(payload.ganonsCastleKeyrings, logCategory, "ganonsCastleKeyrings");

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

function parseInsanityInfo(payload)
{
  const logCategory = "SANITY";
  validateNonEmptyStringValue(payload.masterSwordSanity, logCategory, "masterSwordSanity");
  validateNonEmptyStringValue(payload.kokiriSwordSanity, logCategory, "kokiriSwordSanity");
  validateNonEmptyStringValue(payload.tokensanity, logCategory, "tokensanity");
  validateNonEmptyStringValue(payload.freestandingsanity, logCategory, "freestandingsanity");
  validateNonEmptyStringValue(payload.potsanity, logCategory, "potsanity");
  validateNonEmptyStringValue(payload.cratesanity, logCategory, "cratesanity");
  validateNonEmptyStringValue(payload.grasssanity, logCategory, "grasssanity");
  validateNonEmptyStringValue(payload.fishsanity, logCategory, "fishsanity");
  validateBooleanValue(payload.beehivesanity, logCategory, "beehivesanity");
  validateBooleanValue(payload.cowsanity, logCategory, "cowsanity");
  validateBooleanValue(payload.treesanity, logCategory, "treesanity");
  validateNonEmptyStringValue(payload.bossSoulSanity, logCategory, "bossSoulSanity");
  validateBooleanValue(payload.frogsanity, logCategory, "frogsanity");
  validateNonEmptyStringValue(payload.ocarinasanity, logCategory, "ocarinasanity");
  validateBooleanValue(payload.ocarinaButtonSanity, logCategory, "ocarinaButtonSanity");
  validateBooleanValue(payload.fairysanityFountains, logCategory, "fairysanityFountains");
  validateBooleanValue(payload.fairysanityStones, logCategory, "fairysanityStones");
  validateBooleanValue(payload.fairysanityBeans, logCategory, "fairysanityBeans");
  validateBooleanValue(payload.fairysanitySongs, logCategory, "fairysanitySongs");
  
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

function parsePoolInfo(payload)
{
  const logCategory = "POOL";
  validateNonEmptyStringValue(payload.poolBalancing, logCategory, "poolBalancing");
  validateNonEmptyStringValue(payload.childWallet, logCategory, "childWallet");
  validateNonEmptyStringValue(payload.tycoonWallet, logCategory, "tycoonWallet");
  validateNonEmptyStringValue(payload.bronzeScale, logCategory, "bronzeScale");
  validateNonEmptyStringValue(payload.stickBag, logCategory, "stickBag");
  validateNonEmptyStringValue(payload.nutBag, logCategory, "nutBag");
  validateNonEmptyStringValue(payload.bombchuBag, logCategory, "bombchuBag");
  validateNonEmptyStringValue(payload.weirdEgg, logCategory, "weirdEgg");
  validateNonEmptyStringValue(payload.adultTrade, logCategory, "adultTrade");
  validateNonEmptyStringValue(payload.gerudoCard, logCategory, "gerudoCard");
  validateNonEmptyStringValue(payload.fishingPole, logCategory, "fishingPole");
  validateNonEmptyStringValue(payload.skeletonKey, logCategory, "skeletonKey");
  validateNonEmptyStringValue(payload.rocsFeather, logCategory, "rocsFeather");
  validateNonEmptyStringValue(payload.dungeonRewards, logCategory, "dungeonRewards");

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

function parseShopInfo(payload)
{
  const logCategory = "SHOP";
  validateBooleanValue(payload.shuffleShops, logCategory, "shuffleShops");
  validateIntegerValue(payload.shuffleShopsItems, logCategory, "shuffleShopsItems");
  validateBooleanValue(payload.shuffleScrubs, logCategory, "shuffleScrubs");
  validateNonEmptyStringValue(payload.shuffleMerchants, logCategory, "shuffleMerchants");

  return [
    payload.shuffleShops,
    payload.shuffleShopsItems,
    payload.shuffleScrubs,
    payload.shuffleMerchants.trim(),
  ];
}

function parseExtraInfo(payload)
{
  const logCategory = "EXTRA";
  validateBooleanValue(payload.token100, logCategory, "token100");
  validateBooleanValue(payload.skipChildZelda, logCategory, "skipChildZelda");
  validateBooleanValue(payload.skipEponaRace, logCategory, "skipEponaRace");
  validateIntegerValue(payload.iceTrapsCount, logCategory, "iceTrapsCount");
  validateIntegerValue(payload.iceTrapsPercent, logCategory, "iceTrapsPercent");

  return [
    payload.token100,
    payload.skipChildZelda,
    payload.skipEponaRace,
    payload.iceTrapsCount,
    payload.iceTrapsPercent,
  ];
}

function parseQolInfo(payload)
{
  const logCategory = "QOL";
  validateBooleanValue(payload.fullWallets, logCategory, "fullWallets");
  validateNonEmptyStringValue(payload.infiniteUpgrades, logCategory, "infiniteUpgrades");

  return [
    payload.fullWallets,
    payload.infiniteUpgrades.trim(),
  ];
}