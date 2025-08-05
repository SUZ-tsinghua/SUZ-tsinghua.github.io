// BibTeX functionality
function toggleBibtex(id) {
  const bibtexContent = document.getElementById('bibtex-' + id);
  if (bibtexContent.style.display === 'none') {
    bibtexContent.style.display = 'block';
  } else {
    bibtexContent.style.display = 'none';
  }
}

function copyBibtex(id) {
  const bibtexText = document.querySelector('#bibtex-' + id + ' .bibtex-text');
  const text = bibtexText.textContent;
  
  // Create a temporary textarea to copy the text
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  
  // Show feedback
  const copyButton = document.querySelector('#bibtex-' + id + ' .bibtex-copy');
  const originalText = copyButton.innerHTML;
  copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
  copyButton.style.backgroundColor = '#28a745';
  copyButton.style.color = 'white';
  
  setTimeout(() => {
    copyButton.innerHTML = originalText;
    copyButton.style.backgroundColor = '';
    copyButton.style.color = '';
  }, 2000);
} 