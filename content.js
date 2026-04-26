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

  const stats = node.querySelectorAll(
    "div.font-bold.font-mono.leading-none"
  );

  stats.forEach(stat => {
    stat.classList.remove("text-sm", "text-md");
    stat.classList.add("text-xl");
  });
}

removeAd();
enlargeStats();

// Watch for future DOM changes
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        removeAd(node);
        enlargeStats(node);
      }
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});