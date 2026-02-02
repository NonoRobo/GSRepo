function doPost(e)
{
  try
  {
    if (!e.postData || !e.postData.contents)
    {
      return errorResponse("No POST data received");
    }

    addData(JSON.parse(e.postData.contents));

  } catch (err)
  {
    return errorResponse(err.message);
  }
}

function errorResponse(message)
{
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "error",
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function test()
{
  const json =
  {
    joueur: "Zelda",
    goal: "Triforce Hunt",
    triforcePieces: 100,
    triforcePercent: 100,
    accessibility: "Minimal",
    progressionBalancing: 100,

    kokiriForest: "Closed",
    dekuTree: "Closed",
    kakarikoGate: "Open",
    doorOfTime: "Song Only",
    sleepingWaterfall: "Closed",
    zoraFountain: "Closed for Child",
    jabuJabuMouth: "Closed",
    overworldDoors: "Closed",

    startAge: "Adult",
    rainbowBridgeCondition: "Medallions",
    rainbowBridgeValue: 100,
    ganonTrials: "None",
    ganonBossKeyCondition: "LACS Medallions",
    ganonBossKeyValue: 8,

    mapsAndCompasses: "Own Dungeon",
    fortressCarpenters: "One prisoner",
    gerudoFortressKeyrings: false,
    forestTempleKeyrings: true,
    fireTempleKeyrings: false,
    waterTempleKeyrings: true,
    shadowTempleKeyrings: false,
    spiritTempleKeyrings: true,
    ganonsCastleKeyrings: false,
    bottomOfTheWellKeyrings: true,
    gerudoTrainingGroundsKeyrings: false,

    masterSwordSanity: "Shuffled",
    kokiriSwordSanity: "Shuffled",
    tokensanity: "Everywhere",
    freestandingsanity: "Everywhere",
    potsanity: "Everywhere",
    cratesanity: "Everywhere",
    grasssanity: "Everywhere",
    fishsanity: "Everywhere",
    beehivesanity: true,
    cowsanity: false,
    treesanity: true,
    bossSoulSanity: "All Except Ganon",
    frogsanity: false,
    ocarinasanity: "Shuffled",
    ocarinaButtonSanity: true,
    fairysanityFountains: false,
    fairysanityStones: true,
    fairysanityBeans: false,
    fairysanitySongs: true,

    poolBalancing: "Balanced",
    childWallet: "Start with",
    tycoonWallet: "Without",
    bronzeScale: "Start with",
    stickBag: "Start with",
    nutBag: "Start with",
    bombchuBag: "Three Bags",
    weirdEgg: "Shuffled",
    adultTrade: "Only Claim Check",
    gerudoCard: "Shuffled",
    fishingPole: "Start with",
    skeletonKey: "Without",
    rocsFeather: "Without",
    dungeonRewards: "Dungeons",

    shuffleShops: true,
    shuffleShopsItems: 8,
    shuffleScrubs: true,
    shuffleMerchants: "All But Beans",

    token100: true,
    skipChildZelda: false,
    skipEponaRace: true,
    iceTrapsCount: 100,
    iceTrapsPercent: 100,

    fullWallets: false,
    infiniteUpgrades: "Progressive",
  };
  addData(json);
}