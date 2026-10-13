/* CEH Practical Field Manual: small, dependency-free UI interactions. */
(() => {
  "use strict";

  const updateReadingProgress = () => {
    const fill = document.querySelector(".ceh-reading-progress > span");
    if (!fill) return;

    const root = document.documentElement;
    const maxScroll = root.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    fill.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  };

  const ensureReadingProgress = () => {
    if (document.querySelector(".ceh-reading-progress")) return;

    const bar = document.createElement("div");
    bar.className = "ceh-reading-progress";
    bar.setAttribute("aria-hidden", "true");

    const fill = document.createElement("span");
    bar.appendChild(fill);
    document.body.appendChild(bar);
    updateReadingProgress();
  };

  const initModuleFilter = () => {
    const input = document.querySelector("#ceh-module-search");
    const grid = document.querySelector(".ceh-track-grid");
    const status = document.querySelector("#ceh-filter-status");
    const clear = document.querySelector("[data-ceh-clear-search]");

    if (!input || !grid || input.dataset.cehBound === "true") return;
    input.dataset.cehBound = "true";

    const cards = Array.from(grid.querySelectorAll(":scope > li"));
    const update = () => {
      const query = input.value.trim().toLocaleLowerCase();
      let visible = 0;

      cards.forEach((card) => {
        const keywords = card.getAttribute("data-keywords") || "";
        const haystack = `${card.textContent} ${keywords}`.toLocaleLowerCase();
        const matches = !query || haystack.includes(query);

        card.hidden = !matches;
        if (matches) visible += 1;
      });

      if (status) {
        status.textContent = query
          ? `${visible} of ${cards.length} tracks shown`
          : `${cards.length} tracks available`;
      }

      if (clear) clear.disabled = input.value.length === 0;
    };

    input.addEventListener("input", update);
    clear?.addEventListener("click", () => {
      input.value = "";
      update();
      input.focus();
    });

    update();
  };

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();

    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("Clipboard permission was unavailable.");
  };

  const initCopyLink = () => {
    document.querySelectorAll("[data-ceh-copy-link]").forEach((button) => {
      if (button.dataset.cehBound === "true") return;
      button.dataset.cehBound = "true";

      const originalText = button.textContent.trim() || "Copy page link";
      button.addEventListener("click", async () => {
        try {
          const url = new URL(window.location.href);
          url.hash = "";
          await copyText(url.toString());
          button.textContent = "Link copied";
          button.setAttribute("aria-label", "Page link copied to clipboard");
        } catch (error) {
          button.textContent = "Copy unavailable";
          button.setAttribute("aria-label", "Could not copy page link");
        }

        window.setTimeout(() => {
          button.textContent = originalText;
          button.setAttribute("aria-label", originalText);
        }, 1800);
      });
    });
  };

  const init = () => {
    ensureReadingProgress();
    initModuleFilter();
    initCopyLink();
    updateReadingProgress();
  };

  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateReadingProgress();
      scrollTicking = false;
    });
  }, { passive: true });

  window.addEventListener("resize", updateReadingProgress, { passive: true });

  // Material's instant navigation swaps page content without a full reload.
  if (typeof document$ !== "undefined" && document$ && typeof document$.subscribe === "function") {
    document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
