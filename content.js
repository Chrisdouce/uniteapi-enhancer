console.log('Enhancer script loaded.');

function removeAd() {
  const ads = document.querySelectorAll(
    'div.w-full.h-\\[260px\\].bg-muted\\/50.border.border-dashed'
  );

  ads.forEach(ad => {
    ad.style.display = "none";
  });
}

function enlargeStats(node = document) {
  // only run on player pages
  if (!window.location.pathname.includes("/p/")) return;

  const playerStats = node.querySelectorAll(
    "div.font-bold.font-mono.leading-none"
  );

  playerStats.forEach(stat => {
    stat.classList.remove("text-sm", "text-md");
    stat.classList.add("text-xl");
  });

  const pokemonStats = node.querySelectorAll(
    "div.font-bold.text-sm.font-mono.leading-none"
  );

  pokemonStats.forEach(stat => {
    stat.classList.remove("text-sm");
    stat.classList.add("text-lg");
  });
}

function enhancePokemonList(node = document) {
  if (!window.location.pathname.includes("/p/")) return;

  const rows = node.querySelectorAll(
    ".flex.items-center.gap-2.p-2.rounded-lg"
  );

  rows.forEach((row, index) => {
    // Increase name size
    const name = row.querySelector("span.font-medium");
    if (name) {
      name.classList.remove("text-xs");
      name.classList.add("text-sm");
    }

    // Increase Games/Win% text size
    const stats = row.querySelectorAll(".font-mono.font-medium");
    stats.forEach(stat => {
      stat.classList.remove("text-[10px]");
      stat.classList.add("text-sm");
    });
  });
}

removeAd();
enlargeStats();
enhancePokemonList();

// Watch for future DOM changes
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        removeAd(node);
        enlargeStats(node);
        enhancePokemonList(node);
      }
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});