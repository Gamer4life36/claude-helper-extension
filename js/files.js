(() => {
  // src/files.ts
  var $ = (id) => document.getElementById(id);
  var dirHandle = null;
  var files = [];
  var current = null;
  var dirty = false;
  var status = (t) => $("status").textContent = t;
  function setDirty(d) {
    dirty = d;
    $("save").disabled = !current || !d;
  }
  var idb = () => new Promise((res, rej) => {
    const r = indexedDB.open("cc-files", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("h");
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  async function put(k, v) {
    const db = await idb();
    return new Promise((res, rej) => {
      const t = db.transaction("h", "readwrite");
      t.objectStore("h").put(v, k);
      t.oncomplete = () => res();
      t.onerror = () => rej(t.error);
    });
  }
  async function get(k) {
    const db = await idb();
    return new Promise((res) => {
      const t = db.transaction("h", "readonly");
      const q = t.objectStore("h").get(k);
      q.onsuccess = () => res(q.result || null);
      q.onerror = () => res(null);
    });
  }
  async function walk(dir, prefix = "", out = [], depth = 0) {
    if (out.length >= 5e3 || depth > 10) return out;
    for await (const [name, h] of dir.entries()) {
      const path = prefix ? prefix + "/" + name : name;
      if (h.kind === "file") out.push({ path, handle: h });
      else if (!name.startsWith(".") && name !== "node_modules" && name !== ".git") await walk(h, path, out, depth + 1);
      if (out.length >= 5e3) break;
    }
    return out;
  }
  function renderList() {
    const q = $("filter").value.toLowerCase();
    const shown = files.filter((f) => !q || f.path.toLowerCase().includes(q)).slice(0, 2e3);
    $("list").innerHTML = shown.length ? shown.map((f) => `<div class="fi" data-i="${files.indexOf(f)}" title="${f.path.replace(/"/g, "&quot;")}">${f.path}</div>`).join("") : '<div class="muted" style="padding:10px">No files match.</div>';
    $("list").querySelectorAll(".fi").forEach((el) => el.onclick = () => openFile(+el.dataset.i));
  }
  async function refreshList() {
    status("reading folder\u2026");
    files = await walk(dirHandle);
    files.sort((a, b) => a.path.localeCompare(b.path));
    renderList();
    status(files.length + (files.length >= 5e3 ? "+ files (capped)" : " files"));
  }
  var TEXT_MAX = 2 * 1024 * 1024;
  function looksBinary(buf) {
    const b = new Uint8Array(buf), n = Math.min(b.length, 8192);
    for (let i = 0; i < n; i++) if (b[i] === 0) return true;
    return false;
  }
  async function openFile(i) {
    const f = files[i];
    if (!f) return;
    if (dirty && !confirm("Discard unsaved changes?")) return;
    current = f;
    $("list").querySelectorAll(".fi").forEach((el) => el.classList.toggle("active", +el.dataset.i === i));
    try {
      const file = await f.handle.getFile();
      if (file.size > TEXT_MAX) {
        $("editor").value = "";
        $("editor").disabled = true;
        $("fileinfo").textContent = `${f.path} \u2014 ${(file.size / 1048576).toFixed(1)} MB, too large to edit here`;
        setDirty(false);
        return;
      }
      const buf = await file.arrayBuffer();
      if (looksBinary(buf)) {
        $("editor").value = "";
        $("editor").disabled = true;
        $("fileinfo").textContent = `${f.path} \u2014 binary file (not editable)`;
        setDirty(false);
        return;
      }
      $("editor").disabled = false;
      $("editor").value = new TextDecoder().decode(buf);
      $("fileinfo").textContent = `${f.path}  \xB7  ${file.size} bytes`;
      setDirty(false);
    } catch (e) {
      status("open error: " + e.message);
    }
  }
  async function save() {
    if (!current || $("editor").disabled) return;
    try {
      const w = await current.handle.createWritable();
      await w.write($("editor").value);
      await w.close();
      setDirty(false);
      status("saved \u2713 " + current.path);
    } catch (e) {
      status("save error: " + e.message);
    }
  }
  async function pickFolder() {
    try {
      dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
      await put("dir", dirHandle);
      $("folder").textContent = dirHandle.name;
      $("pick").textContent = "\u{1F4C1} Open folder";
      $("pick").onclick = pickFolder;
      await refreshList();
    } catch (e) {
      if (e.name !== "AbortError") status("open error: " + e.message);
    }
  }
  async function restore() {
    const h = await get("dir");
    if (!h) return;
    let perm = "prompt";
    try {
      perm = await h.queryPermission({ mode: "readwrite" });
    } catch {
    }
    $("folder").textContent = h.name;
    if (perm === "granted") {
      dirHandle = h;
      await refreshList();
      return;
    }
    $("pick").textContent = "\u{1F513} Reopen " + h.name;
    $("pick").onclick = async () => {
      let p = "denied";
      try {
        p = await h.requestPermission({ mode: "readwrite" });
      } catch {
      }
      if (p === "granted") {
        dirHandle = h;
        $("pick").textContent = "\u{1F4C1} Open folder";
        $("pick").onclick = pickFolder;
        await refreshList();
      } else pickFolder();
    };
  }
  $("pick").onclick = pickFolder;
  $("save").onclick = save;
  $("filter").oninput = renderList;
  $("editor").oninput = () => setDirty(true);
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      save();
    }
  });
  window.addEventListener("beforeunload", (e) => {
    if (dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
  if (!window.showDirectoryPicker) {
    status("This browser doesn't support the File System Access API (needs desktop Chrome/Edge).");
    $("pick").disabled = true;
  } else restore();
})();
