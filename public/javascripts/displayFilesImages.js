// bsCustomFileInput.init();

function previewImages() {
  const inputs = document.querySelectorAll("input[type='file']");
  const preview = document.querySelector(".formFile");

  // Clear the preview div's inner HTML
  preview.innerHTML = "";

  inputs.forEach((input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = e.target.result;
        preview.appendChild(div);
        div.appendChild(img);
        const button = document.createElement("button");
        button.setAttribute("class", "btn btn-danger btn-sm deleteImage");
        button.textContent = "Delete";
        button.style.position = "absolute";
        button.style.top = "0";
        button.style.right = "0";
        div.style.position = "relative";
        div.appendChild(button);
        button.addEventListener("click", () => {
          preview.removeChild(div);
          input.parentNode.removeChild(input);
          createInput();
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input[type='file']").forEach((input) => {
    input.addEventListener("change", previewImages);
  });
});

//////

const createInput = function () {
  const inputs = document.querySelectorAll("input[type='file']");

  if (inputs.length < 10) {
    const outerDiv = document.querySelector(".custom-file");
    const inputDiv = `
    <div class="mb-1">
      <input
        class="form-control custom-file-input"
        type="file"
        id="image"
        name="image"
      />
    </div>
  `;
    const newDiv = document.createElement("div");
    // Set its innerHTML to the input element HTML
    newDiv.innerHTML = inputDiv;
    // Add the new div element to the outerDiv element
    outerDiv.appendChild(newDiv);
    newDiv.addEventListener("change", previewImages);
  }
};

const addInput = document.querySelector(".addInput");

addInput.addEventListener("click", function (event) {
  event.preventDefault();
  createInput();

  // Create a new div element
});
