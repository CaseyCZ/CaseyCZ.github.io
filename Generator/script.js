const generateButton = document.getElementById('generateButton');
const promptInput = document.getElementById('prompt');
const resultDiv = document.getElementById('result');

generateButton.addEventListener('click', generateImage);

async function generateImage() {
  generateButton.disabled = true;
  resultDiv.innerHTML = 'Generating image...';

  const prompt = promptInput.value;

  try {
    const response = await fetch('YOUR_DALL_E_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Přidejte zde veškeré potřebné hlavičky nebo autorizační tokeny
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();

    if (data.url) {
      resultDiv.innerHTML = `<h3>Generated Image:</h3><img src="${data.url}" alt="Generated" />`;
    } else {
      resultDiv.innerHTML = 'Image generation failed.';
    }
  } catch (error) {
    resultDiv.innerHTML = 'Error generating image.';
    console.error(error);
  }

  generateButton.disabled = false;
}
