async function enhanceImage() {
    const upload = document.getElementById("upload").files[0];
    const loading = document.getElementById("loading");
    const outputImg = document.getElementById("enhancedImage");

    if (!upload) {
        alert("Please upload an image first.");
        return;
    }

    // Show loading text
    loading.style.display = "block";
    outputImg.src = "";

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(upload);
    reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];

        // Prepare the request
        const url = 'https://apis-awesome-tofu.koyeb.app/api/remini?mode=enhance';
        const headers = {
            'Content-Type': 'application/json',
        };
        const data = { imageData: base64Image };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const blob = await response.blob();
                outputImg.src = URL.createObjectURL(blob);
            } else {
                alert("Error enhancing image: " + response.statusText);
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            loading.style.display = "none";
        }
    };
    reader.onerror = () => {
        alert("Error reading file!");
        loading.style.display = "none";
    };
}
