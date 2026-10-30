import io
from PIL import Image
from app.services.analysis_service import _generate_fallback_analysis

def test_fallback_intermediate_representation():
    ir = _generate_fallback_analysis(width=390, height=844, original_filename="mobile_screen.png")
    assert "screenName" in ir
    assert "layoutType" in ir
    assert "colorPalette" in ir
    assert "components" in ir
    assert len(ir["components"]) > 0

    # Verify bounding box attributes
    for comp in ir["components"]:
        assert "id" in comp
        assert "type" in comp
        assert "bounding_box" in comp
        bbox = comp["bounding_box"]
        assert 0 <= bbox["x"] <= 100
        assert 0 <= bbox["y"] <= 100
        assert 0 < bbox["width"] <= 100
        assert 0 < bbox["height"] <= 100

def test_analyze_endpoint(client):
    # 1. Create project
    proj_res = client.post("/api/projects/", json={"project_name": "Analysis Project", "framework": "react-native"})
    proj_id = proj_res.json()["id"]

    # 2. Upload screenshot
    img = Image.new("RGB", (300, 600), color="purple")
    byte_arr = io.BytesIO()
    img.save(byte_arr, format="PNG")
    byte_arr.seek(0)
    client.post(f"/api/projects/{proj_id}/upload", files={"file": ("ui.png", byte_arr, "image/png")})

    # 3. Analyze screenshot
    analyze_res = client.post(f"/api/projects/{proj_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert data["project_id"] == proj_id
    assert "intermediate_representation" in data
    assert data["component_count"] > 0
    assert data["confidence_score"] > 50

