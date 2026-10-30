import os
import shutil
import numpy as np
from app.services.comparison_service import calculate_ssim, generate_diff_heatmap

def test_calculate_ssim_identical_images():
    img1 = np.full((120, 120), 180, dtype=np.uint8)
    img2 = np.full((120, 120), 180, dtype=np.uint8)
    score = calculate_ssim(img1, img2)
    assert score >= 99.0

def test_calculate_ssim_different_images():
    img1 = np.full((120, 120), 255, dtype=np.uint8)
    img2 = np.zeros((120, 120), dtype=np.uint8)
    score = calculate_ssim(img1, img2)
    assert score < 50.0

def test_generate_diff_heatmap_output():
    temp_dir = "uploads/test_heatmap_output"
    os.makedirs(temp_dir, exist_ok=True)
    try:
        bgr1 = np.full((200, 200, 3), 200, dtype=np.uint8)
        bgr2 = np.full((200, 200, 3), 200, dtype=np.uint8)
        # Create notable difference block
        bgr2[40:100, 40:100] = [30, 30, 200]

        relative_url, disparities = generate_diff_heatmap(bgr1, bgr2, temp_dir)
        assert relative_url.startswith("/uploads/")
        assert relative_url.endswith(".png")
        assert len(disparities) > 0
        assert disparities[0].category in ["layout", "spacing", "color", "typography"]
    finally:
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

def test_compare_endpoint(client):
    res = client.post("/api/compare", json={"uploadId": "upload_test", "generationId": "gen_test"})
    assert res.status_code == 200
    data = res.json()
    assert "metrics" in data
    assert 0 <= data["metrics"]["ssimScore"] <= 100
    assert 0 <= data["metrics"]["overallSimilarity"] <= 100
    assert "disparities" in data

