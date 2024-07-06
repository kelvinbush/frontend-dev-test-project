document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('editor');
  const modal = document.getElementById('modal');
  const output = document.getElementById('output');
  const keywordSpan = document.getElementById('keyword');

  textarea.addEventListener('input', () => {
    const value = textarea.value;
    const lastChar = value.slice(-1);

    if (lastChar === '/') {
      modal.classList.add('active');
      scrollToBottom();
    }
  });

  textarea.addEventListener('keydown', (event) => {
    const value = textarea.value;
    const lastChar = value.slice(-1);

    if (lastChar === '/') {
      modal.classList.add('active');
      scrollToBottom();
    }

    if (/^\d$/.test(event.key) && modal.classList.contains('active')) {
      const index = parseInt(event.key) - 1;
      const liItems = modal.querySelectorAll('ul li');

      if (index >= 0 && index < liItems.length) {
        liItems.forEach(item => item.classList.remove('active'));

        liItems[index].classList.add('active');

        keywordSpan.textContent = event.key;
        keywordSpan.classList.add('active');
      }
    }

    if (event.key === 'Enter') {
      const lines = value.split('\n');
      const lastLine = lines[lines.length - 1];

      if (/^\/\d/.test(lastLine)) {
        event.preventDefault();
        modal.classList.add('active');

        const headerText = lastLine.substring(2).trim();

        if (headerText) {
          const h1 = document.createElement('h1');
          h1.textContent = headerText;
          output.appendChild(h1);

          textarea.value = '';
          scrollToBottom();
        }

        modal.classList.remove('active');
        keywordSpan.textContent = '';
        keywordSpan.classList.remove('active');
      }
    }
  });

  function scrollToBottom() {
    window.scroll({
      top: document.body.scrollHeight, behavior: 'smooth'
    });
  }
});
