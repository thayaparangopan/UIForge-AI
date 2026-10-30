# Research & Evaluation: Visual UI-to-Code Synthesis

## 1. Background & Problem Statement

Traditional design-to-code tools (e.g. Figma-to-code plugins) rely entirely on access to structured vector trees (Figma DOM, frames, auto-layout metadata). However, engineers frequently receive UI specifications as **flat raster images** (screenshots, PNG exports, legacy application screen grabs, or mobile design captures).

Converting flat raster designs into production frontend code introduces several computer vision challenges:
1. **Lack of Semantic Hierarchy**: A pixel buffer contains no inherent notion of parent-child containers, nested flexboxes, or scroll views.
2. **Dynamic Resolution Variations**: High-DPI screenshots (e.g., Retina 3x @ $1170 \times 2532\text{ px}$) must map to scalable viewport units ($390 \times 844\text{ pt}$).
3. **Typography & Color Extraction**: Subtle anti-aliasing around text and borders creates gradients rather than exact hex values.

---

## 2. Multimodal LLMs vs. Classical Object Detection (YOLO / OpenCV)

| Dimension | Classical Vision (YOLOv8 / OpenCV Contours) | Multimodal LLMs (Gemini 2.5 Flash Vision) | UIForge AI Approach |
| :--- | :--- | :--- | :--- |
| **Component Recognition** | Bounding box classification only (e.g., `button`, `input`) | Recognizes context, placeholder text, icons, and semantics | Multimodal LLM for semantics |
| **Hierarchy Detection** | Requires complex geometric heuristics to guess nesting | Naturally understands layout grouping & hierarchy | LLM JSON IR extraction |
| **Design Tokens** | Needs separate color quantization clustering | Directly identifies dominant brand palettes & contrast pairs | Multi-stage extraction into design tokens |
| **Latency** | Fast ($20\text{--}50\text{ ms}$) | Moderate ($1\text{--}2\text{ s}$) | Asynchronous background processing |

UIForge AI combines the best of both paradigms:
* **Gemini 2.5 Flash Multimodal LLM** performs semantic parsing, hierarchy discovery, and design token extraction into the Intermediate Representation.
* **OpenCV & NumPy** provide deterministic, millisecond-fast image processing: aspect ratio normalization, Pillow dimension validation, Structural Similarity (SSIM), and Jet difference heatmaps.

---

## 3. Visual Similarity Evaluation: SSIM vs. Mean Squared Error (MSE)

When evaluating synthesized frontend code against the original screenshot, simple pixel-by-pixel comparisons like Mean Squared Error (MSE) fail because:
* Minor subpixel font rendering differences or antialiased curve variations produce disproportionately high MSE penalties even when the interface is visually identical to the human eye.

### Why Structural Similarity Index (SSIM)?
SSIM models visual perception by comparing local luminance, contrast, and structural patterns:
$$\text{SSIM}(x, y) = [l(x, y)]^\alpha \cdot [c(x, y)]^\beta \cdot [s(x, y)]^\gamma$$

In UIForge AI, an $11 \times 11$ circular-symmetric Gaussian window with $\sigma = 1.5$ is applied across the grayscale buffers of both interfaces. This produces an intuitive $0\text{--}100\%$ fidelity rating that accurately measures layout precision while forgiving minor rasterization discrepancies.

---

## 4. Bounding Box Percentage Normalization

To ensure synthesized code is responsive across viewports rather than locked to absolute image coordinates:
$$\hat{x} = \frac{x}{\text{Width}_{\text{image}}} \times 100\%, \quad \hat{y} = \frac{y}{\text{Height}_{\text{image}}} \times 100\%$$

This mathematical representation enables the code generation engine to translate visual regions into responsive CSS Grid and Flexbox layouts without hardcoded pixel coordinates.
