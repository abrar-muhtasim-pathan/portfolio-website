(function () {
  var history = [];
  var busy = false;

  var fab = document.createElement('button');
  fab.className = 'cb-fab';
  fab.setAttribute('aria-label', 'Open chat');
  fab.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'cb-panel';
  panel.innerHTML =
    '<div class="cb-head"><div><b>Ask about Abrar</b><small>AI assistant · answers from this portfolio</small></div><button class="cb-x" aria-label="Close">&times;</button></div>' +
    '<div class="cb-log"></div>' +
    '<div class="cb-chips"></div>' +
    '<form class="cb-form"><input type="text" placeholder="Type your question..." maxlength="500" autocomplete="off"><button type="submit">Send</button></form>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var log = panel.querySelector('.cb-log');
  var chips = panel.querySelector('.cb-chips');
  var form = panel.querySelector('form');
  var input = form.querySelector('input');
  var sendBtn = form.querySelector('button');

  function add(role, text) {
    var d = document.createElement('div');
    d.className = 'cb-msg ' + role;
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }

  add('bot', "Hi! I can tell you about Abrar's research, projects, publications and experience. What would you like to know?");
  ['What are his main projects?', 'What are his skills?', 'Does he have publications?'].forEach(function (q) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = q;
    b.onclick = function () { send(q); };
    chips.appendChild(b);
  });

  function toggle(open) {
    panel.classList.toggle('open', open);
    if (open) input.focus();
  }
  fab.onclick = function () { toggle(!panel.classList.contains('open')); };
  panel.querySelector('.cb-x').onclick = function () { toggle(false); };

  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true; sendBtn.disabled = true; chips.style.display = 'none';
    add('me', text);
    history.push({ role: 'user', content: text });
    input.value = '';
    var wait = add('bot', '...');

    var fallback = 'Sorry, something went wrong. Please try again or use the contact section.';
    var full = '';

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    })
      .then(function (r) {
        if (!r.ok) throw new Error('bad status');
        if (!r.body || !r.body.getReader) {
          return r.text().then(function (t) { full = t; wait.textContent = t; });
        }
        var reader = r.body.getReader();
        var dec = new TextDecoder();
        function pump() {
          return reader.read().then(function (res) {
            if (res.done) return;
            full += dec.decode(res.value, { stream: true });
            wait.textContent = full;
            log.scrollTop = log.scrollHeight;
            return pump();
          });
        }
        return pump();
      })
      .then(function () {
        full = full.trim();
        if (!full) { wait.textContent = fallback; history.pop(); return; }
        wait.textContent = full;
        history.push({ role: 'assistant', content: full });
      })
      .catch(function () {
        if (full.trim()) {
          // connection dropped mid-answer: keep what arrived
          history.push({ role: 'assistant', content: full.trim() });
        } else {
          wait.textContent = 'Connection problem. Please try again.';
          history.pop();
        }
      })
      .finally(function () { busy = false; sendBtn.disabled = false; log.scrollTop = log.scrollHeight; });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });
})();
